import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { ImportTutorialScreen } from './components/ImportTutorialScreen';
import { TutorialDetailsScreen } from './components/TutorialDetailsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { HelpScreen } from './components/HelpScreen';
import { SystemDiagram } from './components/SystemDiagram';
import { loadConfig, saveTutorials, saveSettings } from './lib/storage';

// JSON Structure Interfaces
export interface TextItem {
  type: 'text';
  params: {
    content: string;
    position: [number, number];
    font_family: string;
    font_size: number;
    color: string;
  };
}

export interface ArrowItem {
  type: 'arrow';
  params: {
    start: [number, number];
    direction: 'up' | 'down' | 'left' | 'right';
    length: number;
    color: string;
    thickness: number;
  };
}

export interface RectItem {
  type: 'rect';
  params: {
    position: [number, number];
    size: [number, number];
    border_color: string;
    border_thickness: number;
    fill_color: string;
    fill_opacity: number;
    corner_radius: number;
  };
}

export type Item = TextItem | ArrowItem | RectItem;

export interface ClickAction {
  type: 'click';
  region: [number, number, number, number];
  padding: number;
}

export interface TypeAction {
  type: 'type';
  text: string;
}

export interface AnyAction {
  type: 'any';
  options: Array<ClickAction | TypeAction>;
}

export type Action = ClickAction | TypeAction | AnyAction;

export interface Step {
  items: Item[];
  action?: Action;
}

export interface TutorialJSON {
  steps: Step[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  os: string;
  source: 'built-in' | 'imported';
  jsonPath: string;
  jsonValid: 'valid' | 'missing' | 'error';
  stepCount: number;
  hasAutoAdvance: boolean;
  lastRun?: string;
  totalRuns: number;
  isFavorite: boolean;
  steps?: Step[];
}

export interface AppSettings {
  autoMinimizeOnStart: boolean;
  restoreWindowOnEnd: boolean;
  overlayScriptPath: string;
  trackStatistics: boolean;
  theme: 'light' | 'dark';
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'import' | 'details' | 'settings' | 'help' | 'diagram'>('home');
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  
  // Load initial state from config file
  const initialConfig = loadConfig();
  const [tutorials, setTutorials] = useState<Tutorial[]>(initialConfig.tutorials);
  const [settings, setSettings] = useState<AppSettings>(initialConfig.settings);

  // Listen for overlay closing to restore window (Electron only)
  useEffect(() => {
    if (window.electron && settings.restoreWindowOnEnd) {
      window.electron.onOverlayClosed((code) => {
        console.log(`Overlay closed with code: ${code}`);
        window.electron!.restoreWindow();
      });
    }
  }, [settings.restoreWindowOnEnd]);

  // Helper function to update tutorials and persist
  const updateTutorials = (updater: (prev: Tutorial[]) => Tutorial[]) => {
    setTutorials(prev => {
      const updated = updater(prev);
      saveTutorials(updated);
      return updated;
    });
  };

  // Helper function to update settings and persist
  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleViewDetails = (tutorialId: string) => {
    setSelectedTutorialId(tutorialId);
    setCurrentScreen('details');
  };

  const handleStartTutorial = async (tutorialId: string) => {
    const tutorial = tutorials.find(t => t.id === tutorialId);
    if (tutorial && tutorial.jsonValid === 'valid') {
      console.log('Starting tutorial with settings:', settings);
      console.log('Python path:', settings.overlayScriptPath);
      console.log('JSON path:', tutorial.jsonPath);
      
      // Use Electron API if available (desktop app)
      if (window.electron) {
        try {
          const result = await window.electron.launchOverlay({
            pythonPath: settings.overlayScriptPath,
            jsonPath: tutorial.jsonPath,
            autoMinimize: settings.autoMinimizeOnStart
          });
          
          if (result.success) {
            // Update last run and total runs
            updateTutorials(prev => prev.map(t => 
              t.id === tutorialId 
                ? { ...t, lastRun: new Date().toISOString().split('T')[0], totalRuns: t.totalRuns + 1 }
                : t
            ));
          } else {
            alert(`Failed to start tutorial:\n${result.error}`);
          }
        } catch (error) {
          alert(`Error starting tutorial:\n${error}`);
        }
      } else {
        // Fallback for browser preview (not running in Electron)
        alert(`Starting tutorial: ${tutorial.title}\n\nThe app would minimize and launch:\npython ${settings.overlayScriptPath} "${tutorial.jsonPath}"`);
        
        // Update last run and total runs
        updateTutorials(prev => prev.map(t => 
          t.id === tutorialId 
            ? { ...t, lastRun: new Date().toISOString().split('T')[0], totalRuns: t.totalRuns + 1 }
            : t
        ));
      }
    }
  };

  const handleToggleFavorite = (tutorialId: string) => {
    updateTutorials(prev => prev.map(t => 
      t.id === tutorialId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const handleDeleteTutorial = (tutorialId: string) => {
    if (confirm('Are you sure you want to delete this tutorial?')) {
      updateTutorials(prev => prev.filter(t => t.id !== tutorialId));
      setCurrentScreen('home');
    }
  };

  const handleAddTutorial = (tutorial: Omit<Tutorial, 'id' | 'totalRuns' | 'isFavorite'>) => {
    const newTutorial: Tutorial = {
      ...tutorial,
      id: Date.now().toString(),
      totalRuns: 0,
      isFavorite: false
    };
    updateTutorials(prev => [...prev, newTutorial]);
    setCurrentScreen('home');
  };

  const selectedTutorial = selectedTutorialId ? tutorials.find(t => t.id === selectedTutorialId) : null;

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
      />
      
      <main className="max-w-[1400px] mx-auto px-12 py-8">
        {currentScreen === 'home' && (
          <HomeScreen
            tutorials={tutorials}
            onViewDetails={handleViewDetails}
            onStartTutorial={handleStartTutorial}
            onToggleFavorite={handleToggleFavorite}
            onDeleteTutorial={handleDeleteTutorial}
          />
        )}
        
        {currentScreen === 'import' && (
          <ImportTutorialScreen
            onSave={handleAddTutorial}
            onCancel={() => setCurrentScreen('home')}
          />
        )}
        
        {currentScreen === 'details' && selectedTutorial && (
          <TutorialDetailsScreen
            tutorial={selectedTutorial}
            onStart={handleStartTutorial}
            onDelete={handleDeleteTutorial}
            onBack={() => setCurrentScreen('home')}
          />
        )}
        
        {currentScreen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onSettingsChange={updateSettings}
          />
        )}
        
        {currentScreen === 'help' && (
          <HelpScreen />
        )}
        
        {currentScreen === 'diagram' && (
          <SystemDiagram />
        )}
      </main>
    </div>
  );
}

export default App;