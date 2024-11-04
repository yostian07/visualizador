import React, { useState, useEffect } from 'react';
import { BarChart3, Cloud, Bitcoin, DollarSign } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { ChartCard } from './components/ChartCard';
import { WeatherCard } from './components/WeatherCard';
import { CryptoCard } from './components/CryptoCard';
import { Navbar } from './components/Navbar';
import { SettingsModal } from './components/SettingsModal';
import { getWeather, getCryptoData, getExchangeRates, getHistoricalExchangeRates } from './services/api';
import { LoadingSpinner } from './components/LoadingSpinner';

export interface Settings {
  refreshInterval: number;
  showNotifications: boolean;
  defaultCurrency: string;
  selectedCities: string[];
  selectedCryptos: string[];
  selectedCurrencies: string[];
  weatherUnit: 'C' | 'F';
}

function App() {
  const [theme, setTheme] = useState('light');
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [weatherData, setWeatherData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [exchangeData, setExchangeData] = useState({ USD: 0, GBP: 0 });
  const [historicalRates, setHistoricalRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    refreshInterval: 60,
    showNotifications: true,
    defaultCurrency: 'USD',
    selectedCities: ['Madrid', 'New York', 'Tokyo', 'Sydney'],
    selectedCryptos: ['BTC', 'ETH', 'BNB'],
    selectedCurrencies: ['USD', 'GBP', 'JPY'],
    weatherUnit: 'C'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weather, crypto, exchange, historical] = await Promise.all([
          getWeather(settings.selectedCities, settings.weatherUnit),
          getCryptoData(settings.selectedCryptos),
          getExchangeRates(settings.selectedCurrencies),
          getHistoricalExchangeRates(settings.selectedCurrencies)
        ]);

        setWeatherData(weather);
        setCryptoData(crypto);
        setExchangeData(exchange);
        setHistoricalRates(historical);

        if (settings.showNotifications) {
          crypto.forEach((coin: any) => {
            if (Math.abs(coin.change) > 5) {
              new Notification(`Cambio significativo en ${coin.name}`, {
                body: `El precio ha cambiado ${coin.change.toFixed(2)}% en las últimas 24h`
              });
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, settings.refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [settings]);

  const themeClasses = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    blue: 'bg-blue-50',
    green: 'bg-green-50'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'clima':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {weatherData.map((city: any) => (
              <WeatherCard 
                key={city.name} 
                data={city} 
                theme={theme}
                unit={settings.weatherUnit}
              />
            ))}
          </div>
        );
      case 'crypto':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cryptoData.map((crypto: any) => (
              <CryptoCard 
                key={crypto.name} 
                data={crypto} 
                theme={theme}
                currency={settings.defaultCurrency}
              />
            ))}
          </div>
        );
      case 'divisas':
        return (
          <div className="space-y-6">
            {settings.selectedCurrencies.map(currency => (
              <StatCard
                key={currency}
                title={`EUR/${currency}`}
                value={exchangeData[currency]?.toFixed(2) || '0.00'}
                trend={((exchangeData[currency] || 0) - 1.12) * 100}
                Icon={DollarSign}
                theme={theme}
              />
            ))}
            <ChartCard
              title="Tasas de Cambio vs EUR"
              data={historicalRates}
              dataKeys={settings.selectedCurrencies}
              theme={theme}
            />
          </div>
        );
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Temperatura Promedio Global"
                value={`${Math.round(weatherData.reduce((acc: number, curr: any) => acc + curr.temp, 0) / weatherData.length)}°${settings.weatherUnit}`}
                trend={1.5}
                Icon={Cloud}
                theme={theme}
              />
              {cryptoData[0] && (
                <StatCard
                  title={`${cryptoData[0].name} (24h)`}
                  value={`${settings.defaultCurrency === 'USD' ? '$' : '€'}${cryptoData[0].price.toLocaleString()}`}
                  trend={cryptoData[0].change}
                  Icon={Bitcoin}
                  theme={theme}
                />
              )}
              <StatCard
                title={`EUR/${settings.defaultCurrency}`}
                value={exchangeData[settings.defaultCurrency]?.toFixed(2) || '0.00'}
                trend={((exchangeData[settings.defaultCurrency] || 0) - 1.12) * 100}
                Icon={DollarSign}
                theme={theme}
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ChartCard
                title="Tasas de Cambio vs EUR"
                data={historicalRates}
                dataKeys={settings.selectedCurrencies}
                theme={theme}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses[theme as keyof typeof themeClasses]}`}>
      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
          </h1>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            Monitoreo en tiempo real de datos globales
          </p>
        </div>

        {renderContent()}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        settings={settings}
        onSettingsChange={setSettings}
        currentSection={currentSection}
      />
    </div>
  );
}

export default App;