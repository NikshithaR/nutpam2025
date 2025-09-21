"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/components/theme-context"
import { CountUp } from "@/components/count-up"

export default function NutpamPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [registrationStep, setRegistrationStep] = useState(0)
  const [language, setLanguage] = useState<"en" | "ta">("en")
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
    teamSize: "",
    members: [] as { name: string; email: string }[],
    problemTrack: "",
  })

  const { theme, toggleTheme } = useTheme()

  const [isAnimating, setIsAnimating] = useState(false)

  const blocks =
    language === "en"
      ? [
          { letter: "N", color: "from-blue-600 via-blue-700 to-blue-800" },
          { letter: "U", color: "from-gray-600 via-gray-700 to-gray-800" },
          { letter: "T", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
          { letter: "P", color: "from-zinc-600 via-zinc-700 to-zinc-800" },
          { letter: "A", color: "from-slate-500 via-slate-600 to-slate-700" },
          { letter: "M", color: "from-blue-500 via-blue-600 to-blue-700" },
        ]
      : [
          { letter: "நு", color: "from-blue-600 via-blue-700 to-blue-800" },
          { letter: "ட்", color: "from-gray-600 via-gray-700 to-gray-800" },
          { letter: "ப", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
          { letter: "ம்", color: "from-zinc-600 via-zinc-700 to-zinc-800" },
        ]

  const toggleLanguage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setLanguage((prev) => (prev === "en" ? "ta" : "en"))
      setTimeout(() => setIsAnimating(false), 1000)
    }, 500)
  }

  const navItems = [
    { id: "overview", label: language === "en" ? "Overview" : "கண்ணோட்டம்" },
    { id: "timeline", label: language === "en" ? "Timeline" : "காலவரிசை" },
    { id: "problem-statement", label: language === "en" ? "Problem Statement" : "பிரச்சனை அறிக்கை" },
    { id: "registration", label: language === "en" ? "Registration" : "பதிவு" },
    { id: "contact", label: language === "en" ? "Contact" : "தொடர்பு" },
  ]

  const problemStatements = [
    {
      id: "sentiment-analysis",
      title: {
        en: "Sentiment Analysis of Tamil Tweets",
        ta: "தமிழ் ட்வீட்களின் உணர்வு பகுப்பாய்வு",
      },
      description: {
        en: "Develop an NLP model to classify Tamil tweets as positive, negative, or neutral. Enable social media monitoring by detecting abusive language, misinformation, or trends.",
        ta: "தமிழ் ட்வீட்களை நேர்மறை, எதிர்மறை அல்லது நடுநிலை என வகைப்படுத்த NLP மாதிரியை உருவாக்கவும். தவறான மொழி, தவறான தகவல் அல்லது போக்குகளைக் கண்டறிந்து சமூக ஊடக கண்காணிப்பை செயல்படுத்தவும்.",
      },
    },
    {
      id: "educational-app",
      title: {
        en: "Tamil Educational App for Children",
        ta: "குழந்தைகளுக்கான தமிழ் கல்வி ஆப்",
      },
      description: {
        en: "Create an interactive app to teach Tamil alphabets, words, and rhymes with audio-visual aids. Include fun exercises like word-building, sentence-making, and fill-in-the-blanks for engagement.",
        ta: "ஆடியோ-விஷுவல் உதவிகளுடன் தமிழ் எழுத்துக்கள், சொற்கள் மற்றும் பாடல்களைக் கற்பிக்க ஊடாடும் ஆப்பை உருவாக்கவும். ஈடுபாட்டிற்காக சொல்-கட்டுமானம், வாக்கியம்-உருவாக்கம் மற்றும் நிரப்புதல் போன்ற வேடிக்கையான பயிற்சிகளை சேர்க்கவும்.",
      },
    },
    {
      id: "agri-chatbot",
      title: {
        en: "Tamil Agri Support Chatbot",
        ta: "தமிழ் விவசாய ஆதரவு சாட்பாட்",
      },
      description: {
        en: "Build a chatbot in Tamil that provides crop disease diagnosis and farming advice. Enable image-based crop analysis, nutrient deficiency detection, and remedies via AI.",
        ta: "பயிர் நோய் கண்டறிதல் மற்றும் விவசாய ஆலோசனை வழங்கும் தமிழில் சாட்பாட்டை உருவாக்கவும். படம் அடிப்படையிலான பயிர் பகுப்பாய்வு, ஊட்டச்சத்து குறைபாடு கண்டறிதல் மற்றும் AI மூலம் தீர்வுகளை செயல்படுத்தவும்.",
      },
    },
    {
      id: "disaster-alert",
      title: {
        en: "Disaster Alert System in Tamil",
        ta: "தமிழில் பேரிடர் எச்சரிக்கை அமைப்பு",
      },
      description: {
        en: "Design a real-time disaster alert system that sends warnings in Tamil via app, SMS, and social media. Integrate government APIs to ensure accurate alerts for floods, earthquakes, and other emergencies.",
        ta: "ஆப், SMS மற்றும் சமூக ஊடகங்கள் வழியாக தமிழில் எச்சரிக்கைகளை அனுப்பும் நிகழ்நேர பேரிடர் எச்சரிக்கை அமைப்பை வடிவமைக்கவும். வெள்ளம், நிலநடுக்கம் மற்றும் பிற அவசரநிலைகளுக்கு துல்லியமான எச்சரிக்கைகளை உறுதிசெய்ய அரசு API களை ஒருங்கிணைக்கவும்.",
      },
    },
    {
      id: "ocr-system",
      title: {
        en: "OCR System for Handwritten Tamil Documents",
        ta: "கையெழுத்து தமிழ் ஆவணங்களுக்கான OCR அமைப்பு",
      },
      description: {
        en: "Develop an OCR tool to convert handwritten Tamil text and signboards into digital text. Enhance accessibility with accurate recognition of messy handwriting and text-to-speech support.",
        ta: "கையெழுத்து தமிழ் உரை மற்றும் பலகைகளை டிஜிட்டல் உரையாக மாற்ற OCR கருவியை உருவாக்கவும். குழப்பமான கையெழுத்தின் துல்லியமான அங்கீகாரம் மற்றும் உரையிலிருந்து பேச்சு ஆதரவுடன் அணுகலை மேம்படுத்தவும்.",
      },
    },
    {
      id: "ancient-scripts",
      title: {
        en: "Recognizing Ancient Tamil Scripts (like Brahmi)",
        ta: "பண்டைய தமிழ் எழுத்துக்களை அங்கீகரித்தல் (பிராமி போன்றவை)",
      },
      description: {
        en: "Create an AI model to recognize Brahmi and other ancient Tamil scripts from inscriptions. Translate and map them into modern Tamil with real-time AR-based visualization.",
        ta: "கல்வெட்டுகளிலிருந்து பிராமி மற்றும் பிற பண்டைய தமிழ் எழுத்துக்களை அங்கீகரிக்க AI மாதிரியை உருவாக்கவும். நிகழ்நேர AR அடிப்படையிலான காட்சிப்படுத்தலுடன் அவற்றை நவீன தமிழில் மொழிபெயர்த்து வரைபடமாக்கவும்.",
      },
    },
    {
      id: "decipher-inscriptions",
      title: {
        en: "Decipher Ancient Tamil Inscriptions",
        ta: "பண்டைய தமிழ் கல்வெட்டுகளை புரிந்துகொள்ளுதல்",
      },
      description: {
        en: "Build an AI/ML system to scan and interpret ancient Tamil inscriptions into readable modern Tamil. Enable historians and researchers with a digital tool for preserving and translating heritage texts.",
        ta: "பண்டைய தமிழ் கல்வெட்டுகளை ஸ்கேன் செய்து படிக்கக்கூடிய நவீன தமிழாக விளக்க AI/ML அமைப்பை உருவாக்கவும். பாரம்பரிய உரைகளைப் பாதுகாத்து மொழிபெயர்ப்பதற்கான டிஜிட்டல் கருவியுடன் வரலாற்றாசிரியர்கள் மற்றும் ஆராய்ச்சியாளர்களை செயல்படுத்தவும்.",
      },
    },
    {
      id: "voice-bot",
      title: {
        en: "Tamil Voice Bot for Government Welfare Services",
        ta: "அரசு நலன்புரி சேவைகளுக்கான தமிழ் குரல் பாட்",
      },
      description: {
        en: "Develop a voice-enabled chatbot in Tamil to guide citizens about government schemes, eligibility, and application processes. Ensure accessibility for rural and less literate populations through natural Tamil speech interaction.",
        ta: "அரசு திட்டங்கள், தகுதி மற்றும் விண்ணப்ப செயல்முறைகள் பற்றி குடிமக்களுக்கு வழிகாட்ட தமிழில் குரல்-செயல்படுத்தப்பட்ட சாட்பாட்டை உருவாக்கவும். இயற்கையான தமிழ் பேச்சு தொடர்பு மூலம் கிராமப்புற மற்றும் குறைந்த கல்வியறிவு மக்களுக்கான அணுகலை உறுதிசெய்யவும்.",
      },
    },
    {
      id: "fake-news-detection",
      title: {
        en: "Detect Fake News in Tamil Language",
        ta: "தமிழ் மொழியில் போலி செய்திகளைக் கண்டறிதல்",
      },
      description: {
        en: "Build an AI system to identify and flag misinformation or fake news in Tamil text, audio, and social media posts. Provide real-time verification by cross-checking with trusted news sources and fact-checking databases.",
        ta: "தமிழ் உரை, ஆடியோ மற்றும் சமூக ஊடக இடுகைகளில் தவறான தகவல் அல்லது போலி செய்திகளை அடையாளம் காணவும் கொடியிடவும் AI அமைப்பை உருவாக்கவும். நம்பகமான செய்தி ஆதாரங்கள் மற்றும் உண்மை சரிபார்ப்பு தரவுத்தளங்களுடன் குறுக்கு சரிபார்ப்பு மூலம் நிகழ்நேர சரிபார்ப்பை வழங்கவும்.",
      },
    },
    {
      id: "movie-trends",
      title: {
        en: "Trends in Tamil Movie Industry",
        ta: "தமிழ் திரைப்படத் துறையின் போக்குகள்",
      },
      description: {
        en: "Analyze shifts in Tamil cinema genres, box-office performance, and audience sentiment over the decades using data analytics. Build a visualization dashboard to uncover cultural, social, and economic influences on Tamil film trends.",
        ta: "தரவு பகுப்பாய்வைப் பயன்படுத்தி தமிழ் சினிமா வகைகள், பாக்ஸ் ஆபிஸ் செயல்திறன் மற்றும் பார்வையாளர்களின் உணர்வுகளில் பல தசாப்தங்களாக ஏற்பட்ட மாற்றங்களை பகுப்பாய்வு செய்யவும். தமிழ் திரைப்பட போக்குகளில் கலாச்சார, சமூக மற்றும் பொருளாதார தாக்கங்களை வெளிப்படுத்த காட்சிப்படுத்தல் டாஷ்போர்டை உருவாக்கவும்.",
      },
    },
    {
      id: "music-recommendation",
      title: {
        en: "Tamil Music Recommendation System",
        ta: "தமிழ் இசை பரிந்துரை அமைப்பு",
      },
      description: {
        en: "Create a personalized Tamil music recommendation engine based on user preferences, mood analysis, and listening history. Incorporate regional variations and classical Tamil music genres for comprehensive coverage.",
        ta: "பயனர் விருப்பங்கள், மனநிலை பகுப்பாய்வு மற்றும் கேட்கும் வரலாற்றின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட தமிழ் இசை பரிந்துரை இயந்திரத்தை உருவாக்கவும். விரிவான கவரேஜிற்காக பிராந்திய மாறுபாடுகள் மற்றும் கிளாசிக்கல் தமிழ் இசை வகைகளை இணைக்கவும்.",
      },
    },
    {
      id: "health-chatbot",
      title: {
        en: "Tamil Healthcare Chatbot",
        ta: "தமிழ் சுகாதார சாட்பாட்",
      },
      description: {
        en: "Develop a healthcare chatbot in Tamil that provides basic medical advice, symptom checking, and connects users to nearby healthcare facilities. Include traditional Tamil medicine knowledge alongside modern healthcare practices.",
        ta: "அடிப்படை மருத்துவ ஆலோசனை, அறிகுறி சரிபார்ப்பு மற்றும் அருகிலுள்ள சுகாதார வசதிகளுக்கு பயனர்களை இணைக்கும் தமிழில் சுகாதார சாட்பாட்டை உருவாக்கவும். நவீன சுகாதார நடைமுறைகளுடன் பாரம்பரிய தமிழ் மருத்துவ அறிவையும் சேர்க்கவும்.",
      },
    },
    {
      id: "language-learning",
      title: {
        en: "Interactive Tamil Language Learning Platform",
        ta: "ஊடாடும் தமிழ் மொழி கற்றல் தளம்",
      },
      description: {
        en: "Build an AI-powered platform to teach Tamil to non-native speakers with speech recognition, pronunciation feedback, and cultural context. Include gamification elements and progress tracking for enhanced learning experience.",
        ta: "பேச்சு அங்கீகாரம், உச்சரிப்பு கருத்து மற்றும் கலாச்சார சூழலுடன் தமிழ் அல்லாத பேச்சாளர்களுக்கு தமிழ் கற்பிக்க AI-இயங்கும் தளத்தை உருவாக்கவும். மேம்பட்ட கற்றல் அனுபவத்திற்காக கேமிஃபிகேஷன் கூறுகள் மற்றும் முன்னேற்ற கண்காணிப்பை சேர்க்கவும்.",
      },
    },
    {
      id: "smart-agriculture",
      title: {
        en: "Smart Agriculture System for Tamil Nadu Farmers",
        ta: "தமிழ்நாடு விவசாயிகளுக்கான ஸ்மார்ட் விவசாய அமைப்பு",
      },
      description: {
        en: "Create an IoT-based smart farming solution with Tamil language support for crop monitoring, weather prediction, and automated irrigation. Integrate local agricultural practices and crop varieties specific to Tamil Nadu.",
        ta: "பயிர் கண்காணிப்பு, வானிலை முன்னறிவிப்பு மற்றும் தானியங்கி நீர்ப்பாசனத்திற்கான தமிழ் மொழி ஆதரவுடன் IoT அடிப்படையிலான ஸ்மார்ட் விவசாய தீர்வை உருவாக்கவும். தமிழ்நாட்டிற்கு குறிப்பிட்ட உள்ளூர் விவசாய நடைமுறைகள் மற்றும் பயிர் வகைகளை ஒருங்கிணைக்கவும்.",
      },
    },
    {
      id: "cultural-preservation",
      title: {
        en: "Digital Tamil Cultural Heritage Preservation",
        ta: "டிஜிட்டல் தமிழ் கலாச்சார பாரம்பரிய பாதுகாப்பு",
      },
      description: {
        en: "Develop a comprehensive digital platform to preserve and showcase Tamil cultural heritage including traditional arts, crafts, festivals, and folklore. Use AR/VR technologies for immersive cultural experiences.",
        ta: "பாரம்பரிய கலைகள், கைவினைப்பொருட்கள், திருவிழாக்கள் மற்றும் நாட்டுப்புறக் கதைகள் உட்பட தமிழ் கலாச்சார பாரம்பரியத்தைப் பாதுகாத்து காட்சிப்படுத்த விரிவான டிஜிட்டல் தளத்தை உருவாக்கவும். அமுக்கமான கலாச்சார அனுபவங்களுக்கு AR/VR தொழில்நுட்பங்களைப் பயன்படுத்தவும்.",
      },
    },
    {
      id: "traffic-management",
      title: {
        en: "Tamil Smart Traffic Management System",
        ta: "தமிழ் ஸ்மார்ட் போக்குவரத்து மேலாண்மை அமைப்பு",
      },
      description: {
        en: "Build an intelligent traffic management system with Tamil language interface for real-time traffic monitoring, route optimization, and public transportation integration. Include voice-based navigation in Tamil.",
        ta: "நிகழ்நேர போக்குவரத்து கண்காணிப்பு, வழித்தட மேம்படுத்தல் மற்றும் பொது போக்குவரத்து ஒருங்கிணைப்புக்கான தமிழ் மொழி இடைமுகத்துடன் அறிவார்ந்த போக்குவரத்து மேலாண்மை அமைப்பை உருவாக்கவும். தமிழில் குரல் அடிப்படையிலான வழிசெலுத்தலை சேர்க்கவும்.",
      },
    },
    {
      id: "e-governance",
      title: {
        en: "Tamil E-Governance Platform",
        ta: "தமிழ் மின்-ஆட்சி தளம்",
      },
      description: {
        en: "Create a comprehensive e-governance platform in Tamil for citizens to access government services, file complaints, and track application status. Ensure accessibility for users with varying digital literacy levels.",
        ta: "அரசு சேவைகளை அணுகவும், புகார்களை தாக்கல் செய்யவும், விண்ணப்ப நிலையைக் கண்காணிக்கவும் குடிமக்களுக்கான தமிழில் விரிவான மின்-ஆட்சி தளத்தை உருவாக்கவும். மாறுபட்ட டிஜிட்டல் கல்வியறிவு நிலைகளைக் கொண்ட பயனர்களுக்கான அணுகலை உறுதிசெய்யவும்.",
      },
    },
    {
      id: "mental-health",
      title: {
        en: "Tamil Mental Health Support System",
        ta: "தமிழ் மனநல ஆதரவு அமைப்பு",
      },
      description: {
        en: "Develop a culturally sensitive mental health support platform in Tamil with AI-powered counseling, mood tracking, and connection to professional therapists. Include traditional Tamil wellness practices and meditation techniques.",
        ta: "AI-இயங்கும் ஆலோசனை, மனநிலை கண்காணிப்பு மற்றும் தொழில்முறை சிகிச்சையாளர்களுடன் இணைப்புடன் தமிழில் கலாச்சார ரீதியாக உணர்திறன் வாய்ந்த மனநல ஆதரவு தளத்தை உருவாக்கவும். பாரம்பரிய தமிழ் நல்வாழ்வு நடைமுறைகள் மற்றும் தியான நுட்பங்களை சேர்க்கவும்.",
      },
    },
    {
      id: "financial-literacy",
      title: {
        en: "Tamil Financial Literacy and Banking Assistant",
        ta: "தமிழ் நிதி கல்வியறிவு மற்றும் வங்கி உதவியாளர்",
      },
      description: {
        en: "Create an AI-powered financial literacy platform in Tamil to educate users about banking, investments, insurance, and government financial schemes. Include personalized financial planning and budgeting tools.",
        ta: "வங்கி, முதலீடுகள், காப்பீடு மற்றும் அரசு நிதித் திட்டங்கள் பற்றி பயனர்களுக்கு கல்வி கற்பிக்க தமிழில் AI-இயங்கும் நிதி கல்வியறிவு தளத்தை உருவாக்கவும். தனிப்பயனாக்கப்பட்ட நிதித் திட்டமிடல் மற்றும் பட்ஜெட் கருவிகளை சேர்க்கவும்.",
      },
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }))
  }

  const addMember = () => {
    if (formData.members.length < Number.parseInt(formData.teamSize) - 1) {
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", email: "" }],
      }))
    }
  }

  const removeMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    if (registrationStep < 4) {
      setRegistrationStep(registrationStep + 1)
    }
  }

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(language === "en" ? "Registration successful!" : "பதிவு வெற்றிகரமாக முடிந்தது!")
        setRegistrationStep(0)
        setActiveSection("overview")
        setFormData({
          teamName: "",
          teamLeaderName: "",
          teamLeaderEmail: "",
          teamLeaderPhone: "",
          teamSize: "",
          members: [],
          problemTrack: "",
        })
      } else {
        alert(language === "en" ? "Registration failed. Please try again." : "பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert(language === "en" ? "An error occurred. Please try again." : "ஒரு பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.")
    }
  }

  const renderRegistrationStep = () => {
    switch (registrationStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Team Information" : "குழு தகவல்"} <span className="text-red-500">*</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">
                  {language === "en" ? "Team Name" : "குழு பெயர்"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => handleInputChange("teamName", e.target.value)}
                  placeholder={language === "en" ? "Enter team name" : "குழு பெயரை உள்ளிடவும்"}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">
                  {language === "en" ? "Team Size" : "குழு அளவு"} <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "en" ? "Select team size" : "குழு அளவை தேர்ந்தெடுக்கவும்"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamLeaderName">
                  {language === "en" ? "Team Leader Name" : "குழு தலைவர் பெயர்"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamLeaderName"
                  value={formData.teamLeaderName}
                  onChange={(e) => handleInputChange("teamLeaderName", e.target.value)}
                  placeholder={language === "en" ? "Enter team leader name" : "குழு தலைவர் பெயரை உள்ளிடவும்"}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamLeaderEmail">
                  {language === "en" ? "Team Leader Email" : "குழு தலைவர் மின்னஞ்சல்"}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamLeaderEmail"
                  type="email"
                  value={formData.teamLeaderEmail}
                  onChange={(e) => handleInputChange("teamLeaderEmail", e.target.value)}
                  placeholder={language === "en" ? "Enter email address" : "மின்னஞ்சல் முகவரியை உள்ளிடவும்"}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="teamLeaderPhone">
                  {language === "en" ? "Team Leader Phone" : "குழு தலைவர் தொலைபேசி"}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamLeaderPhone"
                  type="tel"
                  value={formData.teamLeaderPhone}
                  onChange={(e) => handleInputChange("teamLeaderPhone", e.target.value)}
                  placeholder={language === "en" ? "Enter phone number" : "தொலைபேசி எண்ணை உள்ளிடவும்"}
                  required
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? `Add ${Number.parseInt(formData.teamSize) - 1} team member${Number.parseInt(formData.teamSize) - 1 > 1 ? "s" : ""}`
                  : `${Number.parseInt(formData.teamSize) - 1} குழு உறுப்பினர்${Number.parseInt(formData.teamSize) - 1 > 1 ? "களை" : "ை"} சேர்க்கவும்`}
              </p>
            </div>
            <div className="space-y-4">
              {formData.members.map((member, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-foreground">
                      {language === "en" ? `Member ${index + 2}` : `உறுப்பினர் ${index + 2}`}
                    </h4>
                    <Button variant="outline" size="sm" onClick={() => removeMember(index)}>
                      {language === "en" ? "Remove" : "நீக்கு"}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`member-name-${index}`}>
                        {language === "en" ? "Name" : "பெயர்"} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`member-name-${index}`}
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                        placeholder={language === "en" ? "Enter member name" : "உறுப்பினர் பெயரை உள்ளிடவும்"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`member-email-${index}`}>
                        {language === "en" ? "Email" : "மின்னஞ்சல்"} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`member-email-${index}`}
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                        placeholder={language === "en" ? "Enter email address" : "மின்னஞ்சல் முகவரியை உள்ளிடவும்"}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              {formData.members.length < Number.parseInt(formData.teamSize) - 1 && (
                <Button variant="outline" onClick={addMember} className="w-full bg-transparent">
                  {language === "en" ? "Add Member" : "உறுப்பினரை சேர்க்கவும்"}
                </Button>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Select Problem Statement" : "பிரச்சனை அறிக்கையை தேர்ந்தெடுக்கவும்"}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Choose the problem statement your team wants to work on"
                  : "உங்கள் குழு வேலை செய்ய விரும்பும் பிரச்சனை அறிக்கையை தேர்ந்தெடுக்கவும்"}
              </p>
            </div>

            <div className="space-y-4">
              {problemStatements.map((problem) => (
                <div
                  key={problem.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="problemStatement"
                      value={problem.id}
                      required
                      checked={formData.problemTrack === problem.id}
                      onChange={(e) => handleInputChange("problemTrack", e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">{problem.title[language]}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{problem.description[language]}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Review Your Registration" : "உங்கள் பதிவை மதிப்பாய்வு செய்யுங்கள்"}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Team Information" : "குழு தகவல்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Team Name:" : "குழு பெயர்:"}</strong> {formData.teamName}
                </p>
                <p>
                  <strong>{language === "en" ? "Leader:" : "தலைவர்:"}</strong> {formData.teamLeaderName}
                </p>
                <p>
                  <strong>{language === "en" ? "Email:" : "மின்னஞ்சல்:"}</strong> {formData.teamLeaderEmail}
                </p>
                <p>
                  <strong>{language === "en" ? "Phone:" : "தொலைபேசி:"}</strong> {formData.teamLeaderPhone}
                </p>
                <p>
                  <strong>{language === "en" ? "Team Size:" : "குழு அளவு:"}</strong> {formData.teamSize}
                </p>
              </div>
              {formData.members.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    {language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்"}
                  </h4>
                  {formData.members.map((member, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        <strong>{language === "en" ? `Member ${index + 2}:` : `உறுப்பினர் ${index + 2}:`}</strong>{" "}
                        {member.name} ({member.email})
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Preferences" : "விருப்பங்கள்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Track:" : "பாதை:"}</strong> {formData.problemTrack}
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === "en" ? "Welcome to NUTPAM 2025" : "NUTPAM 2025 க்கு வரவேற்கிறோம்"}
              </h2>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Tamil Hackathon - Innovating for Tamil Heritage"
                  : "தமிழ் ஹேக்கத்தான் - தமிழ் பாரம்பரியத்திற்கான புதுமை"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={19} duration={2} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Problem Statements" : "பிரச்சனை அறிக்கைகள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={48} duration={2} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Hours to Code" : "குறியீட்டு மணிநேரங்கள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={100} duration={2} />+
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Teams Expected" : "எதிர்பார்க்கப்படும் குழுக்கள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={50000} duration={2} />+
                </div>
                <p className="text-sm text-muted-foreground">{language === "en" ? "Prize Pool" : "பரிசு தொகை"}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => setRegistrationStep(1)} // Changed from setCurrentStep(1)
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                {language === "en" ? "Start Registration" : "பதிவைத் தொடங்கவும்"}
              </Button>
            </div>
          </div>
        )

      case "problem-statement":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {language === "en" ? "Problem Statements" : "பிரச்சனை அறிக்கைகள்"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "Choose from 19 exciting challenges focused on Tamil language and culture"
                  : "தமிழ் மொழி மற்றும் கலாச்சாரத்தை மையமாகக் கொண்ட 19 உற்சாகமான சவால்களில் இருந்து தேர்ந்தெடுக்கவும்"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problemStatements.map((problem, index) => (
                <div
                  key={problem.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {problem.title[language]}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {problem.description[language]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center text-xs text-primary">
                      <span>{language === "en" ? "Click to explore" : "ஆராய கிளிக் செய்யவும்"}</span>
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "timeline":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {language === "en" ? "Event Timeline" : "நிகழ்வு காலவரிசை"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "1 Day Workshop + Hackathon • September 22nd, 2025"
                  : "1 நாள் பட்டறை + ஹேக்கத்தான் • செப்டம்பர் 22, 2025"}
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  time: "09:00 AM",
                  title: language === "en" ? "Registration & Welcome" : "பதிவு மற்றும் வரவேற்பு",
                  description:
                    language === "en"
                      ? "Team check-in, breakfast, and opening ceremony"
                      : "குழு சரிபார்ப்பு, காலை உணவு மற்றும் தொடக்க விழா",
                },
                {
                  time: "10:00 AM",
                  title: language === "en" ? "NoCodeML Workshop" : "NoCodeML பட்டறை",
                  description:
                    language === "en"
                      ? "Hands-on workshop on No-Code Machine Learning tools"
                      : "நோ-கோட் மெஷின் லர்னிங் கருவிகளில் நடைமுறை பட்டறை",
                },
                {
                  time: "12:00 PM",
                  title: language === "en" ? "Problem Statement Release" : "பிரச்சனை அறிக்கை வெளியீடு",
                  description:
                    language === "en"
                      ? "Official announcement of hackathon challenges"
                      : "ஹேக்கத்தான் சவால்களின் அதிகாரப்பூர்வ அறிவிப்பு",
                },
                {
                  time: "01:00 PM",
                  title: language === "en" ? "Lunch Break" : "மதிய உணவு இடைவேளை",
                  description: language === "en" ? "Networking lunch" : "நெட்வொர்க்கிங் மதிய உணவு",
                },
                {
                  time: "02:00 PM",
                  title: language === "en" ? "Hackathon Begins" : "ஹேக்கத்தான் தொடக்கம்",
                  description:
                    language === "en" ? "Teams start working on solutions" : "குழுக்கள் தீர்வுகளில் வேலை தொடங்குகின்றன",
                },
                {
                  time: "06:00 PM",
                  title: language === "en" ? "Dinner Break" : "இரவு உணவு இடைவேளை",
                  description: language === "en" ? "Dinner and team discussions" : "இரவு உணவு மற்றும் குழு விவாதங்கள்",
                },
                {
                  time: "07:00 PM",
                  title: language === "en" ? "Final Sprint" : "இறுதி முயற்சி",
                  description:
                    language === "en"
                      ? "Last hours of development and testing"
                      : "வளர்ச்சி மற்றும் சோதனையின் கடைசி மணிநேரங்கள்",
                },
                {
                  time: "11:00 PM",
                  title: language === "en" ? "Submission Deadline" : "சமர்ப்பிப்பு காலக்கெடு",
                  description: language === "en" ? "Final project submissions" : "இறுதி திட்ட சமர்ப்பிப்புகள்",
                },
                {
                  time: "11:30 PM",
                  title: language === "en" ? "Presentations & Judging" : "விளக்கக்காட்சிகள் மற்றும் நடுவர்",
                  description:
                    language === "en" ? "Team presentations and evaluation" : "குழு விளக்கக்காட்சிகள் மற்றும் மதிப்பீடு",
                },
                {
                  time: "01:00 AM",
                  title: language === "en" ? "Awards & Closing" : "விருதுகள் மற்றும் நிறைவு",
                  description:
                    language === "en" ? "Prize distribution and closing ceremony" : "பரிசு விநியோகம் மற்றும் நிறைவு விழா",
                },
              ].map((event, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-mono min-w-[80px] text-center">
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "registration":
        if (registrationStep === 0) {
          return (
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {language === "en" ? "Register for NUTPAM 2025" : "NUTPAM 2025 க்கு பதிவு செய்யுங்கள்"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === "en"
                  ? "Join us for an exciting Tamil hackathon experience"
                  : "உற்சாகமான தமிழ் ஹேக்கத்தான் அனுபவத்திற்கு எங்களுடன் சேருங்கள்"}
              </p>
              <Button onClick={() => setRegistrationStep(1)} size="lg" className="bg-primary hover:bg-primary/90">
                {language === "en" ? "Start Registration" : "பதிவைத் தொடங்கவும்"}
              </Button>
            </div>
          )
        }

        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= registrationStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step < registrationStep ? "✓" : step}
                    </div>
                    <div className="ml-3 text-sm">
                      <div
                        className={`font-medium ${step <= registrationStep ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {step === 1 && (language === "en" ? "Team Info" : "குழு தகவல்")}
                        {step === 2 && (language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்")}
                        {step === 3 && (language === "en" ? "Track Selection" : "பாதை தேர்வு")}
                        {step === 4 && (language === "en" ? "Review" : "மதிப்பாய்வு")}
                      </div>
                    </div>
                    {step < 4 && <div className="flex-1 h-px bg-border mx-4" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              {renderRegistrationStep()}

              <div className="flex justify-between mt-8">
                {registrationStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    {language === "en" ? "Previous" : "முந்தைய"}
                  </Button>
                )}
                {registrationStep < 4 ? (
                  <Button onClick={nextStep} className="ml-auto">
                    {language === "en" ? "Next" : "அடுத்து"}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="ml-auto bg-green-600 hover:bg-green-700">
                    {language === "en" ? "Submit Registration" : "பதிவை சமர்ப்பிக்கவும்"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === "en" ? "Contact Us" : "எங்களை தொடர்பு கொள்ளுங்கள்"}
            </h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === "en" ? "Event Organizers" : "நிகழ்வு ஏற்பாட்டாளர்கள்"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "Paavendhar Bharathidaasan Tamil Literary Association"
                    : "பாவேந்தர் பாரதிதாசன் தமிழ் இலக்கிய சங்கம்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === "en" ? "Email" : "மின்னஞ்சல்"}
                </h3>
                <p className="text-muted-foreground">nutpam2025@example.com</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === "en" ? "Phone" : "தொலைபேசி"}
                </h3>
                <p className="text-muted-foreground">+91 12345 67890</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <header className="relative z-10 bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/paavendhar-logo.jpeg"
              alt="Paavendhar Bharathidaasan Tamil Literary Association Logo"
              className="w-32 h-24 object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="hidden md:block text-sm font-mono">
            <span className="text-primary">&lt;date&gt;</span>
            <span className="text-foreground mx-2">September 22, 2025</span>
            <span className="text-primary">&lt;/date&gt;</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleTheme} className="text-xs bg-transparent">
              {theme === "light" ? "🌙" : "☀️"}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="text-xs bg-transparent">
              {language === "en" ? "தமிழ்" : "English"}
            </Button>
          </div>
        </div>
      </header>

      {activeSection === "overview" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
              <div className="space-y-8">
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="relative">
                    <img
                      src="/images/brain-circuit.jpeg"
                      alt="AI Brain Circuit Logo"
                      className="w-32 h-32 object-contain rounded-full shadow-lg animate-pulse"
                      style={{
                        filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                        animation: "float 3s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none">
                    {language === "en" ? "NUTPAM" : "நுட்பம்"}
                  </h1>
                  <h2 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none">
                    {language === "en" ? "2025" : "2025"}
                  </h2>
                  <p className="text-lg text-muted-foreground mt-4 font-medium">September 22, 2025</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setActiveSection("registration")}
                    className="bg-foreground hover:bg-foreground/90 text-background px-6 py-3 text-base font-medium"
                  >
                    {language === "en" ? "Register Now" : "பதிவு செய்யுங்கள்"}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div
                  className={`space-y-3 max-w-md mx-auto lg:mx-0 lg:ml-auto transition-all duration-1000 ${isAnimating ? "animate-bounce" : ""}`}
                >
                  {/* First row - NUTPAM or நுட்பம் */}
                  <div className={`flex justify-center gap-3 ${isAnimating ? "animate-spin" : ""}`}>
                    {blocks.map((block, index) => (
                      <div
                        key={`${block.letter}-${index}`}
                        onClick={toggleLanguage}
                        className={`relative cursor-pointer group transition-all duration-500 ${
                          isAnimating
                            ? `animate-pulse transform rotate-${index * 45} translate-x-${index * 10} translate-y-${index * 5}`
                            : ""
                        }`}
                        style={{
                          animationDelay: isAnimating ? `${index * 100}ms` : "0ms",
                          transform: isAnimating
                            ? `rotate(${index * 45}deg) translateX(${index * 20}px) translateY(${index * 15}px) scale(${1 + index * 0.1})`
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "88px",
                            height: "88px",
                            fontSize: "2.8rem",
                            fontFamily: "'Inter', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#23242c",
                            background: "#f6f8fc",
                            margin: "0 5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "22px 28px 21px 19px / 22px 17px 28px 26px",
                            border: "2.8px solid #222",
                            boxShadow: `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0, 0, 0, 0.07)
                            `,
                            position: "relative",
                            transition: "all 0.3s ease",
                            backgroundClip: "padding-box",
                            cursor: "pointer",
                            transform: "skew(-7deg, -2deg) rotateZ(-2deg)",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 2px 0 0 #222,
                              0 1px 6px rgba(0,0,0,0.12)
                            `
                            e.currentTarget.style.transform = "scale(0.97) skew(-5deg, -2deg) rotateZ(-1deg)"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0,0,0,0.07)
                            `
                            e.currentTarget.style.transform = "skew(-7deg, -2deg) rotateZ(-2deg)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0,0,0,0.07)
                            `
                            e.currentTarget.style.transform = "skew(-7deg, -2deg) rotateZ(-2deg)"
                          }}
                        >
                          <span className="relative z-10 select-none font-bold tracking-wide">{block.letter}</span>

                          {/* Side element for 3D effect */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: "-15px",
                              height: "15px",
                              background: "rgba(220, 220, 220, 0.7)",
                              borderTop: "1.8px solid #1b1b1b",
                              zIndex: 1,
                              borderRadius: "0 0 21px 17px",
                              boxShadow: "0 7px 18px rgba(0,0,0,0.08)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Second row - decorative keys */}
                  <div className={`flex justify-center gap-3 opacity-60 ${isAnimating ? "animate-pulse" : ""}`}>
                    {[
                      { letter: "2", color: "from-slate-600 via-slate-700 to-slate-800" },
                      { letter: "0", color: "from-blue-600 via-blue-700 to-blue-800" },
                      { letter: "2", color: "from-gray-600 via-gray-700 to-gray-800" },
                      { letter: "5", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
                    ].map((block, index) => (
                      <div
                        key={`year-${index}`}
                        className={`relative transition-all duration-700 ${
                          isAnimating ? `animate-bounce transform -rotate-${index * 30} translate-x-${index * 8}` : ""
                        }`}
                        style={{
                          animationDelay: isAnimating ? `${(index + 4) * 150}ms` : "0ms",
                          transform: isAnimating
                            ? `rotate(-${index * 30}deg) translateX(${index * 15}px) scale(${1.2 - index * 0.1})`
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "66px",
                            height: "66px",
                            fontSize: "2.2rem",
                            fontFamily: "'Inter', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#23242c",
                            background: "#f6f8fc",
                            margin: "0 3px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "18px 22px 17px 15px / 18px 14px 22px 20px",
                            border: "2.2px solid #222",
                            boxShadow: `
                              5px 7px 0 0 #222,
                              0 2px 0 0 #fff inset,
                              0 5px 16px rgba(0, 0, 0, 0.06)
                            `,
                            position: "relative",
                            transition: "box-shadow 0.2s",
                            backgroundClip: "padding-box",
                            transform: "skew(-6deg, -1.5deg) rotateZ(-1.5deg)",
                          }}
                        >
                          <span className="relative z-10 select-none font-bold">{block.letter}</span>

                          {/* Side element for smaller keys */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: "-12px",
                              height: "12px",
                              background: "rgba(220, 220, 220, 0.6)",
                              borderTop: "1.5px solid #1b1b1b",
                              zIndex: 1,
                              borderRadius: "0 0 17px 14px",
                              boxShadow: "0 5px 14px rgba(0,0,0,0.06)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection !== "overview" && (
        <main className="relative z-10 pt-16 pb-32 px-6">
          <div className="container mx-auto">{renderContent()}</div>
        </main>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  if (item.id === "registration") {
                    setRegistrationStep(1)
                  }
                }}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
