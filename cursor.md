# Oil Change Service Website

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

This is a React + TypeScript SPA built with Vite, featuring a modern oil change service booking website.

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Project Structure

- `src/pages/` - Main page components (Index, Privacy, Terms)
- `src/components/` - Reusable UI components
  - `ui/` - shadcn/ui base components
  - `features/` - Feature-specific components
  - `pricing/` - Pricing section components
- `src/contexts/` - React contexts (LanguageContext for i18n)
- `src/config/` - Configuration files (features, oils, vehicles)
- `src/lib/` - Utility functions

### Key Features

- **Multilingual Support**: Arabic/English with RTL support via LanguageContext
- **Booking System**: Modal-based booking with vehicle/oil selection
- **Animated UI**: Framer Motion animations throughout
- **Modern Design**: Dark theme with glass morphism effects
- **Responsive**: Mobile-first responsive design

### Component Patterns

- Uses shadcn/ui component library with custom styling
- Framer Motion for page transitions and animations
- Context providers wrap the entire app (Language, Query, Tooltip)
- Custom hooks for toast notifications and language switching

### Development Notes

- Server runs on port 8080 (configured in vite.config.ts)
- Uses SWC for fast compilation
- Path alias `@/` points to `src/`
- Lovable-tagger plugin for development mode component tagging
