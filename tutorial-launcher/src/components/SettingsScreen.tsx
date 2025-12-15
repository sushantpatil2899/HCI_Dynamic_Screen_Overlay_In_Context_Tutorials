import { Save, FolderOpen } from 'lucide-react';
import { AppSettings } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { useRef } from 'react';

interface SettingsScreenProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export function SettingsScreen({ settings, onSettingsChange }: SettingsScreenProps) {
  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = async () => {
    // Use Electron native file dialog if available (desktop app)
    if (window.electron) {
      console.log('Using Electron file dialog...');
      const result = await window.electron.openPythonFile();
      
      console.log('File dialog result:', result);
      
      if (result) {
        // Electron API returns full file path
        console.log('Setting path to:', result.filePath);
        onSettingsChange({ 
          ...settings, 
          overlayScriptPath: result.filePath
        });
      }
    } else {
      console.log('Electron not available, using browser fallback');
      // Fallback to browser file picker (for web preview)
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Just use the filename for browser mode
      const fileName = file.name;
      onSettingsChange({ 
        ...settings, 
        overlayScriptPath: fileName
      });
    }
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-[#2A2A2A]">Settings</h2>
        <p className="text-[#5C5C5C]">Configure how the Tutorial Launcher behaves</p>
      </div>

      {/* App Behavior Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="text-[#2A2A2A]">App Behavior</h3>
          <p className="text-[#5C5C5C]">Control the launcher window behavior</p>
        </div>

        <div className="space-y-5">
          {/* Auto-minimize on Start */}
          <div className="flex items-center justify-between py-4 border-b border-[#E5E7EB]">
            <div className="space-y-1">
              <label className="text-[#2A2A2A] block">Auto-minimize on Start</label>
              <p className="text-[#5C5C5C]">
                Automatically minimize the launcher window when starting a tutorial
              </p>
            </div>
            <Switch
              checked={settings.autoMinimizeOnStart}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, autoMinimizeOnStart: checked })
              }
            />
          </div>

          {/* Restore window when tutorial ends */}
          <div className="flex items-center justify-between py-4 border-b border-[#E5E7EB]">
            <div className="space-y-1">
              <label className="text-[#2A2A2A] block">Restore window when tutorial ends</label>
              <p className="text-[#5C5C5C]">
                Bring the launcher window back to focus after a tutorial completes
              </p>
            </div>
            <Switch
              checked={settings.restoreWindowOnEnd}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, restoreWindowOnEnd: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Overlay Runner Configuration */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="text-[#2A2A2A]">Overlay Runner Configuration</h3>
          <p className="text-[#5C5C5C]">Configure the Python overlay script settings</p>
        </div>

        <div className="space-y-2">
          <label className="text-[#2A2A2A] block">Path to overlay.py script</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={settings.overlayScriptPath}
              onChange={(e) =>
                onSettingsChange({ ...settings, overlayScriptPath: e.target.value })
              }
              className="h-12 bg-[#F8F9FB] border-0 rounded-lg flex-1"
            />
            <Button
              variant="outline"
              className="h-12 px-6 rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
              onClick={handleBrowseClick}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Browse...
            </Button>
            {/* Hidden file input for browser fallback */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".py"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <p className="text-[#5C5C5C]">
            The launcher will execute this Python script to display tutorial overlays
          </p>
        </div>
      </div>

      {/* Logging */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="text-[#2A2A2A]">Logging & Statistics</h3>
          <p className="text-[#5C5C5C]">Control what data is tracked</p>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="space-y-1">
            <label className="text-[#2A2A2A] block">Track tutorial completion statistics</label>
            <p className="text-[#5C5C5C]">
              Record when tutorials are started, completed, and how many times they've been run
            </p>
          </div>
          <Switch
            checked={settings.trackStatistics}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, trackStatistics: checked })
            }
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="h-12 px-8 rounded-lg bg-[#0078D4] hover:bg-[#0066B8] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}