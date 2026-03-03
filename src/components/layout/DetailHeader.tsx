'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowLeft, Sun, Moon, Home } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';

interface DetailHeaderProps {
  userName: string;
  backHref: string;
  backLabel: string;
}

export function DetailHeader({ userName, backHref, backLabel }: DetailHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Back Button */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Home Link */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">{userName}</span>
              </Button>
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
