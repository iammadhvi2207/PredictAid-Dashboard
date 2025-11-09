import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { CloudSun, Wind, Droplets, Eye, Thermometer, Gauge, MapPin } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  description: string;
}

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{lat: number; lon: number; city: string} | null>(null);

  // Auto-fetch user's location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Fetch weather when location is available
  useEffect(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lon, location.city);
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get city name from coordinates
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const data = await response.json();
            const cityName = data.address?.city || data.address?.town || data.address?.village || data.name || 'Unknown Location';
            
            setLocation({
              lat: latitude,
              lon: longitude,
              city: cityName
            });
          } catch (error) {
            console.error('Error getting location name:', error);
            setLocation({
              lat: latitude,
              lon: longitude,
              city: 'Current Location'
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to a default Indian city (Delhi)
          setLocation({
            lat: 28.6139,
            lon: 77.2090,
            city: 'Delhi'
          });
        }
      );
    } else {
      // Fallback to Delhi if geolocation is not supported
      setLocation({
        lat: 28.6139,
        lon: 77.2090,
        city: 'Delhi'
      });
    }
  };

  const fetchWeatherData = async (lat: number, lon: number, city: string) => {
    try {
      setLoading(true);
      
      // Using Open-Meteo API (free, no API key required)
      const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&timezone=auto`;
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,wind_speed_10m_max&timezone=auto&forecast_days=5`;
      
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
      ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      // Map weather codes to conditions
      const getWeatherCondition = (code: number) => {
        if (code === 0) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Cloudy';
        if (code <= 67) return 'Light Rain';
        if (code <= 77) return 'Heavy Rain';
        if (code <= 82) return 'Rain Showers';
        if (code <= 99) return 'Thunderstorm';
        return 'Haze';
      };

      const realWeatherData: WeatherData = {
        location: `${city}`,
        temperature: Math.round(currentData.current.temperature_2m),
        condition: getWeatherCondition(currentData.current.weather_code),
        humidity: Math.round(currentData.current.relative_humidity_2m),
        windSpeed: Math.round(currentData.current.wind_speed_10m),
        visibility: Math.round(currentData.current.visibility / 1000), // Convert to km
        pressure: Math.round(currentData.current.pressure_msl),
        feelsLike: Math.round(currentData.current.apparent_temperature),
        description: 'Real-time weather data from Open-Meteo'
      };

      const realForecast: ForecastData[] = forecastData.daily.time.map((date: string, i: number) => ({
        date: new Date(date).toLocaleDateString('en-IN', { weekday: 'long' }),
        high: Math.round(forecastData.daily.temperature_2m_max[i]),
        low: Math.round(forecastData.daily.temperature_2m_min[i]),
        condition: getWeatherCondition(forecastData.daily.weather_code[i]),
        humidity: Math.round(forecastData.daily.relative_humidity_2m_mean[i]),
        windSpeed: Math.round(forecastData.daily.wind_speed_10m_max[i])
      }));

      setWeatherData(realWeatherData);
      setForecast(realForecast);
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };


  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain')) return '🌧️';
    if (condition.includes('Thunder')) return '⛈️';
    if (condition.includes('Cloudy')) return '☁️';
    if (condition.includes('Clear') || condition.includes('Sunny')) return '☀️';
    if (condition.includes('Partly')) return '⛅';
    if (condition.includes('Haze')) return '🌫️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Weather Monitoring</h2>
          <p className="text-muted-foreground">
            Fetching current weather conditions for your location...
          </p>
        </div>
        <GlassCard className="p-8 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-primary/20 rounded w-1/2 mx-auto"></div>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Weather Monitoring</h2>
          <p className="text-muted-foreground text-red-500">
            Unable to fetch weather data. Please check your connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Weather Monitoring</h2>
        <p className="text-muted-foreground">
          Current conditions and forecasts for disaster preparedness
        </p>
        {location && (
          <div className="flex items-center gap-2 mt-2 text-sm text-primary">
            <MapPin className="w-4 h-4" />
            <span>Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}</span>
          </div>
        )}
      </div>

      {/* Current weather - Large card */}
      <GlassCard variant="weather" className="p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CloudSun className="w-6 h-6 text-sky-blue" />
              <span className="text-lg font-medium text-sky-blue">Current Weather</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{weatherData.location}</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl font-bold text-foreground">{weatherData.temperature}°C</span>
              <div className="text-4xl">{getWeatherIcon(weatherData.condition)}</div>
            </div>
            <p className="text-xl text-foreground mb-2">{weatherData.condition}</p>
            <p className="text-muted-foreground">Feels like {weatherData.feelsLike}°C</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50">
              <Wind className="w-5 h-5 text-sky-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-lg font-semibold text-foreground">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50">
              <Droplets className="w-5 h-5 text-sky-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-lg font-semibold text-foreground">{weatherData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50">
              <Eye className="w-5 h-5 text-sky-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="text-lg font-semibold text-foreground">{weatherData.visibility} km</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50">
              <Gauge className="w-5 h-5 text-sky-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Pressure</p>
                <p className="text-lg font-semibold text-foreground">{weatherData.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 5-day forecast */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">5-Day Forecast</h3>
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-card/30 hover:bg-card/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getWeatherIcon(day.condition)}</span>
                <div>
                  <p className="font-medium text-foreground">{day.date}</p>
                  <p className="text-sm text-muted-foreground">{day.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{day.high}°C</p>
                <p className="text-sm text-muted-foreground">{day.low}°C</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Weather alerts */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weather Alerts for India</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-orange-100 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-600">⚠️</span>
              <span className="font-semibold text-orange-800">Heat Wave Warning</span>
            </div>
            <p className="text-sm text-orange-700">
              Northwestern India experiencing severe heat wave conditions. Take precautions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-100 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">🌧️</span>
              <span className="font-semibold text-blue-800">Monsoon Update</span>
            </div>
            <p className="text-sm text-blue-700">
              Southwest monsoon progressing normally. Heavy rainfall expected in coastal areas.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};