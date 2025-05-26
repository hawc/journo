# Journo

Journo is a Next.js application built with TypeScript that fetches and analyzes German local news based on user queries. It uses MongoDB for data storage and leverages AI capabilities to evaluate news content, providing a straightforward way to filter local news based on specific objectives.

## Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm or yarn

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
