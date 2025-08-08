# Portfolio Analytics Dashboard

A modern portfolio analytics dashboard built with React frontend and Node.js backend, featuring real-time portfolio tracking, performance analysis, and interactive charts.

## 🚀 Features

- **Portfolio Overview**: Real-time portfolio value and performance metrics
- **Holdings Table**: Detailed view of all investments with sorting and filtering
- **Performance Charts**: Interactive charts comparing portfolio vs benchmarks
- **Allocation Analysis**: Sector and market cap distribution visualization
- **Top Performers**: Highlighting best and worst performing assets
- **Responsive Design**: Modern UI that works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- CORS enabled for cross-origin requests
- Helmet for security headers
- Morgan for request logging

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-analytics
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=3001
   NODE_ENV=development
   ```

   Create `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Start the application**
   ```bash
   # Start backend (from backend directory)
   npm start
   
   # Start frontend (from frontend directory)
   npm start
   ```

   Or use the provided scripts:
   ```bash
   # Windows
   start-dev.bat
   
   # Linux/Mac
   ./start-dev.sh
   ```

## 🌐 Deployment

### Option 1: Deploy to GitHub Pages (Frontend) + Railway/Render (Backend)

#### Frontend Deployment (GitHub Pages)

1. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

#### Backend Deployment (Railway/Render)

1. **Create account on Railway or Render**
2. **Connect your GitHub repository**
3. **Set environment variables**:
   - `PORT`: 3001
   - `NODE_ENV`: production
4. **Deploy automatically on push**

### Option 2: Deploy to Vercel (Full Stack)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 3: Deploy to Heroku

1. **Create Procfile in root**
   ```
   web: cd backend && npm start
   ```

2. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "heroku-postbuild": "cd frontend && npm install && npm run build"
     }
   }
   ```

3. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

### Production Configuration

For production deployment, update the API URL in `frontend/src/services/api.js`:

```javascript
baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.com/api'
```

## 📊 API Endpoints

- `GET /api/portfolio/holdings` - Get all portfolio holdings
- `GET /api/portfolio/allocation` - Get asset allocation data
- `GET /api/portfolio/performance` - Get performance comparison
- `GET /api/portfolio/summary` - Get portfolio summary
- `GET /api/health` - Health check endpoint

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📁 Project Structure

```
portfolio-analytics/
├── backend/
│   ├── config.js
│   ├── data/
│   │   └── sampleData.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── README.md
└── .gitignore
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.
