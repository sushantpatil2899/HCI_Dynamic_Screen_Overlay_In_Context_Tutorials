import { Tutorial, AppSettings } from '../App';

/**
 * Configuration structure stored in the config file
 * In a real Electron app, this would be stored at:
 * Windows: %APPDATA%/TutorialLauncher/config.json
 * macOS: ~/Library/Application Support/TutorialLauncher/config.json
 * Linux: ~/.config/TutorialLauncher/config.json
 */
export interface AppConfig {
  version: string;
  lastModified: string;
  tutorials: Tutorial[];
  settings: AppSettings;
}

const CONFIG_KEY = 'tutorial-launcher-config';
const CONFIG_VERSION = '1.0.0';

/**
 * Default configuration with built-in tutorials
 */
const getDefaultConfig = (): AppConfig => ({
  version: CONFIG_VERSION,
  lastModified: new Date().toISOString(),
  tutorials: [],
  settings: {
    autoMinimizeOnStart: true,
    restoreWindowOnEnd: true,
    overlayScriptPath: 'C:/Program Files/Tutorial Launcher/overlay.py',
    trackStatistics: true,
    theme: 'light'
  }
});

/**
 * Load configuration from storage
 * In Electron: fs.readFileSync(configPath, 'utf-8')
 * In Browser: localStorage.getItem()
 */
export const loadConfig = (): AppConfig => {
  try {
    // Simulating file system read with localStorage
    const stored = localStorage.getItem(CONFIG_KEY);
    
    if (!stored) {
      // First time - initialize with default config
      const defaultConfig = getDefaultConfig();
      saveConfig(defaultConfig);
      return defaultConfig;
    }
    
    const config: AppConfig = JSON.parse(stored);
    
    // Version migration logic would go here
    if (config.version !== CONFIG_VERSION) {
      console.log(`Migrating config from ${config.version} to ${CONFIG_VERSION}`);
      // Perform migration if needed
      config.version = CONFIG_VERSION;
      saveConfig(config);
    }
    
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    // Fallback to defaults if config is corrupted
    const defaultConfig = getDefaultConfig();
    saveConfig(defaultConfig);
    return defaultConfig;
  }
};

/**
 * Save configuration to storage
 * In Electron: fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
 * In Browser: localStorage.setItem()
 */
export const saveConfig = (config: AppConfig): void => {
  try {
    config.lastModified = new Date().toISOString();
    
    // Simulating file system write with localStorage
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config, null, 2));
    
    console.log('Config saved successfully');
  } catch (error) {
    console.error('Error saving config:', error);
    throw new Error('Failed to save configuration');
  }
};

/**
 * Update tutorials in the config
 */
export const saveTutorials = (tutorials: Tutorial[]): void => {
  const config = loadConfig();
  config.tutorials = tutorials;
  saveConfig(config);
};

/**
 * Update settings in the config
 */
export const saveSettings = (settings: AppSettings): void => {
  const config = loadConfig();
  config.settings = settings;
  saveConfig(config);
};

/**
 * Export config for backup (download as JSON file)
 */
export const exportConfig = (): string => {
  const config = loadConfig();
  return JSON.stringify(config, null, 2);
};

/**
 * Import config from backup (restore from JSON file)
 */
export const importConfig = (jsonString: string): void => {
  try {
    const config: AppConfig = JSON.parse(jsonString);
    
    // Validate structure
    if (!config.tutorials || !config.settings) {
      throw new Error('Invalid config structure');
    }
    
    saveConfig(config);
  } catch (error) {
    console.error('Error importing config:', error);
    throw new Error('Failed to import configuration');
  }
};

/**
 * Reset to default configuration
 */
export const resetConfig = (): void => {
  const defaultConfig = getDefaultConfig();
  saveConfig(defaultConfig);
};
