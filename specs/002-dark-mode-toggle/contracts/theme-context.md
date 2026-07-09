# UI/State Contract: Theme Context & Toggle

**Feature**: Dark Mode Toggle | **Date**: 2026-07-09 | **Plan**: [plan.md](plan.md)

This SPA exposes no external network API for this feature. The relevant "contracts" are the internal React interfaces (context, hook, and component) that other parts of the app depend on. These are stable interfaces implementation must honor.

## 1. `ThemeContext` value contract

Provided by `ThemeProvider` (`src/context/ThemeContext.jsx`).

```text
ThemeContextValue = {
  theme: "light" | "dark",          // current active theme
  toggleTheme: () => void,          // flips light <-> dark, persists, updates <html>
  setTheme: (value: "light" | "dark") => void, // sets explicit theme, persists, updates <html>
}
```

Guarantees:
- `theme` is always exactly `"light"` or `"dark"` (never null/undefined).
- Calling `toggleTheme` or `setTheme` synchronously updates `theme`, writes `localStorage["insight-tone-theme"]`, and adds/removes the `dark` class on `document.documentElement`.
- `setTheme` with an invalid value is a no-op (or coerces to the current/default theme); it must never store an invalid value.

## 2. `ThemeProvider` component contract

```text
<ThemeProvider>{children}</ThemeProvider>
```

- Props: `children: ReactNode` (required).
- On mount: initializes `theme` from `localStorage` (valid value) else `"light"`; ensures the `<html>` class matches the initial `theme`.
- Wraps the application tree once, in `App.jsx`, above `Layout`/screens.

## 3. `useTheme` hook contract

```text
const { theme, toggleTheme, setTheme } = useTheme();
```

- Returns the current `ThemeContextValue`.
- MUST throw a clear error if used outside a `ThemeProvider` (developer-guard).

## 4. `ThemeToggle` component contract

`src/components/ThemeToggle/ThemeToggle.jsx`, rendered inside `Header`.

- Props: none required (reads state via `useTheme`). MAY accept an optional `className` for placement.
- Renders a single `<button>`:
  - Shows a Lucide `Moon` icon when `theme === "light"` (action: switch to dark) and a `Sun` icon when `theme === "dark"` (action: switch to light).
  - `aria-label`: `"Switch to dark mode"` when light, `"Switch to light mode"` when dark.
  - Reflects state via `aria-pressed={theme === "dark"}`.
  - Keyboard operable (native button; Enter/Space activate) with a visible focus ring consistent with existing `.btn-*` focus styles.
  - `onClick` calls `toggleTheme()`.

## 5. Tailwind configuration contract

- `tailwind.config.js` MUST set `darkMode: 'class'`.
- Dark styling MUST be expressed via `dark:` variant utilities (no separate stylesheet, no non-Tailwind CSS beyond existing animation/component layers).

## 6. Pre-paint initialization contract (FOUC prevention)

- Before React mounts, the initial theme class MUST be applied to `document.documentElement` based on `localStorage["insight-tone-theme"]` (falling back to no `dark` class = light).
- Recommended: an inline `<script>` in `index.html` `<head>`. The `ThemeProvider` MUST then initialize its state to the same value so React and the DOM agree.

## Acceptance mapping

| Contract element | Spec requirement |
|------------------|------------------|
| `ThemeToggle` in `Header` on main screen | FR-001 |
| `toggleTheme` immediate update | FR-002 |
| Icon + `aria-label` + `aria-pressed` | FR-003, FR-008 |
| `dark` class on `<html>` + `dark:` variants everywhere | FR-004, FR-005 |
| `localStorage` read/write | FR-006 |
| Init fallback to `"light"` | FR-007 |
| Pre-paint script | Constraint: no flash of incorrect theme |
