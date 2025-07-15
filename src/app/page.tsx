'use client';

import { useState } from 'react';
import { CtaSection } from '@/components/homepage/CtaSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { GallerySection } from '@/components/homepage/GallerySection';
import { HeroSection } from '@/components/homepage/HeroSection';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import type { GalleryExample } from '@/components/homepage/GallerySection';
import type { GenerateNewsletterContentOutput } from '@/ai/flows/generate-newsletter-content';

const initialExamples: GalleryExample[] = [
  {
    title: 'Postcard from Paradise',
    siteDescription:
      'A travel blog detailing a trip through Southeast Asia, with photo galleries and daily journals.',
    newsletterDescription:
      "A weekly 'Postcard from Paradise' newsletter, featuring the best photo of the week, a short travel story, and a tip for aspiring travelers.",
    keywords: ['travel', 'paradise'],
    image:
      'https://images.unsplash.com/photo-1593438002985-ce805be04da9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Brew of the Week',
    siteDescription:
      'An e-commerce site for artisanal coffee beans, including product descriptions, brewing guides, and farmer profiles.',
    newsletterDescription:
      "A 'Brew of the Week' feature, highlighting a specific coffee bean, sharing a customer review, and offering a limited-time discount code.",
    keywords: ['coffee', 'brew'],
    image:
      'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Industry Insights',
    siteDescription:
      'A corporate website for a SaaS company, with feature pages, case studies, and a company blog on industry trends.',
    newsletterDescription:
      "A monthly 'Industry Insights' digest, summarizing the latest blog post, sharing a key takeaway from a case study, and announcing a new feature.",
    keywords: ['business', 'technology'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Home() {
  const [galleryItems, setGalleryItems] =
    useState<GalleryExample[]>(initialExamples);

  const handleNewContent = (
    newContent: GenerateNewsletterContentOutput,
    source: { siteDescription: string }
  ) => {
    const newGalleryItem: GalleryExample = {
      title: newContent.title,
      siteDescription: source.siteDescription,
      newsletterDescription: newContent.newsletterDraft,
      image: newContent.image,
      keywords: newContent.title.split(' ').slice(0, 2), // Use first two words of title as keywords
    };
    setGalleryItems((prevItems) => [newGalleryItem, ...prevItems]);
  };

  return (
    <div className="flex flex-col">
      <HeroSection onNewContent={handleNewContent} />
      <FeaturesSection />
      <GallerySection examples={galleryItems} />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
