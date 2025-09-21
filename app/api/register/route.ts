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

    const memberNames = members
      .filter((m) => m.name?.trim())
      .map((m) => m.name.trim())
      .join(", ")

    const googleSheetsData = {
      timestamp: new Date().toISOString(),
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamSize: teamSizeNum,
      memberNames, // Combined member names as comma-separated string
      problemTrack,
    }

    console.log("[API] Sending data to Google Sheets:", googleSheetsData)

    try {
      const googleSheetsResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbxAjBM11R4bgEHq0VQvAqsEO7XzDZ0xc2TnjGrjbtwUMdipazKX5lDGKmgQjJ7sBUx1/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(googleSheetsData),
          redirect: "follow", // Follow redirects automatically
        },
      )

      console.log("[API] Google Sheets response status:", googleSheetsResponse.status)
      console.log("[API] Google Sheets response headers:", Object.fromEntries(googleSheetsResponse.headers.entries()))

      const googleSheetsResult = await googleSheetsResponse.text()
      console.log("[API] Google Sheets response body:", googleSheetsResult)

      if (googleSheetsResponse.status === 302 || googleSheetsResult.includes("Moved Temporarily")) {
        console.log("[API] Handling 302 redirect from Google Apps Script")

        // Extract redirect URL from HTML response
        const redirectMatch = googleSheetsResult.match(/HREF="([^"]+)"/)
        if (redirectMatch && redirectMatch[1]) {
          const redirectUrl = redirectMatch[1].replace(/&amp;/g, "&") // Decode HTML entities
          console.log("[API] Following redirect to:", redirectUrl)

          const params = new URLSearchParams()
          Object.entries(googleSheetsData).forEach(([key, value]) => {
            params.append(key, String(value))
          })

          try {
            const redirectResponse = await fetch(`${redirectUrl}&${params.toString()}`, {
              method: "GET",
            })

            const redirectResult = await redirectResponse.text()
            console.log("[API] Redirect response:", redirectResponse.status, redirectResult)

            if (!redirectResponse.ok) {
              throw new Error(`Redirect failed: ${redirectResponse.status}`)
            }
          } catch (redirectError) {
            console.error("[API] Redirect request failed:", redirectError)
            throw new Error("All Google Sheets connection attempts failed")
          }
        } else {
          throw new Error("Could not extract redirect URL from 302 response")
        }
      } else if (!googleSheetsResponse.ok) {
        console.error("[API] Google Sheets error:", googleSheetsResponse.status, googleSheetsResult)
        throw new Error(`Google Sheets request failed: ${googleSheetsResponse.status}`)
      }
    } catch (googleSheetsError) {
      console.error("[API] Google Sheets connection error:", googleSheetsError)
      return Response.json(
        { success: false, errors: { general: "Failed to connect to registration system" } },
        { status: 500 },
      )
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
      timestamp: new Date().toISOString(),
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
