import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" size={16} />
            <input
              type="text"
              placeholder="Search records, cadences..."
              className="pl-10 pr-4 py-2 bg-cardBg border border-border rounded-md text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-cardBg transition-colors">
            <Bell size={20} className="text-textSecondary" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-textPrimary">John Doe</p>
              <p className="text-xs text-textSecondary">Pro Plan</p>
            </div>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;