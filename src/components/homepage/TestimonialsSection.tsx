import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    quote:
      'DripFlow AI has completely revolutionized our content workflow. What used to take hours now takes minutes. The quality of the generated newsletters is outstanding.',
    name: 'Casey Jordan',
    title: 'Marketing Lead, TechCorp',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    quote:
      'As a solo creator, time is my most valuable asset. DripFlow AI is like having a content assistant on demand. The multi-modal input is a game-changer.',
    name: 'Alex Rivera',
    title: 'Indie Hacker & Blogger',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    quote:
      'We were skeptical about AI-generated content, but DripFlow proved us wrong. The newsletters are coherent, engaging, and perfectly match our brand voice.',
    name: 'Morgan Lee',
    title: 'Founder, Creative Solutions',
    avatar: 'https://placehold.co/100x100.png',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Loved by Creators and Businesses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <blockquote className="text-muted-foreground">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                          data-ai-hint="person face"
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
