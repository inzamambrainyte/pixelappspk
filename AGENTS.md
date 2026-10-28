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
  * Navbar Sliding Pill: Glassmorphic translucent surface pill `bg-[#ecedf1]/60 backdrop-blur-md border border-white/80 shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_8px_rgba(166,171,189,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)] border-radius: 50px;` Spring: `stiffness: 400, damping: 25`.
* **Typography:**
  * Primary Font: `Poppins` via `next/font/google` (`subsets: ["latin"]`, `display: "swap"`, weights: `300, 400, 500, 600, 700`)
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
  * App Store Product: `https://apps.apple.com/by/app/whiteboard-draw-teach-learn/id6807375389` (configurable via `NEXT_PUBLIC_APP_STORE_URL`)
  * Support Email: `info@pixelappspk.com`

---

## Architectural Rules & Development Standards

### 1. Code Cleanliness & Zero Comments
* **Strictly NO comments** in any code files (`.ts`, `.tsx`). No inline comments, no block comments, no commented-out code.
* Keep TSX components purely declarative, minimal, and focused on layout and presentation.

### 2. Directory Structure & File Placement
* **NO `src/` directory**: All App Router pages and routes reside strictly under `/app`.
* **Root `/components/ui/`**: All reusable UI primitives (`Button.tsx`, `Card.tsx`, `Input.tsx`, `Textarea.tsx`, `index.ts`) reside in `/components/ui/`. Props must be used to customize behavior/styles.
* **Component Placement**: Section components reside outside `/app` in `/pages/HomeComponent/`.
* **Root `/hooks/` Directory**: All complex UI state, scroll-spy, active navigation, and form state logic MUST be extracted into custom hooks in `/hooks/` (e.g. `useContactForm.ts`, `useNavbarNavigation.ts`), re-exported via `/hooks/index.ts`.
* **Separate Backend & Frontend Services**:
  * Frontend API calls reside in `/services/frontend/contactService.ts`. Because frontend and backend are in the same Next.js application, fetch calls directly invoke `/api/contact` without any redundant base URL prefix.
  * Backend business logic and Mongoose persistence reside in `/services/backend/contactService.ts`.
* **Central Data Store**: All website copy, texts, links, questions, FAQs, and legal terms reside in a **single JSON file** at `/content/data.json`.
* **Root `/types/` Folder**: All data contract interfaces, API response types, and shared types reside strictly in `/types/` (`types/home.ts`, `types/contact.ts`, `types/index.ts`). No types should be defined inline in services or components.
* **Pages Router Fallback (`/pages/404.tsx`)**: Because `/pages/HomeComponent/` exists alongside `/app`, Next.js activates hybrid routing. A fallback `pages/404.tsx` is required to prevent Next.js build invariant errors.

### 3. SEO & OpenGraph Rules
* **No Page-Specific SEO in Layout**: Global `app/layout.tsx` only defines `metadataBase` and `icons`.
* **Page-Level Metadata**: Each page (`app/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`) explicitly defines its own `title`, `description`, and complete `openGraph` tags (title, description, url, siteName, images, locale).

### 4. Navigation & Sliding Pill Active Indicator
* The fixed Navbar includes a sliding pill navigation highlight:
  * Uses Framer Motion `layoutId="navbar-sliding-pill"` with spring physics `stiffness: 400, damping: 25`.
  * Encapsulated inside `useNavbarNavigation` hook.
  * Tracks both hover state and active scroll-spy position (`#services`, `#benefits`, `#about-us`, `#faq`).
  * On mouse leave, smoothly glides back to the currently active scroll section.
  * App logo in Navbar and Footer cleanly navigates to `/` without appending `#hero`.

### 5. Fonts & Styling
* Primary font is loaded via native `next/font/google` (`Poppins`) in `app/layout.tsx`. Do NOT use manual `<link>` tags in `<head>`.
* Neumorphic design is implemented via custom Tailwind utility classes (`shadow-neu-card`, `shadow-neu-button`, `shadow-neu-badge`, `shadow-neu-navbar`).

### 6. Git Rules
* Commit locally with clear, descriptive commit messages.
* Do **NOT** push to remote repositories.
* `.gitignore` must ignore `.env*`, `node_modules`, `.next`, `rea_analysis`, `rea`.

---

## Directory Architecture

```
/
├── app/
│   ├── globals.css         # Tailwind directives & custom neumorphism utilities
│   ├── layout.tsx          # Root layout, next/font/google Poppins, base metadata, Navbar & Footer
│   ├── page.tsx            # Main page directly rendering Hero, Features, Benefits, About, FAQ + SEO
│   ├── contact/
│   │   └── page.tsx        # Dedicated Contact Us SSG page + SEO
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # POST contact route wrapped with error handling middleware
│   ├── not-found.tsx       # App Router 404 page
│   ├── privacy/
│   │   └── page.tsx        # Privacy policy route + SEO
│   └── terms/
│       └── page.tsx        # Terms & conditions route + SEO
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
│   ├── useNavbarNavigation.ts # Custom hook for navbar scroll-spy and sliding pill hover tracking
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
│   ├── 404.tsx             # Pages Router 404 fallback (prevents invariant error)
│   └── HomeComponent/
│       ├── Navbar.tsx      # Inset-shadow neumorphic navbar with sliding pill indicator
│       ├── Hero.tsx        # Hero section matching original design schema
│       ├── Features.tsx    # 6 feature cards rendered via .map()
│       ├── Benefits.tsx    # 6 benefit cards rendered via .map()
│       ├── About.tsx       # Company story & dynamic App Store link
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
│   │   ├── contactService.ts # Client-side API service invoking /api/contact directly
│   │   └── index.ts
│   └── index.ts
├── types/
│   ├── contact.ts          # Contact form, API response, and document data interfaces
│   ├── home.ts             # TypeScript interfaces and data contracts
│   └── index.ts            # Export barrel for types
├── .env.example            # Environment variables template (MONGODB_URI, NEXT_PUBLIC_SITE_URL, etc.)
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
