import { create } from 'zustand';

interface Company {
  id: string;
  name: string;
  overview?: string;
  industry?: string;
  headquarters?: string;
  founder?: string;
  ceo?: string;
  revenue?: string;
  employees?: number;
  website?: string;
  data?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

interface CompanyStore {
  companies: Company[];
  selectedCompany: Company | null;
  loading: boolean;
  error: string | null;
  setCompanies: (companies: Company[]) => void;
  setSelectedCompany: (company: Company | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addCompany: (company: Company) => void;
  removeCompany: (id: string) => void;
  clearCompanies: () => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null,
  setCompanies: (companies) => set({ companies }),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addCompany: (company) =>
    set((state) => ({
      companies: [company, ...state.companies],
    })),
  removeCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((c) => c.id !== id),
    })),
  clearCompanies: () => set({ companies: [], selectedCompany: null }),
}));
