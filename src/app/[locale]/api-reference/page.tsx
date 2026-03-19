'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiReferencePage() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-lg shadow-sm border overflow-hidden min-h-screen">
      <SwaggerUI url="/openapi.json" />
    </div>
  );
}
