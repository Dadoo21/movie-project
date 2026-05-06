import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const GENRES = [
  { id: '', name: 'Tutti i Generi' },
  { id: 28, name: 'Azione' },
  { id: 35, name: 'Commedia' },
  { id: 18, name: 'Dramma' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Fantascienza' },
  { id: 10749, name: 'Romantico' },
  { id: 53, name: 'Thriller' }
];

const LANGUAGES = [
  { id: '', name: 'Tutte le Lingue' },
  { id: 'en', name: 'Inglese' },
  { id: 'it', name: 'Italiano' },
  { id: 'es', name: 'Spagnolo' },
  { id: 'fr', name: 'Francese' },
  { id: 'ja', name: 'Giapponese' },
  { id: 'ko', name: 'Coreano' }
];

const SORT_OPTIONS = [
  { id: 'popularity.desc', name: 'Più Popolari' },
  { id: 'vote_average.desc', name: 'Voto Più Alto' },
  { id: 'primary_release_date.desc', name: 'Più Recenti' },
  { id: 'original_title.asc', name: 'Alfabetico (A-Z)' },
  { id: 'original_title.desc', name: 'Alfabetico (Z-A)' }
];

const FilterPanel = ({ filters, onFilterChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (e) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value,
      // Resetta i filtri incompatibili con la ricerca testuale dell'API
      with_genres: '',
      primary_release_year: '',
      'vote_average.gte': '',
      with_original_language: '',
      sort_by: 'popularity.desc'
    });
  };

  const handleAdvancedChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
      searchQuery: '' // Resetta la ricerca se si usano i filtri avanzati
    });
  };

  return (
    <div className="bg-dark-lighter border border-white/5 rounded-2xl p-5 shadow-2xl mb-10 relative z-10">
      
      {/* Top Bar: Ricerca testuale e Ordinamento veloce */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Barra di Ricerca */}
        <div className="relative w-full md:w-2/5">
          <input 
            type="text" 
            placeholder="Cerca per titolo esatto..." 
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            className="w-full bg-darker border border-white/10 text-light px-5 py-3.5 pl-12 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <Search className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
        </div>

        {/* Pulsanti laterali */}
        <div className="flex w-full md:w-auto gap-3">
          
          {/* Ordinamento Rapido */}
          <select
            value={filters.sort_by || 'popularity.desc'}
            onChange={(e) => handleAdvancedChange('sort_by', e.target.value)}
            disabled={filters.searchQuery !== ''}
            className="w-full md:w-48 bg-darker border border-white/10 text-light px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>

          {/* Toggle Filtri Avanzati */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all border shadow-lg ${showAdvanced ? 'bg-primary border-primary text-white shadow-glow' : 'bg-darker border-white/10 text-gray-300 hover:text-white hover:bg-white/5'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filtri Avanzati</span>
          </button>
        </div>
      </div>

      {/* Pannello Filtri Avanzati a Scomparsa */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 pt-6 border-t border-white/5 animate-fade-in">
          
          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Genere</label>
            <select
              value={filters.with_genres || ''}
              onChange={(e) => handleAdvancedChange('with_genres', e.target.value)}
              className="w-full bg-darker border border-white/10 text-light px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              {GENRES.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Anno di Uscita</label>
            <input 
              type="number" 
              placeholder="Es. 2024"
              value={filters.primary_release_year || ''}
              onChange={(e) => handleAdvancedChange('primary_release_year', e.target.value)}
              className="w-full bg-darker border border-white/10 text-light px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Voto Minimo</label>
            <select
              value={filters['vote_average.gte'] || ''}
              onChange={(e) => handleAdvancedChange('vote_average.gte', e.target.value)}
              className="w-full bg-darker border border-white/10 text-light px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              <option value="">Qualsiasi Voto</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>Maggiore di {num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Lingua Originale</label>
            <select
              value={filters.with_original_language || ''}
              onChange={(e) => handleAdvancedChange('with_original_language', e.target.value)}
              className="w-full bg-darker border border-white/10 text-light px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            >
              {LANGUAGES.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

        </div>
      )}
    </div>
  );
};

export default FilterPanel;
