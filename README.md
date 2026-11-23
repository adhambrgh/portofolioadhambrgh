# Adham Baarigh Portfolio

Personal developer portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Design System

This portfolio implements an **Editorial Minimalist** design system inspired by Swiss design principles:

- **Colors**: Warm ivory background (#F7F6F2), Charcoal text (#20211F), Muted blue accent (#7886A8)
- **Typography**: Poppins (single family, all text)
- **Spacing**: Fluid, clamp-based scale with generous whitespace
- **Motion**: Restrained animations — entrance fade-in + hover only, respects `prefers-reduced-motion`

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Poppins (via next/font) |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage (composes all sections)
│   └── globals.css         # Design tokens, base styles
├── components/
│   ├── layout/             # Navigation, Footer, SkipLink
│   ├── sections/           # Hero, SelectedWorks, About, Approach, Contact
│   └── ui/                 # Button, Link, Card, ImagePlaceholder, SectionHeader, TechTag
├── data/
│   ├── projects.ts         # Project data (3 projects)
│   └── skills.ts           # Skill categories & tech tags
├── types/
│   └── index.ts            # TypeScript interfaces
└── lib/
    └── utils.ts            # cn(), formatters, helpers
```

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/adhambrgh/portofolioadhambrgh.git
cd portofolioadhambrgh

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production (includes sitemap generation)
npm run start     # Start production server
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript type checking
```

## Sections

1. **Hero** — Asymmetric split layout with headline, CTAs, and portrait placeholder
2. **Selected Works** — 3 featured projects in editorial grid layout
3. **About** — Two-column layout: personal intro + development interests/tech stack
4. **Approach** — 4-step development philosophy
5. **Contact** — Email, GitHub, Instagram links with descriptions

## Accessibility

- WCAG 2.1 AA compliant color contrast
- Full keyboard navigation support
- Visible focus states
- Semantic HTML structure
- Skip to main content link
- `prefers-reduced-motion` respected
- ARIA labels on interactive elements
- Alt text on all images

## Performance

- Optimized images with `next/image`
- Font optimization with `next/font` (preload, display: swap)
- Code splitting via Next.js App Router
- Minimal JavaScript bundle
- Sitemap & robots.txt auto-generated

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Configure build settings (auto-detected for Next.js)
4. Deploy

### Environment Variables

No environment variables required for basic deployment.

## Customization

### Adding Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: "my-project",
  name: "My Project",
  description: "Project description...",
  category: "web" | "mobile" | "fullstack",
  techStack: ["React", "TypeScript", "..."],
  thumbnail: "/images/projects/my-project.svg",
  thumbnailAlt: "Description for accessibility",
  repoUrl: "https://github.com/username/repo",
  liveUrl: "https://demo.example.com", // optional
  featured: true,
  order: 4,
}
```

### Updating Skills

Edit `src/data/skills.ts` to modify skill categories and tech tags.

### Colors & Typography

Modify CSS custom properties in `src/app/globals.css` under `@theme`.

## License

MIT License — feel free to use as reference for your own portfolio.

---

Built with purpose by [Adham Baarigh](https://github.com/adhambrgh)