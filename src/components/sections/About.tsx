'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Briefcase, Mail } from 'lucide-react';
import { Card, CardContent, Separator } from '@/components/ui';
import type { User } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface AboutProps {
  user: User;
}

export function About({ user }: AboutProps) {
  const stats = [
    { label: 'Profile Completion', value: `${user.profile_completion}%` },
    { label: 'Account Type', value: user.account_type?.toUpperCase() || 'FREE' },
  ];

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
              <CardContent className="p-6 space-y-6">
                <h3 className="text-2xl font-bold">{user.name}</h3>

                {user.bio && (
                  <div
                    className="text-muted-foreground prose prose-sm dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: user.bio }}
                  />
                )}

                {/* Info Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {user.location && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <span>Joined {formatDate(user.created_at, { year: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <span>{user.account_type?.charAt(0).toUpperCase() + user.account_type?.slice(1)} Account</span>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="flex gap-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
