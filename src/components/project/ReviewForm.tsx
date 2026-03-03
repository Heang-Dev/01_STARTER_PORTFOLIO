'use client';

import { useState } from 'react';
import { Star, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { submitReview } from '@/lib/devfolio';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  projectId: number;
  projectTitle: string;
}

export function ReviewForm({ projectId, projectTitle }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setErrorMessage('Please select a rating');
      setSubmitStatus('error');
      return;
    }

    if (body.length < 10) {
      setErrorMessage('Review must be at least 10 characters');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitReview({
        reviewable_type: 'project',
        reviewable_id: projectId,
        rating,
        title: title || undefined,
        body,
        reviewer_name: name,
        reviewer_email: email,
      });

      setSubmitStatus('success');
      // Reset form
      setRating(0);
      setName('');
      setEmail('');
      setTitle('');
      setBody('');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to submit review. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="p-6">
        <div className="text-center py-6">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Thank you for your review!</h3>
          <p className="text-muted-foreground text-sm">
            Your review has been submitted and will be visible after moderation.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSubmitStatus('idle')}
          >
            Write another review
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Share your experience with &quot;{projectTitle}&quot;
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'h-7 w-7 transition-colors',
                    (hoveredRating || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground self-center">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </span>
            )}
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reviewer-name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <Input
              id="reviewer-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reviewer-email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <Input
              id="reviewer-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="review-title" className="block text-sm font-medium mb-2">
            Review Title <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="review-title"
            type="text"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Body */}
        <div>
          <label htmlFor="review-body" className="block text-sm font-medium mb-2">
            Your Review *
          </label>
          <Textarea
            id="review-body"
            placeholder="Share your experience with this project..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
            minLength={10}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Minimum 10 characters ({body.length}/10)
          </p>
        </div>

        {/* Error message */}
        {submitStatus === 'error' && errorMessage && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
