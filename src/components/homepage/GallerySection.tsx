'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface GalleryExample {
  title: string;
  siteDescription: string;
  newsletterDescription: string;
  image?: string;
  keywords?: string[];
}

interface GallerySectionProps {
  examples: GalleryExample[];
}

const NewsletterDescription = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > 200;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText =
    isLong && !isExpanded ? `${text.substring(0, 200)}...` : text;

  return (
    <div>
      <p className="text-sm text-muted-foreground">{displayText}</p>
      {isLong && (
        <Button
          variant="link"
          size="sm"
          onClick={toggleExpanded}
          className="p-0 h-auto mt-1"
        >
          {isExpanded ? 'View Less' : 'View More'}
        </Button>
      )}
    </div>
  );
};

export function GallerySection({ examples }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            From Site to Newsletter in Seconds
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how DripFlow AI transforms diverse web content into beautiful,
            ready-to-send newsletters.
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-1 lg:grid-cols-3">
          {examples.map((example, index) => {
            const unsplashUrl = `https://source.unsplash.com/random/80x80?${
              example.keywords?.join(',') || 'abstract'
            }&sig=${index}`;
            const placeholderImageUrl = example.image || unsplashUrl;

            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Example {examples.length - index}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      Original Website
                    </h3>
                    <div className="flex items-start gap-4">
                      <Image
                        src="https://placehold.co/80x80.png"
                        alt="Website screenshot"
                        width={80}
                        height={80}
                        className="rounded-lg border"
                        data-ai-hint="website abstract"
                      />
                      <p className="text-sm text-muted-foreground">
                        {example.siteDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-8 h-8 text-primary/50 rotate-90" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      Generated Newsletter
                    </h3>
                    <div className="flex items-start gap-4">
                      <Image
                        src={placeholderImageUrl}
                        alt={example.title}
                        width={80}
                        height={80}
                        className="rounded-lg border object-cover"
                        data-ai-hint="newsletter abstract"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">
                          {example.title}
                        </h4>
                        <NewsletterDescription
                          text={example.newsletterDescription}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
