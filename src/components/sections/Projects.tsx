'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, Badge, Button } from '@/components/ui';
import type { Project } from '@/lib/types';
import { stripHtml, truncate } from '@/lib/utils';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter((p) => p.feature);
  const otherProjects = projects.filter((p) => !p.feature);
  const displayProjects = [...featuredProjects, ...otherProjects].slice(0, 6);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work and side projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {project.feature && (
                    <div className="absolute top-3 left-3">
                      <Badge className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 pt-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {truncate(stripHtml(project.description), 150)}
                    </p>
                  )}

                  {/* Skills */}
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.skills.slice(0, 4).map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                      {project.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  {project.average_rating && project.average_rating > 0 && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{project.average_rating.toFixed(1)}</span>
                      {project.total_reviews && (
                        <span>({project.total_reviews} reviews)</span>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="gap-3">
                  {project.github_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative z-10"
                      asChild
                    >
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative z-10"
                      asChild
                    >
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {(project.slug || project.uuid) && (
                    <Link
                      href={`/projects/${project.slug || project.uuid}`}
                      className="ml-auto text-sm text-primary hover:underline flex items-center gap-1 before:absolute before:inset-0 before:z-0"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
