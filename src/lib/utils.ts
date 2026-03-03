import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PortfolioSettings } from './types';

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Format date range for experiences
 */
export function formatDateRange(startDate: string, endDate?: string, current?: boolean): string {
  const start = formatDate(startDate, { year: 'numeric', month: 'short' });

  if (current) {
    return `${start} - Present`;
  }

  if (endDate) {
    const end = formatDate(endDate, { year: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  }

  return start;
}

/**
 * Convert hex color to RGB values string
 */
function hexToRgb(hex?: string): string {
  if (!hex) return '59 130 246'; // Default blue

  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r} ${g} ${b}`;
}

/**
 * Generate CSS variables from portfolio settings (flat structure)
 */
export function generateThemeStyles(settings?: PortfolioSettings): string {
  if (!settings) {
    // Return empty - defaults are in globals.css
    return '';
  }

  return `
    :root {
      --color-primary: ${hexToRgb(settings.portfolio_primary_color)};
      --color-secondary: ${hexToRgb(settings.portfolio_secondary_color)};
      --color-accent: ${hexToRgb(settings.portfolio_accent_color)};
      --color-background: ${hexToRgb(settings.portfolio_background_color)};
      --color-foreground: ${hexToRgb(settings.portfolio_text_color)};
      --font-body: ${settings.portfolio_font_family || 'Inter'}, system-ui, sans-serif;
      --font-heading: ${settings.portfolio_heading_font || 'Inter'}, system-ui, sans-serif;
    }
    .dark {
      --color-background: 15 23 42;
      --color-foreground: 241 245 249;
    }
  `;
}

/**
 * Truncate text to a specific length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if a section is enabled in settings (flat structure)
 */
export function isSectionEnabled(
  section: string,
  settings?: PortfolioSettings
): boolean {
  if (!settings?.portfolio_enabled_sections) {
    return true; // Default to enabled
  }
  return settings.portfolio_enabled_sections[section] !== false;
}

/**
 * Get sections in order from settings (flat structure)
 */
export function getSectionsOrder(settings?: PortfolioSettings): string[] {
  const defaultOrder = [
    'hero',
    'about',
    'experience',
    'projects',
    'skills',
    'certificates',
    'blogs',
    'testimonials',
    'contact',
  ];

  return settings?.portfolio_sections_order || defaultOrder;
}
