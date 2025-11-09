import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { DisasterChatbot } from '../DisasterChatbot';
import { Brain, TrendingUp, Target, AlertCircle, CheckCircle, Activity, Zap } from 'lucide-react';

export const AIInsights = () => {
  const [liveStats, setLiveStats] = useState({
    accuracy: 94.2,
    dataPoints: 156000,
    predictionTime: 2.3,
    activeModels: 12
  });

  const [riskPredictions, setRiskPredictions] = useState([
    {
      id: 1,
      type: 'Cyclone Risk',
      location: 'Bay of Bengal - Odisha Coast',
      probability: 82,
      timeframe: '72 hours',
      trend: 'increasing',
      factors: ['Sea surface temperature', 'Wind convergence', 'Low pressure system'],
      confidence: 'High'
    },
    {
      id: 2,
      type: 'Flood Risk',
      location: 'Kerala - Western Ghats',
      probability: 67,
      timeframe: '48 hours',
      trend: 'stable',
      factors: ['Monsoon intensity', 'River levels', 'Soil saturation'],
      confidence: 'High'
    },
    {
      id: 3,
      type: 'Heat Wave',
      location: 'Rajasthan - North Gujarat',
      probability: 78,
      timeframe: '24 hours',
      trend: 'increasing',
      factors: ['Temperature anomaly', 'Humidity deficit', 'Wind patterns'],
      confidence: 'Medium'
    },
    {
      id: 4,
      type: 'Landslide Risk',
      location: 'Himachal Pradesh Hills',
      probability: 45,
      timeframe: '96 hours',
      trend: 'decreasing',
      factors: ['Soil moisture', 'Slope stability', 'Rainfall intensity'],
      confidence: 'Medium'
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        accuracy: 92 + Math.random() * 4,
        dataPoints: 150000 + Math.floor(Math.random() * 20000),
        predictionTime: 2 + Math.random() * 1,
        activeModels: 10 + Math.floor(Math.random() * 5)
      }));

      // Update risk predictions with slight variations
      setRiskPredictions(prev => prev.map(prediction => ({
        ...prediction,
        probability: Math.max(20, Math.min(95, prediction.probability + (Math.random() - 0.5) * 5))
      })));
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const aiRecommendations = [
    {
      id: 1,
      priority: 'High',
      action: 'Alert NDRF teams for cyclone preparedness',
      location: 'Odisha Coastal Districts',
      reason: 'AI models predict 82% cyclone formation probability',
      status: 'in-progress'
    },
    {
      id: 2,
      priority: 'High',
      action: 'Issue heat wave advisory',
      location: 'Rajasthan & Gujarat',
      reason: 'Temperature models show 78% heat wave probability',
      status: 'pending'
    },
    {
      id: 3,
      priority: 'Medium',
      action: 'Monitor dam water levels',
      location: 'Kerala - Idukki District',
      reason: 'Flood risk models indicate heavy rainfall impact',
      status: 'completed'
    },
    {
      id: 4,
      priority: 'Medium',
      action: 'Landslide monitoring activation',
      location: 'Himachal Pradesh',
      reason: 'Geological stability analysis shows moderate risk',
      status: 'in-progress'
    },
    {
      id: 5,
      priority: 'Low',
      action: 'Update early warning systems',
      location: 'Tamil Nadu Coast',
      reason: 'Monsoon pattern analysis suggests system upgrade',
      status: 'pending'
    },
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-destructive';
    if (probability >= 40) return 'text-warning';
    return 'text-primary';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">AI Insights & Predictions</h2>
        <p className="text-muted-foreground">
          Machine learning powered risk assessment and predictive analytics
        </p>
      </div>

      {/* Disaster Help Chatbot */}
      <DisasterChatbot />

      {/* AI Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GlassCard variant="ai" className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Brain className="w-6 h-6 text-primary-glow" />
          </div>
          <p className="text-2xl font-bold text-primary-glow">{liveStats.accuracy.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">Model Accuracy</p>
        </GlassCard>
        <GlassCard variant="ai" className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="w-6 h-6 text-primary-glow" />
          </div>
          <p className="text-2xl font-bold text-primary-glow">{Math.floor(liveStats.dataPoints/1000)}K</p>
          <p className="text-sm text-muted-foreground">Live Data Points</p>
        </GlassCard>
        <GlassCard variant="ai" className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-6 h-6 text-primary-glow" />
          </div>
          <p className="text-2xl font-bold text-primary-glow">{liveStats.predictionTime.toFixed(1)}s</p>
          <p className="text-sm text-muted-foreground">Prediction Time</p>
        </GlassCard>
        <GlassCard variant="ai" className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-6 h-6 text-primary-glow" />
          </div>
          <p className="text-2xl font-bold text-primary-glow">{liveStats.activeModels}</p>
          <p className="text-sm text-muted-foreground">Active Models</p>
        </GlassCard>
      </div>

      {/* Risk Predictions */}
      <GlassCard variant="ai" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-primary-glow" />
          <h3 className="text-xl font-semibold text-foreground">AI Risk Predictions</h3>
        </div>
        <div className="space-y-4">
          {riskPredictions.map((prediction) => (
            <div key={prediction.id} className="p-4 rounded-xl bg-card/50 border border-glass-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">{prediction.type}</h4>
                  <p className="text-muted-foreground">{prediction.location}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getProbabilityColor(prediction.probability)}`}>
                    {prediction.probability}%
                  </p>
                  <p className="text-sm text-muted-foreground">in {prediction.timeframe}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${
                    prediction.trend === 'increasing' ? 'text-destructive' :
                    prediction.trend === 'decreasing' ? 'text-primary' : 'text-warning'
                  }`} />
                  <span className="text-sm text-muted-foreground capitalize">{prediction.trend}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary-glow" />
                  <span className="text-sm text-muted-foreground">{prediction.confidence} Confidence</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Key Risk Factors:</p>
                <div className="flex flex-wrap gap-2">
                  {prediction.factors.map((factor, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs bg-primary-glow/10 text-primary-glow">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Recommendations */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">AI Recommended Actions</h3>
        <div className="space-y-3">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="flex items-start gap-4 p-4 rounded-xl bg-card/30 hover:bg-card/50 transition-colors">
              <div className="mt-1">
                {getStatusIcon(rec.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{rec.action}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{rec.location}</p>
                <p className="text-xs text-muted-foreground">{rec.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Model Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Cyclone Prediction</span>
                <span className="text-sm font-medium text-foreground">96.8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '96.8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Monsoon Forecasting</span>
                <span className="text-sm font-medium text-foreground">94.7%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '94.7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Heat Wave Detection</span>
                <span className="text-sm font-medium text-foreground">91.3%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '91.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Landslide Risk</span>
                <span className="text-sm font-medium text-foreground">88.9%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '88.9%' }}></div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Predictions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Cyclone Fani - Odisha</p>
                <p className="text-xs text-muted-foreground">Predicted 5 days ago</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                ✓ Accurate
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Kerala Floods</p>
                <p className="text-xs text-muted-foreground">Predicted 1 week ago</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                ✓ Accurate
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Delhi Heat Wave</p>
                <p className="text-xs text-muted-foreground">Predicted 3 days ago</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                ✓ Accurate
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Assam Landslide</p>
                <p className="text-xs text-muted-foreground">Predicted 4 days ago</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">
                ~ Partial
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};