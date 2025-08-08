import React from 'react';
import { formatPercentage } from '../utils/formatters';

const TopPerformers = ({ summary }) => {
  if (!summary) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-border rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-dark-border rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'text-success';
      case 'moderate':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getDiversificationScoreColor = (score) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Key Insights</h2>
        <div className="flex items-center space-x-2">
          <span className="text-text-secondary text-sm">Analysis:</span>
          <span className="text-gold text-sm font-medium">AI-Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-dark-card rounded-lg border border-dark p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Performers</h3>
          
          <div className="space-y-4">
            {/* Best Performer */}
            <div className="bg-dark-surface rounded-lg p-4 border border-dark">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary">Best Performer</h4>
                  <p className="text-text-primary font-semibold">{summary.topPerformer.name}</p>
                  <p className="text-gold text-sm">{summary.topPerformer.symbol}</p>
                </div>
                <div className="text-right">
                  <span className="text-success text-lg font-bold">
                    +{formatPercentage(summary.topPerformer.gainPercent)}
                  </span>
                </div>
              </div>
            </div>

            {/* Worst Performer */}
            <div className="bg-dark-surface rounded-lg p-4 border border-dark">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary">Worst Performer</h4>
                  <p className="text-text-primary font-semibold">{summary.worstPerformer.name}</p>
                  <p className="text-gold text-sm">{summary.worstPerformer.symbol}</p>
                </div>
                <div className="text-right">
                  <span className="text-error text-lg font-bold">
                    {formatPercentage(summary.worstPerformer.gainPercent)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Metrics */}
        <div className="bg-dark-card rounded-lg border border-dark p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Portfolio Metrics</h3>
          
          <div className="space-y-4">
            {/* Diversification Score */}
            <div className="bg-dark-surface rounded-lg p-4 border border-dark">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary">Diversification Score</h4>
                  <p className="text-text-primary text-sm">Risk-adjusted portfolio spread</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getDiversificationScoreColor(summary.diversificationScore)}`}>
                    {summary.diversificationScore}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Level */}
            <div className="bg-dark-surface rounded-lg p-4 border border-dark">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary">Risk Level</h4>
                  <p className="text-text-primary text-sm">Portfolio volatility assessment</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-semibold ${getRiskLevelColor(summary.riskLevel)}`}>
                    {summary.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Portfolio Insights */}
            <div className="bg-dark-surface rounded-lg p-4 border border-dark">
              <h4 className="text-sm font-medium text-text-secondary mb-2">Quick Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-text-secondary">
                    {summary.topPerformer.symbol} leading with {formatPercentage(summary.topPerformer.gainPercent)} gain
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-text-secondary">
                    {summary.diversificationScore >= 7 ? 'Well' : summary.diversificationScore >= 5 ? 'Moderately' : 'Poorly'} diversified portfolio
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-text-secondary">
                    {summary.riskLevel.toLowerCase()} risk profile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
