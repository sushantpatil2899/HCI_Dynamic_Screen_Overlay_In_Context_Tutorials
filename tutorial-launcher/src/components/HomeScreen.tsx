import { useState } from 'react';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { Tutorial } from '../App';
import { TutorialCard } from './TutorialCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HomeScreenProps {
  tutorials: Tutorial[];
  onViewDetails: (id: string) => void;
  onStartTutorial: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteTutorial: (id: string) => void;
}

export function HomeScreen({ tutorials, onViewDetails, onStartTutorial, onToggleFavorite, onDeleteTutorial }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [osFilter, setOsFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const categories = Array.from(new Set(tutorials.map(t => t.category)));

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOS = osFilter === 'all' || tutorial.os === osFilter;
    const matchesCategory = categoryFilter === 'all' || tutorial.category === categoryFilter;
    const matchesFavorites = !favoritesOnly || tutorial.isFavorite;
    
    return matchesSearch && matchesOS && matchesCategory && matchesFavorites;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-[#2A2A2A]">Your Tutorials</h2>
        <p className="text-[#5C5C5C]">Browse and launch interactive computer tutorials</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5C5C]" />
            <Input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-[#F8F9FB] border-0 rounded-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#5C5C5C]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters:</span>
            </div>

            <Select value={osFilter} onValueChange={setOsFilter}>
              <SelectTrigger className="w-[200px] h-10 bg-[#F8F9FB] border-0 rounded-lg">
                <SelectValue placeholder="Operating System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OS Versions</SelectItem>
                <SelectItem value="Windows 11">Windows 11</SelectItem>
                <SelectItem value="Windows 10">Windows 10</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] h-10 bg-[#F8F9FB] border-0 rounded-lg">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                favoritesOnly
                  ? 'bg-[#0078D4] text-white'
                  : 'bg-[#F8F9FB] text-[#5C5C5C] hover:bg-[#E5E7EB]'
              }`}
            >
              <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-current' : ''}`} />
              <span>Favorites Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[#5C5C5C]">
            Showing {filteredTutorials.length} of {tutorials.length} tutorials
          </p>
        </div>

        {filteredTutorials.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-[#F8F9FB] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-[#5C5C5C]" />
              </div>
              <h3 className="text-[#2A2A2A]">No tutorials found</h3>
              <p className="text-[#5C5C5C]">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTutorials.map(tutorial => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                onViewDetails={onViewDetails}
                onStart={onStartTutorial}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDeleteTutorial}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}