import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GlassCard } from '../GlassCard';
import { CloudRain, Thermometer, TrendingUp, ExternalLink, AlertTriangle } from 'lucide-react';

interface WeatherData {
  date: string;
  rainfall: number;
  temperature: number;
  predictedRainfall: number;
  predictedTemp: number;
  droughtRisk: number;
  floodRisk: number;
}

interface PredictionData {
  type: 'drought' | 'flood';
  probability: number;
  region: string;
  timeframe: string;
  source: string;
}

export const WeatherGraphs = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All India');

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [selectedRegion]);

  const fetchWeatherData = async () => {
    try {
      // Simulating real-time data from IMD
      const data: WeatherData[] = [
        { date: 'Jan', rainfall: 15, temperature: 22, predictedRainfall: 18, predictedTemp: 24, droughtRisk: 20, floodRisk: 10 },
        { date: 'Feb', rainfall: 22, temperature: 25, predictedRainfall: 25, predictedTemp: 27, droughtRisk: 15, floodRisk: 15 },
        { date: 'Mar', rainfall: 35, temperature: 28, predictedRainfall: 40, predictedTemp: 30, droughtRisk: 10, floodRisk: 25 },
        { date: 'Apr', rainfall: 45, temperature: 32, predictedRainfall: 50, predictedTemp: 34, droughtRisk: 5, floodRisk: 35 },
        { date: 'May', rainfall: 65, temperature: 35, predictedRainfall: 70, predictedTemp: 37, droughtRisk: 25, floodRisk: 45 },
        { date: 'Jun', rainfall: 125, temperature: 33, predictedRainfall: 130, predictedTemp: 35, droughtRisk: 15, floodRisk: 65 },
      ];

      const predictionData: PredictionData[] = [
        { type: 'flood', probability: 68, region: 'Kerala', timeframe: 'Next 7 days', source: 'https://imd.gov.in' },
        { type: 'drought', probability: 45, region: 'Rajasthan', timeframe: 'Next 30 days', source: 'https://drought.imd.gov.in' },
        { type: 'flood', probability: 72, region: 'West Bengal', timeframe: 'Next 14 days', source: 'https://cwc.gov.in' },
      ];

      setWeatherData(data);
      setPredictions(predictionData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const handleGraphClick = (source?: string) => {
    const url = source || 'https://imd.gov.in/pages/main.php';
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rainfall Trends with Predictions */}
      <div className="cursor-pointer" onClick={() => handleGraphClick()}>
        <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-sky-blue" />
                Rainfall Trends & Predictions
              </h3>
              <p className="text-sm text-muted-foreground">Data from IMD • Updated every 6 hours</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="rainfall" 
                stackId="1" 
                stroke="hsl(var(--sky-blue))" 
                fill="hsl(var(--sky-blue) / 0.3)" 
                name="Actual Rainfall (mm)"
              />
              <Line 
                type="monotone" 
                dataKey="predictedRainfall" 
                stroke="hsl(var(--primary))" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                name="Predicted Rainfall (mm)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        </GlassCard>
      </div>

      {/* Temperature Trends */}
      <div className="cursor-pointer" onClick={() => handleGraphClick()}>
        <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-warning" />
                Temperature Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Real-time temperature monitoring</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--warning))" 
                strokeWidth={3}
                name="Temperature (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="predictedTemp" 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                name="Predicted Temp (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </GlassCard>
      </div>

      {/* Risk Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cursor-pointer" onClick={() => handleGraphClick()}>
          <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Drought vs Flood Risk</h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="droughtRisk" 
                  stackId="1" 
                  stroke="hsl(var(--warning))" 
                  fill="hsl(var(--warning) / 0.3)" 
                  name="Drought Risk %"
                />
                <Area 
                  type="monotone" 
                  dataKey="floodRisk" 
                  stackId="2" 
                  stroke="hsl(var(--sky-blue))" 
                  fill="hsl(var(--sky-blue) / 0.3)" 
                  name="Flood Risk %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Risk Predictions</h3>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleGraphClick(prediction.source)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${prediction.type === 'flood' ? 'text-sky-blue' : 'text-warning'}`} />
                    <span className="font-medium text-foreground capitalize">{prediction.type} Risk</span>
                  </div>
                  <span className={`text-sm font-bold ${prediction.probability > 60 ? 'text-destructive' : prediction.probability > 40 ? 'text-warning' : 'text-primary'}`}>
                    {prediction.probability}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{prediction.region} • {prediction.timeframe}</p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      prediction.type === 'flood' ? 'bg-sky-blue' : 'bg-warning'
                    }`}
                    style={{ width: `${prediction.probability}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};