'use client';

import * as React from 'react';
import {useTheme} from 'next-themes';
import {Sun, Moon, Languages, ChevronDown} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname, useRouter, routing} from '@/i18n/routing';
import {useParams} from 'next/navigation';

import Search from '@/components/Search';

export default function Header() {
  const {setTheme, theme} = useTheme();
  const locale = useLocale();
  const t = useTranslations('Common');
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale as any});
  };

  const handleVersionChange = (newVersion: string) => {
    const slug = params.slug || 'introduction';
    router.push(`/docs/${newVersion}/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex items-center space-x-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">DocPortal</span>
          </Link>
          <Search />
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            {/* Version Selector */}
            <div className="relative group">
              <button 
                data-testid="version-selector"
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <span>{params.version || 'v1'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-popover border rounded-md shadow-md p-1 min-w-[80px]">
                {['v1', 'v2', 'v3'].map((v) => (
                  <button
                    key={v}
                    data-testid={`version-option-${v}`}
                    onClick={() => handleVersionChange(v)}
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded-sm"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative group">
              <button 
                data-testid="language-switcher"
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <Languages className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
              </button>
              <div className="absolute top-full right-0 hidden group-hover:block bg-popover border rounded-md shadow-md p-1 min-w-[120px]">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded-sm capitalize"
                  >
                    {l === 'en' ? 'English' : l === 'es' ? 'Español' : l === 'fr' ? 'Français' : 'Deutsch'}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              data-testid="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
