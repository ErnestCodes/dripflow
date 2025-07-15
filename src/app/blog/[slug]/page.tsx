import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | DripFlow AI`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <header className="mb-8">
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-6">
          <Avatar>
            <AvatarImage
              src={post.authorImage}
              alt={post.author}
              data-ai-hint="person face"
            />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-muted-foreground">
              Published on{' '}
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </header>

      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={630}
        className="w-full rounded-lg object-cover mb-8 border"
        data-ai-hint="technology abstract"
      />

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/80 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(/\n/g, '<br />'),
        }}
      />
    </article>
  );
}
