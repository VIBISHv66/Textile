# Ravi Textiles — Luxury Handloom Silk Storefront

A complete React + TypeScript + Tailwind CSS web application for **Ravi Textiles**, featuring interactive silk showcases, a 3D boutique clothes rail, bridal ensembles, artisan handloom heritage, cart & wishlist drawers, and detailed saree specifications.

## Folder Structure

```text
ravi-textiles/
├── index.html                  # App entry HTML & Google Fonts
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
├── metadata.json               # Application metadata
├── .env.example                # Environment variable template
├── public/
│   └── assets/
│       └── aistudio/           # Saree photographs and showcase video
└── src/
    ├── main.tsx                # React root entry point
    ├── App.tsx                 # Main layout, state & section orchestration
    ├── index.css               # Tailwind CSS & custom silk/gold animations
    ├── types.ts                # TypeScript interfaces
    ├── data/
    │   └── sareesData.ts       # All sarees, moods, looks, reels & bridal archives
    ├── utils/
    │   └── audioAmbience.ts    # Interactive ambient acoustics controller
    └── components/
        ├── AnimatedSection.tsx
        ├── ArtisanHeritageSection.tsx
        ├── BridalPavilionSection.tsx
        ├── CartDrawer.tsx
        ├── CheckoutModal.tsx
        ├── CurtainIntro.tsx
        ├── FeelTheDrapeSection.tsx
        ├── Footer.tsx
        ├── GrandSareeCollection.tsx
        ├── HeroShowroom.tsx
        ├── MarqueeBanner.tsx
        ├── Navbar.tsx
        ├── PickASilkSection.tsx
        ├── RailSection.tsx
        ├── SareeDetailModal.tsx
        ├── SilkImage.tsx
        ├── SilkInMotionSection.tsx
        ├── SixMoodsSection.tsx
        ├── TryTheLookSection.tsx
        └── WishlistDrawer.tsx
```

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
