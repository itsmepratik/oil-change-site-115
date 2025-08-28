# Project Overview

This is a React-based website for "HNS Automotive", an oil change and automotive service center located in Saham, North Al Batinah, Oman. The site is built using Vite, TypeScript, React, Tailwind CSS, and shadcn-ui components. It features a modern, responsive design with bilingual support (English and Arabic) and includes sections for services, pricing, testimonials, and a contact/booking form.

Key technologies used:
- Vite (Build tool)
- TypeScript
- React
- Tailwind CSS (Styling)
- shadcn-ui (UI Components)
- Framer Motion (Animations)
- React Router (Navigation)
- React Query (Data fetching)

# Building and Running

To work with this project, you'll need Node.js installed.

## Initial Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```sh
   npm install
   ```

## Development

Start the development server with auto-reloading:
```sh
npm run dev
```

## Building

To create a production build:
```sh
npm run build
```

To create a development build:
```sh
npm run build:dev
```

## Linting

To lint the codebase:
```sh
npm run lint
```

## Previewing

To preview the production build locally:
```sh
npm run preview
```

# Development Conventions

- The project uses TypeScript for type safety.
- Components are built using React and styled with Tailwind CSS.
- UI components are primarily from shadcn-ui, located in `src/components/ui`.
- Custom components are organized in `src/components`.
- Pages are located in `src/pages`.
- The site supports both English (default) and Arabic languages through a custom LanguageContext (`src/contexts/LanguageContext.tsx`).
- Animations are handled with Framer Motion.
- The site uses React Router for navigation.
- Data fetching is managed with React Query.
- Images are stored in the `public` directory and referenced with absolute paths (e.g., `/lovable-uploads/image.png`).
- Configuration files like `tailwind.config.ts`, `vite.config.ts`, and `tsconfig.json` define the build and development environment.