// Simple API test script to verify all endpoints are working
const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing Portfolio Analytics API...\n');

  const endpoints = [
    { name: 'Health Check', url: '/health' },
    { name: 'Portfolio Holdings', url: '/portfolio/holdings' },
    { name: 'Portfolio Allocation', url: '/portfolio/allocation' },
    { name: 'Portfolio Performance', url: '/portfolio/performance' },
    { name: 'Portfolio Summary', url: '/portfolio/summary' },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Testing ${endpoint.name}...`);
      const response = await axios.get(`${API_BASE}${endpoint.url}`);
      console.log(`✅ ${endpoint.name}: SUCCESS (${response.status})`);
      
      // Log sample data for verification
      if (endpoint.url === '/health') {
        console.log(`   Status: ${response.data.status}`);
      } else if (endpoint.url === '/portfolio/holdings') {
        console.log(`   Holdings found: ${response.data.length} stocks`);
      } else if (endpoint.url === '/portfolio/summary') {
        console.log(`   Total Value: ₹${response.data.totalValue.toLocaleString('en-IN')}`);
        console.log(`   Total Gain/Loss: ${response.data.totalGainLossPercent.toFixed(2)}%`);
      }
      
    } catch (error) {
      console.log(`❌ ${endpoint.name}: FAILED`);
      if (error.response) {
        console.log(`   Error: ${error.response.status} - ${error.response.data.message || error.response.data.error}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('🎯 API Testing Complete!');
  console.log('💡 Start the frontend with: cd frontend && npm start');
}

// Run the test
testAPI().catch(console.error);
