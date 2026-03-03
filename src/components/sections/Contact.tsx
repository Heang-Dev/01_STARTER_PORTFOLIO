'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import type { User, PortfolioSettings } from '@/lib/types';
import { submitContact } from '@/lib/devfolio';

interface ContactProps {
  user: User;
  settings?: PortfolioSettings;
}

export function Contact({ user, settings }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const showContactForm = settings?.enable_contact_form !== false;
  const showEmail = settings?.show_email_publicly !== false;
  const showPhone = settings?.show_phone_publicly === true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-foreground/[0.02]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Get In Touch
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-foreground/60">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              {showEmail && user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-foreground/10 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </a>
              )}

              {showPhone && user.phone && (
                <a
                  href={`tel:${user.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-foreground/10 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </a>
              )}

              {user.location && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-foreground/10">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Location</p>
                    <p className="font-medium">{user.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          {showContactForm && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
