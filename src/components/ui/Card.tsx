import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-background border border-foreground/10 overflow-hidden',
          hover && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0 flex items-center gap-4', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export const CardImage = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string }
>(({ className, src, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative aspect-video overflow-hidden', className)}
    {...props}
  >
    {src && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    )}
  </div>
));

CardImage.displayName = 'CardImage';
