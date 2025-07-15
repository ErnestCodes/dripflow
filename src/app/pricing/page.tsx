'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const pricingTiers = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'For individuals and hobbyists starting out.',
    features: [
      '5 newsletters/month',
      'URL input only',
      'Basic AI generation',
      'Community support',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 290 },
    description: 'For professionals and small teams.',
    features: [
      '50 newsletters/month',
      'All input types (URL, Files, Images)',
      'Advanced AI generation',
      'Priority email support',
      'Custom branding',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited newsletters',
      'Dedicated account manager',
      'API access',
      'Team collaboration features',
      'Custom integrations',
    ],
    isPopular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container py-12 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Find the Perfect Plan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Simple, transparent pricing for teams of all sizes. Get started for
          free.
        </p>
      </header>

      <div className="flex items-center justify-center space-x-4 mb-10">
        <span>Monthly</span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className="flex items-center">
          Yearly
          <span className="ml-2 inline-block bg-primary/20 text-primary font-semibold px-2 py-0.5 rounded-full text-xs">
            Save 2 months
          </span>
        </span>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn('flex flex-col h-full', {
              'border-primary shadow-lg': tier.isPopular,
            })}
          >
            {tier.isPopular && (
              <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold rounded-t-lg">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">
                {tier.name}
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <div className="text-center mb-6">
                {typeof tier.price === 'object' ? (
                  <>
                    <span className="text-4xl font-bold">
                      ${isYearly ? tier.price.yearly / 12 : tier.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">{tier.price}</span>
                )}
              </div>
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.isPopular ? 'default' : 'outline'}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
