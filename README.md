# DevFolio Starter Portfolio

A clean, minimal, and professional portfolio template powered by DevFolio API. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Starter Portfolio Preview](public/og-image.png)

## Features

- **Dynamic Content** - Fetches all portfolio data from DevFolio API
- **Theme Support** - Automatic dark/light mode with system preference detection
- **Responsive Design** - Looks great on all devices
- **Smooth Animations** - Subtle animations using Framer Motion
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Contact Form** - Working contact form that submits to DevFolio
- **Blog Support** - Full blog with individual post pages
- **Project Showcase** - Detailed project pages with gallery support
- **Custom Theming** - Supports user's portfolio color settings from DevFolio

## Quick Start

### 1. Clone and Install

```bash
# Clone this template
git clone https://github.com/yourusername/devfolio-starter-portfolio.git my-portfolio

# Navigate to directory
cd my-portfolio

# Install dependencies
npm install
```

### 2. Configure Environment

Copy the example environment file and add your DevFolio credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
DEVFOLIO_API_KEY=your-api-key-here
DEVFOLIO_API_URL=https://devfolio.com/api/v1
```

> **Get your API key**: Log in to DevFolio → Dashboard → Settings → API Keys

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devfolio-starter-portfolio)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Add environment variables:
   - `DEVFOLIO_API_KEY`: Your DevFolio API key
   - `DEVFOLIO_API_URL`: `https://devfolio.com/api/v1`
4. Deploy!

### Other Platforms

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for instructions on deploying to:
- Netlify
- Railway
- Docker
- Self-hosted

## Customization

See [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for detailed customization options:

- Changing colors and fonts
- Adding/removing sections
- Modifying components
- Custom animations
- Adding analytics

## Project Structure

```
starter-portfolio/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── blog/       # Blog pages
│   │   ├── projects/   # Project pages
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/
│   │   ├── layout/     # Header, Footer, ThemeProvider
│   │   ├── sections/   # Hero, About, Projects, etc.
│   │   └── ui/         # Reusable UI components
│   └── lib/
│       ├── devfolio.ts # API client
│       ├── types.ts    # TypeScript types
│       └── utils.ts    # Helper functions
└── docs/               # Documentation
```

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## API Endpoints Used

This template uses the following DevFolio API endpoints:

| Endpoint | Description |
|----------|-------------|
| `/api/v1/portfolio` | Complete portfolio data |
| `/api/v1/portfolio/projects/{slug}` | Single project |
| `/api/v1/portfolio/blogs/{slug}` | Single blog post |
| `/api/v1/contact` | Contact form submission |

## Support

- **Documentation**: [DevFolio Docs](https://devfolio.com/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/devfolio-starter-portfolio/issues)
- **Community**: [Discord](https://discord.gg/devfolio)

## License

MIT License - feel free to use this template for your portfolio!

---

Built with ❤️ using [DevFolio](https://devfolio.com)
