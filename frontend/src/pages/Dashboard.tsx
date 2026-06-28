import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useCompanyStore } from '@/store/companyStore';
import { SearchBar } from '@/components/SearchBar';
import { CompanyCard } from '@/components/CompanyCard';
import { ChatBox } from '@/components/ChatBox';

export const Dashboard: React.FC = () => {
  const { companies, selectedCompany, loading, error, setError } = useCompanyStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">Company Intelligence Platform</h1>
          <SearchBar />
        </div>
      </header>

      <main className="container py-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin">⟳</div>
            <p className="text-muted-foreground mt-2">Loading...</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Companies List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Searched Companies</h2>
            <div className="space-y-3">
              {companies.length === 0 ? (
                <p className="text-muted-foreground">No companies searched yet</p>
              ) : (
                companies.map((company) => <CompanyCard key={company.id} company={company} />)
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedCompany ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Chat with AI about {selectedCompany.name}</h2>
                <ChatBox companyId={selectedCompany.id} />
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
                <p>Select a company to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
