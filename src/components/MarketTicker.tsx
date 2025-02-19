'use client';

import { useEffect, useState, useCallback } from 'react';

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarketTicker() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchMarketData = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/market-indices');
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setIndices(data);
      setLoading(false);
      setRetryCount(0); // Reset retry count on successful fetch
    } catch (error) {
      console.error('Error fetching market data:', error);
      setError('Failed to load market data');
      setLoading(false);
      
      // Retry logic with exponential backoff
      if (retryCount < 3) {
        const timeout = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchMarketData();
        }, timeout);
      }
    }
  }, [retryCount]);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [fetchMarketData]);

  if (error) {
    return (
      <div className="bg-red-50 py-2">
        <div className="container mx-auto px-4 text-red-600 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => {
              setLoading(true);
              setRetryCount(0);
              fetchMarketData();
            }}
            className="text-sm text-red-700 hover:text-red-800 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-50 py-2 border-t border-b border-gray-200">
        <div className="animate-pulse flex space-x-8 px-4 overflow-hidden whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Duplicate the indices array to create a seamless loop
  const duplicatedIndices = [...indices, ...indices];

  return (
    <div className="bg-gray-50 py-2 overflow-hidden border-t border-b border-gray-200">
      <div className="animate-scroll-x flex whitespace-nowrap">
        {duplicatedIndices.map((index, i) => (
          <div
            key={`${index.symbol}-${i}`}
            className="inline-flex items-center space-x-2 px-4 min-w-fit"
          >
            <span className="font-medium text-sm text-gray-900">{index.name}</span>
            <span className="text-sm font-mono">
              {index.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-sm font-medium ${
                index.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {index.change >= 0 ? '+' : ''}
              {index.change.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {' ('}
              {index.change >= 0 ? '+' : ''}
              {index.changePercent.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
