import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { getBlogs, getPortfolio } from '@/lib/devfolio';
import { formatDate } from '@/lib/utils';
import { Card, Badge } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
        <p className="text-foreground/60">Unable to load blog posts.</p>
      </div>
    );
  }

  const { user, social_links = [] } = portfolio;
  const publishedBlogs = (blogs || []).filter((b) => b.published);

  return (
    <>
      <Header user={user} socialLinks={social_links} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Blog
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my journey as a developer
            </p>
          </div>

          {/* Blog Grid */}
          {publishedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <Card className="group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {blog.image_url ? (
                        <Image
                          src={blog.image_url}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <div className="flex-1 p-6">
                      {/* Categories */}
                      {blog.categories && blog.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.categories.slice(0, 2).map((cat) => (
                            <Badge key={cat.id} variant="primary" className="text-xs">
                              {cat.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>

                      {blog.excerpt && (
                        <p className="text-sm text-foreground/60 line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-foreground/50 mt-auto">
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
                    <div className="px-6 pb-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-foreground/50">
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
                      <span className="text-sm text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
              <p className="text-foreground/60">No blog posts yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer user={user} socialLinks={social_links} />
    </>
  );
}
