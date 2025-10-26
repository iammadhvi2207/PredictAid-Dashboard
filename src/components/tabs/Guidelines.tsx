import React from 'react';
import { GlassCard } from '../GlassCard';
import { Shield, AlertTriangle, Phone, Info, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const emergencyContacts = [
  { name: 'Emergency Services', number: '112', type: 'emergency' },
  { name: 'NDMA', number: '1078', type: 'disaster' },
  { name: 'Police', number: '100', type: 'police' },
  { name: 'Fire Brigade', number: '101', type: 'fire' },
  { name: 'Ambulance', number: '102', type: 'medical' },
  { name: 'Women Helpline', number: '1091', type: 'women' },
];

const indianDisasterTypes = [
  {
    type: 'Cyclone',
    icon: '🌀',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    guidelines: [
      'Listen to IMD warnings and track cyclone updates',
      'Store drinking water and non-perishable food',
      'Secure loose objects and board up windows',
      'Stay indoors during the cyclone passage',
      'Avoid going out during the eye of the cyclone'
    ]
  },
  {
    type: 'Monsoon Floods',
    icon: '🌊',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    guidelines: [
      'Monitor local weather alerts from IMD',
      'Move to higher ground during heavy rainfall',
      'Avoid walking or driving through waterlogged areas',
      'Keep emergency kit with food, water, and medicines',
      'Follow district administration evacuation orders'
    ]
  },
  {
    type: 'Heat Wave',
    icon: '🌡️',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    guidelines: [
      'Stay indoors during peak hours (11 AM - 4 PM)',
      'Drink plenty of water and ORS solutions',
      'Wear light-colored, loose cotton clothing',
      'Avoid alcohol and caffeine during heat waves',
      'Recognize heat stroke symptoms and seek help'
    ]
  },
  {
    type: 'Earthquake',
    icon: '🏗️',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    guidelines: [
      'Drop, Cover, and Hold On during shaking',
      'Stay away from heavy furniture and glass',
      'If outdoors, move away from buildings',
      'Turn off gas connections after earthquake',
      'Be prepared for aftershocks'
    ]
  },
  {
    type: 'Landslide',
    icon: '⛰️',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    guidelines: [
      'Evacuate immediately if cracks appear on slopes',
      'Listen for unusual sounds from hills/mountains',
      'Plant vegetation to stabilize soil',
      'Avoid construction on steep slopes',
      'Report land subsidence to local authorities'
    ]
  },
  {
    type: 'Drought',
    icon: '🏜️',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    guidelines: [
      'Conserve water and use drip irrigation',
      'Follow government water rationing guidelines',
      'Harvest rainwater during monsoon',
      'Plant drought-resistant crops',
      'Report acute water shortage to authorities'
    ]
  }
];

const preparednessChecklist = [
  'Emergency kit with 3 days of food and water',
  'Battery-powered radio for weather updates',
  'First aid kit and essential medicines',
  'Important documents in waterproof bag',
  'Emergency contact list with local numbers',
  'Flashlight with extra batteries',
  'Multi-purpose knife and rope',
  'Whistle for signaling help'
];

const indianResources = [
  {
    title: 'NDMA Portal',
    description: 'National Disaster Management Authority official website',
    url: 'https://ndma.gov.in',
    type: 'government'
  },
  {
    title: 'IMD Weather',
    description: 'India Meteorological Department forecasts and warnings',
    url: 'https://mausam.imd.gov.in',
    type: 'weather'
  },
  {
    title: 'SDMA Portal',
    description: 'State Disaster Management Authority resources',
    url: '#',
    type: 'state'
  },
  {
    title: 'NIDM Training',
    description: 'National Institute of Disaster Management courses',
    url: 'https://nidm.gov.in',
    type: 'training'
  }
];

export const Guidelines = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">🇮🇳 Indian Disaster Guidelines</h2>
        <p className="text-muted-foreground">
          Official disaster preparedness guidelines from NDMA, IMD, and State authorities
        </p>
      </div>

      {/* Emergency Contacts */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Phone className="w-6 h-6 text-destructive" />
          <h3 className="text-xl font-semibold text-foreground">Indian Emergency Numbers</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="p-4 rounded-lg bg-accent/30 border border-glass-border">
              <h4 className="font-semibold text-foreground text-sm">{contact.name}</h4>
              <p className="text-lg font-bold text-destructive">{contact.number}</p>
              <p className="text-xs text-muted-foreground capitalize">{contact.type}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Disaster-Specific Guidelines */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Indian Disaster Response Guidelines</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {indianDisasterTypes.map((disaster, index) => (
            <div key={index} className="p-5 rounded-lg bg-accent/20 border border-glass-border">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${disaster.bgColor} flex items-center justify-center`}>
                  <span className="text-xl">{disaster.icon}</span>
                </div>
                <h4 className={`text-lg font-semibold ${disaster.color}`}>{disaster.type}</h4>
              </div>
              <ul className="space-y-2">
                {disaster.guidelines.map((guideline, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Regional Preparedness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Emergency Preparedness Kit</h3>
          </div>
          <div className="space-y-3">
            {preparednessChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-primary border-2 border-muted rounded focus:ring-primary" 
                />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">💡 India-Specific Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep Aadhaar and other ID cards in waterproof bag</li>
              <li>• Store extra cash in small denominations</li>
              <li>• Include traditional medicines if used regularly</li>
              <li>• Keep regional language emergency phrases ready</li>
            </ul>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Official Resources</h3>
          </div>
          <div className="space-y-4">
            {indianResources.map((resource, index) => (
              <div key={index} className="p-4 rounded-lg bg-accent/30 border border-glass-border">
                <h4 className="font-semibold text-foreground mb-2">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {resource.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Portal
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* State-wise Information */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">State-wise Disaster Risks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Coastal States</h4>
            <p className="text-sm text-blue-700 mb-2">Odisha, Andhra Pradesh, Tamil Nadu, Kerala</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              High Cyclone Risk
            </span>
          </div>
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">Northern Plains</h4>
            <p className="text-sm text-red-700 mb-2">Rajasthan, Punjab, Haryana, Delhi</p>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              Heat Wave & Drought
            </span>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Himalayan Region</h4>
            <p className="text-sm text-green-700 mb-2">J&K, Himachal, Uttarakhand</p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Landslide & Flash Floods
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Important Reminders */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-warning" />
          <h3 className="text-xl font-semibold text-foreground">Important Reminders for India</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-semibold text-warning mb-2">🌧️ Monsoon Season</h4>
            <p className="text-sm text-muted-foreground">
              June-September: Monitor IMD updates daily and avoid flood-prone areas
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">🏛️ Local Administration</h4>
            <p className="text-sm text-muted-foreground">
              Contact District Collector's office for local emergency protocols
            </p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <h4 className="font-semibold text-destructive mb-2">📱 Early Warning</h4>
            <p className="text-sm text-muted-foreground">
              Enable emergency alerts on mobile and follow official social media
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};