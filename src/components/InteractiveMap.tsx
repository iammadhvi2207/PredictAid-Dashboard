import React from 'react';

const disasterLocations = [
  {
    id: 1,
    title: 'San Francisco Bay Area',
    type: 'Wildfire Risk',
    severity: 'High',
    description: 'High wildfire risk due to dry conditions and strong winds.',
    color: '#ff4444',
    left: '15%',
    top: '35%'
  },
  {
    id: 2,
    title: 'Los Angeles',
    type: 'Earthquake Zone',
    severity: 'Medium',
    description: 'Active seismic zone with ongoing monitoring.',
    color: '#ffaa00',
    left: '18%',
    top: '55%'
  },
  {
    id: 3,
    title: 'Miami',
    type: 'Hurricane Watch',
    severity: 'Low',
    description: 'Currently in hurricane season, monitoring conditions.',
    color: '#00aaff',
    left: '80%',
    top: '70%'
  },
  {
    id: 4,
    title: 'Houston',
    type: 'Flood Risk',
    severity: 'Medium',
    description: 'Elevated flood risk due to recent rainfall.',
    color: '#ffaa00',
    left: '55%',
    top: '60%'
  },
];

export const InteractiveMap = () => {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-card relative bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Map background with subtle pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {/* Stylized continents */}
          <path 
            d="M100,200 Q200,150 300,200 T500,250 Q600,200 700,250 L700,400 Q600,350 500,400 T300,450 Q200,400 100,450 Z" 
            fill="hsl(var(--primary))" 
            opacity="0.3"
          />
          <path 
            d="M150,100 Q250,50 350,100 T550,150 L550,300 Q450,250 350,300 T150,300 Z" 
            fill="hsl(var(--primary))" 
            opacity="0.2"
          />
          <path 
            d="M50,350 Q150,300 250,350 T450,400 L450,550 Q350,500 250,550 T50,550 Z" 
            fill="hsl(var(--primary))" 
            opacity="0.25"
          />
        </svg>
      </div>

      {/* Grid overlay for map feel */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>

      {/* Disaster markers */}
      {disasterLocations.map((location) => (
        <div
          key={location.id}
          className="absolute group cursor-pointer animate-pulse"
          style={{ left: location.left, top: location.top, transform: 'translate(-50%, -50%)' }}
        >
          {/* Marker pin */}
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: location.color }}
            >
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            
            {/* Popup on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-card backdrop-blur-sm border border-glass-border rounded-lg shadow-lg p-3 min-w-[200px] z-50">
                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-sm mb-1">{location.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{location.type}</p>
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      location.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                      location.severity === 'Medium' ? 'bg-warning/20 text-warning' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {location.severity} Risk
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{location.description}</p>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ripple effect */}
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: location.color }}
          ></div>
        </div>
      ))}

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-card/80 backdrop-blur-sm border border-glass-border rounded-lg shadow-card flex items-center justify-center hover:bg-card transition-colors">
          <span className="text-foreground font-bold">+</span>
        </button>
        <button className="w-10 h-10 bg-card/80 backdrop-blur-sm border border-glass-border rounded-lg shadow-card flex items-center justify-center hover:bg-card transition-colors">
          <span className="text-foreground font-bold">−</span>
        </button>
      </div>

      {/* Map legend */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-glass-border rounded-lg shadow-card p-3">
        <h4 className="text-sm font-semibold text-foreground mb-2">Risk Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-xs text-muted-foreground">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};