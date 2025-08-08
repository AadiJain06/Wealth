import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card p-4 border border-dark rounded-lg shadow-lg">
        <p className="font-medium text-text-primary mb-2">{formatDate(label)}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({ performance }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  if (!performance) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-border rounded w-1/4 mb-4"></div>
          <div className="h-80 bg-dark-border rounded"></div>
        </div>
      </div>
    );
  }

  const { timeline, returns } = performance;

  // Filter timeline data based on selected period
  const getFilteredData = () => {
    if (selectedPeriod === 'all') return timeline;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (selectedPeriod) {
      case '1month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return timeline;
    }
    
    return timeline.filter(point => new Date(point.date) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  // Calculate normalized values for better comparison (starting from 100)
  const normalizedData = filteredData.map((point, index) => {
    if (index === 0) {
      return {
        ...point,
        portfolioNormalized: 100,
        niftyNormalized: 100,
        goldNormalized: 100,
      };
    }
    
    const basePoint = filteredData[0];
    return {
      ...point,
      portfolioNormalized: Number(((point.portfolio / basePoint.portfolio) * 100).toFixed(2)),
      niftyNormalized: Number(((point.nifty50 / basePoint.nifty50) * 100).toFixed(2)),
      goldNormalized: Number(((point.gold / basePoint.gold) * 100).toFixed(2)),
    };
  });

  // Ensure we have data to display
  if (normalizedData.length === 0) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="text-center py-8">
          <p className="text-text-secondary">No performance data available</p>
        </div>
      </div>
    );
  }

  const periodButtons = [
    { key: '1month', label: '1M' },
    { key: '3months', label: '3M' },
    { key: '6months', label: '6M' },
    { key: '1year', label: '1Y' },
    { key: 'all', label: 'All' },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Returns Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-card border border-dark rounded-lg p-4">
          <h4 className="text-sm font-medium text-gold mb-3">Portfolio Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Month:</span>
              <span className={`font-medium ${returns.portfolio['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.portfolio['1month'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">3 Months:</span>
              <span className={`font-medium ${returns.portfolio['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.portfolio['3months'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Year:</span>
              <span className={`font-medium ${returns.portfolio['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.portfolio['1year'])}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-dark">
              <span className="text-text-secondary">Volatility:</span>
              <span className="font-medium text-text-primary">
                {formatPercentage(returns.portfolio.volatility || 0)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark rounded-lg p-4">
          <h4 className="text-sm font-medium text-success mb-3">Nifty 50 Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Month:</span>
              <span className={`font-medium ${returns.nifty50['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.nifty50['1month'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">3 Months:</span>
              <span className={`font-medium ${returns.nifty50['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.nifty50['3months'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Year:</span>
              <span className={`font-medium ${returns.nifty50['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.nifty50['1year'])}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-dark">
              <span className="text-text-secondary">Volatility:</span>
              <span className="font-medium text-text-primary">
                {formatPercentage(returns.nifty50.volatility || 0)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark rounded-lg p-4">
          <h4 className="text-sm font-medium text-warning mb-3">Gold Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Month:</span>
              <span className={`font-medium ${returns.gold['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.gold['1month'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">3 Months:</span>
              <span className={`font-medium ${returns.gold['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.gold['3months'])}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">1 Year:</span>
              <span className={`font-medium ${returns.gold['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                {formatPercentage(returns.gold['1year'])}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-dark">
              <span className="text-text-secondary">Volatility:</span>
              <span className="font-medium text-text-primary">
                {formatPercentage(returns.gold.volatility || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Performance Comparison</h3>
          
          {/* Period Selection */}
          <div className="flex rounded-lg border border-dark mt-4 sm:mt-0">
            {periodButtons.map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-3 py-1 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  selectedPeriod === period.key
                    ? 'bg-gold text-dark-surface'
                    : 'bg-dark-surface text-text-secondary hover:bg-dark-border'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => formatDate(date, { month: 'short', day: 'numeric' })}
                stroke="#B0B0B0"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                stroke="#B0B0B0"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="portfolioNormalized"
                stroke="#D4AF37"
                strokeWidth={3}
                name="Portfolio"
                dot={{ fill: '#D4AF37', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="niftyNormalized"
                stroke="#10B981"
                strokeWidth={2}
                name="Nifty 50"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="goldNormalized"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Gold"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-dark">
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-2">1 Month Returns</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gold">Portfolio:</span>
                <span className={`font-medium ${returns.portfolio['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.portfolio['1month'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-success">Nifty 50:</span>
                <span className={`font-medium ${returns.nifty50['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.nifty50['1month'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-warning">Gold:</span>
                <span className={`font-medium ${returns.gold['1month'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.gold['1month'])}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-2">3 Month Returns</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gold">Portfolio:</span>
                <span className={`font-medium ${returns.portfolio['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.portfolio['3months'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-success">Nifty 50:</span>
                <span className={`font-medium ${returns.nifty50['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.nifty50['3months'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-warning">Gold:</span>
                <span className={`font-medium ${returns.gold['3months'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.gold['3months'])}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-2">1 Year Returns</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gold">Portfolio:</span>
                <span className={`font-medium ${returns.portfolio['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.portfolio['1year'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-success">Nifty 50:</span>
                <span className={`font-medium ${returns.nifty50['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.nifty50['1year'])}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-warning">Gold:</span>
                <span className={`font-medium ${returns.gold['1year'] >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(returns.gold['1year'])}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Performance Metrics */}
        {performance.performanceMetrics && (
          <div className="mt-6 pt-4 border-t border-dark">
            <h4 className="text-sm font-medium text-text-primary mb-4">Performance Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-surface rounded-lg p-4">
                <h5 className="text-sm font-medium text-text-secondary mb-3">Best Performer</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">1 Month:</span>
                    <span className="font-medium text-gold">
                      {performance.performanceMetrics.bestPerformer['1month']}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">3 Months:</span>
                    <span className="font-medium text-gold">
                      {performance.performanceMetrics.bestPerformer['3months']}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">1 Year:</span>
                    <span className="font-medium text-gold">
                      {performance.performanceMetrics.bestPerformer['1year']}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-surface rounded-lg p-4">
                <h5 className="text-sm font-medium text-text-secondary mb-3">Risk-Adjusted Returns</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gold">Portfolio:</span>
                    <span className="font-medium text-text-primary">
                      {performance.performanceMetrics.riskAdjustedReturn.portfolio}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-success">Nifty 50:</span>
                    <span className="font-medium text-text-primary">
                      {performance.performanceMetrics.riskAdjustedReturn.nifty50}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-warning">Gold:</span>
                    <span className="font-medium text-text-primary">
                      {performance.performanceMetrics.riskAdjustedReturn.gold}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
