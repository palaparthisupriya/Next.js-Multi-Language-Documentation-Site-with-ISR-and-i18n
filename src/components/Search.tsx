'use client';

import * as React from 'react';
import {useState, useEffect} from 'react';
import {Index} from 'flexsearch';
import {Search as SearchIcon, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {useParams} from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  version: string;
  slug: string;
}

export default function Search() {
  const t = useTranslations('Search');
  const params = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<any>(null);

  useEffect(() => {
    // In a real app, you'd fetch an index file or build it server-side
    // For this demo, we'll build a small index on mount
    const searchIndex = new Index({
      tokenize: 'forward',
    });

    // Mock index data - in reality this would be more comprehensive
    const mockData = [
      { id: '1', title: 'Introduction', version: 'v1', slug: 'introduction' },
      { id: '2', title: 'Getting Started', version: 'v1', slug: 'getting-started' },
      { id: '3', title: 'Introduction', version: 'v2', slug: 'introduction' },
      { id: '4', title: 'Introduction', version: 'v3', slug: 'introduction' },
    ];

    mockData.forEach(doc => {
      searchIndex.add(doc.id, doc.title);
    });

    setIndex({ index: searchIndex, data: mockData });
  }, []);

  useEffect(() => {
    if (!query || !index) {
      setResults([]);
      return;
    }

    const searchResults = index.index.search(query);
    const found = searchResults.map((id: string) => index.data.find((d: any) => d.id === id));
    setResults(found);
  }, [query, index]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          data-testid="search-input"
          type="search"
          placeholder={t('placeholder')}
          className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && (
        <div 
          data-testid="search-results"
          className="absolute top-full mt-2 w-full bg-popover border rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto p-2"
        >
          {results.length > 0 ? (
            results.map((res) => (
              <Link
                key={res.id}
                href={`/docs/${res.version}/${res.slug}`}
                onClick={() => setQuery('')}
                className="block p-2 hover:bg-accent rounded-sm text-sm"
              >
                <div className="font-medium">{res.title}</div>
                <div className="text-xs text-muted-foreground">{res.version}</div>
              </Link>
            ))
          ) : (
            <div data-testid="search-no-results" className="p-4 text-sm text-muted-foreground text-center">
              {t('noResults', {query})}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
