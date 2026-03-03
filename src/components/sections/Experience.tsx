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
          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary mt-6 z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                  )}
                </div>

                {/* Card Container */}
                <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold leading-tight">
                            {exp.position}
                          </h3>
                          <p className="text-primary font-medium mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Date Range */}
                      <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>
                          {formatDateRange(exp.start_date, exp.end_date, exp.current)}
                        </span>
                        {exp.current && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                            Current
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <div
                          className="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
