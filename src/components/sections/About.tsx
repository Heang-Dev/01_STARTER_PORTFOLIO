'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin,
  Mail,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Dribbble,
  Figma,
  Link as LinkIcon
} from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import type { User, SocialLink } from '@/lib/types';

interface AboutProps {
  user: User;
  socialLinks?: SocialLink[];
}

export function About({ user, socialLinks = [] }: AboutProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-5 w-5" />;
      case 'email':
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'website':
      case 'web':
      case 'portfolio':
        return <Globe className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'dribbble':
        return <Dribbble className="h-5 w-5" />;
      case 'figma':
        return <Figma className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about who I am and what I do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image / Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {user.portfolio_gallery && user.portfolio_gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {user.portfolio_gallery.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden ${
                      index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : user.image_url ? (
              <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={user.image_url}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-8xl font-bold text-primary/50">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-bold">{user.name}</h3>

                {user.bio && (
                  <div
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: user.bio }}
                  />
                )}

                {/* Contact Info */}
                <div className="space-y-3 pt-2">
                  {user.location && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span>{user.location}</span>
                    </a>
                  )}
                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <span>{user.email}</span>
                    </a>
                  )}
                  {user.website_url && (
                    <a
                      href={user.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <span>{user.website_url.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                </div>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex items-center gap-2 pt-4">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.id}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform}
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
