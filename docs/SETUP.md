# Setup Guide

This guide walks you through setting up the DevFolio Starter Portfolio template.

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** or **pnpm**
- A **DevFolio account** with an API key

## Step 1: Get Your DevFolio API Key

1. Log in to your DevFolio account at [devfolio.com](https://devfolio.com)
2. Go to **Dashboard** → **Settings** → **API Keys**
3. Click **Create New Key**
4. Give it a descriptive name (e.g., "Portfolio Template")
5. Select the required permissions:
   - `read:portfolio` - Required
   - `read:projects` - Required
   - `read:blogs` - Optional (if you want blog section)
   - `read:settings` - Optional (for theme customization)
6. Copy the generated API key

> **Security Note**: Keep your API key secret. Never commit it to version control.

## Step 2: Clone the Template

```bash
# Using Git
git clone https://github.com/yourusername/devfolio-starter-portfolio.git my-portfolio
cd my-portfolio

# Or download and extract the ZIP from your purchase
unzip devfolio-starter-portfolio.zip
cd devfolio-starter-portfolio
```

## Step 3: Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Step 4: Configure Environment

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open `.env` in your editor and add your credentials:

```env
# Required: Your DevFolio API key
DEVFOLIO_API_KEY=your-api-key-here

# API URL (usually don't need to change)
DEVFOLIO_API_URL=https://devfolio.com/api/v1

# Optional: Your deployed site URL (for SEO)
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Alternative: Using User UUID

If you don't have an API key, you can use your user UUID for public data:

```env
DEVFOLIO_USER_UUID=your-uuid-here
DEVFOLIO_API_URL=https://devfolio.com/api/v1
```

> Note: UUID access only provides publicly visible data.

## Step 5: Run Development Server

```bash
npm run dev
```

Your portfolio is now running at [http://localhost:3000](http://localhost:3000)!

## Step 6: Verify Everything Works

Check that:

1. ✅ The homepage loads with your profile data
2. ✅ Projects section shows your projects
3. ✅ Skills section displays your skills
4. ✅ Experience timeline shows your work history
5. ✅ Contact form submits successfully
6. ✅ Dark mode toggle works
7. ✅ Individual project pages load
8. ✅ Blog pages load (if enabled)

## Troubleshooting

### "Unable to load portfolio" error

- Verify your API key is correct
- Check that your DevFolio account is active
- Ensure the API URL is correct

### Blank sections

- Some sections only appear if you have data
- Add projects/skills/experience in your DevFolio dashboard
- Make sure content is set to "published" or "visible"

### Images not loading

- Check that image URLs are accessible
- DevFolio images should load automatically
- External images need to be added to `next.config.js`

### Contact form not working

- Verify `read:portfolio` permission is enabled
- Check browser console for errors
- Ensure you're not rate-limited

## Next Steps

- **Customize**: See [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Deploy**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Update content**: Edit your DevFolio profile

## Getting Help

If you run into issues:

1. Check the [DevFolio Documentation](https://devfolio.com/docs)
2. Search [GitHub Issues](https://github.com/yourusername/devfolio-starter-portfolio/issues)
3. Ask in the [Discord Community](https://discord.gg/devfolio)
