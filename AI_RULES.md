# AI Development Rules

This document outlines the tech stack and coding conventions to be followed by the AI assistant when modifying this project.

## Tech Stack

This is a modern web application built with the following technologies:

-   **Framework**: [Next.js](https://nextjs.org/) (v15) using the App Router.
-   **Language**: [TypeScript](https://www.typescriptlang.org/).
-   **UI Library**: [React](https://react.dev/) (v19).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4) for all styling purposes.
-   **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) for complex animations.
-   **Linting**: [ESLint](https://eslint.org/) to ensure code quality and consistency.
-   **Package Manager**: Bun is the preferred package manager.

## Library Usage and Coding Conventions

To maintain a clean, simple, and maintainable codebase, please adhere to the following rules:

-   **Styling**:
    -   All styling **must** be done using Tailwind CSS utility classes directly in the JSX.
    -   Avoid creating custom CSS files. Use the existing `src/style.css` only for global styles, font imports, or CSS variables.
    -   Do not add any other styling libraries (e.g., Styled Components, Emotion, Sass).

-   **UI Components**:
    -   For building new UI elements, prioritize using components from the **shadcn/ui** library.
    -   Components should be small, focused, and placed in the `src/components` directory.

-   **Icons**:
    -   Use the `lucide-react` library for all icons.

-   **Animations**:
    -   Use **GSAP** for complex, timeline-based, or physics-based animations.
    -   For simple transitions (e.g., hover effects, fades), use Tailwind CSS's built-in transition and animation utilities.

-   **State Management**:
    -   For local component state, use React's built-in hooks (`useState`, `useReducer`).
    -   For global state, use React's Context API (`useContext`).
    -   Do not introduce external state management libraries like Redux or Zustand unless the application's complexity absolutely requires it.

-   **Routing**:
    -   All routing is handled by the Next.js App Router.
    -   Create new pages as directories within the `src/app` folder.

-   **Code Structure**:
    -   Pages go in `src/app/[route]/page.tsx`.
    -   Reusable components go in `src/components/`.
    -   Keep components small and focused on a single responsibility.