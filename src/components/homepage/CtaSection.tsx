import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Supercharge Your Newsletter?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop wasting time on manual content creation. Start your free trial
            today and experience the future of newsletters. No credit card
            required.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
