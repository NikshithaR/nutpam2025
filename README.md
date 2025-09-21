# NUTPAM 2025 - Hackathon & Workshop Website

A modern, interactive website for the NUTPAM 2025 hackathon event featuring 3D animations, bilingual support (English/Tamil), and a professional dark theme with pastel blue/purple accents.

## Features

- **🌟 Interactive 3D Elements**: Floating blocks with hover effects and animations
- **🌐 Bilingual Support**: Complete English and Tamil language switching
- **🎨 Modern Design**: Dark theme with pastel blue (#7dd3fc) and purple (#b28cff) accents
- **📱 Responsive**: Mobile-first design that works on all devices
- **⚡ Performance**: Optimized animations with reduced motion support
- **🎯 Accessibility**: WCAG compliant with proper focus states and ARIA labels
- **🚀 Advanced Animations**: 
  - True Focus text effects
  - Decrypted text reveals
  - Hyperspeed backgrounds
  - Scroll-triggered animations
  - Card swap interactions
  - Cursor effects (desktop only)

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Fonts**: Inter (body) + Orbitron (headings)
- **Animations**: CSS animations with GSAP-inspired effects
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd nutpam-2025
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles and design tokens
│   └── api/
│       └── register/
│           └── route.ts    # Registration API endpoint
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── language-context.tsx # Language switching context
│   ├── enhanced-hero-section.tsx # Main hero with 3D blocks
│   ├── enhanced-about-section.tsx # About section with animations
│   ├── timeline-section.tsx # Event timeline with stepper
│   ├── registration-modal.tsx # Multi-step registration form
│   ├── footer.tsx          # Footer with social links
│   └── animations/         # Animation components
│       ├── cursor-effects.tsx
│       ├── true-focus-text.tsx
│       ├── decrypted-text.tsx
│       ├── hyperspeed-background.tsx
│       └── floating-block.tsx
└── lib/
    └── i18n/              # Internationalization files
        ├── en.json        # English translations
        └── ta.json        # Tamil translations
\`\`\`

## Event Information

- **Event Name**: NUTPAM 2025 (நுட்பம் 2025)
- **Date**: September 22, 2025
- **Duration**: 9:00 AM - 5:30 PM
- **Type**: One-day workshop + hackathon

### Timeline
- 09:00 - NoCodeML Workshop
- 11:00 - Problem Statements Disclosure
- 12:00 - Hackathon Begins
- 14:00 - Level 1 Review
- 16:00 - Final Review
- 17:30 - Winners Announcement

## Registration System

The website includes a complete registration system with:

- Multi-step form with validation
- Team management (2-3 members)
- Problem statement selection
- Email confirmation
- Offline fallback support

### API Endpoints

- `POST /api/register` - Team registration
- `GET /api/health` - Health check

## Customization

### Colors
Update the design tokens in `app/globals.css`:
\`\`\`css
:root {
  --primary: #7dd3fc;    /* Pastel blue */
  --secondary: #b28cff;  /* Pastel purple */
  --background: #05060a; /* Dark background */
  /* ... other tokens */
}
\`\`\`

### Content
Update translations in `lib/i18n/en.json` and `lib/i18n/ta.json`.

### Problem Statements
Modify the problem statements array in the translation files:
\`\`\`json
{
  "registration": {
    "problemStatements": [
      "NoCodeML Challenge",
      "Healthcare Innovation",
      "Education Technology",
      "Climate Solutions",
      "Open Innovation"
    ]
  }
}
\`\`\`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Performance Optimizations

- **Lazy Loading**: Images and non-critical components
- **Code Splitting**: Automatic with Next.js
- **Reduced Motion**: Respects user preferences
- **Optimized Animations**: Hardware-accelerated transforms
- **Efficient Re-renders**: Optimized React components

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant (4.5:1 ratio)
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Animation controls for sensitive users

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2025 NUTPAM. All rights reserved.

## Support

For technical issues or questions:
- Email: contact@nutpam2025.com
- Create an issue in the repository

---

Built with ❤️ for the future of innovation
