'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Certificate } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  if (certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Certifications
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Professional certifications and credentials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => {
            const isExpired = cert.expiry_date && new Date(cert.expiry_date) < new Date();

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  {/* Image */}
                  {cert.image_url && (
                    <div className="relative aspect-[3/2] overflow-hidden bg-foreground/5">
                      <Image
                        src={cert.image_url}
                        alt={cert.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm text-foreground/60">{cert.issuer}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Calendar className="h-4 w-4" />
                        <span>Earned: {formatDate(cert.earned_date)}</span>
                      </div>
                      {cert.expiry_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-foreground/60" />
                          <span
                            className={
                              isExpired ? 'text-red-500' : 'text-foreground/60'
                            }
                          >
                            {isExpired ? 'Expired' : 'Expires'}:{' '}
                            {formatDate(cert.expiry_date)}
                          </span>
                          {isExpired && (
                            <Badge variant="outline" className="text-xs text-red-500">
                              Expired
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  {cert.credential_url && (
                    <div className="px-6 pb-6">
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Verify Credential
                      </a>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
