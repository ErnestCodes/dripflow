'use client';

import { useState, useTransition } from 'react';
import {
  File,
  Globe,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Wand2,
} from 'lucide-react';
import {
  generateNewsletterContent,
  GenerateNewsletterContentOutput,
} from '@/ai/flows/generate-newsletter-content';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileInput } from './FileInput';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface HeroSectionProps {
  onNewContent: (
    content: GenerateNewsletterContentOutput,
    source: { siteDescription: string }
  ) => void;
}

export function HeroSection({ onNewContent }: HeroSectionProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<GenerateNewsletterContentOutput | null>(
    null
  );
  const [url, setUrl] = useState('');
  const [textPrompt, setTextPrompt] = useState('');

  const [docFiles, setDocFiles] = useState<File[]>([]);
  const [docFileDataUris, setDocFileDataUris] = useState<string[]>([]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageFileDataUris, setImageFileDataUris] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState('url');
  const [newsletterLength, setNewsletterLength] = useState<
    'short' | 'medium' | 'long'
  >('medium');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const response = await generateNewsletterContent({
          url,
          textPrompt,
          files: docFileDataUris,
          images: imageFileDataUris,
          newsletterLength,
        });
        setResult(response);
        let sourceDescription = 'content from your inputs';
        if (url) sourceDescription = `Content from ${url}`;
        else if (docFiles.length > 0)
          sourceDescription = `Content from uploaded files`;
        else if (imageFiles.length > 0)
          sourceDescription = `Content from uploaded images`;
        else if (textPrompt) sourceDescription = 'Content from text prompt';

        onNewContent(response, { siteDescription: sourceDescription });
      } catch (error) {
        console.error('Error generating newsletter:', error);
        toast({
          title: 'Error',
          description: 'Failed to generate newsletter. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const isSubmitDisabled =
    isPending ||
    (activeTab === 'url' && !url) ||
    (activeTab === 'files' && docFiles.length === 0) ||
    (activeTab === 'images' && imageFiles.length === 0);

  return (
    <section className="relative py-20 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 top-0 h-full w-full bg-background bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      ></div>
      <div className="container relative max-w-5xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Create Newsletters from Anything
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          DripFlow AI uses multi-modal inputs to craft stunning newsletters from
          websites, documents, images, and your ideas.
        </p>

        <Card className="mx-auto mt-10 max-w-4xl text-left shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url">
                    <Globe className="mr-2 h-4 w-4" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="files">
                    <File className="mr-2 h-4 w-4" />
                    Files
                  </TabsTrigger>
                  <TabsTrigger value="images">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Images
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="mt-4">
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Enter a URL to source content from.
                  </p>
                </TabsContent>
                <TabsContent value="files" className="mt-4" forceMount>
                  <div className={activeTab === 'files' ? 'block' : 'hidden'}>
                    <FileInput
                      files={docFiles}
                      onFilesChange={(files, dataUris) => {
                        setDocFiles(files);
                        setDocFileDataUris(dataUris);
                      }}
                      accept="application/pdf, .txt, .md"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="images" className="mt-4" forceMount>
                  <div className={activeTab === 'images' ? 'block' : 'hidden'}>
                    <FileInput
                      files={imageFiles}
                      onFilesChange={(files, dataUris) => {
                        setImageFiles(files);
                        setImageFileDataUris(dataUris);
                      }}
                      accept="image/*"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-4">
                <Textarea
                  placeholder="Optional: Describe the newsletter you want to create (e.g., 'A weekly digest for tech enthusiasts')."
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="mt-4">
                <Label className="mb-2 block text-sm font-medium">
                  Newsletter Length
                </Label>
                <RadioGroup
                  value={newsletterLength}
                  onValueChange={(value) =>
                    setNewsletterLength(value as 'short' | 'medium' | 'long')
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="length-short" />
                    <Label htmlFor="length-short">Short</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="length-medium" />
                    <Label htmlFor="length-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="length-long" />
                    <Label htmlFor="length-long">Long</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitDisabled}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                  )}
                  Generate Newsletter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {(isPending || result) && (
          <Card className="mx-auto mt-10 max-w-4xl text-left shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-headline text-lg font-semibold">
                  Generated Content
                </h3>
              </div>
              {isPending ? (
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <Textarea
                  readOnly
                  value={result?.newsletterDraft || ''}
                  className="min-h-[200px] bg-muted/50"
                  rows={10}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
