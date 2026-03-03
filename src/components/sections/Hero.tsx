'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, MapPin } from 'lucide-react';
import { Button, Badge, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import type { User, Skill, PortfolioSettings } from '@/lib/types';
import { getInitials } from '@/lib/utils';

interface HeroProps {
  user: User;
  skills?: Skill[];
  settings?: PortfolioSettings;
}

export function Hero({ user, skills = [], settings }: HeroProps) {
  const greeting = settings?.portfolio_hero_greeting || "Hello, I'm";
  const showSkills = settings?.portfolio_hero_show_skills !== false;
  const topSkills = skills.slice(0, 5);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Avatar className="w-32 h-32 mx-auto ring-4 ring-primary/20">
              {user.image_url ? (
                <AvatarImage src={user.image_url} alt={user.name} />
              ) : null}
              <AvatarFallback className="text-3xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Greeting & Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-2">{greeting}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              {user.name}
            </h1>
          </motion.div>

          {/* Location */}
          {user.location && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-muted-foreground mb-6"
            >
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </motion.div>
          )}

          {/* Bio */}
          {user.bio && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {user.bio}
            </motion.p>
          )}

          {/* Skills Tags */}
          {showSkills && topSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10"
            >
              {topSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {skill.name}
                </Badge>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full border border-border"
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
