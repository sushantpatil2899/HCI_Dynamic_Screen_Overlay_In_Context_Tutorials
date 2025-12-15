import { BookOpen, Github, Mail, FileJson, HelpCircle, Layers } from 'lucide-react';
import { Button } from './ui/button';

export function HelpScreen() {
  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-[#2A2A2A]">Help & Documentation</h2>
        <p className="text-[#5C5C5C]">Learn how to use the Interactive Tutorial Launcher</p>
      </div>

      {/* What is this app */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-[#0078D4]" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-[#2A2A2A]">What is Interactive Tutorial Launcher?</h3>
            <p className="text-[#5C5C5C]">
              Interactive Tutorial Launcher is a desktop application that helps you browse, manage, and launch
              interactive computer tutorials. These tutorials guide users through various tasks using an on-screen
              overlay that can detect user actions and provide step-by-step instructions.
            </p>
            <p className="text-[#5C5C5C]">
              The application consists of two main components:
            </p>
            <ul className="space-y-2 text-[#5C5C5C] ml-4">
              <li className="flex items-start gap-2">
                <span className="text-[#0078D4] mt-1">•</span>
                <span><strong>The Launcher UI</strong> - This interface where you browse and manage tutorials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0078D4] mt-1">•</span>
                <span><strong>The Overlay Engine</strong> - A Python script that displays tutorial steps on screen and detects user input</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to create a tutorial */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-[#0078D4]" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-[#2A2A2A]">How to Create a Tutorial</h3>
            <p className="text-[#5C5C5C]">
              Tutorials are defined using JSON files. Each tutorial consists of a series of steps,
              where each step contains visual display items (text, arrows, rectangles) and optional action detection rules.
            </p>
            
            <div className="space-y-2 pt-2">
              <p className="text-[#2A2A2A]">To create a tutorial:</p>
              <ol className="space-y-2 text-[#5C5C5C] ml-4">
                <li className="flex gap-2">
                  <span className="text-[#0078D4]">1.</span>
                  <span>Create a JSON file following the structure shown below</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#0078D4]">2.</span>
                  <span>Click "Import Tutorial" in the navigation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#0078D4]">3.</span>
                  <span>Fill in the metadata and select your JSON file</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#0078D4]">4.</span>
                  <span>Validate the JSON and save</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Structure Overview */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-[#0078D4]" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-[#2A2A2A]">JSON Structure Overview</h3>
            <p className="text-[#5C5C5C]">
              The tutorial JSON has a simple hierarchical structure designed for the Python overlay engine:
            </p>
            
            <div className="bg-[#F8F9FB] rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-[#0078D4]">Root Level</p>
                <p className="text-[#5C5C5C]">Contains a single <code className="px-2 py-1 bg-white rounded text-[#2A2A2A]">steps</code> array - an ordered list of step objects.</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-[#0078D4]">Step Object</p>
                <p className="text-[#5C5C5C]">Each step has two components:</p>
                <ul className="space-y-1 text-[#5C5C5C] ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0078D4] mt-1">•</span>
                    <span><code className="px-2 py-1 bg-white rounded text-[#2A2A2A]">items</code> - Array of visual graphics to display (text, arrow, rect)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0078D4] mt-1">•</span>
                    <span><code className="px-2 py-1 bg-white rounded text-[#2A2A2A]">action</code> - (Optional) Defines how to auto-advance based on user input</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Items */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <h3 className="text-[#2A2A2A]">Visual Items (Display Layer)</h3>
        <p className="text-[#5C5C5C]">
          Each step's <code className="px-2 py-1 bg-[#F8F9FB] rounded text-[#2A2A2A]">items</code> array contains drawable graphics. Three types are supported:
        </p>

        {/* Text Item */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#DBEAFE] rounded flex items-center justify-center">
              <span className="text-[#0078D4]">T</span>
            </div>
            <p className="text-[#0078D4]">Text Item</p>
          </div>
          <p className="text-[#5C5C5C]">Draws text at a position with specified font and color.</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "text",
  "params": {
    "content": "Instruction text",
    "position": [x, y],
    "font_family": "Arial",
    "font_size": 20,
    "color": "#FFFFFF"
  }
}`}
            </pre>
          </div>
        </div>

        {/* Arrow Item */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#DBEAFE] rounded flex items-center justify-center">
              <span className="text-[#0078D4]">→</span>
            </div>
            <p className="text-[#0078D4]">Arrow Item</p>
          </div>
          <p className="text-[#5C5C5C]">Draws an arrow from a starting point in a direction.</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "arrow",
  "params": {
    "start": [x, y],
    "direction": "up|down|left|right",
    "length": 100,
    "color": "#FF0000",
    "thickness": 6
  }
}`}
            </pre>
          </div>
        </div>

        {/* Rectangle Item */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#DBEAFE] rounded flex items-center justify-center">
              <span className="text-[#0078D4]">□</span>
            </div>
            <p className="text-[#0078D4]">Rectangle Item</p>
          </div>
          <p className="text-[#5C5C5C]">Draws a rectangle (highlight box), optionally rounded or transparent.</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "rect",
  "params": {
    "position": [x, y],
    "size": [width, height],
    "border_color": "#FF0000",
    "border_thickness": 3,
    "fill_color": "#F5F3F3",
    "fill_opacity": 0.0,
    "corner_radius": 15
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Detection */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <h3 className="text-[#2A2A2A]">Action Detection (Auto-Advance Layer)</h3>
        <p className="text-[#5C5C5C]">
          The optional <code className="px-2 py-1 bg-[#F8F9FB] rounded text-[#2A2A2A]">action</code> object triggers automatic step advancement when user input is detected. Three types are supported:
        </p>

        {/* Click Action */}
        <div className="space-y-2">
          <p className="text-[#0078D4]">Click Action</p>
          <p className="text-[#5C5C5C]">Step completes when user clicks inside the specified region (with padding).</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "click",
  "region": [x, y, width, height],
  "padding": 20
}`}
            </pre>
          </div>
        </div>

        {/* Type Action */}
        <div className="space-y-2 pt-4">
          <p className="text-[#0078D4]">Type Action</p>
          <p className="text-[#5C5C5C]">Step completes when the user finishes typing the specified text (case-insensitive).</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "type",
  "text": "timezone"
}`}
            </pre>
          </div>
        </div>

        {/* Any Action */}
        <div className="space-y-2 pt-4">
          <p className="text-[#0078D4]">Any Action</p>
          <p className="text-[#5C5C5C]">Step completes when any of the sub-actions succeed (multiple options).</p>
          <div className="bg-[#F8F9FB] rounded-lg p-4 overflow-x-auto">
            <pre className="text-[#2A2A2A] text-sm">
{`{
  "type": "any",
  "options": [
    {
      "type": "click",
      "region": [400, 250, 300, 50],
      "padding": 10
    },
    {
      "type": "type",
      "text": "United"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Complete Example */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
            <FileJson className="w-6 h-6 text-[#0078D4]" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-[#2A2A2A]">Complete Tutorial Example</h3>
            <p className="text-[#5C5C5C]">
              Here's a complete example showing a 2-step tutorial:
            </p>
            
            <div className="bg-[#F8F9FB] rounded-lg p-6 overflow-x-auto">
              <pre className="text-[#2A2A2A] text-sm">
{`{
  "steps": [
    {
      "items": [
        {
          "type": "text",
          "params": {
            "content": "Welcome! Click the Next button",
            "position": [100, 50],
            "font_family": "Inter",
            "font_size": 24,
            "color": "#FFFFFF"
          }
        },
        {
          "type": "arrow",
          "params": {
            "start": [650, 450],
            "direction": "down",
            "length": 80,
            "color": "#0078D4",
            "thickness": 4
          }
        },
        {
          "type": "rect",
          "params": {
            "position": [600, 500],
            "size": [120, 45],
            "border_color": "#0078D4",
            "border_thickness": 3,
            "fill_color": "#F5F3F3",
            "fill_opacity": 0.0,
            "corner_radius": 8
          }
        }
      ],
      "action": {
        "type": "click",
        "region": [600, 500, 120, 45],
        "padding": 20
      }
    },
    {
      "items": [
        {
          "type": "text",
          "params": {
            "content": "Type your timezone",
            "position": [100, 50],
            "font_family": "Inter",
            "font_size": 24,
            "color": "#FFFFFF"
          }
        }
      ],
      "action": {
        "type": "type",
        "text": "timezone"
      }
    }
  ]
}`}
              </pre>
            </div>

            <div className="space-y-2 pt-4">
              <p className="text-[#2A2A2A]">Key Points:</p>
              <ul className="space-y-2 text-[#5C5C5C] ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#0078D4] mt-1">•</span>
                  <span><strong>steps</strong> - Ordered array shown sequentially (step 0, 1, 2...)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0078D4] mt-1">•</span>
                  <span><strong>items</strong> - What to draw on screen (text, arrows, highlights)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0078D4] mt-1">•</span>
                  <span><strong>action</strong> - What user input completes the step (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0078D4] mt-1">•</span>
                  <span>If no action is specified, the step requires manual advancement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-4">
        <h3 className="text-[#2A2A2A]">Additional Resources</h3>
        <div>
          <Button
            variant="outline"
            className="h-14 justify-start rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
          >
            <Github className="w-5 h-5 mr-3 text-[#0078D4]" />
            <span>View on GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}