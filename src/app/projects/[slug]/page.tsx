import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  Github,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  User,
} from 'lucide-react';
import { getProject, getProjects, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Button, Badge, Card } from '@/components/ui';
import { DetailHeader } from '@/components/layout/DetailHeader';
import { ReviewForm } from '@/components/project/ReviewForm';

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

  const { user, projects = [], reviews = [] } = portfolio;

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p: { slug: string }) => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Filter approved reviews (in a real app, you'd fetch project-specific reviews)
  const projectReviews = reviews.filter((r) => r.approved).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <DetailHeader
        userName={user.name}
        backHref="/#projects"
        backLabel="Back to Projects"
      />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              {project.feature && (
                <Badge variant="default" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Featured Project
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
                {project.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
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
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
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
                    <Badge key={cat.id} variant="secondary">
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
                      className="relative aspect-video rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 448px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Reviews
                </h2>
                {project.average_rating && project.average_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(project.average_rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.average_rating.toFixed(1)} ({project.total_reviews} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Existing Reviews */}
              {projectReviews.length > 0 && (
                <div className="grid gap-4 mb-8">
                  {projectReviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-medium">{review.reviewer_name}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground/30'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          )}
                          <p className="text-xs text-muted-foreground/60 mt-2">
                            {formatDate(review.created_at)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Review Form */}
              <ReviewForm projectId={project.id} projectTitle={project.title} />
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t">
              {prevProject ? (
                <Link href={`/projects/${prevProject.slug}`} className="group">
                  <Card className="p-4 h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                        <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">Previous Project</p>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {prevProject.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link href={`/projects/${nextProject.slug}`} className="group">
                  <Card className="p-4 h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="flex items-center justify-end gap-3 text-right">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">Next Project</p>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {nextProject.title}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            &larr; Back to {user.name}&apos;s Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
