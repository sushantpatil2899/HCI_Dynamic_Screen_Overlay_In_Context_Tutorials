import { ArrowLeft, Play, Edit2, Trash2, Package, Upload, CheckCircle2, Clock, Layers, MousePointer2, Keyboard, List } from 'lucide-react';
import { Tutorial } from '../App';
import { Button } from './ui/button';

interface TutorialDetailsScreenProps {
  tutorial: Tutorial;
  onStart: (id: string) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function TutorialDetailsScreen({ tutorial, onStart, onDelete, onBack }: TutorialDetailsScreenProps) {
  // Helper function to get action description
  const getActionDescription = (action: any): string => {
    if (!action) return 'Manual advance';
    
    if (action.type === 'click') {
      return `Click detection in region [${action.region.join(', ')}]`;
    } else if (action.type === 'type') {
      return `Type text: "${action.text}"`;
    } else if (action.type === 'any') {
      return `Multiple options (${action.options.length} actions)`;
    }
    
    return 'Unknown action';
  };

  // Helper function to get action icon
  const getActionIcon = (action: any) => {
    if (!action) return <List className="w-4 h-4" />;
    
    if (action.type === 'click') {
      return <MousePointer2 className="w-4 h-4" />;
    } else if (action.type === 'type') {
      return <Keyboard className="w-4 h-4" />;
    } else if (action.type === 'any') {
      return <List className="w-4 h-4" />;
    }
    
    return <List className="w-4 h-4" />;
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5C5C5C] hover:text-[#2A2A2A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to tutorials</span>
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-[#F8F9FB] rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="w-10 h-10 text-[#0078D4]" />
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0 space-y-3">
            <h2 className="text-[#2A2A2A]">{tutorial.title}</h2>
            <p className="text-[#5C5C5C]">{tutorial.description}</p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {tutorial.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#F8F9FB] text-[#5C5C5C] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#5C5C5C]">
              <Layers className="w-4 h-4" />
              <span>Steps</span>
            </div>
            <p className="text-[#2A2A2A]">{tutorial.stepCount} steps</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#5C5C5C]">
              {tutorial.source === 'built-in' ? (
                <Package className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Source</span>
            </div>
            <p className="text-[#2A2A2A] capitalize">{tutorial.source}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#5C5C5C]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Auto-advance</span>
            </div>
            <p className="text-[#2A2A2A]">{tutorial.hasAutoAdvance ? 'Yes' : 'No'}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#5C5C5C]">
              <Clock className="w-4 h-4" />
              <span>Operating System</span>
            </div>
            <p className="text-[#2A2A2A]">{tutorial.os}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div className="space-y-1">
            <p className="text-[#5C5C5C]">Last Run</p>
            <p className="text-[#2A2A2A]">{tutorial.lastRun || 'Never'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#5C5C5C]">Total Runs</p>
            <p className="text-[#2A2A2A]">{tutorial.totalRuns}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#5C5C5C]">Category</p>
            <p className="text-[#2A2A2A]">{tutorial.category}</p>
          </div>
        </div>

        {/* JSON Path */}
        <div className="space-y-2 pt-4 border-t border-[#E5E7EB]">
          <p className="text-[#5C5C5C]">JSON File Path</p>
          <div className="p-3 bg-[#F8F9FB] rounded-lg">
            <code className="text-[#2A2A2A]">{tutorial.jsonPath}</code>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            onClick={() => onStart(tutorial.id)}
            disabled={tutorial.jsonValid !== 'valid'}
            className="h-12 px-8 rounded-lg bg-[#0078D4] hover:bg-[#0066B8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Tutorial
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Info
          </Button>
          <Button
            onClick={() => onDelete(tutorial.id)}
            variant="outline"
            className="h-12 px-6 rounded-lg border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Step Preview */}
      {tutorial.steps && tutorial.steps.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-[#2A2A2A]">Step Preview</h3>
            <p className="text-[#5C5C5C]">Overview of tutorial steps with visual items and action detection</p>
          </div>

          <div className="space-y-4">
            {tutorial.steps.map((step, stepIndex) => (
              <div
                key={stepIndex}
                className="p-5 bg-[#F8F9FB] rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-[#0078D4]">Step {stepIndex + 1}</h4>
                  {step.action && (
                    <span className="px-3 py-1 bg-[#10B981] bg-opacity-10 text-[#10B981] rounded-full flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Auto-advance</span>
                    </span>
                  )}
                </div>
                
                {/* Display Items */}
                <div className="space-y-3">
                  <p className="text-[#5C5C5C]">Visual Elements ({step.items.length}):</p>
                  <div className="grid grid-cols-1 gap-2">
                    {step.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.type === 'text' && <span className="text-[#0078D4]">T</span>}
                          {item.type === 'arrow' && <span className="text-[#0078D4]">→</span>}
                          {item.type === 'rect' && <span className="text-[#0078D4]">□</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2A2A2A] capitalize">{item.type}</p>
                          <p className="text-[#5C5C5C] truncate">
                            {item.type === 'text' && `"${item.params.content}"`}
                            {item.type === 'arrow' && `${item.params.direction}, ${item.params.length}px`}
                            {item.type === 'rect' && `${item.params.size[0]}×${item.params.size[1]}px`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Detection */}
                {step.action && (
                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#10B981] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getActionIcon(step.action)}
                      </div>
                      <div className="flex-1">
                        <p className="text-[#2A2A2A]">Action Detection:</p>
                        <p className="text-[#5C5C5C]">{getActionDescription(step.action)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini Overlay Preview */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="text-[#2A2A2A]">Overlay Controller Preview</h3>
          <p className="text-[#5C5C5C]">This control bar appears during a tutorial</p>
        </div>

        {/* Simulated Overlay Controls */}
        <div className="flex items-center justify-center p-8 bg-[#F8F9FB] rounded-xl">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg">
            <Button className="h-12 px-8 rounded-lg bg-[#0078D4] hover:bg-[#0066B8] text-white">
              NEXT
            </Button>
            <Button className="h-12 px-8 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white">
              FINISH
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 rounded-lg border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]"
            >
              EXIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
