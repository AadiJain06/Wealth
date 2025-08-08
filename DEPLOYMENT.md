# 🚀 Deployment Guide

This guide will help you deploy your Portfolio Analytics Dashboard to various platforms.

## 📋 Prerequisites

1. **GitHub Account** - For repository hosting
2. **Node.js** - Version 18.0.0 or higher
3. **Git** - For version control

## 🎯 Deployment Options

### Option 1: GitHub Pages (Frontend) + Railway/Render (Backend) - Recommended

#### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Click "New repository"
   - Name it `portfolio-analytics`
   - Make it public
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/portfolio-analytics.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy Frontend to GitHub Pages

1. **Update homepage URL** in `frontend/package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio-analytics"
   }
   ```

2. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

#### Step 3: Deploy Backend to Railway

1. **Create Railway Account**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set root directory to `backend`
   - Deploy

3. **Configure Environment Variables**:
   - Go to your project settings
   - Add environment variables:
     ```
     PORT=3001
     NODE_ENV=production
     ```

4. **Get Backend URL**:
   - Copy the deployment URL (e.g., `https://your-app.railway.app`)

#### Step 4: Update Frontend API URL

1. **Update API configuration** in `frontend/src/services/api.js`:
   ```javascript
   baseURL: process.env.REACT_APP_API_URL || 'https://your-app.railway.app/api'
   ```

2. **Add environment variable** in `frontend/.env`:
   ```
   REACT_APP_API_URL=https://your-app.railway.app/api
   ```

3. **Redeploy frontend**:
   ```bash
   cd frontend
   npm run deploy
   ```

### Option 2: Vercel (Full Stack) - Easiest

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project: No
- Project name: portfolio-analytics
- Directory: ./ (current directory)

#### Step 3: Configure Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   NODE_ENV=production
   ```

### Option 3: Heroku

#### Step 1: Install Heroku CLI
```bash
# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Mac
brew tap heroku/brew && brew install heroku
```

#### Step 2: Login and Deploy
```bash
heroku login
heroku create your-portfolio-app
git push heroku main
```

#### Step 3: Configure Environment Variables
```bash
heroku config:set NODE_ENV=production
```

## 🔧 Environment Configuration

### Development
Create `.env` files in both `backend/` and `frontend/` directories:

**backend/.env**:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**frontend/.env**:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

### Production
Update the API URL in your deployment platform's environment variables:

**Frontend Environment Variables**:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_ENVIRONMENT=production
```

**Backend Environment Variables**:
```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## 🧪 Testing Deployment

### Health Check
Test your backend API:
```bash
curl https://your-backend-url.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Portfolio Analytics API"
}
```

### Frontend Test
1. Open your deployed frontend URL
2. Check if the dashboard loads
3. Verify that API calls work (check browser console)

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Update CORS_ORIGIN in backend environment variables
   - Ensure frontend URL is correctly configured

2. **API Not Found**:
   - Check if backend is deployed and running
   - Verify API URL in frontend configuration

3. **Build Failures**:
   - Check Node.js version (should be >= 18.0.0)
   - Clear node_modules and reinstall dependencies

4. **Environment Variables**:
   - Ensure all required environment variables are set
   - Check variable names (case-sensitive)

### Debug Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Test backend locally
cd backend
npm start

# Test frontend locally
cd frontend
npm start

# Check build output
cd frontend
npm run build
```

## 📊 Monitoring

### Backend Monitoring
- Railway/Render: Built-in monitoring dashboards
- Vercel: Analytics and performance monitoring
- Heroku: Application metrics and logs

### Frontend Monitoring
- GitHub Pages: Basic analytics
- Vercel: Advanced analytics and performance
- Consider adding Google Analytics for user tracking

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm run install-all
    - run: cd frontend && npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

## 🎉 Success!

Your Portfolio Analytics Dashboard is now deployed! 

**Next Steps**:
1. Share your deployed URL
2. Monitor performance and errors
3. Consider adding custom domain
4. Set up monitoring and analytics

**Useful URLs**:
- Frontend: `https://yourusername.github.io/portfolio-analytics`
- Backend API: `https://your-backend-url.com/api`
- Health Check: `https://your-backend-url.com/api/health`
