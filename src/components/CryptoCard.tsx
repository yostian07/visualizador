import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoCardProps {
  data: {
    name: string;
    price: number;
    change: number;
  };
  theme: string;
}

export function CryptoCard({ data, theme }: CryptoCardProps) {
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 text-white' 
    : 'bg-white';

  return (
    <div className={`${cardClass} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{data.name}/USD</h3>
        {data.change >= 0 ? (
          <TrendingUp className="w-6 h-6 text-green-500" />
        ) : (
          <TrendingDown className="w-6 h-6 text-red-500" />
        )}
      </div>
      <p className="text-2xl font-bold">${data.price.toLocaleString()}</p>
      <div className="mt-2">
        <span className={`text-sm ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {data.change >= 0 ? '+' : ''}{data.change}%
        </span>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} ml-2`}>
          24h
        </span>
      </div>
    </div>
  );
}