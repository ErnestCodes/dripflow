import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Combine, Image, Files, Bot } from 'lucide-react';

const features = [
  {
    icon: <Combine className="w-10 self-center h-10 text-primary" />,
    title: 'Multi-Modal Input',
    description:
      'Combine URLs, files, and images to source content for your newsletters. Our AI understands it all.',
  },
  {
    icon: <Bot className="w-10 h-10 self-center text-primary" />,
    title: 'AI-Powered Generation',
    description:
      'Leverage state-of-the-art AI to automatically draft compelling newsletter content tailored to your audience.',
  },
  {
    icon: <Image className="w-10 h-10 self-center text-primary" />,
    title: 'Image Integration',
    description:
      'Seamlessly include images from your inputs or let our AI suggest relevant visuals for your content.',
  },
  {
    icon: <Files className="w-10 h-10 self-center text-primary" />,
    title: 'Flexible Content Sources',
    description:
      "Whether it's a blog post, a research paper, or a product page, DripFlow can turn any content into a newsletter.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need to Automate Your Newsletter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            DripFlow AI is packed with powerful features to make newsletter
            creation a breeze.
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center p-6"
            >
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4 font-headline">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
