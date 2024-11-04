// src/components/Navbar.tsx
import React, { useState } from 'react';
import { BarChart3, Settings, Menu, X } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';

interface NavbarProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onSettingsClick: () => void;
}

export function Navbar({
  theme,
  onThemeChange,
  currentSection,
  onSectionChange,
  onSettingsClick,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'clima', name: 'Clima' },
    { id: 'crypto', name: 'Criptomonedas' },
    { id: 'divisas', name: 'Divisas' },
  ];

  const linkClass = (isActive: boolean) => `
    block px-4 py-2 text-sm font-medium rounded-md transition-colors
    ${
      isActive
        ? theme === 'dark'
          ? 'bg-gray-700 text-white'
          : 'bg-indigo-50 text-indigo-700'
        : theme === 'dark'
        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <nav
      className={`${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      } shadow-sm sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BarChart3
                className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-indigo-600'
                }`}
              />
              <span className="ml-2 text-xl font-semibold">DataViz Global</span>
            </div>
          </div>

          {/* Botón de menú para móviles */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-md ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } focus:outline-none`}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menú de navegación */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className={linkClass(currentSection === section.id)}
                onClick={() => onSectionChange(section.id)}
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Selector de tema y botón de configuración */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSelector
              currentTheme={theme}
              onThemeChange={onThemeChange}
            />
            <button
              onClick={onSettingsClick}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sections.map((section) => (
              <button
                key={section.id}
                className={linkClass(currentSection === section.id)}
                onClick={() => {
                  onSectionChange(section.id);
                  setMenuOpen(false);
                }}
              >
                {section.name}
              </button>
            ))}
          </div>
          <div className="px-2 pb-3 flex items-center justify-between sm:px-3">
            <ThemeSelector
              currentTheme={theme}
              onThemeChange={onThemeChange}
            />
            <button
              onClick={onSettingsClick}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
