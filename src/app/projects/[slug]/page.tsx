import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getProject, getProjects, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Button, Badge, Card } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await getProject(params.slug);
    return {
      title: `${project.title} | Projects`,
      description: project.description?.slice(0, 160) || `Project: ${project.title}`,
      openGraph: {
        title: project.title,
        description: project.description?.slice(0, 160),
        images: project.image_url ? [project.image_url] : [],
      },
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectPage({ params }: Props) {
  let project;
  let portfolio;

  try {
    [project, portfolio] = await Promise.all([
      getProject(params.slug),
      getPortfolio(),
    ]);
  } catch {
    notFound();
  }

  const { user, social_links = [], projects = [] } = portfolio;

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p: { slug: string }) => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <Header user={user} socialLinks={social_links} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              {project.feature && (
                <Badge variant="primary" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Featured Project
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
                {project.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-foreground/60">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(project.created_at)}
                </span>
                {project.average_rating && project.average_rating > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {project.average_rating.toFixed(1)}
                    {project.total_reviews && ` (${project.total_reviews} reviews)`}
                  </span>
                )}
              </div>
            </div>

            {/* Main Image */}
            {project.image_url && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live
                  </Button>
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </Button>
                </a>
              )}
            </div>

            {/* Skills/Tech Stack */}
            {project.skills && project.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      size="md"
                      style={
                        skill.color_code
                          ? {
                              borderColor: skill.color_code,
                              color: skill.color_code,
                            }
                          : {}
                      }
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {project.categories && project.categories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((cat) => (
                    <Badge key={cat.id} variant="secondary" size="md">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div className="mb-12">
                <h2 className="text-lg font-semibold mb-4">About This Project</h2>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
            )}

            {/* Gallery */}
            {project.portfolio_gallery && project.portfolio_gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.portfolio_gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-foreground/10">
              {prevProject ? (
                <Link href={`/projects/${prevProject.slug}`}>
                  <Card className="p-4 hover:border-primary/30">
                    <div className="flex items-center gap-3">
                      <ChevronLeft className="h-5 w-5 text-foreground/40" />
                      <div>
                        <p className="text-xs text-foreground/50 mb-1">Previous</p>
                        <p className="font-medium">{prevProject.title}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div />
              )}

              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`}>
                  <Card className="p-4 hover:border-primary/30">
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <p className="text-xs text-foreground/50 mb-1">Next</p>
                        <p className="font-medium">{nextProject.title}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/40" />
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer user={user} socialLinks={social_links} />
    </>
  );
}
