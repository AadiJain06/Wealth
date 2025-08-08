const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { portfolioData, calculatePortfolioMetrics } = require('./data/sampleData');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Bind to all interfaces for Railway

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong processing your request'
  });
};

// Validation middleware
const validateRequest = (req, res, next) => {
  // Add any request validation logic here
  next();
};

// Routes

/**
 * GET /api/portfolio/holdings
 * Returns complete list of user's stock investments
 */
app.get('/api/portfolio/holdings', validateRequest, (req, res) => {
  try {
    const holdings = portfolioData.holdings.map(holding => ({
      symbol: holding.symbol,
      name: holding.name,
      quantity: holding.quantity,
      avgPrice: holding.avgPrice,
      currentPrice: holding.currentPrice,
      sector: holding.sector,
      marketCap: holding.marketCap,
      value: Math.round(holding.value * 100) / 100,
      gainLoss: Math.round(holding.gainLoss * 100) / 100,
      gainLossPercent: Math.round(holding.gainLossPercent * 100) / 100
    }));

    res.json(holdings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio holdings',
      message: 'Unable to retrieve your portfolio data at this time'
    });
  }
});

/**
 * GET /api/portfolio/allocation
 * Returns asset distribution by sectors and market cap
 */
app.get('/api/portfolio/allocation', validateRequest, (req, res) => {
  try {
    const metrics = calculatePortfolioMetrics();
    
    // Format the allocation data
    const allocation = {
      bySector: {},
      byMarketCap: {}
    };

    // Format sector allocation
    Object.keys(metrics.sectorAllocation).forEach(sector => {
      allocation.bySector[sector] = {
        value: Math.round(metrics.sectorAllocation[sector].value),
        percentage: Math.round(metrics.sectorAllocation[sector].percentage * 10) / 10
      };
    });

    // Format market cap allocation
    Object.keys(metrics.marketCapAllocation).forEach(cap => {
      allocation.byMarketCap[cap] = {
        value: Math.round(metrics.marketCapAllocation[cap].value),
        percentage: Math.round(metrics.marketCapAllocation[cap].percentage * 10) / 10
      };
    });

    res.json(allocation);
  } catch (error) {
    console.error('Error calculating allocation:', error);
    res.status(500).json({
      error: 'Failed to calculate portfolio allocation',
      message: 'Unable to calculate asset distribution at this time'
    });
  }
});

/**
 * GET /api/portfolio/performance
 * Returns historical performance vs benchmarks
 */
app.get('/api/portfolio/performance', validateRequest, (req, res) => {
  try {
    const timeline = portfolioData.performanceTimeline.map(point => ({
      date: point.date,
      portfolio: point.portfolio,
      nifty50: point.nifty50,
      gold: point.gold
    }));

    // Calculate returns (simplified calculation for demo)
    const latestData = timeline[timeline.length - 1];
    const oneMonthAgo = timeline[timeline.length - 2];
    const threeMonthsAgo = timeline[timeline.length - 4];
    const oneYearAgo = timeline[0];

    const calculateReturn = (current, previous) => {
      return Math.round(((current - previous) / previous) * 100 * 10) / 10;
    };

    // Calculate volatility (standard deviation of returns)
    const calculateVolatility = (data, key) => {
      const returns = [];
      for (let i = 1; i < data.length; i++) {
        const return_val = ((data[i][key] - data[i-1][key]) / data[i-1][key]) * 100;
        returns.push(return_val);
      }
      const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
      const variance = returns.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / returns.length;
      return Math.round(Math.sqrt(variance) * 10) / 10;
    };

    const returns = {
      portfolio: {
        "1month": calculateReturn(latestData.portfolio, oneMonthAgo.portfolio),
        "3months": calculateReturn(latestData.portfolio, threeMonthsAgo.portfolio),
        "1year": calculateReturn(latestData.portfolio, oneYearAgo.portfolio),
        "volatility": calculateVolatility(timeline, 'portfolio')
      },
      nifty50: {
        "1month": calculateReturn(latestData.nifty50, oneMonthAgo.nifty50),
        "3months": calculateReturn(latestData.nifty50, threeMonthsAgo.nifty50),
        "1year": calculateReturn(latestData.nifty50, oneYearAgo.nifty50),
        "volatility": calculateVolatility(timeline, 'nifty50')
      },
      gold: {
        "1month": calculateReturn(latestData.gold, oneMonthAgo.gold),
        "3months": calculateReturn(latestData.gold, threeMonthsAgo.gold),
        "1year": calculateReturn(latestData.gold, oneYearAgo.gold),
        "volatility": calculateVolatility(timeline, 'gold')
      }
    };

    // Calculate performance metrics
    const performanceMetrics = {
      bestPerformer: {
        "1month": returns.portfolio["1month"] > returns.nifty50["1month"] && returns.portfolio["1month"] > returns.gold["1month"] ? "Portfolio" : 
                  returns.nifty50["1month"] > returns.gold["1month"] ? "Nifty 50" : "Gold",
        "3months": returns.portfolio["3months"] > returns.nifty50["3months"] && returns.portfolio["3months"] > returns.gold["3months"] ? "Portfolio" : 
                   returns.nifty50["3months"] > returns.gold["3months"] ? "Nifty 50" : "Gold",
        "1year": returns.portfolio["1year"] > returns.nifty50["1year"] && returns.portfolio["1year"] > returns.gold["1year"] ? "Portfolio" : 
                 returns.nifty50["1year"] > returns.gold["1year"] ? "Nifty 50" : "Gold"
      },
      riskAdjustedReturn: {
        portfolio: Math.round((returns.portfolio["1year"] / returns.portfolio.volatility) * 10) / 10,
        nifty50: Math.round((returns.nifty50["1year"] / returns.nifty50.volatility) * 10) / 10,
        gold: Math.round((returns.gold["1year"] / returns.gold.volatility) * 10) / 10
      }
    };

    res.json({
      timeline,
      returns,
      performanceMetrics
    });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({
      error: 'Failed to fetch performance data',
      message: 'Unable to retrieve performance comparison at this time'
    });
  }
});

/**
 * GET /api/portfolio/summary
 * Returns key portfolio metrics and insights
 */
app.get('/api/portfolio/summary', validateRequest, (req, res) => {
  try {
    const metrics = calculatePortfolioMetrics();
    
    const summary = {
      totalValue: Math.round(metrics.totalValue),
      totalInvested: Math.round(metrics.totalInvested),
      totalGainLoss: Math.round(metrics.totalGainLoss),
      totalGainLossPercent: Math.round(metrics.totalGainLossPercent * 100) / 100,
      topPerformer: {
        symbol: metrics.topPerformer.symbol,
        name: metrics.topPerformer.name,
        gainPercent: Math.round(metrics.topPerformer.gainPercent * 100) / 100
      },
      worstPerformer: {
        symbol: metrics.worstPerformer.symbol,
        name: metrics.worstPerformer.name,
        gainPercent: Math.round(metrics.worstPerformer.gainPercent * 100) / 100
      },
      diversificationScore: metrics.diversificationScore,
      riskLevel: metrics.riskLevel
    };

    res.json(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      error: 'Failed to generate portfolio summary',
      message: 'Unable to calculate portfolio metrics at this time'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Portfolio Analytics API'
  });
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Analytics API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      holdings: '/api/portfolio/holdings',
      allocation: '/api/portfolio/allocation',
      performance: '/api/portfolio/performance',
      summary: '/api/portfolio/summary'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Portfolio Analytics API running on ${HOST}:${PORT}`);
  console.log(`📊 API endpoints available at http://${HOST}:${PORT}/api/`);
  console.log(`🏥 Health check: http://${HOST}:${PORT}/api/health`);
});

module.exports = app;
