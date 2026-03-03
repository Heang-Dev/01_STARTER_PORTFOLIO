'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, Badge, Button } from '@/components/ui';
import type { Blog as BlogType } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BlogProps {
  blogs: BlogType[];
}

export function Blog({ blogs }: BlogProps) {
  const publishedBlogs = blogs.filter((b) => b.published);

  if (publishedBlogs.length === 0) {
    return null;
  }

  const displayBlogs = publishedBlogs.slice(0, 3);

  return (
    <section id="blogs" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow">
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
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/30">
                        {blog.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 pt-6">
                  {/* Categories */}
                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.categories.slice(0, 2).map((cat) => (
                        <Badge key={cat.id} className="text-xs">
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {blog.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {blog.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.published_at, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    {blog.reading_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {blog.reading_time} min read
                      </span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="justify-between">
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
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1 before:absolute before:inset-0 before:z-0"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {publishedBlogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
