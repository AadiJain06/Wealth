// Sample portfolio data for WealthManager.online
// This data represents a realistic Indian stock portfolio

const portfolioData = {
  holdings: [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 50,
      avgPrice: 2450.00,
      currentPrice: 2680.50,
      sector: "Energy",
      marketCap: "Large",
      value: 134025.00,
      gainLoss: 11525.00,
      gainLossPercent: 9.4
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 100,
      avgPrice: 1800.00,
      currentPrice: 2010.75,
      sector: "Technology",
      marketCap: "Large",
      value: 201075.00,
      gainLoss: 21075.00,
      gainLossPercent: 11.7
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 75,
      avgPrice: 3200.00,
      currentPrice: 4120.30,
      sector: "Technology",
      marketCap: "Large",
      value: 309022.50,
      gainLoss: 69022.50,
      gainLossPercent: 28.8
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Limited",
      quantity: 120,
      avgPrice: 1650.00,
      currentPrice: 1615.25,
      sector: "Banking",
      marketCap: "Large",
      value: 193830.00,
      gainLoss: -4170.00,
      gainLossPercent: -2.1
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Limited",
      quantity: 80,
      avgPrice: 850.00,
      currentPrice: 1095.40,
      sector: "Banking",
      marketCap: "Large",
      value: 87632.00,
      gainLoss: 19632.00,
      gainLossPercent: 28.9
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Limited",
      quantity: 200,
      avgPrice: 720.00,
      currentPrice: 825.60,
      sector: "Telecommunications",
      marketCap: "Large",
      value: 165120.00,
      gainLoss: 21120.00,
      gainLossPercent: 14.7
    },
    {
      symbol: "APOLLOHOSP",
      name: "Apollo Hospitals Enterprise",
      quantity: 25,
      avgPrice: 4800.00,
      currentPrice: 5440.75,
      sector: "Healthcare",
      marketCap: "Large",
      value: 136018.75,
      gainLoss: 16018.75,
      gainLossPercent: 13.4
    },
    {
      symbol: "ASIANPAINT",
      name: "Asian Paints Limited",
      quantity: 40,
      avgPrice: 3100.00,
      currentPrice: 2950.20,
      sector: "Consumer Goods",
      marketCap: "Large",
      value: 118008.00,
      gainLoss: -5992.00,
      gainLossPercent: -4.8
    },
    {
      symbol: "TECHM",
      name: "Tech Mahindra Limited",
      quantity: 150,
      avgPrice: 1200.00,
      currentPrice: 1380.45,
      sector: "Technology",
      marketCap: "Mid",
      value: 207067.50,
      gainLoss: 27067.50,
      gainLossPercent: 15.0
    },
    {
      symbol: "BAJFINANCE",
      name: "Bajaj Finance Limited",
      quantity: 30,
      avgPrice: 7500.00,
      currentPrice: 6890.30,
      sector: "Financial Services",
      marketCap: "Large",
      value: 206709.00,
      gainLoss: -18291.00,
      gainLossPercent: -8.1
    },
    {
      symbol: "PIDILITIND",
      name: "Pidilite Industries Limited",
      quantity: 60,
      avgPrice: 2400.00,
      currentPrice: 2785.50,
      sector: "Consumer Goods",
      marketCap: "Mid",
      value: 167130.00,
      gainLoss: 23130.00,
      gainLossPercent: 16.1
    },
    {
      symbol: "DMART",
      name: "Avenue Supermarts Limited",
      quantity: 35,
      avgPrice: 4200.00,
      currentPrice: 3890.75,
      sector: "Consumer Goods",
      marketCap: "Mid",
      value: 136176.25,
      gainLoss: -10823.75,
      gainLossPercent: -7.4
    }
  ],

  // Performance timeline data
  performanceTimeline: [
    {
      date: "2024-01-01",
      portfolio: 1950000,
      nifty50: 21000,
      gold: 62000
    },
    {
      date: "2024-02-01",
      portfolio: 2020000,
      nifty50: 21500,
      gold: 63200
    },
    {
      date: "2024-03-01",
      portfolio: 2180000,
      nifty50: 22100,
      gold: 64500
    },
    {
      date: "2024-04-01",
      portfolio: 2250000,
      nifty50: 22800,
      gold: 66100
    },
    {
      date: "2024-05-01",
      portfolio: 2320000,
      nifty50: 23200,
      gold: 67800
    },
    {
      date: "2024-06-01",
      portfolio: 2400000,
      nifty50: 23500,
      gold: 68000
    },
    {
      date: "2024-07-01",
      portfolio: 2350000,
      nifty50: 23800,
      gold: 69500
    },
    {
      date: "2024-08-01",
      portfolio: 2420000,
      nifty50: 24200,
      gold: 70200
    },
    {
      date: "2024-09-01",
      portfolio: 2480000,
      nifty50: 24800,
      gold: 71000
    },
    {
      date: "2024-10-01",
      portfolio: 2456000,
      nifty50: 24600,
      gold: 72100
    },
    {
      date: "2024-11-01",
      portfolio: 2510000,
      nifty50: 25100,
      gold: 73500
    },
    {
      date: "2024-12-01",
      portfolio: 2561814,
      nifty50: 25400,
      gold: 74200
    },
    {
      date: "2025-01-01",
      portfolio: 2620000,
      nifty50: 25800,
      gold: 75000
    },
    {
      date: "2025-02-01",
      portfolio: 2685000,
      nifty50: 26200,
      gold: 75800
    },
    {
      date: "2025-03-01",
      portfolio: 2750000,
      nifty50: 26800,
      gold: 76500
    }
  ]
};

// Calculate derived data
const calculatePortfolioMetrics = () => {
  const holdings = portfolioData.holdings;
  
  // Calculate totals
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.avgPrice * holding.quantity), 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;

  // Find top and worst performers
  const sortedByPerformance = [...holdings].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  const topPerformer = sortedByPerformance[0];
  const worstPerformer = sortedByPerformance[sortedByPerformance.length - 1];

  // Calculate sector allocation
  const sectorAllocation = {};
  holdings.forEach(holding => {
    if (!sectorAllocation[holding.sector]) {
      sectorAllocation[holding.sector] = { value: 0, percentage: 0 };
    }
    sectorAllocation[holding.sector].value += holding.value;
  });

  // Calculate percentages for sectors
  Object.keys(sectorAllocation).forEach(sector => {
    sectorAllocation[sector].percentage = (sectorAllocation[sector].value / totalValue) * 100;
  });

  // Calculate market cap allocation
  const marketCapAllocation = {};
  holdings.forEach(holding => {
    if (!marketCapAllocation[holding.marketCap]) {
      marketCapAllocation[holding.marketCap] = { value: 0, percentage: 0 };
    }
    marketCapAllocation[holding.marketCap].value += holding.value;
  });

  // Calculate percentages for market cap
  Object.keys(marketCapAllocation).forEach(cap => {
    marketCapAllocation[cap].percentage = (marketCapAllocation[cap].value / totalValue) * 100;
  });

  // Calculate diversification score (simplified)
  const numSectors = Object.keys(sectorAllocation).length;
  const numStocks = holdings.length;
  const diversificationScore = Math.min(10, (numSectors * 1.5) + (numStocks * 0.2));

  // Determine risk level based on portfolio composition
  const largeCapPercentage = marketCapAllocation.Large ? marketCapAllocation.Large.percentage : 0;
  let riskLevel = "High";
  if (largeCapPercentage > 70) riskLevel = "Low";
  else if (largeCapPercentage > 50) riskLevel = "Moderate";

  return {
    totalValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    topPerformer: {
      symbol: topPerformer.symbol,
      name: topPerformer.name,
      gainPercent: topPerformer.gainLossPercent
    },
    worstPerformer: {
      symbol: worstPerformer.symbol,
      name: worstPerformer.name,
      gainPercent: worstPerformer.gainLossPercent
    },
    diversificationScore: Math.round(diversificationScore * 10) / 10,
    riskLevel,
    sectorAllocation,
    marketCapAllocation
  };
};

module.exports = {
  portfolioData,
  calculatePortfolioMetrics
};
