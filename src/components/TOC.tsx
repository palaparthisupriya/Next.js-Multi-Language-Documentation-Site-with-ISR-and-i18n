'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';

interface TocItem {
  level: number;
  title: string;
  id: string;
}

export default function TOC({toc}: {toc: TocItem[]}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div data-testid="table-of-contents" className="space-y-2">
      <p className="font-medium">On This Page</p>
      <ul className="m-0 list-none">
        {toc.map((item) => (
          <li key={item.id} className={item.level > 1 ? 'pl-4' : ''}>
            <a
              data-testid={`toc-link-${item.id}`}
              data-active={activeId === item.id ? "true" : "false"}
              href={`#${item.id}`}
              className={`inline-block py-1 transition-colors hover:text-foreground ${
                activeId === item.id ? 'font-medium text-foreground' : 'text-muted-foreground'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
