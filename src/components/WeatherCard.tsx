import React from 'react';
import { Cloud, Droplets } from 'lucide-react';

interface WeatherCardProps {
  data: {
    name: string;
    temp: number;
    condition: string;
    humidity: number;
  };
  theme: string;
  unit: 'C' | 'F'; // Añadimos la unidad para mostrarla en el componente
}

export function WeatherCard({ data, theme, unit }: WeatherCardProps) {
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 text-white' 
    : 'bg-white';

  return (
    <div className={`${cardClass} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <Cloud className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-3xl font-bold">
            {data.temp}°{unit} {/* Muestra la unidad aquí */}
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            {data.condition}
          </p>
        </div>
        <div className="flex items-center">
          <Droplets className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} mr-2`} />
          <span>{data.humidity}% humedad</span>
        </div>
      </div>
    </div>
  );
}
