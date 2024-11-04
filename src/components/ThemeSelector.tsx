import React from 'react';
import { Sun, Moon, Droplet, Leaf } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    { name: 'light', icon: Sun },
    { name: 'dark', icon: Moon },
    { name: 'blue', icon: Droplet },
    { name: 'green', icon: Leaf }
  ];

  return (
    <div className="flex space-x-2">
      {themes.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onThemeChange(name)}
          className={`p-2 rounded-lg transition-colors ${
            currentTheme === name
              ? 'bg-indigo-100 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}