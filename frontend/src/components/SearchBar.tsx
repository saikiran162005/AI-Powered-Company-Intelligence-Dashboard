import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import apiClient from '@/api/client';
import { useCompanyStore } from '@/store/companyStore';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedCompany, addCompany, setError } = useCompanyStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiClient.searchCompany(searchTerm);
      if (result.data?.company) {
        addCompany(result.data.company);
        setSelectedCompany(result.data.company);
      }
    } catch (error) {
      setError('Failed to search company. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};
