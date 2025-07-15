import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, Post } from '@/lib/blog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Blog | DripFlow AI',
  description:
    'Insights and articles on AI, content creation, and email marketing.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((post: Post) => post.tags))];

  return (
    <div className="container py-12 md:py-20">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          DripFlow AI Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights on AI-powered content creation, email marketing strategies,
          and product updates.
        </p>
      </header>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {allTags.map((tag) => (
            <Badge
              key={tag as string}
              variant="secondary"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
            >
              {tag as string}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={315}
                  className="w-full h-auto object-cover"
                  data-ai-hint="technology abstract"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="font-headline text-xl leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {post.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={post.authorImage}
                      alt={post.author}
                      data-ai-hint="person face"
                    />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{post.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
