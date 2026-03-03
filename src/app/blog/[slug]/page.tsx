import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getBlog, getBlogs, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Badge, Card } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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

  const { user, social_links = [] } = portfolio;
  const publishedBlogs = (blogs || []).filter((b) => b.published);

  // Find adjacent blogs for navigation
  const currentIndex = publishedBlogs.findIndex((b) => b.slug === params.slug);
  const prevBlog = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null;

  return (
    <>
      <Header user={user} socialLinks={social_links} />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {/* Categories */}
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.categories.map((cat) => (
                    <Badge key={cat.id} variant="primary">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-foreground/60">
                {blog.published_at && (
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blog.published_at)}
                  </span>
                )}
                {blog.reading_time && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {blog.reading_time} min read
                  </span>
                )}
                {blog.views_count !== undefined && (
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {blog.views_count} views
                  </span>
                )}
                {blog.likes_count !== undefined && (
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    {blog.likes_count} likes
                  </span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {blog.image_url && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            {blog.content && (
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-semibold text-foreground/60 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 py-8 border-y border-foreground/10 mb-8">
              <span className="text-foreground/60 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share this post
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`}>
                  <Card className="p-4 hover:border-primary/30 max-w-xs">
                    <div className="flex items-center gap-3">
                      <ChevronLeft className="h-5 w-5 text-foreground/40 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-foreground/50 mb-1">Previous</p>
                        <p className="font-medium truncate">{prevBlog.title}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ) : (
                <div />
              )}

              {nextBlog && (
                <Link href={`/blog/${nextBlog.slug}`}>
                  <Card className="p-4 hover:border-primary/30 max-w-xs">
                    <div className="flex items-center gap-3 text-right">
                      <div className="min-w-0">
                        <p className="text-xs text-foreground/50 mb-1">Next</p>
                        <p className="font-medium truncate">{nextBlog.title}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/40 shrink-0" />
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer user={user} socialLinks={social_links} />
    </>
  );
}
