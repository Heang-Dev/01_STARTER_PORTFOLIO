import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import type { User, SocialLink } from '@/lib/types';

interface FooterProps {
  user: User;
  socialLinks?: SocialLink[];
}

export function Footer({ user, socialLinks = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-foreground/5 border-t border-foreground/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold font-heading">
              {user.name}
            </Link>
            <p className="mt-2 text-sm text-foreground/60">
              {user.bio ? user.bio.slice(0, 100) + '...' : 'Building amazing things with code.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 hover:bg-primary hover:text-white transition-colors"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {user.email}
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} {user.name}. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500" /> using{' '}
            <a
              href="https://devfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DevFolio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
