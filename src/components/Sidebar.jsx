import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Target, 
  Mail, 
  Shield,
  Settings,
  HelpCircle 
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enrichment', label: 'Data Enrichment', icon: Database },
    { id: 'scoring', label: 'Lead Scoring', icon: Target },
    { id: 'cadences', label: 'Follow-up Cadences', icon: Mail },
    { id: 'health', label: 'Data Health', icon: Shield },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-textPrimary">Enrichly</h1>
        <p className="text-sm text-textSecondary">CRM Supercharged</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    isActive 
                      ? 'bg-accent text-white' 
                      : 'text-textSecondary hover:text-textPrimary hover:bg-cardBg'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border">
        <ul className="space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors text-textSecondary hover:text-textPrimary hover:bg-cardBg"
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;