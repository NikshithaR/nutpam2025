export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[API] Received registration data:", JSON.stringify(body, null, 2))

    const { teamName, teamLeaderName, teamLeaderEmail, teamLeaderPhone, teamSize, members, problemTrack } = body

    const missingFields = []
    if (!teamName?.trim()) missingFields.push("teamName")
    if (!teamLeaderName?.trim()) missingFields.push("teamLeaderName")
    if (!teamLeaderEmail?.trim()) missingFields.push("teamLeaderEmail")
    if (!teamLeaderPhone?.trim()) missingFields.push("teamLeaderPhone")
    if (!teamSize) missingFields.push("teamSize")
    if (!problemTrack?.trim()) missingFields.push("problemTrack")

    if (missingFields.length > 0) {
      console.log("[API] Missing required fields:", missingFields)
      return Response.json(
        {
          success: false,
          errors: { general: `Missing required fields: ${missingFields.join(", ")}` },
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(teamLeaderEmail)) {
      console.log("[API] Invalid team leader email:", teamLeaderEmail)
      return Response.json({ success: false, errors: { teamLeaderEmail: "Invalid email format" } }, { status: 400 })
    }

    // Validate phone format
    const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/
    if (!phoneRegex.test(teamLeaderPhone.replace(/\s/g, ""))) {
      console.log("[API] Invalid team leader phone:", teamLeaderPhone)
      return Response.json({ success: false, errors: { teamLeaderPhone: "Invalid phone format" } }, { status: 400 })
    }

    // Validate team size
    const teamSizeNum = Number.parseInt(teamSize)
    if (isNaN(teamSizeNum) || teamSizeNum < 2 || teamSizeNum > 3) {
      console.log("[API] Invalid team size:", teamSizeNum)
      return Response.json({ success: false, errors: { teamSize: "Team must have 2-3 members" } }, { status: 400 })
    }

    if (!Array.isArray(members)) {
      console.log("[API] Members is not an array:", typeof members, members)
      return Response.json({ success: false, errors: { members: "Invalid members data format" } }, { status: 400 })
    }

    const expectedMemberCount = teamSizeNum - 1
    console.log("[API] Member validation:", {
      teamSize: teamSizeNum,
      expectedMemberCount,
      actualMemberCount: members.length,
      members: members,
    })

    if (members.length !== expectedMemberCount) {
      console.log("[API] Member count mismatch:", { expected: expectedMemberCount, actual: members.length })
      return Response.json(
        { success: false, errors: { members: `Expected ${expectedMemberCount} members, got ${members.length}` } },
        { status: 400 },
      )
    }

    // Validate each member's details
    for (let i = 0; i < members.length; i++) {
      const member = members[i]
      console.log(`[API] Validating member ${i + 2}:`, member)

      if (!member || typeof member !== "object") {
        console.log(`[API] Member ${i + 2} is not an object:`, typeof member, member)
        return Response.json(
          { success: false, errors: { members: `Member ${i + 2} data is invalid` } },
          { status: 400 },
        )
      }

      if (!member.name?.trim() || !member.email?.trim()) {
        console.log(`[API] Member ${i + 2} incomplete:`, {
          name: member.name?.trim() || "missing",
          email: member.email?.trim() || "missing",
        })
        return Response.json(
          {
            success: false,
            errors: {
              members: `Member ${i + 2} details incomplete (name: ${!!member.name?.trim()}, email: ${!!member.email?.trim()})`,
            },
          },
          { status: 400 },
        )
      }

      if (!emailRegex.test(member.email)) {
        console.log(`[API] Member ${i + 2} invalid email:`, member.email)
        return Response.json(
          { success: false, errors: { members: `Member ${i + 2} has invalid email format` } },
          { status: 400 },
        )
      }
    }

    // Generate unique team ID
    const teamId = `nutpam-2025-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString()
    const memberNames = members.map((m) => m.name).join(", ")
    const memberEmails = members.map((m) => m.email).join(", ")

    const sheetsData = {
      timestamp,
      teamId,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamSize,
      problemTrack,
      memberNames,
      memberEmails,
      member1Name: members[0]?.name || "",
      member1Email: members[0]?.email || "",
      member2Name: members[1]?.name || "",
      member2Email: members[1]?.email || "",
    }

    console.log("[API] Sending data to Google Sheets:", JSON.stringify(sheetsData, null, 2))
    console.log("[API] Individual fields being sent:")
    Object.entries(sheetsData).forEach(([key, value]) => {
      console.log(`[API] ${key}: ${value}`)
    })

    // Send to Google Sheets
    const googleSheetsUrl =
      "https://script.google.com/macros/s/AKfycby-k9LXC02PK_UBL9FH7Q-GfNWZKLkLXEQEItGx9Vk0KDaKOHSiAlEuuwRbBshnH8hw/exec"

    try {
      const sheetsResponse = await fetch(googleSheetsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetsData),
        redirect: "manual", // Don't follow redirects automatically
      })

      console.log("[API] Google Sheets response status:", sheetsResponse.status)
      console.log("[API] Google Sheets response headers:", Object.fromEntries(sheetsResponse.headers.entries()))

      if (sheetsResponse.status === 302) {
        // Handle redirect manually
        const responseText = await sheetsResponse.text()
        console.log("[API] Got 302 redirect, extracting URL from HTML:", responseText)

        // Extract the redirect URL from the HTML response
        const hrefMatch = responseText.match(/HREF="([^"]+)"/i)
        if (hrefMatch && hrefMatch[1]) {
          let redirectUrl = hrefMatch[1]
          // Decode HTML entities
          redirectUrl = redirectUrl.replace(/&amp;/g, "&")

          console.log("[API] Following redirect to:", redirectUrl)

          // Make a GET request to the redirect URL with data as query parameters
          const urlParams = new URLSearchParams()
          Object.entries(sheetsData).forEach(([key, value]) => {
            urlParams.append(key, String(value))
          })

          const finalUrl = `${redirectUrl}&${urlParams.toString()}`
          console.log("[API] Final URL with parameters:", finalUrl)

          const finalResponse = await fetch(finalUrl, {
            method: "GET",
          })

          console.log("[API] Final response status:", finalResponse.status)
          const finalResponseText = await finalResponse.text()
          console.log("[API] Final response text:", finalResponseText)

          if (finalResponse.ok) {
            console.log("[API] Successfully sent data to Google Sheets via redirect")
          } else {
            console.error("[API] Google Sheets redirect request failed:", finalResponse.status, finalResponseText)
          }
        } else {
          console.error("[API] Could not extract redirect URL from HTML response")
        }
      } else {
        const responseText = await sheetsResponse.text()
        console.log("[API] Google Sheets response text:", responseText)

        if (!sheetsResponse.ok) {
          console.error("[API] Google Sheets error:", sheetsResponse.status, responseText)
        } else {
          console.log("[API] Successfully sent data to Google Sheets")
        }
      }
    } catch (sheetsError) {
      console.error("[API] Google Sheets request failed:", sheetsError)
    }

    // Log registration for debugging
    console.log("[API] Registration successful:", {
      teamId,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamSize,
      members,
      problemTrack,
      timestamp,
    })

    return Response.json({
      success: true,
      message: "Registration completed successfully",
      teamId,
    })
  } catch (error) {
    console.error("[API] Registration error:", error)
    return Response.json({ success: false, errors: { general: "Internal server error" } }, { status: 500 })
  }
}
