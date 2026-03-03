import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { getBlogs, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Card, Badge } from '@/components/ui';
import { DetailHeader } from '@/components/layout/DetailHeader';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Read my latest articles and insights',
};

export default async function BlogPage() {
  let blogs;
  let portfolio;

  try {
    [blogs, portfolio] = await Promise.all([
      getBlogs(),
      getPortfolio(),
    ]);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Unable to load blog posts.</p>
      </div>
    );
  }

  const { user } = portfolio;
  const publishedBlogs = (blogs || []).filter((b) => b.published);

  return (
    <div className="min-h-screen flex flex-col">
      <DetailHeader
        userName={user.name}
        backHref="/#blogs"
        backLabel="Back to Portfolio"
      />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my journey as a developer
            </p>
          </div>

          {/* Blog Grid */}
          {publishedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {publishedBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <Card className="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {blog.image_url ? (
                        <Image
                          src={blog.image_url}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/30">
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      {/* Categories */}
                      {blog.categories && blog.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.categories.slice(0, 2).map((cat) => (
                            <Badge key={cat.id} variant="default" className="text-xs">
                              {cat.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>

                      {blog.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                        {blog.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(blog.published_at, { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {blog.reading_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.reading_time} min
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 pb-5 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {blog.views_count !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {blog.views_count}
                          </span>
                        )}
                        {blog.likes_count !== undefined && (
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {blog.likes_count}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts yet.</p>
            </div>
          )}
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
