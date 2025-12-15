const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let mainWindow;
let overlayProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    backgroundColor: '#FFFFFF',
    titleBarStyle: 'default',
    show: false
  });

  // Load the React app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    // Kill overlay process if running
    if (overlayProcess) {
      overlayProcess.kill();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers

// File picker for JSON files
ipcMain.handle('dialog:openJson', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JSON Files', extensions: ['json'] }
    ]
  });
  
  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }
  
  const filePath = result.filePaths[0];
  
  try {
    // Read and validate JSON
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    
    // Validate structure
    if (!parsed.steps || !Array.isArray(parsed.steps)) {
      return {
        success: false,
        error: 'Invalid JSON: Missing "steps" array'
      };
    }
    
    const stepCount = parsed.steps.length;
    const hasAutoAdvance = parsed.steps.some(step => 
      step.action && (step.action.type === 'click' || step.action.type === 'type' || step.action.type === 'any')
    );
    
    // Validate step structure
    const invalidStep = parsed.steps.findIndex((step, index) => {
      if (!step.items || !Array.isArray(step.items)) {
        return true;
      }
      return false;
    });
    
    if (invalidStep !== -1) {
      return {
        success: false,
        error: `Invalid step structure at step ${invalidStep + 1}: Missing "items" array`
      };
    }
    
    return {
      success: true,
      filePath: filePath,
      fileName: path.basename(filePath),
      stepCount: stepCount,
      hasAutoAdvance: hasAutoAdvance
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// File picker for Python files
ipcMain.handle('dialog:openPython', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Python Files', extensions: ['py'] }
    ]
  });
  
  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }
  
  return {
    filePath: result.filePaths[0],
    fileName: path.basename(result.filePaths[0])
  };
});

// Launch Python overlay script
ipcMain.handle('overlay:launch', async (event, { pythonPath, jsonPath, autoMinimize }) => {
  try {
    // Verify files exist
    if (!fs.existsSync(pythonPath)) {
      return {
        success: false,
        error: 'Python script not found: ' + pythonPath
      };
    }
    
    if (!fs.existsSync(jsonPath)) {
      return {
        success: false,
        error: 'Tutorial JSON not found: ' + jsonPath
      };
    }
    
    // Kill existing overlay process if running
    if (overlayProcess) {
      overlayProcess.kill();
    }
    
    // Launch Python script with JSON path as argument
    overlayProcess = spawn('python', [pythonPath, jsonPath]);
    
    overlayProcess.stdout.on('data', (data) => {
      console.log(`Overlay stdout: ${data}`);
    });
    
    overlayProcess.stderr.on('data', (data) => {
      console.error(`Overlay stderr: ${data}`);
    });
    
    overlayProcess.on('close', (code) => {
      console.log(`Overlay process exited with code ${code}`);
      overlayProcess = null;
      
      // Restore window if configured
      mainWindow.webContents.send('overlay:closed', code);
    });
    
    // Minimize window if configured
    if (autoMinimize) {
      mainWindow.minimize();
    }
    
    return {
      success: true,
      message: 'Tutorial overlay launched successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// Window control
ipcMain.handle('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window:restore', () => {
  if (mainWindow) {
    mainWindow.restore();
    mainWindow.focus();
  }
});
