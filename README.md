# Next.js Documentation Portal

A high-performance, multi-language documentation portal built with Next.js, featuring Incremental Static Regeneration (ISR), Internationalization (i18n), and client-side full-text search.

## Features

- **Hybrid Rendering**: Uses ISR with a 60-second revalidation period for up-to-date static content.
- **Internationalization (i18n)**: Full support for English, Spanish, French, and German with locale-based routing.
- **Multi-version Support**: Switch between different documentation versions (v1, v2, v3).
- **Interactive Search**: Client-side full-text search powered by FlexSearch.
- **API Reference**: Interactive Swagger UI integrated at `/api-reference`.
- **UI Components**:
  - Collapsible Sidebar with navigation links.
  - Theme Switcher (Light/Dark/System).
  - Copy-to-clipboard for code blocks.
  - Scroll-tracking Table of Contents.
  - Feedback Widget with success notifications.
- **Containerization**: Fully dockerized environment with healthchecks.

## Architecture

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Search**: FlexSearch
- **API Documentation**: swagger-ui-react
- **Content**: Markdown-based documentation stored in `_docs/`.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)

### Running with Docker

1. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
2. Start the application:
   ```bash
   docker-compose up --build
   ```
3. Access the portal at [http://localhost:3000](http://localhost:3000).

### Local Development

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `_docs/`: Documentation markdown files organized by version and locale.
- `public/locales/`: Translation files for the UI.
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components.
- `src/i18n/`: Internationalization configuration.

## Verification

The project includes specific `data-testid` attributes for automated testing. You can verify the following:
- Language switcher navigation.
- Version selector navigation.
- Search functionality and results.
- Feedback widget submission.
- Code block copy functionality.
- TOC scroll tracking.
