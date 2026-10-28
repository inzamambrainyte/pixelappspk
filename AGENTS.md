# PixelApp — Agent Guidelines & Architecture

## Overview
**PixelApp** is a modern Next.js App Router reconstruction and redesign of [pixelappspk.com](https://pixelappspk.com/), reverse-engineered using **REA (Reverse Engineer Anything)** evidence-backed methodology.

---

## REA Reverse Engineering Findings & Evidence Ledger

### 1. Seen Facts (Directly Verified via Static & Runtime Extraction)
* **Design Philosophy:** Soft Neumorphic UI with subtle embossed highlights, inset badge pills, and circular debossed icon wells.
* **Color Palette:**
  * Background / Base Surface: `#ecedf1` (`rgb(236, 237, 241)`)
  * Primary Accent / Buttons / Badges / Link Hover / Card Icons: `#46bab4` (`rgb(70, 186, 180)`)
  * Button Hover: `#000000` (black)
  * Heading Text: `#1c1c1c` (`rgb(28, 28, 28)`)
  * Body Text: `#4d4d4d` (`rgb(77, 77, 77)`), Muted text: `#666666`
* **Box Shadows & Radii:**
  * Cards: `box-shadow: -10px -10px 20px #fafbff, 10px 10px 20px #a6abbd40; border-radius: 25px; padding: 30px; gap: 24px;`
  * Icon Wells: `width: 100px; height: 100px; border-radius: 50%; box-shadow: inset -5px -5px 10px #fafbff, inset 5px 5px 10px #a6abbd40;`
  * Card Icons: `size: 48px; color: #46bab4;`
  * Badges & Pills: `box-shadow: inset -2px -2px 4px 0px #fafbff, inset 2px 2px 4px 0px rgba(70, 186, 180, 0.25); border-radius: 50px;`
  * Buttons: `box-shadow: -5px -5px 10px 0px #fafbff, 5px 5px 10px 0px rgba(166, 171, 189, 0.5); border-radius: 50px; padding: 16px 32px;`
  * Social Icon Buttons: `width: 70px; height: 70px; border-radius: 50px; box-shadow: -5px -5px 10px 0px #fafbff, 5px 5px 10px 0px rgba(166, 171, 189, 0.25);` Expanding hover circle: LinkedIn `#0077b5`, Twitter `#1da1f2`, Instagram `linear-gradient(45deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)`, Facebook `#1877f2`. Icon color transitions `#1c1c1c` -> `#ffffff`. Spring: `stiffness: 500, damping: 60`.
  * Navbar: `box-shadow: inset -5px -5px 5px 0px #fafbff, inset 5px 5px 5px 0px rgba(166, 171, 189, 0.25); border-radius: 50px; max-width: 1360px;`
* **Typography:**
  * Primary Font: `Poppins` (Google Fonts: 300, 400, 500, 600, 700)
  * Section Titles: 45px font size (Poppins 600)
* **Icons:** Phosphor Icons library
  * Feature 1 (`StarFour`): AI Content Generation
  * Feature 2 (`FileDoc`): Document & PDF Assistance
  * Feature 3 (`Chats`): Memory-Based Conversations
  * Feature 4 (`Image`): AI Image Generation
  * Feature 5 (`Timer`): Chat History & Saved Sessions
  * Feature 6 (`Laptop`): Multi-Platform Access (Coming soon)
  * Benefit 1 (`ChartLineUp`): Boost Productivity
  * Benefit 2 (`Wallet`): Save Hours Every Day
  * Benefit 3 (`UserCircle`): Stay Organized
  * Benefit 4 (`ArrowsOut`): Scale Your Capabilities
  * Benefit 5 (`Lightning`): Work Smarter, Not Harder
  * Benefit 6 (`PuzzlePiece`): Adaptive Solutions
* **External Assets & Endpoints:**
  * Brand Logo: `public/logo.png` (originally hosted on `framerusercontent.com/images/mEUuEsZ9caXoOL2o289eSQZzM7g.png`)
  * App Store: `https://apps.apple.com/us/developer/pixel-apps-smc/id1840403160`
  * Support Email: `info@pixelappspk.com`

---

## Technical Stack & Constraints

* **Framework:** Next.js (App Router)
* **Directory Structure Rule:** **NO `src/` directory**. All App router pages reside strictly in root `/app`.
* **Component Placement Rule:** Sections and content components reside outside `/app` under root `/pages/HomeComponent/`.
* **Central Content Architecture:** All copy, texts, links, questions, and legal terms reside in a **single JSON file** at `/content/data.json`.
* **Root Types Folder Rule:** All data contract interfaces and shared types reside in root `/types/` (`types/home.ts`, `types/index.ts`).
* **Code Cleanliness Rule:** **NO comments** in any code files.
* **Card Mapping Rule:** A single reusable `Card.tsx` component is defined, and cards in Features and Benefits are rendered strictly using `.map()`.
* **Package Manager:** `pnpm`
* **Animation Engine:** `framer-motion` (spring physics `damping: 60, stiffness: 500` for accordions, `stiffness: 400, damping: 25` for hover)
* **Icons:** `@phosphor-icons/react`

---

## Directory Architecture

```
/
├── app/
│   ├── globals.css         # Tailwind directives & custom neumorphism utilities
│   ├── layout.tsx          # Root layout, Google Poppins font, SEO metadata, Navbar & Footer
│   ├── page.tsx            # Main page directly rendering Hero, Features, Benefits, About, FAQ
│   ├── contact/
│   │   └── page.tsx        # Dedicated Contact Us SSG page
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # POST contact route wrapped with error handling middleware
│   ├── privacy/
│   │   └── page.tsx        # Privacy policy route
│   └── terms/
│       └── page.tsx        # Terms & conditions route
├── components/
│   └── ui/
│       ├── Button.tsx      # Reusable neumorphic Button component
│       ├── Card.tsx        # Single reusable neumorphic Card component with icon resolution
│       ├── Input.tsx       # Reusable neumorphic Input component
│       ├── Textarea.tsx    # Reusable neumorphic Textarea component
│       └── index.ts        # UI component export barrel
├── content/
│   └── data.json           # Single consolidated JSON file with all website copy and links
├── controllers/
│   └── contactController.ts# Request sanitization, field validation and response mapping
├── hooks/
│   ├── useContactForm.ts   # Custom hook controlling contact form state, validation, and submission
│   └── index.ts            # Hooks export barrel
├── lib/
│   ├── helpers/
│   │   └── regex.ts        # Reusable regex patterns and string sanitization helpers
│   ├── middleware/
│   │   └── errorHandler.ts # Centralized route handler error handling middleware
│   └── mongodb.ts          # Mongoose database connection pooling singleton
├── models/
│   └── Contact.ts          # Mongoose Contact schema and model for contacts collection
├── pages/
│   ├── 404.tsx             # Pages Router 404 fallback
│   └── HomeComponent/
│       ├── Navbar.tsx      # Fixed inset-shadow neumorphic navbar matching original design
│       ├── Hero.tsx        # Hero section matching original design schema
│       ├── Features.tsx    # 6 feature cards rendered via .map()
│       ├── Benefits.tsx    # 6 benefit cards rendered via .map()
│       ├── About.tsx       # Company story & App Store link
│       ├── FAQ.tsx         # Interactive spring-animated accordion
│       ├── Contact.tsx     # Neumorphic contact form with min/max validation & POST API integration
│       ├── ContactView.tsx # Dedicated Contact Us page view with cards, form, and animations
│       ├── LegalView.tsx   # Reusable Privacy & Terms view matching original site layout & Framer animations
│       └── Footer.tsx      # Attribution, legal links, and social icon buttons
├── public/
│   └── logo.png            # Official Pixel Apps brand logo
├── services/
│   ├── backend/
│   │   ├── contactService.ts # Server-side business logic and database persistence service
│   │   └── index.ts
│   ├── frontend/
│   │   ├── contactService.ts # Client-side API service invoking /api/contact
│   │   └── index.ts
│   └── index.ts
├── types/
│   ├── contact.ts          # Contact form and document data interfaces
│   ├── home.ts             # TypeScript interfaces and data contracts
│   └── index.ts            # Export barrel for types
├── .env.example            # Environment variables template (MONGODB_URI)
├── .gitignore              # Ignored files (node_modules, .next, .env*, rea_analysis)
├── AGENTS.md               # Architecture, REA findings & developer notes (this file)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Development & Maintenance Commands

* **Install dependencies:** `pnpm install`
* **Start local development:** `pnpm dev`
* **Build production bundle:** `pnpm build`
* **Run production server:** `pnpm start`
