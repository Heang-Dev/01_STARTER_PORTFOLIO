'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import type { Project } from '@/lib/types';

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
    <section id="projects" className="py-20 md:py-32 bg-foreground/[0.02]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Featured Projects
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
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
              <Link href={`/projects/${project.slug}`}>
                <Card className="group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {project.feature && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p
                        className="text-sm text-foreground/60 line-clamp-2 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: project.description.slice(0, 150),
                        }}
                      />
                    )}

                    {/* Skills */}
                    {project.skills && project.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.skills.slice(0, 4).map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                        {project.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Rating */}
                    {project.average_rating && project.average_rating > 0 && (
                      <div className="flex items-center gap-1 text-sm text-foreground/60">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{project.average_rating.toFixed(1)}</span>
                        {project.total_reviews && (
                          <span>({project.total_reviews} reviews)</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6 flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <span className="ml-auto text-sm text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </Link>
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
