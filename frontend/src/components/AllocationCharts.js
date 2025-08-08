import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-dark-card p-3 border border-dark rounded-lg shadow-lg">
        <p className="text-text-primary font-medium">{data.name}</p>
        <p className="text-text-secondary text-sm">
          Value: {formatCurrency(data.value)}
        </p>
        <p className="text-text-secondary text-sm">
          Percentage: {formatPercentage(data.payload.percentage)}
        </p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#D4AF37', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

const AllocationCharts = ({ allocation, chartType = 'sector' }) => {
  if (!allocation) {
    return (
      <div className="bg-dark-card rounded-lg shadow-sm border border-dark p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-dark-border rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-dark-border rounded"></div>
        </div>
      </div>
    );
  }

  const sectorData = Object.entries(allocation.bySector).map(([sector, data]) => ({
    name: sector,
    value: data.value,
    percentage: data.percentage
  }));

  const marketCapData = Object.entries(allocation.byMarketCap).map(([cap, data]) => ({
    name: cap,
    value: data.value,
    percentage: data.percentage
  }));

  const chartData = chartType === 'sector' ? sectorData : marketCapData;
  const chartTitle = chartType === 'sector' ? 'Sector Distribution' : 'Market Cap Distribution';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">{chartTitle}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-text-secondary text-sm">Total Value:</span>
          <span className="text-gold text-sm font-medium">
            {formatCurrency(chartData.reduce((sum, item) => sum + item.value, 0))}
          </span>
        </div>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${formatPercentage(percentage)}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Chart Details */}
      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm p-3 bg-dark-surface rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-text-secondary font-medium">{item.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-text-primary font-medium">
                {formatCurrency(item.value)}
              </span>
              <span className="text-gold font-medium">
                {formatPercentage(item.percentage)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationCharts;
