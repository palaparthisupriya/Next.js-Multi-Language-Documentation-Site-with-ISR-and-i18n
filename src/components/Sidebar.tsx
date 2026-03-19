'use client';

import * as React from 'react';
import {useParams} from 'next/navigation';
import {Link, usePathname} from '@/i18n/routing';
import {cn} from '@/lib/utils';

export default function Sidebar() {
  const params = useParams();
  const version = params.version || 'v1';
  const pathname = usePathname();

  const links = [
    { title: 'Introduction', slug: 'introduction' },
    { title: 'Getting Started', slug: 'getting-started' },
  ];

  return (
    <aside 
      data-testid="sidebar"
      className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
    >
      <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
        <div className="flex flex-col space-y-2">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Documentation
            </h2>
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.slug}
                  data-testid={`sidebar-nav-link-${link.slug}`}
                  href={`/docs/${version}/${link.slug}`}
                  className={cn(
                    "group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname.includes(link.slug) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                data-testid="sidebar-nav-link-api-reference"
                href="/api-reference"
                className={cn(
                  "group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === '/api-reference' ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
