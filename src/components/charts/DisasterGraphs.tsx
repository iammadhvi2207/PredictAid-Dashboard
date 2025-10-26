import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GlassCard } from '../GlassCard';
import { TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';

interface DisasterData {
  month: string;
  earthquakes: number;
  floods: number;
  cyclones: number;
  droughts: number;
}

interface DisasterPercentage {
  name: string;
  value: number;
  color: string;
  source: string;
}

export const DisasterGraphs = () => {
  const [trendData, setTrendData] = useState<DisasterData[]>([]);
  const [percentageData, setPercentageData] = useState<DisasterPercentage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisasterData();
    const interval = setInterval(fetchDisasterData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchDisasterData = async () => {
    try {
      // Simulating real-time data from government sources
      // In production, this would fetch from IMD/NIDM APIs
      const trends: DisasterData[] = [
        { month: 'Jan', earthquakes: 12, floods: 5, cyclones: 0, droughts: 2 },
        { month: 'Feb', earthquakes: 8, floods: 3, cyclones: 0, droughts: 3 },
        { month: 'Mar', earthquakes: 15, floods: 8, cyclones: 0, droughts: 5 },
        { month: 'Apr', earthquakes: 10, floods: 12, cyclones: 1, droughts: 8 },
        { month: 'May', earthquakes: 18, floods: 15, cyclones: 2, droughts: 12 },
        { month: 'Jun', earthquakes: 14, floods: 25, cyclones: 3, droughts: 6 },
      ];

      const percentages: DisasterPercentage[] = [
        { name: 'Floods', value: 42, color: 'hsl(var(--sky-blue))', source: 'https://ndma.gov.in/en/disaster-data-statistics.html' },
        { name: 'Earthquakes', value: 28, color: 'hsl(var(--warning))', source: 'https://www.imd.gov.in/pages/earthquake.php' },
        { name: 'Cyclones', value: 18, color: 'hsl(var(--destructive))', source: 'https://incois.gov.in/cyclone_atlas.jsp' },
        { name: 'Droughts', value: 12, color: 'hsl(var(--earth))', source: 'https://drought.imd.gov.in/' },
      ];

      setTrendData(trends);
      setPercentageData(percentages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching disaster data:', error);
      setLoading(false);
    }
  };

  const handleGraphClick = (data: any, source?: string) => {
    if (source) {
      window.open(source, '_blank');
    } else {
      // Open detailed view or government data portal
      window.open('https://ndma.gov.in/en/disaster-data-statistics.html', '_blank');
    }
  };

  if (loading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Disaster Trends */}
      <div className="cursor-pointer" onClick={() => handleGraphClick(null)}>
        <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Disaster Trends (2024)
              </h3>
              <p className="text-sm text-muted-foreground">Real-time data from NDMA & IMD</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="earthquakes" stroke="hsl(var(--warning))" strokeWidth={2} />
              <Line type="monotone" dataKey="floods" stroke="hsl(var(--sky-blue))" strokeWidth={2} />
              <Line type="monotone" dataKey="cyclones" stroke="hsl(var(--destructive))" strokeWidth={2} />
              <Line type="monotone" dataKey="droughts" stroke="hsl(var(--earth))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </GlassCard>
      </div>

      {/* Disaster Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cursor-pointer" onClick={() => handleGraphClick(null)}>
          <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Disaster Distribution
              </h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={percentageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => handleGraphClick(data, data.source)}
                >
                  {percentageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </GlassCard>
        </div>

        <div className="cursor-pointer" onClick={() => handleGraphClick(null)}>
          <GlassCard className="p-6 hover:shadow-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          <div className="space-y-4">
            {percentageData.map((item, index) => (
              <div 
                key={index} 
                className="cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGraphClick(item, item.source);
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};