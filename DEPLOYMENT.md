# 🚀 Deployment Guide - Silver Spoon .Co

This guide provides step-by-step instructions for deploying the Silver Spoon Restaurant application to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Built the project successfully (`npm run build`)
- [ ] Tested the production build locally (`npm run preview`)
- [ ] Run linting and tests (`npm run lint`, `npm test`)
- [ ] Verified no console errors in production mode
- [ ] Committed all changes to Git
- [ ] Updated environment variables (if any)

---

## 🔷 Vercel Deployment (Recommended)

### Why Vercel?
- ✅ Zero-config deployment for Vite projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Free tier available

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Configure build settings (auto-detected):**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Custom Domain Setup on Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

---

## 🟢 Netlify Deployment

### Why Netlify?
- ✅ Drag-and-drop deployment option
- ✅ Built-in form handling
- ✅ Serverless functions
- ✅ Split testing (A/B testing)
- ✅ Free tier available

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Deploy to production
netlify deploy --prod
```

### Method 2: Drag and Drop

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your `dist` folder
   - Your site is live in seconds!

### Method 3: GitHub Integration

1. **Push code to GitHub**
2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

3. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (leave empty)

4. **Deploy:**
   - Click "Deploy site"
   - Site goes live at `https://random-name.netlify.app`

### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 🔵 GitHub Pages Deployment

### Setup

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/silver-spoon-restaurant/',
     // ... rest of config
   })
   ```

3. **Add deploy scripts to `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/(root)`
   - Save

Your site will be live at: `https://username.github.io/silver-spoon-restaurant/`

---

## 🔴 Firebase Hosting

### Setup

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   
   - Choose "Use an existing project" or create new
   - Public directory: `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds with GitHub: `No` (optional)

4. **Build and Deploy:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Firebase Configuration

`firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🟠 AWS S3 + CloudFront

### Setup

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create bucket with unique name
   - Enable static website hosting
   - Set index document: `index.html`

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront:**
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Enable HTTPS
   - Custom error response: 404 → /index.html (200)

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build Docker image
docker build -t silver-spoon-restaurant .

# Run container
docker run -d -p 8080:80 silver-spoon-restaurant
```

---

## 🔧 Environment Variables

If your app uses environment variables:

### Vite Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.silverspoon.co
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

**Important:** Prefix all variables with `VITE_` to expose them to your app.

### Platform-Specific Setup

**Vercel:**
- Project Settings → Environment Variables
- Add variables for Production

**Netlify:**
- Site Settings → Build & Deploy → Environment
- Add variables

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads correctly at production URL
- [ ] All images and assets load
- [ ] Dark mode toggle works
- [ ] Cart persistence functions
- [ ] Forms submit without errors
- [ ] No console errors
- [ ] Responsive on mobile devices
- [ ] SSL certificate is active (HTTPS)
- [ ] Meta tags are correct (SEO)
- [ ] Analytics tracking works (if configured)

---

## 🔍 Troubleshooting

### Issue: 404 on page refresh

**Solution:** Configure server to redirect all requests to `index.html`

- **Vercel:** Auto-configured
- **Netlify:** Add `_redirects` file or use `netlify.toml`
- **Nginx:** Add `try_files $uri /index.html` to config

### Issue: Assets not loading

**Solution:** Check `base` path in `vite.config.ts`

```typescript
export default defineConfig({
  base: '/', // For root domain
  // OR
  base: '/silver-spoon-restaurant/', // For subdirectory
})
```

### Issue: Build fails

**Solution:** Check Node.js version

```bash
node --version  # Should be 18.x or higher
npm ci  # Clean install dependencies
npm run build  # Try build again
```

---

## 📈 Performance Optimization

### Before Deployment

1. **Optimize images:**
   ```bash
   # Use image optimization tools
   npm install -D imagemin imagemin-webp
   ```

2. **Analyze bundle size:**
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

3. **Enable compression:**
   - Vercel/Netlify: Enabled by default
   - Nginx: Add gzip configuration

---

## 🎉 Success!

Your Silver Spoon Restaurant app is now live! 🚀

**Next Steps:**
1. Set up custom domain
2. Configure analytics (Google Analytics, Plausible)
3. Set up monitoring (Sentry, LogRocket)
4. Enable performance monitoring
5. Set up CI/CD pipeline

---

Need help? Check the [main README](./README.md) or open an issue on GitHub.
