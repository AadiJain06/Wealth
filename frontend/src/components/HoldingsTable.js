import React, { useState, useMemo } from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const HoldingsTable = ({ holdings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterType, setFilterType] = useState('all');

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Holdings' },
    { value: 'gainers', label: 'Top Gainers' },
    { value: 'losers', label: 'Top Losers' },
    { value: 'large-cap', label: 'Large Cap' },
    { value: 'mid-cap', label: 'Mid Cap' },
    { value: 'small-cap', label: 'Small Cap' }
  ];

  // Filter and sort holdings
  const filteredAndSortedHoldings = useMemo(() => {
    if (!holdings) return [];
    
    let filtered = holdings.filter(holding => {
    let filtered = holdings.filter(holding => {
      const matchesSearch = holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          holding.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      // Apply type filter
      switch (filterType) {
        case 'gainers':
          return holding.gainLoss >= 0;
        case 'losers':
          return holding.gainLoss < 0;
        case 'large-cap':
          return holding.marketCap === 'Large';
        case 'mid-cap':
          return holding.marketCap === 'Mid';
        case 'small-cap':
          return holding.marketCap === 'Small';
        default:
          return true;
      }
    });

    // Sort holdings
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'symbol':
          aValue = a.symbol.toLowerCase();
          bValue = b.symbol.toLowerCase();
          break;
        case 'value':
          aValue = a.value;
          bValue = b.value;
          break;
        case 'gainLoss':
          aValue = a.gainLoss;
          bValue = b.gainLoss;
          break;
        case 'gainLossPercent':
          aValue = a.gainLossPercent;
          bValue = b.gainLossPercent;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [holdings, searchTerm, sortField, sortDirection, filterType]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Show loading state if no holdings
  if (!holdings) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-border rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-dark-border rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">Portfolio Holdings</h2>
        
        <div className="flex items-center space-x-4">
          {/* Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-dark-card border border-dark text-text-primary rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search holdings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark-card border border-dark text-text-primary rounded-lg pl-10 pr-4 py-2 text-sm focus:border-gold focus:outline-none w-48"
            />
          </div>

          {/* Holdings Count */}
          <span className="text-text-secondary text-sm">
            {filteredAndSortedHoldings.length} of {holdings.length} holdings
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card rounded-lg border border-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark">
            <thead className="bg-dark-surface">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-gold"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    <span className="text-xs">{getSortIcon('name')}</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-gold"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Value</span>
                    <span className="text-xs">{getSortIcon('value')}</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-gold"
                  onClick={() => handleSort('gainLoss')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Gain/Loss</span>
                    <span className="text-xs">{getSortIcon('gainLoss')}</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-gold"
                  onClick={() => handleSort('gainLossPercent')}
                >
                  <div className="flex items-center space-x-1">
                    <span>% Change</span>
                    <span className="text-xs">{getSortIcon('gainLossPercent')}</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark-card divide-y divide-dark">
              {filteredAndSortedHoldings.map((holding, index) => (
                <tr key={holding.symbol} className="hover:bg-dark-surface transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">{holding.name}</div>
                      <div className="text-sm text-text-secondary">{holding.symbol}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${holding.gainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                      {formatCurrency(holding.gainLoss)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${holding.gainLossPercent >= 0 ? 'text-success' : 'text-error'}`}>
                      {formatPercentage(holding.gainLossPercent)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {holding.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {holding.marketCap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;
