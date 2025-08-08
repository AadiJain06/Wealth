// Utility functions for formatting data in the frontend

/**
 * Format currency values
 * @param {number} value - The numeric value to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'INR') => {
  if (value === null || value === undefined || isNaN(value)) {
    return '₹0.00';
  }

  // For Indian Rupees, use custom formatting
  if (currency === 'INR') {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    
    return formatted;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format large numbers with appropriate suffixes (K, L, Cr)
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted number with suffix
 */
export const formatCompactCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '₹0';
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) { // 1 Crore or more
    return `${sign}₹${(absValue / 10000000).toFixed(1)}Cr`;
  } else if (absValue >= 100000) { // 1 Lakh or more
    return `${sign}₹${(absValue / 100000).toFixed(1)}L`;
  } else if (absValue >= 1000) { // 1 Thousand or more
    return `${sign}₹${(absValue / 1000).toFixed(1)}K`;
  } else {
    return `${sign}₹${absValue.toFixed(0)}`;
  }
};

/**
 * Format percentage values
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%';
  }

  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-IN', { ...defaultOptions, ...options }).format(dateObj);
};

/**
 * Format numbers with Indian numbering system
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }

  return new Intl.NumberFormat('en-IN').format(value);
};

/**
 * Get color class based on gain/loss value
 * @param {number} value - The gain/loss value
 * @returns {string} CSS class for coloring
 */
export const getGainLossColor = (value) => {
  if (value > 0) {
    return 'text-success-600';
  } else if (value < 0) {
    return 'text-danger-600';
  } else {
    return 'text-gray-600';
  }
};

/**
 * Get background color class based on gain/loss value
 * @param {number} value - The gain/loss value
 * @returns {string} CSS class for background coloring
 */
export const getGainLossBackground = (value) => {
  if (value > 0) {
    return 'bg-success-50 border-success-200';
  } else if (value < 0) {
    return 'bg-danger-50 border-danger-200';
  } else {
    return 'bg-gray-50 border-gray-200';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, length = 20) => {
  if (!text || text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

/**
 * Calculate percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) {
    return 0;
  }
  return ((current - previous) / previous) * 100;
};

/**
 * Validate if a value is a valid number
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value) => {
  return value !== null && value !== undefined && !isNaN(value) && isFinite(value);
};
