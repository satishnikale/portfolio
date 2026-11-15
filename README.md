# Satish Nikale — Portfolio

Personal site for Satish Nikale, Full-Stack Software Engineer and Founding Engineer at EzyEV Technologies.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**. Every route is statically prerendered; JavaScript is only shipped for the header, theme toggle, scroll reveals and the contact form.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
npm run dev                   # http://localhost:3000
```

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Production build (static prerender)   |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint (Next.js + TypeScript rules)   |
| `npm run typecheck` | TypeScript, no emit                   |

## Editing content

All copy lives in `src/content/`. Components never hardcode personal details.

| File               | Contents                                                        |
| ------------------ | --------------------------------------------------------------- |
| `site.ts`          | Name, title, email, location, socials, nav, resume path, availability |
| `about.ts`         | About paragraphs and focus areas                                |
| `experience.ts`    | Companies, roles, dates, highlights, stack                      |
| `projects.ts`      | Projects, links, highlights                                     |
| `skills.ts`        | Skill categories                                                |
| `background.ts`    | Education and achievements                                      |

**Projects.** A project gets a case-study page at `/projects/<slug>` automatically once it has at least one entry in `highlights`. Add `links.github` / `links.live` only once the URLs are confirmed; the buttons appear when the fields are set.

**Resume.** Put your PDF at `public/Satish_Nikale_Resume.pdf` (or change `resumePath` in `site.ts`). Resume buttons in the header, hero and mobile menu appear only when that file exists at build time, so the site never links to a missing file.

## Environment variables

| Variable                            | Required | Purpose |
| ----------------------------------- | -------- | ------- |
| `NEXT_PUBLIC_SITE_URL`              | Yes, in production | Absolute URL used for canonical links, Open Graph, `sitemap.xml` and `robots.txt`. Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | No       | Endpoint that accepts a JSON `POST` of `{ name, email, subject, message }`. |

### Contact form

Without `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, the form validates input and opens the visitor's email client with the message pre-filled (`mailto:`). Nothing is sent silently and nothing is faked.

To deliver messages directly, point the variable at any service that accepts JSON — for example [Formspree](https://formspree.io): create a form, then set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/<form-id>`. The form shows loading, success and error states, and on error tells the visitor to email directly.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, theme boot script, header/footer
│   ├── page.tsx                # home page + Person JSON-LD
│   ├── projects/[slug]/page.tsx# static case-study pages
│   ├── opengraph-image.tsx     # generated social preview image
│   ├── sitemap.ts · robots.ts  # SEO files
│   ├── not-found.tsx
│   └── globals.css             # design tokens (light/dark), motion, utilities
├── components/
│   ├── layout/                 # SiteHeader*, ThemeToggle*, RevealObserver*, SiteFooter
│   ├── sections/               # Hero, About, Experience, Projects, Skills, Background, Contact
│   ├── projects/               # ProjectCard, ProjectVisual (SVG art per project)
│   ├── contact/                # ContactForm*, CopyEmailButton*
│   └── ui/                     # Container, Section, Button, Tag, SocialIcon, AvailabilityBadge
├── content/                    # all site copy and data (typed)
└── lib/                        # cn/formatMonth, resume lookup (server), JSON-LD
```

`*` = Client Component. Everything else renders on the server.

## Design system

Tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind as `canvas`, `surface`, `surface-muted`, `ink`, `ink-muted`, `ink-subtle`, `line`, `line-strong`, `accent`, `accent-soft` and `positive`. The site is dark by default; a visitor who picks light keeps it on later visits. Dark mode swaps the variables under `.dark`; components never branch on theme.

Type: Geist (UI), Geist Mono (labels and metadata), Instrument Serif italic (sparing emphasis). Font files are bundled in `src/app/fonts/` (SIL Open Font License) and loaded with `next/font/local`, so builds never need to reach Google Fonts.

Motion is CSS-only and is disabled under `prefers-reduced-motion`. Content is fully visible without JavaScript.

## Deployment

Any Node host works. On Vercel, import the repository, set `NEXT_PUBLIC_SITE_URL` (and optionally the form endpoint), and deploy.
