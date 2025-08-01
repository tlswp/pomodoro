# Pomodoro App

The Pomodoro Timer helps you stay focused and manage your time effectively. Plan your tasks, customize the timer, and boost your productivity with a sleek, minimalist interface.

## Features

- 🎯 Task Management with Kanban Board
- 📅 Task Calendar Integration
- 🎨 Modern UI with shadcn/ui
- 🔊 Sound Notifications
- 📱 Responsive Design

## In Development

- ⏱️ Customizable Pomodoro Timer
- ⚙️ Timer Functionality Implementation
- 📊 Timer Session Statistics
- 🔔 Timer Notification System

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Testing:** Vitest + Testing Library
- **Drag & Drop:** DND Kit

## Getting Started

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/tlswp/pomodoro.git
cd pomodoro
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm run dev
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm run test:ui` - Run tests with UI
- `pnpm run test:coverage` - Run tests with coverage report
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint errors
- `pnpm run format` - Format code with Prettier

## Architecture

This project follows Feature-Sliced Design (FSD) methodology - an architectural methodology for frontend projects. FSD helps organize code in a way that maximizes reusability, maintainability, and parallel development capabilities.

### Feature-Sliced Design Layers

```
src/
├── app/           # App initialization and providers
├── entities/      # Business entities (users, products, etc.)
├── features/      # User interactions and business logic
├── pages/         # Application pages/screens
├── shared/        # Reusable infrastructure code and UI
└── widgets/       # Complex components combining entities and features
```

### Layer Dependencies

FSD enforces a strict dependency rule where each layer can only depend on the layers below it:

```
pages → widgets → features → entities → shared
```

This helps maintain a clean architecture and prevents circular dependencies.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`pnpm run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
