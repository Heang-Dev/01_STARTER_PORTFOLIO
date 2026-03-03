'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui';
import type { Review } from '@/lib/types';
import { getInitials } from '@/lib/utils';

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  const approvedReviews = reviews.filter((r) => r.approved);

  if (approvedReviews.length === 0) {
    return null;
  }

  const displayReviews = approvedReviews.slice(0, 6);

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            What People Say
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Feedback and reviews from clients and collaborators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-foreground/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                {review.comment && (
                  <p className="text-foreground/70 mb-6 line-clamp-4">
                    &quot;{review.comment}&quot;
                  </p>
                )}

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {getInitials(review.reviewer_name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{review.reviewer_name}</p>
                    <p className="text-xs text-foreground/50">Verified Review</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
