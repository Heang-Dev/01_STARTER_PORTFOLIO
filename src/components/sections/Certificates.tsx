'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, Badge, Button } from '@/components/ui';
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  {/* Image */}
                  {cert.image_url && (
                    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                      <Image
                        src={cert.image_url}
                        alt={cert.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}

                  <CardContent className="flex-1 pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Earned: {formatDate(cert.earned_date)}</span>
                      </div>
                      {cert.expiry_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span
                            className={
                              isExpired ? 'text-destructive' : 'text-muted-foreground'
                            }
                          >
                            {isExpired ? 'Expired' : 'Expires'}:{' '}
                            {formatDate(cert.expiry_date)}
                          </span>
                          {isExpired && (
                            <Badge variant="destructive" className="text-xs">
                              Expired
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>

                  {/* Footer */}
                  {cert.credential_url && (
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Verify Credential
                        </a>
                      </Button>
                    </CardFooter>
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
