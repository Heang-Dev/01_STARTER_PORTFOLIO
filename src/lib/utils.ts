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

/**
 * Generate CSS variables from portfolio settings (flat structure)
 * Note: With shadcn/ui, we use HSL colors, so this is simplified
 */
export function generateThemeStyles(settings?: PortfolioSettings): string {
  // Settings-based theme customization is handled via globals.css
  // This function is kept for API compatibility
  return '';
}
