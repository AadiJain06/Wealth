import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const PortfolioOverview = ({ summary, holdings }) => {
  if (!summary) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-border rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-dark-border rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(summary.totalValue),
      change: `${formatPercentage(summary.totalGainPercentage)} gain`,
      icon: '💰',
      color: 'text-gold'
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(summary.totalGainLoss),
      change: `${formatPercentage(summary.totalGainPercentage)} gain`,
      icon: '📈',
      color: summary.totalGainLoss >= 0 ? 'text-success' : 'text-error'
    },
    {
      title: 'Portfolio Performance',
      value: formatPercentage(summary.totalGainPercentage),
      change: `${formatPercentage(summary.totalGainPercentage)} gain`,
      icon: '📊',
      color: 'text-gold'
    },
    {
      title: 'Number of Holdings',
      value: holdings && holdings.length ? holdings.length.toString() : '0',
      change: 'Active positions',
      icon: '📋',
      color: 'text-text-primary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Portfolio Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-text-secondary text-sm">Last updated:</span>
          <span className="text-gold text-sm font-medium">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-dark-card rounded-lg border border-dark p-6 hover:border-gold transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{card.icon}</div>
              <div className="text-right">
                <p className="text-text-secondary text-sm">{card.title}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-text-primary">{card.value}</p>
              <p className={`text-sm font-medium ${card.color}`}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioOverview;
