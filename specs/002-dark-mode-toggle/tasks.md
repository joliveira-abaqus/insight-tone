---
description: "Task list for Dark Mode Toggle implementation"
---

# Tasks: Dark Mode Toggle

**Input**: Design documents from `/specs/002-dark-mode-toggle/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/theme-context.md, quickstart.md

**Tests**: No automated test runner is configured for this project (`package.json` exposes only `lint`, `dev`, `build`, `preview`), and none was requested. No test tasks are generated; validation is manual via `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in each task

## Path Conventions

- Single-page React app; source at repository root under `src/`. Paths below reflect `plan.md`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Enable Tailwind class-based dark mode.

- [ ] T001 Enable class-based dark mode by adding `darkMode: 'class'` to the config export in `tailwind.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Theme state, consumer hook, and provider wiring that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T002 Create `src/context/ThemeContext.jsx` exporting `ThemeContext` and `ThemeProvider`; hold in-memory `theme` state (`"light" | "dark"`, default `"light"`) and expose `toggleTheme()` and `setTheme(value)`; apply/remove the `dark` class on `document.documentElement` via an effect whenever `theme` changes (per `contracts/theme-context.md` §1–2). Persistence is added later in US3.
- [ ] T003 [P] Create `src/hooks/useTheme.js` returning the `ThemeContext` value and throwing a clear error when used outside `ThemeProvider` (per `contracts/theme-context.md` §3)
- [ ] T004 Wrap the application tree in `<ThemeProvider>` in `src/App.jsx` (above `ErrorBoundary`/`Layout`)

**Checkpoint**: Theme state is globally available and toggling updates the `<html>` class.

---

## Phase 3: User Story 1 - Switch to Dark Mode from the Main Screen (Priority: P1) 🎯 MVP

**Goal**: A discoverable toggle on the main screen switches the primary view between light and dark immediately.

**Independent Test**: Open the main screen, activate the toggle, and confirm the header + feedback form switch light↔dark; verify the control shows the current mode. (quickstart Scenario A)

- [ ] T005 [P] [US1] Create `src/components/ThemeToggle/ThemeToggle.jsx`: a `<button>` using Lucide `Moon`/`Sun` icons, `aria-label` "Switch to dark mode"/"Switch to light mode", `aria-pressed={theme === "dark"}`, visible focus ring matching existing `.btn-*` styles, calling `toggleTheme()` from `useTheme()` (per `contracts/theme-context.md` §4)
- [ ] T006 [US1] Render `<ThemeToggle />` in the header actions area of `src/components/Layout/Header.jsx` (next to the Export button) so it is visible on the main screen
- [ ] T007 [US1] Add `dark:` variant utilities to the main-screen surfaces in `src/components/Layout/Layout.jsx`, `src/components/Layout/Header.jsx`, and `src/components/FeedbackForm/FeedbackForm.jsx` (backgrounds, borders, text, icons) so the initial screen renders correctly in dark mode with readable contrast

**Checkpoint**: On the main screen the user can toggle dark/light and the form + header + layout render correctly in both themes (MVP).

---

## Phase 4: User Story 2 - Consistent Theme Across the Application (Priority: P2)

**Goal**: Loading state and results dashboard honor the selected theme with readable contrast.

**Independent Test**: With dark mode active, submit feedback and move through the loading state and results dashboard; confirm every view renders in dark theme. (quickstart Scenario B)

- [ ] T008 [US2] Add `dark:` variants to the shared component classes in `src/styles/globals.css` (`body`, `.card`, `.card-header`, `.card-body`, `.btn-secondary`, `.metric-card`, `.metric-value`, `.metric-label`) reusing the existing slate/zinc palette
- [ ] T009 [P] [US2] Add `dark:` variants to `src/components/LoadingSpinner/LoadingSpinner.jsx` and the loading view markup in `src/App.jsx`
- [ ] T010 [P] [US2] Add `dark:` variants to `src/components/ResultsDashboard/ResultsDashboard.jsx` and `src/components/ResultsDashboard/SentimentMetrics.jsx`
- [ ] T011 [P] [US2] Add `dark:` variants to `src/components/ResultsDashboard/CategoryChart.jsx` (Tailwind-simulated chart bars/labels remain legible in dark)
- [ ] T012 [P] [US2] Add `dark:` variants to `src/components/ResultsDashboard/FeedbackTable.jsx` (header, rows, borders, status badges)

**Checkpoint**: All primary screens (form, loading, dashboard) render correctly in both themes.

---

## Phase 5: User Story 3 - Remember the Chosen Theme (Priority: P3)

**Goal**: The selected theme persists across reloads/reopens with no flash of the wrong theme.

**Independent Test**: Select dark mode, reload/reopen; app reopens in dark mode without a light flash; clearing the stored value defaults to light. (quickstart Scenarios C–E)

- [ ] T013 [US3] Extend `src/context/ThemeContext.jsx` to initialize `theme` from `localStorage["insight-tone-theme"]` and write the value on every change; validate the read (missing/invalid → default `"light"`) per `data-model.md`
- [ ] T014 [US3] Add a small inline pre-paint `<script>` in the `<head>` of `index.html` that reads `localStorage["insight-tone-theme"]` and sets the `dark` class on `document.documentElement` before React mounts (FOUC prevention, `contracts/theme-context.md` §6)
- [ ] T015 [P] [US3] Verify graceful fallback for missing/invalid stored values (quickstart Scenarios D–E); ensure no invalid value is ever written back

**Checkpoint**: Theme preference persists across sessions with no flash and safe fallbacks.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T016 Run `npm run lint` and fix any issues introduced by the new/modified files
- [ ] T017 Execute all `quickstart.md` validation scenarios (A–F) and confirm contrast/accessibility across both themes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories.
- **User Stories (Phase 3–5)**: All depend on Foundational completion.
  - US1 (P1) is the MVP. US2 and US3 build on the same provider but are independently testable.
- **Polish (Phase 6)**: After the desired user stories are complete.

### User Story Dependencies

- **US1 (P1)**: Needs Phase 2 (provider + hook). No dependency on US2/US3.
- **US2 (P2)**: Needs Phase 2. Independent of US1 (styling different files); best demoed after US1 exists.
- **US3 (P3)**: Extends the Phase 2 provider (T013) plus `index.html` (T014). Independent of US1/US2 behavior.

### Within Each User Story

- T002 → T003/T004 (hook and provider wiring depend on the context existing).
- T005 → T006 (toggle must exist before it is placed in the header).
- T013 → T014 (persistence key/logic decided before the pre-paint script mirrors it).

### Parallel Opportunities

- T003 can run in parallel with T004 once T002 exists.
- US1 T005 is [P] (new isolated file).
- US2 T009–T012 are [P] (different component files); T008 edits shared CSS so run it before/after the [P] batch to avoid churn.
- US3 T015 verification is [P].

---

## Parallel Example: User Story 2

```bash
# After T008 (shared CSS), style the results/loading components in parallel:
Task: "Add dark: variants to LoadingSpinner.jsx + loading view in App.jsx"
Task: "Add dark: variants to ResultsDashboard.jsx + SentimentMetrics.jsx"
Task: "Add dark: variants to CategoryChart.jsx"
Task: "Add dark: variants to FeedbackTable.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup (T001)
2. Phase 2: Foundational (T002–T004)
3. Phase 3: User Story 1 (T005–T007)
4. **STOP and VALIDATE**: quickstart Scenario A + F
5. Demo the toggle on the main screen (MVP)

### Incremental Delivery

1. Setup + Foundational → provider ready
2. US1 → toggle + main-screen theming → validate → demo (MVP)
3. US2 → full-app theming → validate → demo
4. US3 → persistence + no-flash → validate → demo

---

## Notes

- No new dependencies are added; only existing React, Tailwind, and Lucide are used.
- [P] tasks = different files, no dependencies.
- Keep all UI text in English (en-US) per the constitution.
- Commit after each task or logical group; commit messages/PR description in pt-BR per repo convention.
