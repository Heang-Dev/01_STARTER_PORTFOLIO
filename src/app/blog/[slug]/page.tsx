import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { getBlog, getBlogs, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Badge, Card } from '@/components/ui';
import { DetailHeader } from '@/components/layout/DetailHeader';
import { ShareSection } from '@/components/blog/ShareSection';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs
      .filter((blog) => blog.published)
      .map((blog) => ({
        slug: blog.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const blog = await getBlog(params.slug);
    return {
      title: `${blog.title} | Blog`,
      description: blog.excerpt || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.title,
        images: blog.image_url ? [blog.image_url] : [],
        type: 'article',
        publishedTime: blog.published_at,
      },
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let blog;
  let portfolio;
  let blogs;

  try {
    [blog, portfolio, blogs] = await Promise.all([
      getBlog(params.slug),
      getPortfolio(),
      getBlogs(),
    ]);
  } catch {
    notFound();
  }

  const { user } = portfolio;
  const publishedBlogs = (blogs || []).filter((b) => b.published);

  // Find adjacent blogs for navigation
  const currentIndex = publishedBlogs.findIndex((b) => b.slug === params.slug);
  const prevBlog = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null;

  // Blog URL for sharing (will be replaced client-side)
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${params.slug}`;

  return (
    <div className="min-h-screen flex flex-col">
      <DetailHeader
        userName={user.name}
        backHref="/#blogs"
        backLabel="Back to Blog"
      />

      <main className="flex-1 py-8 md:py-12">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {/* Categories */}
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.categories.map((cat) => (
                    <Badge key={cat.id} variant="default">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
                {blog.title}
              </h1>

              {/* Author & Meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                  {user.image_url ? (
                    <Image
                      src={user.image_url}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {blog.published_at && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.published_at)}
                      </span>
                    )}
                    {blog.reading_time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {blog.reading_time} min read
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {blog.views_count !== undefined && (
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    {blog.views_count.toLocaleString()} views
                  </span>
                )}
                {blog.likes_count !== undefined && (
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    {blog.likes_count.toLocaleString()} likes
                  </span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {blog.image_url && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-10 border">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            {blog.content && (
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-heading prose-a:text-primary prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <ShareSection url={blogUrl} title={blog.title} />

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t">
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className="group">
                  <Card className="p-4 h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                        <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">Previous Article</p>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {prevBlog.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div />
              )}

              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className="group">
                  <Card className="p-4 h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="flex items-center justify-end gap-3 text-right">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">Next Article</p>
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {nextBlog.title}
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
        </article>
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
