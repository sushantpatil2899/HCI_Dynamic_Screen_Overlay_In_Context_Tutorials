export interface ElectronAPI {
  openJsonFile: () => Promise<{
    success: boolean;
    filePath?: string;
    fileName?: string;
    stepCount?: number;
    hasAutoAdvance?: boolean;
    error?: string;
  } | null>;
  
  openPythonFile: () => Promise<{
    filePath: string;
    fileName: string;
  } | null>;
  
  launchOverlay: (config: {
    pythonPath: string;
    jsonPath: string;
    autoMinimize: boolean;
  }) => Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }>;
  
  minimizeWindow: () => Promise<void>;
  restoreWindow: () => Promise<void>;
  onOverlayClosed: (callback: (code: number) => void) => void;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {};
