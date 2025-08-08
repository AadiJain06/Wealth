#!/bin/bash

echo "🚀 Deploying Portfolio Analytics to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm run install-all

# Build the frontend
echo "🔨 Building frontend..."
cd frontend
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed!"
echo "🌍 Your app should be available at: https://yourusername.github.io/portfolio-analytics"
echo ""
echo "📝 Next steps:"
echo "1. Update the homepage URL in frontend/package.json with your actual GitHub username"
echo "2. Push your changes to GitHub"
echo "3. Go to your repository Settings > Pages to configure GitHub Pages"
