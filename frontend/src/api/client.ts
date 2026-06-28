import axios, { AxiosInstance, AxiosError } from 'axios';

interface ApiErrorResponse {
  success: boolean;
  error?: {
    message: string;
    status: number;
  };
  message?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.data?.error?.message) {
          const message = error.response.data.error.message;
          console.error('API Error:', message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Company endpoints
  async searchCompany(companyName: string) {
    const response = await this.client.post('/company/search', { companyName });
    return response.data;
  }

  async getCompanyById(id: string) {
    const response = await this.client.get(`/company/${id}`);
    return response.data;
  }

  async getCompanyHistory(page: number = 1, limit: number = 10) {
    const response = await this.client.get('/company', {
      params: { page, limit },
    });
    return response.data;
  }

  async deleteCompany(id: string) {
    const response = await this.client.delete(`/company/${id}`);
    return response.data;
  }

  async compareCompanies(company1: string, company2: string) {
    const response = await this.client.post('/company/compare', { company1, company2 });
    return response.data;
  }

  // Chat endpoints
  async sendMessage(companyId: string, message: string) {
    const response = await this.client.post('/chat/send', { companyId, message });
    return response.data;
  }

  async getChatHistory(companyId: string, page: number = 1, limit: number = 50) {
    const response = await this.client.get(`/chat/${companyId}`, {
      params: { page, limit },
    });
    return response.data;
  }

  async clearChatHistory(companyId: string) {
    const response = await this.client.delete(`/chat/${companyId}`);
    return response.data;
  }

  // Health check
  async checkHealth() {
    const response = await this.client.get('/health');
    return response.data;
  }
}

export default new ApiClient();
