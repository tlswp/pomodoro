# Coding Conventions

## Project Structure

The project follows Feature-Sliced Design (FSD) architectural methodology with the following layers:

```
src/
  ├── app/         # Application initialization and global providers
  ├── pages/       # Full pages or large parts of a page in nested routing
  ├── widgets/     # Independent and complex UI blocks
  ├── features/    # User interactions and business logic
  ├── entities/    # Business entities
  └── shared/      # Reusable infrastructure code and UI elements
```

## TypeScript Guidelines

- Use TypeScript's strict mode (enabled in tsconfig)
- Explicitly declare types for function parameters and return values
- Prefer interfaces over type aliases for object definitions
- Use type inference when the type is obvious
- Avoid using `any` type; use `unknown` instead when type is uncertain

## React Components

### Component Structure

```typescript
// Component naming: PascalCase
export const ComponentName = () => {
  // Hooks first
  const [state, setState] = useState()

  // Event handlers next
  const handleEvent = () => {}

  // Side effects after
  useEffect(() => {}, [])

  // Render last
  return (
    <div>
      {/* JSX content */}
    </div>
  )
}
```

### Component Guidelines

- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper prop-types or TypeScript interfaces

## Styling Conventions

### Tailwind CSS

- Use Tailwind's utility classes following the project's design system
- Group related utilities using the `cn()` utility from `tailwind-merge`
- Follow mobile-first responsive design approach
- Use CSS variables for theme customization

## File Organization

- One component per file
- Index files for clean exports
- Group related components in feature-specific folders
- Keep shared components in the `shared` layer

## File Naming

- Use kebab-case (lowercase with hyphens) for ALL files in the project: `my-utility.ts`, `api-client.ts`, `user-profile.tsx`
- Test files should match their implementation file name with `.test` or `.spec` suffix: `button.test.tsx`
- Type definition files use `.d.ts` extension: `types.d.ts`

## Import Order

Follow the configured import sort order:

```typescript
// External dependencies
import React from 'react';

// Internal aliases (@/)
import { useStore } from '@/shared/lib/store';

// Relative imports
import { Component } from './component';
```

## Code Formatting

### Prettier Configuration

- Line width: 120 characters
- Tab width: 2 spaces
- Single quotes for strings
- Semicolons required
- Trailing commas in ES5 mode

### ESLint Rules

- Follow React hooks rules
- Enforce proper import ordering
- No unused variables or imports
- No console statements in production code

## Testing

- Write tests using Vitest and Testing Library
- Follow AAA pattern (Arrange-Act-Assert)
- Test component behavior, not implementation
- Use meaningful test descriptions

## State Management

### Zustand Store

- Keep stores small and focused
- Use TypeScript for store definitions
- Implement proper state immutability
- Document store interfaces

## Form Handling

- Use React Hook Form for form state management
- Implement Zod schemas for validation
- Follow controlled components pattern

## Git Workflow

- Use conventional commits (enforced by commitlint)
- Run pre-commit hooks (lint-staged)
- Format code before committing

## Performance Considerations

- Implement proper memoization (useMemo, useCallback)
- Optimize re-renders
- Lazy load components when appropriate
- Use proper key props in lists

## Accessibility

- Follow WAI-ARIA guidelines
- Use semantic HTML elements
- Implement keyboard navigation
- Ensure proper color contrast

## Documentation

- Document complex logic and business rules
- Use JSDoc for public APIs and shared utilities
- Keep README files up to date
- Document component props and usage examples
