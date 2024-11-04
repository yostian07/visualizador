import React from 'react';
import { X } from 'lucide-react';
import type { Settings } from '../App';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  currentSection: string;
}

const AVAILABLE_CITIES = [
  'Madrid', 'Barcelona', 'Paris', 'London', 'New York', 'Tokyo', 
  'Sydney', 'Berlin', 'Rome', 'Amsterdam', 'Dubai', 'Singapore'
];

const AVAILABLE_CRYPTOS = [
  'BTC', 'ETH', 'BNB', 'ADA', 'DOT', 'XRP', 'SOL', 'DOGE'
];

const AVAILABLE_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY'
];

export function SettingsModal({ 
  isOpen, 
  onClose, 
  theme, 
  settings, 
  onSettingsChange,
  currentSection 
}: SettingsModalProps) {
  if (!isOpen) return null;

  const modalClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white';
  const inputClass = theme === 'dark'
    ? 'bg-gray-700 border-gray-600 text-white'
    : 'bg-white border-gray-300 text-gray-900';

  const renderSectionSettings = () => {
    switch (currentSection) {
      case 'clima':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Ciudades a monitorear
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_CITIES.map(city => (
                  <label key={city} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.selectedCities.includes(city)}
                      onChange={(e) => {
                        const newCities = e.target.checked
                          ? [...settings.selectedCities, city]
                          : settings.selectedCities.filter(c => c !== city);
                        onSettingsChange({
                          ...settings,
                          selectedCities: newCities
                        });
                      }}
                      className="rounded border-gray-300"
                    />
                    <span>{city}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Unidad de temperatura
              </label>
              <select
                value={settings.weatherUnit}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  weatherUnit: e.target.value as 'C' | 'F'
                })}
                className={`${inputClass} rounded-md w-full p-2 border`}
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>
          </>
        );
      case 'crypto':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              Criptomonedas a monitorear
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_CRYPTOS.map(crypto => (
                <label key={crypto} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.selectedCryptos.includes(crypto)}
                    onChange={(e) => {
                      const newCryptos = e.target.checked
                        ? [...settings.selectedCryptos, crypto]
                        : settings.selectedCryptos.filter(c => c !== crypto);
                      onSettingsChange({
                        ...settings,
                        selectedCryptos: newCryptos
                      });
                    }}
                    className="rounded border-gray-300"
                  />
                  <span>{crypto}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'divisas':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              Monedas a monitorear
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_CURRENCIES.map(currency => (
                <label key={currency} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.selectedCurrencies.includes(currency)}
                    onChange={(e) => {
                      const newCurrencies = e.target.checked
                        ? [...settings.selectedCurrencies, currency]
                        : settings.selectedCurrencies.filter(c => c !== currency);
                      onSettingsChange({
                        ...settings,
                        selectedCurrencies: newCurrencies
                      });
                    }}
                    className="rounded border-gray-300"
                  />
                  <span>{currency}</span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className={`${modalClass} w-full max-w-md rounded-lg shadow-xl relative transform transition-all`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Configuración</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Intervalo de actualización (segundos)
                </label>
                <input
                  type="number"
                  value={settings.refreshInterval}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    refreshInterval: parseInt(e.target.value)
                  })}
                  className={`${inputClass} rounded-md w-full p-2 border`}
                  min="30"
                  max="300"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.showNotifications}
                    onChange={(e) => onSettingsChange({
                      ...settings,
                      showNotifications: e.target.checked
                    })}
                    className="rounded border-gray-300"
                  />
                  <span>Mostrar notificaciones</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Moneda predeterminada
                </label>
                <select
                  value={settings.defaultCurrency}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    defaultCurrency: e.target.value
                  })}
                  className={`${inputClass} rounded-md w-full p-2 border`}
                >
                  {AVAILABLE_CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              {renderSectionSettings()}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}