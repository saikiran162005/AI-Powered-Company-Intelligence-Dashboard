import { create } from 'zustand';

interface ChatMessage {
  id: string;
  company_id: string;
  user_message: string;
  ai_response: string;
  context?: Record<string, unknown>;
  created_at: string;
}

interface ChatStore {
  messages: ChatMessage[];
  currentCompanyId: string | null;
  loading: boolean;
  error: string | null;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setCurrentCompanyId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  currentCompanyId: null,
  loading: false,
  error: null,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setCurrentCompanyId: (id) => set({ currentCompanyId: id }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [] }),
}));
