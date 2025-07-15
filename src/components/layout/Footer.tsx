import Link from 'next/link';
import { Newspaper, Twitter, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

const footerLinks = {
  Product: [
    { name: 'Features', href: '/#features' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">
                DripFlow AI
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Generate beautiful newsletters from any source effortlessly.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-headline font-semibold tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-4 sm:mt-0 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DripFlow AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
