import React, { useState, useEffect } from 'react';
import PortfolioOverview from './PortfolioOverview';
import AllocationCharts from './AllocationCharts';
import HoldingsTable from './HoldingsTable';
import PerformanceChart from './PerformanceChart';
import TopPerformers from './TopPerformers';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import { fetchHoldings, fetchAllocation, fetchPerformance, fetchSummary } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState({
    holdings: null,
    allocation: null,
    performance: null,
    summary: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');

  // Portfolio options
  const portfolioOptions = [
    { value: 'all', label: 'All Portfolios' },
    { value: 'growth', label: 'Growth Portfolio' },
    { value: 'value', label: 'Value Portfolio' },
    { value: 'dividend', label: 'Dividend Portfolio' },
    { value: 'balanced', label: 'Balanced Portfolio' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [holdings, allocation, performance, summary] = await Promise.all([
          fetchHoldings(),
          fetchAllocation(),
          fetchPerformance(),
          fetchSummary()
        ]);

        setData({
          holdings,
          allocation,
          performance,
          summary
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-dark-surface font-bold text-lg">WM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gold">WealthManager.online</h1>
                <p className="text-text-secondary text-sm">Portfolio Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Portfolio Filter */}
              <div className="flex items-center space-x-3">
                <span className="text-text-secondary text-sm">Portfolio:</span>
                <select
                  value={selectedPortfolio}
                  onChange={(e) => setSelectedPortfolio(e.target.value)}
                  className="bg-dark-card border border-dark text-text-primary rounded-lg px-3 py-1 text-sm focus:border-gold focus:outline-none"
                >
                  {portfolioOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary text-sm">Live Data</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Portfolio Overview - First Section */}
          <PortfolioOverview summary={data.summary} holdings={data.holdings} />

          {/* Sector Distribution - Second Section */}
          <div className="bg-dark-card rounded-lg border border-dark p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Sector Distribution</h2>
            <AllocationCharts allocation={data.allocation} chartType="sector" />
          </div>

          {/* Market Cap Distribution - Third Section */}
          <div className="bg-dark-card rounded-lg border border-dark p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Market Cap Distribution</h2>
            <AllocationCharts allocation={data.allocation} chartType="marketCap" />
          </div>

          {/* Key Insights - Fourth Section */}
          <TopPerformers summary={data.summary} />

          {/* Performance Chart - Fifth Section */}
          <PerformanceChart performance={data.performance} />

          {/* Holdings Table - Sixth Section */}
          <HoldingsTable holdings={data.holdings} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-dark-surface font-bold text-sm">WM</span>
              </div>
              <span className="text-text-secondary text-sm">Powered by AI</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-text-muted text-xs">© 2024 WealthManager.online</span>
              <span className="text-text-muted text-xs">Institutional-grade insights</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
