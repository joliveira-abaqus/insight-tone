# Implementation Plan: Dark Mode Toggle

**Branch**: `feature/dark-mode-toggle` | **Date**: 2026-07-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-dark-mode-toggle/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a discoverable theme control on the main screen that lets a Product Manager switch the entire Insight Tone SPA between the existing light theme and a new dark theme. The selected theme is applied to every primary view (feedback form, loading state, results dashboard) and persisted locally so it is reapplied on the next visit. The approach uses Tailwind's built-in `class` dark mode strategy: a `dark` class is toggled on the `<html>` element by a small React theme context/hook, `dark:` variant utilities are added to existing components, and the preference is stored in `localStorage`. A Lucide `Sun`/`Moon` toggle button is placed in the existing `Header`.

## Technical Context

**Language/Version**: JavaScript (JSX) with React 18.2

**Primary Dependencies**: React 18, Tailwind CSS 3.3, Lucide React (`lucide-react`), Vite 4

**Storage**: Browser `localStorage` (single key for the theme preference; no backend)

**Testing**: Manual validation via `quickstart.md` (no automated test runner is configured in `package.json`; project ships `lint` only). New tests are out of scope unless a runner is later added.

**Target Platform**: Modern web browsers (desktop and tablet responsive)

**Project Type**: Single-page web application

**Performance Goals**: Theme switch perceived as immediate (<1s, effectively instant via a CSS class toggle); no additional network requests; no measurable bundle-size impact (no new dependencies)

**Constraints**: No flash of incorrect theme on load (apply stored preference before first paint); accessible control (keyboard operable, labeled, exposes current state); contrast preserved in both themes; English-only UI text per constitution

**Scale/Scope**: Single user session; touches ~1 new hook/context, 1 new toggle component, `globals.css`, `tailwind.config.js`, and existing layout/dashboard components for `dark:` variants

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitutional Compliance Analysis

**✅ PM-Centric Design**: Dark mode is a comfort/accessibility improvement for PMs working in varied lighting; the control lives on the main screen for immediate access.
**✅ React-First Architecture**: Theme state is managed with a React context/hook; the toggle is a React component. No direct DOM manipulation beyond the standard, React-managed `dark` class on the root element applied via effect.
**✅ Tailwind CSS Styling**: Uses Tailwind's `darkMode: 'class'` strategy and `dark:` utility variants; design tokens continue to come from `tailwind.config.js`.
**✅ Lucide Icon Consistency**: The toggle uses Lucide React icons (`Sun` / `Moon`) with consistent sizing and semantics.
**✅ English-Only Content**: All UI labels (e.g., "Switch to dark mode") and code comments are en-US.

**GATE STATUS**: ✅ PASSED — No constitutional violations identified.

### Post-Design Re-Check (after Phase 1)

Re-evaluated after data-model, contracts, and quickstart were produced. The design introduces no new frameworks, no alternative styling system, and no non-Lucide icons. **GATE STATUS**: ✅ PASSED — still compliant.

## Project Structure

### Documentation (this feature)

```text
specs/002-dark-mode-toggle/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── theme-context.md # UI/state contract for the theme provider + toggle
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx            # MODIFIED: render <ThemeToggle /> in the header actions
│   │   └── Layout.jsx            # MODIFIED: dark: variants for sidebar/main surfaces
│   ├── ThemeToggle/
│   │   └── ThemeToggle.jsx       # NEW: Lucide Sun/Moon button; calls useTheme()
│   ├── FeedbackForm/             # MODIFIED: dark: variants
│   ├── ResultsDashboard/         # MODIFIED: dark: variants (metrics, chart, table)
│   └── LoadingSpinner/           # MODIFIED: dark: variants
├── context/
│   └── ThemeContext.jsx          # NEW: ThemeProvider + context (light/dark, toggle, persistence)
├── hooks/
│   └── useTheme.js               # NEW: consumer hook for ThemeContext
├── styles/
│   └── globals.css               # MODIFIED: dark: variants for body + component classes (.card, .btn-*, etc.)
├── App.jsx                       # MODIFIED: wrap tree in <ThemeProvider>
└── main.jsx

tailwind.config.js                # MODIFIED: add darkMode: 'class'
index.html                        # (optional) inline pre-paint script to set initial theme class
```

**Structure Decision**: Keep the existing single-project, feature-folder React structure. Introduce a dedicated `context/` for the `ThemeProvider` and a `useTheme` hook under the existing `hooks/`, following the repo's hook-per-file convention (`useAppState`, `useFeedbackAnalysis`). The toggle gets its own component folder under `components/` to match the existing per-component folder pattern. Theme styling is layered onto existing components via Tailwind `dark:` variants rather than new stylesheets, honoring the Tailwind-first constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations identified — complexity tracking not required.
