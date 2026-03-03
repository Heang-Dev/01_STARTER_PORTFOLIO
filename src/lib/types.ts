// DevFolio API Response Types
// These types match the API responses from DevFolio

export interface User {
  id: number;
  uuid: string;
  name: string;
  email?: string;
  username: string;
  slug: string;
  bio?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  role: string;
  account_type: string;
  image_url?: string;
  portfolio_gallery?: string[];
  profile_completion: number;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface Project {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  portfolio_gallery?: string[];
  qr_code_url?: string;
  public_url?: string;
  status: boolean;
  feature: boolean;
  average_rating?: number;
  total_reviews?: number;
  categories: Category[];
  skills: Skill[];
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category?: string;
  proficiency_level?: number;
  color_code?: string;
  icon_url?: string;
}

export interface Experience {
  id: number;
  uuid: string;
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
}

export interface Certificate {
  id: number;
  uuid: string;
  title: string;
  issuer: string;
  earned_date: string;
  expiry_date?: string;
  credential_url?: string;
  image_url?: string;
}

export interface Blog {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
  published_at?: string;
  views_count?: number;
  likes_count?: number;
  reading_time?: number;
  categories?: Category[];
  tags?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  sort_order: number;
}

export interface Review {
  id: number;
  uuid: string;
  reviewer_name: string;
  reviewer_email?: string;
  rating: number;
  comment?: string;
  approved: boolean;
  created_at: string;
}

export interface PortfolioSettings {
  // Colors
  portfolio_primary_color?: string;
  portfolio_secondary_color?: string;
  portfolio_accent_color?: string;
  portfolio_background_color?: string;
  portfolio_text_color?: string;
  portfolio_link_color?: string;
  portfolio_border_color?: string;
  portfolio_card_color?: string;
  portfolio_muted_color?: string;
  portfolio_heading_color?: string;
  // Typography
  portfolio_font_family?: string;
  portfolio_heading_font?: string;
  portfolio_body_font?: string;
  portfolio_font_size_base?: string;
  portfolio_line_height?: string;
  // Layout
  portfolio_layout_type?: string;
  portfolio_container_width?: string;
  portfolio_border_radius?: string;
  portfolio_spacing_unit?: string;
  // Sections
  portfolio_sections_order?: string[];
  portfolio_enabled_sections?: Record<string, boolean>;
  // Hero
  portfolio_hero_layout?: string;
  portfolio_hero_show_skills?: boolean;
  portfolio_hero_greeting?: string;
  // Privacy
  show_email_publicly?: boolean;
  show_phone_publicly?: boolean;
  enable_contact_form?: boolean;
  // Animations
  portfolio_animations_enabled?: boolean;
  portfolio_animation_style?: string;
  // Custom
  portfolio_custom_css?: string;
}

export interface PortfolioData {
  user: User;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certificates: Certificate[];
  blogs: Blog[];
  social_links: SocialLink[];
  reviews: Review[];
  settings: PortfolioSettings;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  created_at: string;
}
