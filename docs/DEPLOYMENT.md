# Deployment Guide

This guide covers deploying your DevFolio Starter Portfolio to various platforms.

## Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devfolio-starter-portfolio)

### Manual Deploy

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com/new](https://vercel.com/new)

3. Import your repository

4. Configure environment variables:
   - `DEVFOLIO_API_KEY`: Your API key
   - `DEVFOLIO_API_URL`: `https://devfolio.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL`: Your domain (optional)

5. Click **Deploy**

### Custom Domain

1. Go to your project settings on Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed

## Netlify

### Deploy Steps

1. Push your code to GitHub

2. Go to [app.netlify.com](https://app.netlify.com)

3. Click **New site from Git**

4. Connect your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

6. Add environment variables in **Site settings** → **Environment variables**

7. Deploy

### netlify.toml (Optional)

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Railway

1. Go to [railway.app](https://railway.app)

2. Click **New Project** → **Deploy from GitHub repo**

3. Select your repository

4. Add environment variables

5. Railway will auto-detect Next.js and deploy

## Docker

### Dockerfile

Create `Dockerfile` in root:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build
docker build -t my-portfolio .

# Run
docker run -p 3000:3000 \
  -e DEVFOLIO_API_KEY=your-key \
  -e DEVFOLIO_API_URL=https://devfolio.com/api/v1 \
  my-portfolio
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DEVFOLIO_API_KEY=${DEVFOLIO_API_KEY}
      - DEVFOLIO_API_URL=${DEVFOLIO_API_URL}
    restart: unless-stopped
```

Run:

```bash
docker-compose up -d
```

## Self-Hosted (VPS)

### Prerequisites

- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

### Setup Steps

1. **Clone and build**:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
npm run build
```

2. **Create .env**:

```bash
cp .env.example .env
# Edit with your values
```

3. **Install PM2**:

```bash
npm install -g pm2
```

4. **Create ecosystem.config.js**:

```javascript
module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

5. **Start with PM2**:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

6. **Configure Nginx**:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable HTTPS with Certbot**:

```bash
sudo certbot --nginx -d yourdomain.com
```

## Environment Variables

All platforms need these environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DEVFOLIO_API_KEY` | Yes* | Your DevFolio API key |
| `DEVFOLIO_USER_UUID` | Yes* | Alternative to API key |
| `DEVFOLIO_API_URL` | Yes | API base URL |
| `NEXT_PUBLIC_SITE_URL` | No | Your deployed domain |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |

*Either API key or User UUID is required.

## Caching & Performance

The template uses ISR (Incremental Static Regeneration) with a 60-second revalidation. To adjust:

```tsx
// In page.tsx files
export const revalidate = 60; // Seconds between revalidation
```

## Troubleshooting

### Build fails

- Check Node.js version (needs 18+)
- Verify all environment variables are set
- Run `npm run build` locally first

### 500 errors after deploy

- Check logs for the specific error
- Verify API key is correct
- Ensure API URL is reachable from deployment

### Images not loading

- Check image domains in `next.config.js`
- Verify image URLs are HTTPS
- Check Vercel/Netlify image optimization settings

### Slow initial load

- This is normal for cold starts on serverless
- Consider upgrading to Pro tier for better performance
- Use `generateStaticParams` for static generation

## Monitoring

Recommended tools:

- **Vercel Analytics** - Built-in for Vercel deploys
- **Google Analytics** - General analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay

## Need Help?

- Check platform-specific documentation
- Review build logs for errors
- Ask in DevFolio Discord community
