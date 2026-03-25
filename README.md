# Aver

Aver is a movie and series discovery app built with React, TypeScript and Vite. It makes use of the TMDB API to let users browse titles, search by query and explore detailed pages with supporting information like cast and similar recommendations.

The project is being built feature by feature. Right now the core experience is focused on discovery and browsing and the next planned steps are user-facing features such as ratings, watchlists, and other personalized actions.

## Features

- Browse movies from curated TMDB lists
- Search movies with debounced requests
- View movie details, cast, and similar movies
- Explore a home page with featured content
- Fetch remote data with React Query
- Navigate between pages with React Router

## Roadmap

- Search and browse series in the main UI
- Rate movies and series
- Save titles to a personal watchlist
- Track watched items
- Add persistent user preferences and account-based features

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS
- ESLint
- Prettier

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

You can generate an API key from [The Movie Database](https://www.themoviedb.org/).

### 3. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` runs TypeScript build checks and creates a production build
- `npm run lint` runs ESLint with zero warnings allowed
- `npm run lint:fix` automatically fixes lint issues when possible
- `npm run format` formats the project with Prettier
- `npm run preview` previews the production build locally

## Current Status

Movie discovery is the most complete part of the app today. Series support exists in the codebase at the API and feature level, but the UI flow is still evolving and not yet documented here as a fully finished experience.

## Notes

- The app depends on TMDB data availability and API limits.
- Some future features in the roadmap will likely require local persistence or backend support.

