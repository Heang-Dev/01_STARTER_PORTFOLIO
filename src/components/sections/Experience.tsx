'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent, Badge } from '@/components/ui';
import type { Experience as ExperienceType } from '@/lib/types';
import { formatDateRange } from '@/lib/utils';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  if (experiences.length === 0) {
    return null;
  }

  // Sort by start date (most recent first)
  const sortedExperiences = [...experiences].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and career milestones
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 mt-1.5 ring-4 ring-background">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <Card className={`hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:ml-auto' : ''} max-w-md`}>
                    <CardContent className="p-6">
                      {/* Company & Position */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 hidden md:block">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className={index % 2 === 0 ? 'md:text-right md:ml-auto' : ''}>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>

                      {/* Date Range */}
                      <div
                        className={`flex items-center gap-2 text-sm text-muted-foreground mb-4 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDateRange(exp.start_date, exp.end_date, exp.current)}
                        </span>
                        {exp.current && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
                            Current
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <div
                          className={`text-sm text-muted-foreground prose prose-sm dark:prose-invert ${
                            index % 2 === 0 ? 'md:text-right' : ''
                          }`}
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
