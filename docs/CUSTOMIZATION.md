# Customization Guide

This guide explains how to customize the DevFolio Starter Portfolio template.

## Theme Customization

### Using DevFolio Settings (Recommended)

The template automatically applies your theme settings from DevFolio:

1. Log in to DevFolio
2. Go to **Dashboard** → **Settings** → **Portfolio**
3. Customize your colors, fonts, and layout
4. The template will automatically use these settings

### Manual Theme Override

To override the DevFolio theme, edit `src/app/globals.css`:

```css
:root {
  --color-primary: #3B82F6;    /* Your primary color */
  --color-secondary: #1E40AF;  /* Your secondary color */
  --color-accent: #F59E0B;     /* Your accent color */
  --color-background: #FFFFFF; /* Light mode background */
  --color-text: #1F2937;       /* Light mode text */
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;
}

.dark {
  --color-background: #0F172A; /* Dark mode background */
  --color-text: #F1F5F9;       /* Dark mode text */
}
```

### Adding Custom Fonts

1. Import the font in `src/app/layout.tsx`:

```tsx
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});
```

2. Update `tailwind.config.js`:

```js
fontFamily: {
  heading: ['var(--font-poppins)', 'sans-serif'],
}
```

## Section Customization

### Enable/Disable Sections

Sections are controlled by your DevFolio settings. To override manually, edit `src/app/page.tsx`:

```tsx
const sectionComponents: Record<string, React.ReactNode> = {
  hero: <Hero ... />,
  about: <About ... />,
  projects: projects.length > 0 && <Projects ... />,
  // Comment out or remove sections you don't want
  // skills: skills.length > 0 && <Skills ... />,
  // experience: ...,
};
```

### Reorder Sections

Edit the sections order in DevFolio settings, or override in `src/lib/utils.ts`:

```tsx
export function getSectionsOrder(settings?: PortfolioSettings): string[] {
  // Your custom order
  return [
    'hero',
    'projects',  // Projects first
    'about',
    'skills',
    'experience',
    'certificates',
    'blogs',
    'contact',
  ];
}
```

### Customize Individual Sections

Each section component is in `src/components/sections/`. Edit as needed:

- `Hero.tsx` - Main landing section
- `About.tsx` - About me section
- `Projects.tsx` - Project cards grid
- `Skills.tsx` - Skills with categories
- `Experience.tsx` - Work timeline
- `Certificates.tsx` - Certifications
- `Blog.tsx` - Blog posts
- `Testimonials.tsx` - Reviews
- `Contact.tsx` - Contact form

## Component Customization

### UI Components

Base UI components are in `src/components/ui/`:

- `Button.tsx` - Buttons with variants
- `Card.tsx` - Card containers
- `Badge.tsx` - Tags and badges

Example: Adding a new button variant:

```tsx
// In Button.tsx
{
  'bg-gradient-to-r from-primary to-secondary text-white': variant === 'gradient',
}
```

### Layout Components

Layout components are in `src/components/layout/`:

- `Header.tsx` - Navigation header
- `Footer.tsx` - Page footer
- `ThemeProvider.tsx` - Theme context

## Adding New Pages

1. Create a new folder in `src/app/`:

```
src/app/
├── new-page/
│   └── page.tsx
```

2. Add the page content:

```tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```

3. Add navigation link in `Header.tsx`:

```tsx
const navItems = [
  // ... existing items
  { href: '/new-page', label: 'New Page' },
];
```

## Adding Analytics

### Google Analytics

1. Add your GA ID to `.env`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Create `src/components/Analytics.tsx`:

```tsx
'use client';

import Script from 'next/script';

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
```

3. Add to `src/app/layout.tsx`:

```tsx
import { Analytics } from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Custom Animations

The template uses Framer Motion. Example customization:

```tsx
// Slower fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  Content
</motion.div>
```

## External Image Domains

To use images from external domains, update `next.config.js`:

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // Or specify domains:
      // { protocol: 'https', hostname: 'example.com' },
    ],
  },
};
```

## Need More Help?

- Check component source code for available props
- Review Tailwind CSS documentation for styling
- See Framer Motion docs for animations
- Ask in the DevFolio Discord community
