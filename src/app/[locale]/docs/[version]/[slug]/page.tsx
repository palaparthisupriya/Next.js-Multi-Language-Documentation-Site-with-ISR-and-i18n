import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import {notFound} from 'next/navigation';
import TOC from '@/components/TOC';
import FeedbackWidget from '@/components/FeedbackWidget';
import Search from '@/components/Search';

export const revalidate = 60;

export async function generateStaticParams() {
  const versions = ['v1', 'v2', 'v3'];
  const locales = ['en', 'es', 'fr', 'de'];
  const paths = [];

  for (const v of versions) {
    for (const l of locales) {
      const docPath = path.join(process.cwd(), '_docs', v, l);
      if (fs.existsSync(docPath)) {
        const files = fs.readdirSync(docPath);
        for (const file of files) {
          paths.push({
            version: v,
            locale: l,
            slug: file.replace('.md', ''),
          });
        }
      }
    }
  }
  return paths;
}

async function getDocData(version: string, locale: string, slug: string) {
  const fullPath = path.join(process.cwd(), '_docs', version, locale, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  // Simple TOC generation for now
  const headings = content?.match(/^#+ .+/gm) || [];
  const toc = headings.map((h) => {
    const levelMatch = h.match(/^#+/);
    const level = levelMatch ? levelMatch[0].length : 1;
    const title = h.replace(/^#+ /, '');
    // Match rehype-slug's ID generation: lowercase, remove non-alphanumeric, replace spaces with hyphens
    const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return { level, title, id };
  });

  return {
    title: data.title,
    description: data.description,
    contentHtml,
    toc,
  };
}

export default async function DocPage({
  params
}: {
  params: {version: string; locale: string; slug: string};
}) {
  const {version, locale, slug} = await params;
  const docData = await getDocData(version, locale, slug);

  if (!docData) {
    notFound();
  }

  return (
    <div className="mx-auto w-full min-w-0">
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          Docs
        </div>
        <div className="px-1">/</div>
        <div className="font-medium text-foreground">{version}</div>
      </div>
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">
          {docData.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {docData.description}
        </p>
      </div>

      <div 
        data-testid="doc-content"
        className="pb-12 pt-8 prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: docData.contentHtml }}
      />

      <FeedbackWidget />

      <aside className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <TOC toc={docData.toc} />
        </div>
      </aside>
    </div>
  );
}
