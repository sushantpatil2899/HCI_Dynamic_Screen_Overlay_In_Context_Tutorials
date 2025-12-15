import { Play, Eye, Star, Package, Upload, CheckCircle2, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Tutorial } from '../App';
import { Button } from './ui/button';

interface TutorialCardProps {
  tutorial: Tutorial;
  onViewDetails: (id: string) => void;
  onStart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TutorialCard({ tutorial, onViewDetails, onStart, onToggleFavorite, onDelete }: TutorialCardProps) {
  const getStatusIcon = () => {
    switch (tutorial.jsonValid) {
      case 'valid':
        return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
      case 'missing':
        return <AlertCircle className="w-4 h-4 text-[#F59E0B]" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-[#EF4444]" />;
    }
  };

  const getStatusText = () => {
    switch (tutorial.jsonValid) {
      case 'valid':
        return 'Valid';
      case 'missing':
        return 'Missing';
      case 'error':
        return 'Error';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#E5E7EB]">
      <div className="flex items-start gap-6">
        {/* Icon/Thumbnail */}
        <div className="w-16 h-16 bg-[#F8F9FB] rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-8 h-8 text-[#0078D4]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title and Source Badge */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-[#2A2A2A] mb-1">{tutorial.title}</h3>
              <p className="text-[#5C5C5C] line-clamp-2">{tutorial.description}</p>
            </div>

            <button
              onClick={() => onToggleFavorite(tutorial.id)}
              className="p-2 rounded-lg hover:bg-[#F8F9FB] transition-colors flex-shrink-0"
            >
              <Star className={`w-5 h-5 ${tutorial.isFavorite ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#5C5C5C]'}`} />
            </button>
          </div>

          {/* Tags and Metadata */}
          <div className="flex items-center gap-2 flex-wrap">
            {tutorial.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#F8F9FB] text-[#5C5C5C] rounded-full"
              >
                {tag}
              </span>
            ))}

            <span className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${
              tutorial.source === 'built-in'
                ? 'bg-[#DBEAFE] text-[#0078D4]'
                : 'bg-[#F3E8FF] text-[#9333EA]'
            }`}>
              {tutorial.source === 'built-in' ? (
                <Package className="w-3 h-3" />
              ) : (
                <Upload className="w-3 h-3" />
              )}
              {tutorial.source === 'built-in' ? 'Built-in' : 'Imported'}
            </span>

            <span className="px-3 py-1 bg-[#F8F9FB] text-[#5C5C5C] rounded-full flex items-center gap-1.5">
              {getStatusIcon()}
              {getStatusText()}
            </span>
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-6 text-[#5C5C5C]">
              <span>{tutorial.stepCount} steps</span>
              {tutorial.hasAutoAdvance && <span>Auto-advance</span>}
              {tutorial.lastRun && <span>Last run: {tutorial.lastRun}</span>}
              <span>{tutorial.totalRuns} runs</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => onViewDetails(tutorial.id)}
                className="rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>

              <Button
                onClick={() => onStart(tutorial.id)}
                disabled={tutorial.jsonValid !== 'valid'}
                className="rounded-lg bg-[#0078D4] hover:bg-[#0066B8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>

              <Button
                onClick={() => onDelete(tutorial.id)}
                className="rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}