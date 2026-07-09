# Quickstart & Validation: Dark Mode Toggle

**Feature**: Dark Mode Toggle | **Date**: 2026-07-09 | **Plan**: [plan.md](plan.md)

This guide validates the dark mode toggle end-to-end. It is a run/validation guide — implementation details live in the plan, [data-model.md](data-model.md), and [contracts/theme-context.md](contracts/theme-context.md), and concrete steps will come from `tasks.md`.

## Prerequisites

- Node.js and npm installed
- Repository dependencies installed: `npm install`

## Run the app

```bash
npm run dev
```

Open the printed local URL (Vite, typically `http://localhost:5173`).

## Lint (must pass)

```bash
npm run lint
```

> Note: the project has no automated test runner configured (only `lint`, `dev`, `build`, `preview`). Validation below is manual.

## Validation scenarios

### Scenario A — Toggle to dark mode (FR-001, FR-002, FR-003) → User Story 1

1. Load the app; confirm the main screen (feedback form + header) renders in the **light** theme.
2. Locate the theme toggle in the header (Lucide Moon icon).
3. Click it.
   - **Expected**: interface switches to a dark theme immediately (<1s); the icon changes to a Sun; `aria-label` becomes "Switch to light mode".
4. Click it again.
   - **Expected**: interface returns to light; icon returns to Moon.

### Scenario B — Consistent theme across all screens (FR-004, FR-005) → User Story 2

1. With dark mode active, type feedback and click **Generate Insights**.
2. Observe the loading state.
   - **Expected**: loading view renders in dark theme.
3. On the results dashboard, inspect sentiment metrics, the category chart, and the feedback table.
   - **Expected**: all render in dark theme with readable contrast (no unreadable/invisible text or icons).
4. Click **Back**.
   - **Expected**: return to the dark-themed form.

### Scenario C — Preference persists across reloads (FR-006) → User Story 3

1. Set the app to dark mode.
2. Reload the page (and/or close and reopen the tab).
   - **Expected**: app reopens in dark mode with **no visible flash** of the light theme before it settles.
3. Switch to light mode and reload.
   - **Expected**: app reopens in light mode.

### Scenario D — First visit default (FR-007)

1. Clear the stored preference: in DevTools console run
   ```js
   localStorage.removeItem('insight-tone-theme');
   ```
   then reload.
   - **Expected**: app loads in **light** mode.

### Scenario E — Invalid stored value (edge case)

1. In DevTools console run
   ```js
   localStorage.setItem('insight-tone-theme', 'banana');
   ```
   then reload.
   - **Expected**: app falls back to light mode without errors; toggling then stores a valid value.

### Scenario F — Accessibility (FR-008)

1. Using only the keyboard, Tab to the theme toggle.
   - **Expected**: a visible focus ring appears on the toggle.
2. Press Enter or Space.
   - **Expected**: theme switches.
3. Inspect the toggle in the accessibility tree.
   - **Expected**: it is a button with a descriptive `aria-label` and `aria-pressed` reflecting the current mode.

## Success criteria coverage

| Scenario | Success criteria |
|----------|------------------|
| A | SC-001, SC-002 |
| B | SC-003 |
| C | SC-004 |
| F | SC-005 |
