# Netlify Deployment Instructions

## 1. Connect GitHub Repository
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose "GitHub" as your Git provider
5. Select your `mondo-cucina-pm-system` repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

## 2. Environment Variables
In Netlify dashboard > Site settings > Environment variables, add:

```
DATABASE_URL=your-supabase-connection-string
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=https://your-site-name.netlify.app
NODE_ENV=production
```

## 3. Build Settings
The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Redirects for SPA routing

## 4. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Your site will be available at: `https://random-name.netlify.app`
4. You can change the site name in Site settings > General

## 5. Custom Domain (Optional)
1. Go to Site settings > Domain management
2. Add custom domain
3. Follow DNS configuration instructions

## Note: Socket.IO Limitation
Netlify doesn't support WebSocket connections for the custom server.
For full Socket.IO functionality, consider:
- Vercel (supports custom servers)
- Railway
- Render
- Or deploy the Socket.IO server separately