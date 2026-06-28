import React from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import { useCompanyStore } from '@/store/companyStore';
import { useChatStore } from '@/store/chatStore';
import apiClient from '@/api/client';

interface CompanyCardProps {
  company: any;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { setSelectedCompany, removeCompany } = useCompanyStore();
  const { setCurrentCompanyId } = useChatStore();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    
    setIsDeleting(true);
    try {
      await apiClient.deleteCompany(company.id);
      removeCompany(company.id);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStartChat = () => {
    setSelectedCompany(company);
    setCurrentCompanyId(company.id);
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
      {company.industry && <p className="text-sm text-muted-foreground mb-2">Industry: {company.industry}</p>}
      {company.overview && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{company.overview}</p>}
      
      <div className="flex gap-2">
        <button
          onClick={handleStartChat}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded hover:opacity-90 transition-opacity text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
