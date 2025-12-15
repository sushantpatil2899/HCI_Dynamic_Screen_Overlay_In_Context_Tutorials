import { Monitor, FileJson, Play, ArrowRight, Layers, Terminal, CheckCircle } from 'lucide-react';

export function SystemDiagram() {
  return (
    <div className="max-w-[1100px] mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-[#2A2A2A]">System Architecture</h2>
        <p className="text-[#5C5C5C]">
          Understanding how the Tutorial Launcher and Overlay Engine work together
        </p>
      </div>

      {/* Main Diagram */}
      <div className="bg-white rounded-xl p-12 shadow-sm">
        <div className="flex items-start justify-between gap-8">
          {/* Component 1: Desktop App */}
          <div className="flex-1 space-y-4">
            <div className="bg-[#DBEAFE] rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-[#0078D4] rounded-xl flex items-center justify-center mx-auto">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-center text-[#0078D4]">Desktop UI App</h3>
              <div className="space-y-2 text-[#5C5C5C]">
                <p className="text-center">Tutorial Launcher</p>
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0078D4]" />
                    <span>Browse tutorials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0078D4]" />
                    <span>Import new tutorials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0078D4]" />
                    <span>Manage metadata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0078D4]" />
                    <span>Launch overlay</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#0078D4]/20 space-y-2">
                <p className="text-sm text-[#5C5C5C] text-center">Built with:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white text-[#0078D4] rounded-full text-sm">
                    Electron
                  </span>
                  <span className="px-3 py-1 bg-white text-[#0078D4] rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-white text-[#0078D4] rounded-full text-sm">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>

            {/* Storage */}
            <div className="bg-[#F8F9FB] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#5C5C5C]">
                <Layers className="w-4 h-4" />
                <span>Local Storage</span>
              </div>
              <p className="text-sm text-[#5C5C5C]">
                Stores tutorial registry, metadata, and user settings
              </p>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="flex flex-col items-center justify-center gap-2 pt-16">
            <ArrowRight className="w-8 h-8 text-[#0078D4]" />
            <div className="text-center space-y-1">
              <p className="text-sm text-[#0078D4]">Launches</p>
              <code className="text-xs text-[#5C5C5C] bg-[#F8F9FB] px-2 py-1 rounded">
                subprocess
              </code>
            </div>
          </div>

          {/* Component 2: Python Overlay */}
          <div className="flex-1 space-y-4">
            <div className="bg-[#F3E8FF] rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-[#9333EA] rounded-xl flex items-center justify-center mx-auto">
                <Terminal className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-center text-[#9333EA]">Overlay Engine</h3>
              <div className="space-y-2 text-[#5C5C5C]">
                <p className="text-center">Python Script</p>
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#9333EA]" />
                    <span>Parse JSON tutorial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#9333EA]" />
                    <span>Display overlay UI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#9333EA]" />
                    <span>Detect user actions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#9333EA]" />
                    <span>Auto-advance steps</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#9333EA]/20 space-y-2">
                <p className="text-sm text-[#5C5C5C] text-center">Built with:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white text-[#9333EA] rounded-full text-sm">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-white text-[#9333EA] rounded-full text-sm">
                    PyQt/Tkinter
                  </span>
                  <span className="px-3 py-1 bg-white text-[#9333EA] rounded-full text-sm">
                    PyAutoGUI
                  </span>
                </div>
              </div>
            </div>

            {/* JSON File */}
            <div className="bg-[#F8F9FB] rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#5C5C5C]">
                <FileJson className="w-4 h-4" />
                <span>Tutorial JSON</span>
              </div>
              <p className="text-sm text-[#5C5C5C]">
                Contains step definitions and action detection rules
              </p>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex flex-col items-center justify-center gap-2 pt-16">
            <ArrowRight className="w-8 h-8 text-[#10B981]" />
            <div className="text-center space-y-1">
              <p className="text-sm text-[#10B981]">Displays</p>
              <p className="text-xs text-[#5C5C5C]">on screen</p>
            </div>
          </div>

          {/* Component 3: User */}
          <div className="flex-1 space-y-4">
            <div className="bg-[#ECFDF5] rounded-xl p-8 space-y-4">
              <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center mx-auto">
                <Play className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-center text-[#10B981]">User Experience</h3>
              <div className="space-y-2 text-[#5C5C5C]">
                <p className="text-center">Interactive Tutorial</p>
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span>See instructions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span>Follow steps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span>Perform actions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span>Learn by doing</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#10B981]/20">
                <p className="text-sm text-[#5C5C5C] text-center">
                  Transparent overlay guides user through real applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Flow */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <h3 className="text-[#2A2A2A]">Communication Flow</h3>
        
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4 p-4 bg-[#F8F9FB] rounded-lg">
            <div className="w-8 h-8 bg-[#0078D4] rounded-full flex items-center justify-center flex-shrink-0 text-white">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-[#2A2A2A] mb-1">User Clicks "Start Tutorial"</h4>
              <p className="text-[#5C5C5C]">
                The Desktop UI App retrieves the tutorial JSON file path from the registry
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 bg-[#F8F9FB] rounded-lg">
            <div className="w-8 h-8 bg-[#0078D4] rounded-full flex items-center justify-center flex-shrink-0 text-white">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-[#2A2A2A] mb-1">App Minimizes & Launches Overlay</h4>
              <p className="text-[#5C5C5C]">
                The launcher window minimizes and executes: <code className="bg-white px-2 py-0.5 rounded">python overlay.py "path/to/tutorial.json"</code>
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-4 bg-[#F8F9FB] rounded-lg">
            <div className="w-8 h-8 bg-[#9333EA] rounded-full flex items-center justify-center flex-shrink-0 text-white">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-[#2A2A2A] mb-1">Overlay Engine Runs</h4>
              <p className="text-[#5C5C5C]">
                The Python script parses the JSON, displays the transparent overlay, and begins monitoring for user actions
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-4 bg-[#F8F9FB] rounded-lg">
            <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 text-white">
              4
            </div>
            <div className="flex-1">
              <h4 className="text-[#2A2A2A] mb-1">Tutorial Completes</h4>
              <p className="text-[#5C5C5C]">
                When the tutorial finishes or user exits, the overlay closes and optionally restores the launcher window
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}