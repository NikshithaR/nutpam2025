"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-context"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X, Plus, Sparkles } from "lucide-react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  teamName: string
  teamLeaderName: string // renamed from teamLeader to match API
  teamLeaderEmail: string
  teamLeaderPhone: string // added phone field
  teamSize: number // changed to number and added field
  problemTrack: string // renamed from problemStatement to match API
  members: Array<{ name: string; email: string }> // updated structure to include phone field
}

interface FormErrors {
  teamName?: string
  teamLeaderName?: string // renamed from teamLeader
  teamLeaderEmail?: string
  teamLeaderPhone?: string // added phone validation
  teamSize?: string // added team size validation
  problemTrack?: string // renamed from problemStatement
  members?: string
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeaderName: "", // renamed field
    teamLeaderEmail: "",
    teamLeaderPhone: "", // added phone field
    teamSize: 2, // added team size field
    problemTrack: "", // updated field name
    members: [
      { name: "", email: "" }, // updated structure to include phone field
      { name: "", email: "" }, // updated structure to include phone field
    ],
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const steps = [
    { title: "Team Info", description: "Basic team information" },
    { title: "Problem Statement", description: "Choose your challenge" },
    { title: "Team Members", description: "Add your team members" },
    { title: "Review", description: "Confirm your registration" },
  ]

  const problemStatements = t("registration.problemStatements") as string[]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      // Reset form when modal closes
      setCurrentStep(0)
      setShowSuccess(false)
      setFormData({
        teamName: "",
        teamLeaderName: "", // updated field name
        teamLeaderEmail: "",
        teamLeaderPhone: "", // added phone field
        teamSize: 2, // added team size field
        problemTrack: "", // updated field name
        members: [
          { name: "", email: "" }, // updated structure to include phone field
          { name: "", email: "" }, // updated structure to include phone field
        ],
      })
      setErrors({})
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 0:
        if (!formData.teamName.trim()) newErrors.teamName = t("registration.validation.required")
        if (!formData.teamLeaderName.trim()) newErrors.teamLeaderName = t("registration.validation.required") // updated field name
        if (!formData.teamLeaderEmail.trim()) {
          newErrors.teamLeaderEmail = t("registration.validation.required")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teamLeaderEmail)) {
          newErrors.teamLeaderEmail = t("registration.validation.email")
        }
        if (!formData.teamLeaderPhone.trim()) {
          newErrors.teamLeaderPhone = t("registration.validation.required")
        } else if (!/^[+]?[\d\s\-()]{10,15}$/.test(formData.teamLeaderPhone.replace(/\s/g, ""))) {
          newErrors.teamLeaderPhone = "Invalid phone format"
        }
        break
      case 1:
        if (!formData.problemTrack) newErrors.problemTrack = t("registration.validation.required") // updated field name
        break
      case 2:
        const validMembers = formData.members.filter((member) => member.name.trim())
        if (validMembers.length < 1) {
          newErrors.members = "At least 1 additional member required"
        } else if (validMembers.length > 2) {
          newErrors.members = "Maximum 2 additional members allowed"
        }
        for (let i = 0; i < validMembers.length; i++) {
          const member = validMembers[i]
          if (!member.name.trim()) {
            newErrors.members = `Member ${i + 2} name is required`
            break
          }
          if (!member.email.trim()) {
            newErrors.members = `Member ${i + 2} email is required`
            break
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
            newErrors.members = `Member ${i + 2} needs a valid email`
            break
          }
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const addTeamMember = () => {
    if (formData.members.length < 2) {
      // Updated limit check
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", email: "" }],
        teamSize: prev.teamSize + 1,
      }))
    }
  }

  const removeTeamMember = (index: number) => {
    if (formData.members.length > 1) {
      // Updated minimum check
      setFormData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
        teamSize: prev.teamSize - 1, // update team size
      }))
    }
  }

  const updateTeamMember = (index: number, field: "name" | "email", value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      const validMembers = formData.members.filter((member) => member.name.trim() && member.email.trim())
      const actualTeamSize = validMembers.length + 1 // +1 for team leader

      console.log("[v0] Form validation:", {
        totalMembers: formData.members.length,
        validMembers: validMembers.length,
        actualTeamSize,
        formDataTeamSize: formData.teamSize,
      })

      // Ensure we have exactly the right number of members for the API
      const membersForAPI = []
      for (let i = 0; i < actualTeamSize - 1; i++) {
        if (i < validMembers.length) {
          membersForAPI.push(validMembers[i])
        } else {
          // This shouldn't happen with proper validation
          membersForAPI.push({ name: "", email: "" })
        }
      }

      const submissionData = {
        teamName: formData.teamName,
        teamLeaderName: formData.teamLeaderName,
        teamLeaderEmail: formData.teamLeaderEmail,
        teamLeaderPhone: formData.teamLeaderPhone,
        teamSize: actualTeamSize,
        problemTrack: formData.problemTrack,
        members: membersForAPI,
      }

      console.log("[v0] Submitting registration data:", JSON.stringify(submissionData, null, 2))

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      console.log("[v0] API response status:", response.status)
      console.log("[v0] API response headers:", Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log("[v0] API response text:", responseText)

      if (response.ok) {
        const result = JSON.parse(responseText)
        console.log("[v0] Registration successful:", result)
        setShowSuccess(true)
        createSuccessAnimation()
      } else {
        let errorData
        try {
          errorData = JSON.parse(responseText)
        } catch (e) {
          errorData = { errors: { general: responseText || "Unknown error" } }
        }
        console.error("[v0] Registration failed:", errorData)

        const errorMessage =
          errorData.errors?.general ||
          errorData.errors?.members ||
          errorData.errors?.teamLeaderEmail ||
          errorData.errors?.teamLeaderPhone ||
          errorData.message ||
          "Unknown error"

        alert(`Registration failed: ${errorMessage}. Please check the console for details.`)
      }
    } catch (error) {
      console.error("[v0] Registration network error:", error)
      alert(
        `Registration failed: ${error instanceof Error ? error.message : "Network error"}. Please check your connection and try again.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const createSuccessAnimation = () => {
    // Create confetti-like sparks
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement("div")
      spark.className = "fixed pointer-events-none z-50"
      spark.innerHTML = `<div class="w-2 h-2 bg-primary rounded-full animate-ping"></div>`
      spark.style.left = Math.random() * window.innerWidth + "px"
      spark.style.top = Math.random() * window.innerHeight + "px"

      document.body.appendChild(spark)

      setTimeout(() => {
        if (document.body.contains(spark)) {
          document.body.removeChild(spark)
        }
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-primary">{t("registration.title")}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {steps[currentStep].title} - {steps[currentStep].description}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-primary to-secondary text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                      index < currentStep ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-2">{t("registration.success")}</h3>
              <p className="text-muted-foreground mb-6">{t("registration.successMessage")}</p>
              <Button onClick={onClose} className="bg-gradient-to-r from-primary to-secondary text-background">
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* Step 0: Team Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="teamName" className="text-foreground">
                      {t("registration.teamName")}
                    </Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter your team name"
                    />
                    {errors.teamName && <p className="text-destructive text-sm mt-1">{errors.teamName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderName" className="text-foreground">
                      {" "}
                      {/* updated field name */}
                      {t("registration.teamLeader")}
                    </Label>
                    <Input
                      id="teamLeaderName" // updated field name
                      value={formData.teamLeaderName} // updated field name
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamLeaderName: e.target.value }))} // updated field name
                      className="mt-2"
                      placeholder="Enter team leader name"
                    />
                    {errors.teamLeaderName && <p className="text-destructive text-sm mt-1">{errors.teamLeaderName}</p>}{" "}
                    {/* updated field name */}
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderEmail" className="text-foreground">
                      {t("registration.teamLeaderEmail")}
                    </Label>
                    <Input
                      id="teamLeaderEmail"
                      type="email"
                      value={formData.teamLeaderEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamLeaderEmail: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter email address"
                    />
                    {errors.teamLeaderEmail && (
                      <p className="text-destructive text-sm mt-1">{errors.teamLeaderEmail}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderPhone" className="text-foreground">
                      Team Leader Phone
                    </Label>
                    <Input
                      id="teamLeaderPhone"
                      type="tel"
                      value={formData.teamLeaderPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamLeaderPhone: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter phone number"
                    />
                    {errors.teamLeaderPhone && (
                      <p className="text-destructive text-sm mt-1">{errors.teamLeaderPhone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Problem Statement */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-foreground">{t("registration.problemStatement")}</Label>
                    <Select
                      value={formData.problemTrack} // updated field name
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, problemTrack: value }))} // updated field name
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a problem statement" />
                      </SelectTrigger>
                      <SelectContent>
                        {problemStatements.map((statement, index) => (
                          <SelectItem key={index} value={statement}>
                            {statement}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.problemTrack && ( // updated field name
                      <p className="text-destructive text-sm mt-1">{errors.problemTrack}</p>
                    )}
                  </div>

                  <div className="bg-muted/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Problem Statement Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose the challenge that interests your team the most. Each problem statement will have specific
                      requirements and judging criteria that will be revealed during the event.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Team Members */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{t("registration.teamMembers")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add 1-2 additional team members (total team size: 2-3)
                    </p>
                  </div>

                  <div className="space-y-4">
                    {formData.members.map((member, index) => (
                      <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">Member {index + 2}</h4>
                          {formData.members.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTeamMember(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`member-${index}-name`} className="text-foreground">
                              Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id={`member-${index}-name`}
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                              placeholder={`Member ${index + 2} name`}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`member-${index}-email`} className="text-foreground">
                              Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id={`member-${index}-email`}
                              type="email"
                              value={member.email}
                              onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                              placeholder={`Member ${index + 2} email`}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {formData.members.length < 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTeamMember}
                        className="w-full border-dashed border-primary text-primary hover:bg-primary/10 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("registration.addMember")}
                      </Button>
                    )}

                    {errors.members && <p className="text-destructive text-sm">{errors.members}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-orbitron font-bold text-primary">Review Your Registration</h3>

                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Team Information</h4>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Team Name:</span> {formData.teamName}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Team Leader:</span> {formData.teamLeaderName}{" "}
                        {/* updated field name */}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Email:</span> {formData.teamLeaderEmail}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Phone:</span> {formData.teamLeaderPhone}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Team Size:</span> {formData.teamSize}
                      </p>
                    </div>

                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Problem Statement</h4>
                      <p className="text-sm text-primary">{formData.problemTrack}</p> {/* updated field name */}
                    </div>

                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Team Members</h4>
                      <ul className="text-sm space-y-1">
                        <li>1. {formData.teamLeaderName} (Leader)</li> {/* updated field name */}
                        {formData.members
                          .filter((member) => member.name.trim())
                          .map((member, index) => (
                            <li key={index}>
                              {index + 2}. {member.name} - {member.email}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="text-muted-foreground bg-transparent"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} className="bg-gradient-to-r from-primary to-secondary text-background">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-secondary text-background"
                >
                  {isSubmitting ? "Registering..." : t("registration.submit")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
