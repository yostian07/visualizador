const WEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest';

export async function getWeather(cities: string[], unit: 'C' | 'F') {
  const unitSystem = unit === 'C' ? 'metric' : 'imperial';
  const promises = cities.map(city =>
    fetch(`${WEATHER_API_URL}/weather?q=${city}&units=${unitSystem}&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => ({
        name: data.name,
        temp: Math.round(data.main.temp),
        condition: getWeatherCondition(data.weather[0].main),
        humidity: data.main.humidity
      }))
  );
  return Promise.all(promises);
}

function getWeatherCondition(condition: string): string {
  const conditions: Record<string, string> = {
    Clear: 'Soleado',
    Clouds: 'Nublado',
    Rain: 'Lluvia',
    Snow: 'Nieve',
    Thunderstorm: 'Tormenta',
    Drizzle: 'Llovizna',
    Mist: 'Neblina'
  };
  return conditions[condition] || condition;
}

export async function getCryptoData(selectedCryptos: string[]) {
  const cryptoIds = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    ADA: 'cardano',
    DOT: 'polkadot',
    XRP: 'ripple',
    SOL: 'solana',
    DOGE: 'dogecoin'
  };

  const selectedIds = selectedCryptos
    .map(symbol => cryptoIds[symbol as keyof typeof cryptoIds])
    .filter(Boolean)
    .join(',');

  const response = await fetch(
    `${COINGECKO_API_URL}/simple/price?ids=${selectedIds}&vs_currencies=usd,eur&include_24hr_change=true`
  );
  const data = await response.json();
  
  return selectedCryptos
    .filter(symbol => cryptoIds[symbol as keyof typeof cryptoIds])
    .map(symbol => {
      const id = cryptoIds[symbol as keyof typeof cryptoIds];
      return {
        name: symbol,
        price: data[id].usd,
        priceEur: data[id].eur,
        change: data[id].usd_24h_change
      };
    });
}

export async function getExchangeRates(selectedCurrencies: string[]) {
  const response = await fetch(`${EXCHANGE_API_URL}/EUR`);
  const data = await response.json();
  
  const rates: Record<string, number> = {};
  selectedCurrencies.forEach(currency => {
    rates[currency] = data.rates[currency];
  });
  
  return rates;
}

export async function getHistoricalExchangeRates(selectedCurrencies: string[]) {
  // Simular datos históricos ya que la API gratuita no proporciona datos históricos
  const currentRates = await getExchangeRates(selectedCurrencies);
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  
  return months.map(month => {
    const rates: Record<string, string> = { name: month };
    selectedCurrencies.forEach(currency => {
      rates[currency] = (currentRates[currency] * (0.95 + Math.random() * 0.1)).toFixed(2);
    });
    return rates;
  });
}