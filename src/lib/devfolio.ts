import type {
  PortfolioData,
  Project,
  Blog,
  ContactFormData,
  ContactResponse,
  ApiResponse,
} from './types';

const API_URL = process.env.DEVFOLIO_API_URL || 'https://devfolio.com/api/v1';
const API_KEY = process.env.DEVFOLIO_API_KEY;
const USER_UUID = process.env.DEVFOLIO_USER_UUID;

class DevFolioClient {
  private headers: HeadersInit;
  private useApiKey: boolean;

  constructor() {
    this.useApiKey = !!API_KEY;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (API_KEY) {
      this.headers['X-API-Key'] = API_KEY;
    }
  }

  private getBaseUrl(): string {
    if (this.useApiKey) {
      return `${API_URL}/portfolio`;
    }
    if (USER_UUID) {
      return `${API_URL}/users/${USER_UUID}`;
    }
    throw new Error(
      'Missing DEVFOLIO_API_KEY or DEVFOLIO_USER_UUID environment variable'
    );
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.getBaseUrl()}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...this.headers, ...options?.headers },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data ?? data;
    } catch (error) {
      console.error(`DevFolio API Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Fetch complete portfolio data in one request
   */
  async getPortfolio(): Promise<PortfolioData> {
    const endpoint = this.useApiKey ? '' : '/portfolio';
    return this.fetch<PortfolioData>(endpoint);
  }

  /**
   * Fetch user profile
   */
  async getProfile() {
    return this.fetch('/profile');
  }

  /**
   * Fetch all projects
   */
  async getProjects(): Promise<Project[]> {
    return this.fetch<Project[]>('/projects');
  }

  /**
   * Fetch a single project by slug
   */
  async getProject(slug: string): Promise<Project> {
    return this.fetch<Project>(`/projects/${slug}`);
  }

  /**
   * Fetch all skills
   */
  async getSkills() {
    return this.fetch('/skills');
  }

  /**
   * Fetch all experiences
   */
  async getExperiences() {
    return this.fetch('/experiences');
  }

  /**
   * Fetch all certificates
   */
  async getCertificates() {
    return this.fetch('/certificates');
  }

  /**
   * Fetch all blog posts
   */
  async getBlogs(): Promise<Blog[]> {
    return this.fetch<Blog[]>('/blogs');
  }

  /**
   * Fetch a single blog post by slug
   */
  async getBlog(slug: string): Promise<Blog> {
    return this.fetch<Blog>(`/blogs/${slug}`);
  }

  /**
   * Fetch social links
   */
  async getSocialLinks() {
    return this.fetch('/social-links');
  }

  /**
   * Fetch portfolio settings
   */
  async getSettings() {
    return this.fetch('/settings');
  }

  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData): Promise<ContactResponse> {
    const url = `${API_URL}/contact`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ...data,
        user_uuid: USER_UUID,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit contact form');
    }

    return response.json();
  }
}

// Export singleton instance
export const devfolio = new DevFolioClient();

// Export individual functions for convenience
export const getPortfolio = () => devfolio.getPortfolio();
export const getProfile = () => devfolio.getProfile();
export const getProjects = () => devfolio.getProjects();
export const getProject = (slug: string) => devfolio.getProject(slug);
export const getSkills = () => devfolio.getSkills();
export const getExperiences = () => devfolio.getExperiences();
export const getCertificates = () => devfolio.getCertificates();
export const getBlogs = () => devfolio.getBlogs();
export const getBlog = (slug: string) => devfolio.getBlog(slug);
export const getSocialLinks = () => devfolio.getSocialLinks();
export const getSettings = () => devfolio.getSettings();
export const submitContact = (data: ContactFormData) =>
  devfolio.submitContact(data);
