export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  tags: string[];
  image: string;
  content: string;
}

const mockContent = `
## The Power of Multi-Modal AI

In the realm of artificial intelligence, we're witnessing a monumental shift from single-modality models to sophisticated multi-modal systems. But what does "multi-modal" actually mean? Simply put, it's the ability of an AI to understand, interpret, and generate content from multiple types of data inputs simultaneously. This includes text, images, audio, and even video.

### Why It Matters for Content Creation

For content creators, this is a revolutionary development. Imagine feeding an AI a link to your latest product page, a few customer testimonials from a document, and a folder of product images. The AI doesn't just process these one by one; it synthesizes them. It understands the context of the text, the sentiment of the testimonials, and the visual elements of the images.

The result? A coherent, engaging, and visually rich piece of content, like a newsletter, that is far more than the sum of its parts. This is the core philosophy behind DripFlow AI.

### Looking Ahead

As these models become more advanced, the line between human and AI-generated content will continue to blur. The key will be to leverage these tools not as replacements for human creativity, but as powerful assistants that can handle the heavy lifting of content aggregation and drafting, freeing up creators to focus on strategy, storytelling, and building their communities. The future is not just automated; it's collaborative.
`;

export const blogPosts: Post[] = [
  {
    slug: 'the-rise-of-multi-modal-ai',
    title: 'The Rise of Multi-Modal AI in Content Creation',
    description:
      'Explore how AI that understands text, images, and more is changing the game for newsletter creators.',
    author: 'Jane Doe',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-05-15',
    tags: ['AI', 'Content Creation', 'Future Tech'],
    image:
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: mockContent,
  },
  {
    slug: '5-tips-for-engaging-newsletters',
    title: '5 Tips for Writing Newsletters That People Actually Read',
    description:
      'Learn the secrets to crafting compelling newsletters that capture attention and drive engagement.',
    author: 'John Smith',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-05-10',
    tags: ['Marketing', 'Writing', 'Email'],
    image:
      'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: mockContent.replace('Multi-Modal AI', 'Engaging Newsletters'),
  },
  {
    slug: 'automating-your-workflow-with-dripflow',
    title: 'How to Automate Your Content Workflow with DripFlow AI',
    description:
      'A step-by-step guide to saving hours every week by letting DripFlow AI handle your newsletter creation.',
    author: 'Emily White',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-05-01',
    tags: ['Productivity', 'Automation', 'DripFlow'],
    image:
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: mockContent.replace('Multi-Modal AI', 'Workflow Automation'),
  },
  {
    slug: 'the-art-of-the-subject-line',
    title: 'The Art of the Perfect Subject Line',
    description:
      'Master the most important part of your email. We break down the science behind clickable subject lines.',
    author: 'John Smith',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-04-22',
    tags: ['Marketing', 'Email', 'Copywriting'],
    image:
      'https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: mockContent.replace('Multi-Modal AI', 'Subject Lines'),
  },
];

export function getAllPosts(): Post[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
