'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Separator } from '@/components/ui';
import type { User, PortfolioSettings } from '@/lib/types';

interface HeaderProps {
  user: User;
  settings?: PortfolioSettings;
}

// Consistent offset for both navigation and scroll detection
const SCROLL_OFFSET = 100;

// Map section IDs to display labels
const sectionLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  certificates: 'Certificates',
  blogs: 'Blog',
  testimonials: 'Testimonials',
  contact: 'Contact',
};

export function Header({ user, settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isScrollingRef = useRef(false);

  // Generate nav items from settings order
  const navItems = useMemo(() => {
    const sectionsOrder = settings?.portfolio_sections_order || [
      'hero', 'about', 'experience', 'projects', 'skills', 'certificates', 'blogs', 'testimonials', 'contact'
    ];
    const enabledSections = settings?.portfolio_enabled_sections || {};

    return sectionsOrder
      .filter(section => {
        if (section === 'hero') return true;
        return enabledSections[section] !== false;
      })
      .map(section => ({
        href: `#${section}`,
        label: sectionLabels[section] || section,
        sectionId: section,
      }));
  }, [settings]);

  // Handle navigation click with smooth scroll
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Disable scroll detection temporarily
      isScrollingRef.current = true;

      const elementPosition = element.offsetTop - SCROLL_OFFSET;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      // Set active immediately for better UX
      setActiveSection(sectionId);

      // Re-enable scroll detection after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Skip scroll detection while programmatically scrolling
      if (isScrollingRef.current) return;

      // Get all section positions
      const sectionPositions = navItems.map(item => {
        const element = document.getElementById(item.sectionId);
        if (element) {
          return {
            id: item.sectionId,
            top: element.offsetTop - SCROLL_OFFSET,
            bottom: element.offsetTop + element.offsetHeight - SCROLL_OFFSET
          };
        }
        return null;
      }).filter(Boolean) as { id: string; top: number; bottom: number }[];

      // Find current section
      let currentSection = 'hero';

      // Check if at bottom of page - activate last section
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom && sectionPositions.length > 0) {
        currentSection = sectionPositions[sectionPositions.length - 1].id;
      } else {
        // Find section in view - the one whose top we've passed most recently
        for (const section of sectionPositions) {
          if (scrollY >= section.top) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            {user.name}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors relative rounded-md',
                      activeSection === item.sectionId
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.label}
                    {activeSection === item.sectionId && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4"
          >
            <Separator className="mb-4" />
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={cn(
                      'block py-2 px-3 rounded-md transition-colors',
                      activeSection === item.sectionId
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}
