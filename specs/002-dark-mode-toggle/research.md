# Phase 0 Research: Dark Mode Toggle

**Feature**: Dark Mode Toggle | **Date**: 2026-07-09 | **Plan**: [plan.md](plan.md)

This document resolves the open technical decisions for adding a dark mode toggle to the Insight Tone SPA. There were no `NEEDS CLARIFICATION` markers left in the spec; the items below are the technology/pattern decisions required by the plan.

## Decision 1: Theme switching strategy (Tailwind `class` vs `media`)

- **Decision**: Use Tailwind CSS `darkMode: 'class'` in `tailwind.config.js` and toggle a `dark` class on the root `<html>` element.
- **Rationale**: The feature requires a user-controlled toggle that overrides the operating system preference and is persisted. The `class` strategy gives explicit, JS-controlled switching; the `media` strategy follows `prefers-color-scheme` only and cannot be toggled by the user. The repo already uses Tailwind 3.3, which supports `darkMode: 'class'` natively — no new dependency.
- **Alternatives considered**:
  - `darkMode: 'media'` — rejected: cannot be manually toggled or persisted; only mirrors OS setting (explicitly out of scope per spec assumptions).
  - CSS custom properties / a separate dark stylesheet — rejected: duplicates styling outside Tailwind, violating the Tailwind-first constitution and adding maintenance overhead.
  - A third-party theme library — rejected: unnecessary dependency for a two-theme toggle; supply-chain and bundle cost with no benefit.

## Decision 2: State management for the theme

- **Decision**: A React Context (`ThemeProvider` in `src/context/ThemeContext.jsx`) exposing `{ theme, toggleTheme, setTheme }`, consumed via a `useTheme` hook (`src/hooks/useTheme.js`). `App.jsx` wraps the tree in `<ThemeProvider>`.
- **Rationale**: The theme is global cross-cutting state read by the header toggle and potentially other components, and it is independent of the existing `useAppState` two-screen state. Context avoids prop-drilling and matches the repo's React-first, hook-per-concern conventions (`useAppState`, `useFeedbackAnalysis`, `useLoadingState`).
- **Alternatives considered**:
  - Lifting theme into `useAppState` — rejected: mixes an unrelated concern into the core screen-state machine.
  - Prop drilling from `App` to `Header` — rejected: brittle and does not scale as more components need `dark:` awareness.

## Decision 3: Persistence mechanism

- **Decision**: Persist the preference in `localStorage` under a single key (e.g., `insight-tone-theme` with value `"light"` or `"dark"`). Read it when the provider initializes; write it whenever the theme changes.
- **Rationale**: Meets FR-006 (reapply on reload/reopen) with a per-browser, no-backend solution consistent with the spec assumption that no cross-device sync is required. `localStorage` is synchronous and simple to read before first paint.
- **Alternatives considered**:
  - `sessionStorage` — rejected: cleared when the tab closes, failing "reopen the app" persistence.
  - Cookies — rejected: sent to the server needlessly; the app has no backend for this preference.

## Decision 4: Default theme and first-visit behavior

- **Decision**: Default to **light** mode when no stored preference exists (FR-007). OS `prefers-color-scheme` is not consulted in this version.
- **Rationale**: Matches the app's current appearance and the spec's documented assumption; keeps the first-visit experience predictable and OS-auto-switching explicitly out of scope.
- **Alternatives considered**:
  - Default to OS preference on first visit — rejected: out of scope per spec assumptions; can be a future enhancement layered on the same `class` mechanism.

## Decision 5: Avoiding flash of incorrect theme (FOUC)

- **Decision**: Apply the stored theme class as early as possible. Preferred: a tiny inline script in `index.html` `<head>` that reads `localStorage` and sets `document.documentElement.classList` before React mounts. The `ThemeProvider` then syncs React state to that same value.
- **Rationale**: Prevents a visible light→dark flash on load for returning dark-mode users, satisfying the "no flash of incorrect theme" constraint. The inline script is minimal and framework-agnostic.
- **Alternatives considered**:
  - Setting the class only inside a React `useEffect` — rejected: runs after first paint, causing a brief flash of the default theme.

## Decision 6: Toggle control UI and accessibility

- **Decision**: A `ThemeToggle` button component using Lucide `Sun`/`Moon` icons, placed in the existing `Header` action area on the main screen. It is a real `<button>`, keyboard operable, with an `aria-label` (e.g., "Switch to dark mode" / "Switch to light mode") and `aria-pressed`/state reflecting the current theme.
- **Rationale**: Satisfies FR-001/FR-003/FR-008 (discoverable on main screen, communicates current mode, accessible). Lucide is the mandated icon library. The header is visible on the main screen and persists across views, also supporting the P2 consistency story.
- **Alternatives considered**:
  - A switch in the sidebar "Settings" link — rejected: the sidebar is hidden on small screens (`hidden md:block`) and the request specifies the main screen.
  - A custom SVG toggle — rejected: violates the Lucide-only constitution.

## Decision 7: Applying dark styles to existing components

- **Decision**: Add `dark:` variant utilities to existing components and to the shared component classes in `src/styles/globals.css` (`body`, `.card`, `.card-header`, `.btn-secondary`, `.metric-card`, `.metric-value`, `.metric-label`, etc.), plus inline Tailwind classes in `Layout`, `Header`, `FeedbackForm`, `ResultsDashboard` (metrics/chart/table), and `LoadingSpinner`.
- **Rationale**: Reuses the existing Tailwind slate/zinc palette (already defined in `tailwind.config.js`) for dark surfaces, keeping styling centralized and constitution-compliant while covering all primary screens for FR-004/FR-005 and the P2 story.
- **Alternatives considered**:
  - Only theming the header/main container — rejected: leaves the dashboard and form light, failing the consistency requirement and contrast criteria.

## Summary of resolved unknowns

| Topic | Resolution |
|-------|-----------|
| Switching strategy | Tailwind `darkMode: 'class'` + `dark` class on `<html>` |
| State management | React Context `ThemeProvider` + `useTheme` hook |
| Persistence | `localStorage` single key (`light`/`dark`) |
| Default theme | Light; no OS auto-switch |
| FOUC prevention | Inline pre-paint script in `index.html` |
| Toggle UI | Lucide `Sun`/`Moon` button in `Header`, accessible |
| Coverage | `dark:` variants across all primary views + `globals.css` |

All decisions use existing dependencies; **no new packages are introduced.**
