import { useState, useRef } from 'react';
import { FolderOpen, CheckCircle2, XCircle, X } from 'lucide-react';
import { Tutorial } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ImportTutorialScreenProps {
  onSave: (tutorial: Omit<Tutorial, 'id' | 'totalRuns' | 'isFavorite'>) => void;
  onCancel: () => void;
}

export function ImportTutorialScreen({ onSave, onCancel }: ImportTutorialScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [os, setOs] = useState('');
  const [jsonPath, setJsonPath] = useState('');
  const [jsonValidation, setJsonValidation] = useState<{
    validated: boolean;
    valid: boolean;
    stepCount: number;
    hasAutoAdvance: boolean;
    error?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleBrowseJson = async () => {
    // Use Electron native file dialog if available (desktop app)
    if (window.electron) {
      const result = await window.electron.openJsonFile();
      
      if (result) {
        if (result.success) {
          // Electron API returns full path and validates JSON automatically
          setJsonPath(result.filePath || '');
          setJsonValidation({
            validated: true,
            valid: true,
            stepCount: result.stepCount || 0,
            hasAutoAdvance: result.hasAutoAdvance || false
          });
        } else {
          // Validation failed
          setJsonValidation({
            validated: true,
            valid: false,
            stepCount: 0,
            hasAutoAdvance: false,
            error: result.error
          });
        }
      }
    } else {
      // Fallback to browser file picker (for web preview)
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      
      // Read and validate the JSON file
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          
          // Validate structure
          if (!parsed.steps || !Array.isArray(parsed.steps)) {
            setJsonValidation({
              validated: true,
              valid: false,
              stepCount: 0,
              hasAutoAdvance: false,
              error: 'Invalid JSON: Missing "steps" array'
            });
            setJsonPath(fileName);
            return;
          }
          
          // Count steps and check for auto-advance
          const stepCount = parsed.steps.length;
          const hasAutoAdvance = parsed.steps.some((step: any) => 
            step.action && (step.action.type === 'click' || step.action.type === 'type' || step.action.type === 'any')
          );
          
          // Validate step structure
          const invalidStep = parsed.steps.findIndex((step: any) => {
            if (!step.items || !Array.isArray(step.items)) {
              return true;
            }
            return false;
          });
          
          if (invalidStep !== -1) {
            setJsonValidation({
              validated: true,
              valid: false,
              stepCount: stepCount,
              hasAutoAdvance: false,
              error: `Invalid step structure at step ${invalidStep + 1}: Missing "items" array`
            });
            setJsonPath(fileName);
            return;
          }
          
          // Success - valid JSON
          setJsonValidation({
            validated: true,
            valid: true,
            stepCount: stepCount,
            hasAutoAdvance: hasAutoAdvance
          });
          setJsonPath(fileName);
          
        } catch (error) {
          setJsonValidation({
            validated: true,
            valid: false,
            stepCount: 0,
            hasAutoAdvance: false,
            error: error instanceof Error ? `JSON Parse Error: ${error.message}` : 'Invalid JSON format'
          });
          setJsonPath(fileName);
        }
      };
      
      reader.onerror = () => {
        setJsonValidation({
          validated: true,
          valid: false,
          stepCount: 0,
          hasAutoAdvance: false,
          error: 'Failed to read file'
        });
        setJsonPath(fileName);
      };
      
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !category || !os || !jsonPath || !jsonValidation?.valid) {
      return;
    }

    const newTutorial: Omit<Tutorial, 'id' | 'totalRuns' | 'isFavorite'> = {
      title,
      description,
      tags,
      category,
      os,
      source: 'imported',
      jsonPath,
      jsonValid: jsonValidation.valid ? 'valid' : 'error',
      stepCount: jsonValidation.stepCount,
      hasAutoAdvance: jsonValidation.hasAutoAdvance,
      steps: []
    };

    onSave(newTutorial);
  };

  const isFormValid = title && category && os && jsonPath && jsonValidation?.valid;

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-[#2A2A2A]">Import New Tutorial</h2>
        <p className="text-[#5C5C5C]">Register a new tutorial by providing metadata and JSON configuration</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[#2A2A2A] block">
            Title <span className="text-[#EF4444]">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter tutorial title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 bg-[#F8F9FB] border-0 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[#2A2A2A] block">Description</label>
          <Textarea
            placeholder="Enter a brief description of what this tutorial covers"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] bg-[#F8F9FB] border-0 rounded-lg resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-[#2A2A2A] block">Tags</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="h-12 bg-[#F8F9FB] border-0 rounded-lg flex-1"
            />
            <Button
              onClick={handleAddTag}
              variant="outline"
              className="h-12 px-6 rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
            >
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#DBEAFE] text-[#0078D4] rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-[#0078D4] hover:text-white rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Category and OS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[#2A2A2A] block">
              Category <span className="text-[#EF4444]">*</span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 bg-[#F8F9FB] border-0 rounded-lg">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="System Setup">System Setup</SelectItem>
                <SelectItem value="Privacy & Security">Privacy & Security</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="Network">Network</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#2A2A2A] block">
              Target OS <span className="text-[#EF4444]">*</span>
            </label>
            <Select value={os} onValueChange={setOs}>
              <SelectTrigger className="h-12 bg-[#F8F9FB] border-0 rounded-lg">
                <SelectValue placeholder="Select OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Windows 11">Windows 11</SelectItem>
                <SelectItem value="Windows 10">Windows 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* JSON File Path */}
        <div className="space-y-2">
          <label className="text-[#2A2A2A] block">
            JSON File Path <span className="text-[#EF4444]">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Path to tutorial JSON file"
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
              className="h-12 bg-[#F8F9FB] border-0 rounded-lg flex-1"
            />
            <Button
              onClick={handleBrowseJson}
              variant="outline"
              className="h-12 px-6 rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Browse...
            </Button>
            {/* Hidden file input for browser fallback */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* JSON Validation Summary */}
        {jsonValidation && (
          <div className={`p-4 rounded-xl ${
            jsonValidation.valid ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'
          }`}>
            <div className="flex items-start gap-3">
              {jsonValidation.valid ? (
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <h4 className={jsonValidation.valid ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                  {jsonValidation.valid ? 'JSON Validated Successfully' : 'Validation Failed'}
                </h4>
                {jsonValidation.valid ? (
                  <div className="text-[#5C5C5C] space-y-1">
                    <p>• Total steps: {jsonValidation.stepCount}</p>
                    <p>• Auto-advance: {jsonValidation.hasAutoAdvance ? 'Yes' : 'No'}</p>
                    <p>• JSON structure is valid and contains all required fields</p>
                  </div>
                ) : (
                  <div className="text-[#5C5C5C]">
                    <p>{jsonValidation.error || 'The JSON file could not be validated. Please check the file format.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={onCancel}
          variant="outline"
          className="h-12 px-8 rounded-lg border-[#E5E7EB] hover:bg-[#F8F9FB]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="h-12 px-8 rounded-lg bg-[#0078D4] hover:bg-[#0066B8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Tutorial
        </Button>
      </div>
    </div>
  );
}
