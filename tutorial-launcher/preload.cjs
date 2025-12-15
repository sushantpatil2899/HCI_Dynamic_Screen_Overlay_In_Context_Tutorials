const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // File dialog APIs
  openJsonFile: () => ipcRenderer.invoke('dialog:openJson'),
  openPythonFile: () => ipcRenderer.invoke('dialog:openPython'),
  
  // Overlay control APIs
  launchOverlay: (config) => ipcRenderer.invoke('overlay:launch', config),
  
  // Window control APIs
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  restoreWindow: () => ipcRenderer.invoke('window:restore'),
  
  // Listen for overlay events
  onOverlayClosed: (callback) => {
    ipcRenderer.on('overlay:closed', (event, code) => callback(code));
  }
});
