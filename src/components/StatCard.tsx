import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  Icon: LucideIcon;
  theme: string;
}

export function StatCard({ title, value, trend, Icon, theme }: StatCardProps) {
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 text-white' 
    : 'bg-white';

  const iconClass = theme === 'dark'
    ? 'bg-gray-700 text-blue-400'
    : 'bg-indigo-50 text-indigo-600';

  return (
    <div className={`${cardClass} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            {title}
          </h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`${iconClass} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} ml-2`}>
          vs mes anterior
        </span>
      </div>
    </div>
  );
}