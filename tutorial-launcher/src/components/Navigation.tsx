import { Home, Plus, Settings, HelpCircle, Network } from 'lucide-react';

interface NavigationProps {
  currentScreen: 'home' | 'import' | 'details' | 'settings' | 'help' | 'diagram';
  onNavigate: (screen: 'home' | 'import' | 'details' | 'settings' | 'help' | 'diagram') => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0078D4] rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-[#2A2A2A]">Interactive Tutorial Launcher</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                currentScreen === 'home'
                  ? 'bg-[#0078D4] text-white'
                  : 'text-[#5C5C5C] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('import')}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                currentScreen === 'import'
                  ? 'bg-[#0078D4] text-white'
                  : 'text-[#5C5C5C] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Import Tutorial</span>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('diagram')}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                currentScreen === 'diagram'
                  ? 'bg-[#0078D4] text-white'
                  : 'text-[#5C5C5C] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4" />
                <span>System</span>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('settings')}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                currentScreen === 'settings'
                  ? 'bg-[#0078D4] text-white'
                  : 'text-[#5C5C5C] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('help')}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                currentScreen === 'help'
                  ? 'bg-[#0078D4] text-white'
                  : 'text-[#5C5C5C] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
