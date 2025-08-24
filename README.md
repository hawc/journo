# Journo

Journo is a Next.js application built with TypeScript that fetches and analyzes German local news based on user queries. It uses MongoDB for data storage and leverages AI capabilities to evaluate news content, providing a straightforward way to filter local news based on specific objectives.

## Features

- 🔍 **Smart News Search** - Query-based news filtering and analysis
- 🇩🇪 **German Local News Focus** - Specialized for German regional news sources
- 🤖 **AI-Powered Analysis** - Intelligent content evaluation and categorization
- ⚙️ **Site Management Interface** - Admin panel for managing and configuring news source sites
- 📱 **Modern Web Interface** - Responsive design with intuitive user experience
- 💾 **MongoDB Integration** - Efficient data storage and retrieval
- 🔐 **Authentication** - Secure user access with Auth0 integration

## Data Source

The news data used by this application is scraped using the [Journo Crawler](https://github.com/hawc/journo-crawler) - a specialized web scraping application built with **Crawlee** and **Playwright** that automatically extracts article content from news websites and stores the data in MongoDB.

The crawler handles:
- **Multi-site crawling** of German local news websites
- **Content extraction** including headlines, teasers, content, and publication dates
- **Data filtering** by time and relevance
- **MongoDB storage** for efficient data retrieval

## Technologies

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: CSS Modules, SCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Auth0
- **AI Integration**: OpenAI API
- **Deployment**: Vercel (recommended)

## Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm or yarn

## Environment Setup

1. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

2. Configure the following environment variables:
   ```env
   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DATABASE=your_database_name
   MONGODB_ARTICLE_COLLECTION=your_articles_collection_name
   MONGODB_CONFIGS_COLLECTION=your_configs_collection_name
   
   # Auth0 Configuration
   AUTH0_SECRET=your_auth0_secret
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-4o-mini
   PROMPT_SYSTEM=your_system_prompt_for_ai_analysis
   ```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd journo
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Project
To start the development server, run:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000`.

## Building for Production
To build the project for production, run:
```bash
npm run build
# or
yarn build
```

## Project Structure
- `app/`: Contains the main application code.
- `components/`: Reusable React components.
- `lib/`: Utility functions and shared code.
- `public/`: Static assets.
- `types/`: TypeScript type definitions.
