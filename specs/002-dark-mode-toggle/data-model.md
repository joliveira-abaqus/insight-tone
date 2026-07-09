# Phase 1 Data Model: Dark Mode Toggle

**Feature**: Dark Mode Toggle | **Date**: 2026-07-09 | **Plan**: [plan.md](plan.md)

This feature is client-side only and introduces no backend entities or database schema. The "data" here is a single UI preference held in React state and mirrored to `localStorage`.

## Entity: Theme Preference

Represents the user's chosen application appearance.

| Field | Type | Allowed values | Default | Description |
|-------|------|----------------|---------|-------------|
| `theme` | string (enum) | `"light"`, `"dark"` | `"light"` | The currently active theme. |
| `source` | string (enum, derived) | `"stored"`, `"default"` | `"default"` | Whether the active theme came from a persisted user choice or the first-visit default. Informational; not persisted. |

### Persistence

- **Location**: `localStorage`
- **Key**: `insight-tone-theme`
- **Stored value**: the raw `theme` string (`"light"` or `"dark"`).
- **Read**: on provider initialization and by the pre-paint inline script.
- **Write**: whenever `theme` changes.

### Validation rules

- On read, if the stored value is missing, `null`, or not one of `"light"` / `"dark"`, fall back to the default (`"light"`) and treat `source` as `"default"` (satisfies the invalid-preference edge case).
- Only the two enum values are ever written; any other input is coerced to the default rather than stored.

### State transitions

```text
             toggleTheme() / setTheme("dark")
   ┌──────┐ ───────────────────────────────────▶ ┌──────┐
   │ light│                                       │ dark │
   └──────┘ ◀─────────────────────────────────── └──────┘
             toggleTheme() / setTheme("light")
```

- `toggleTheme()`: `light → dark` and `dark → light`.
- `setTheme(value)`: sets the theme to an explicit valid value (idempotent if already that value).
- Each transition: (1) updates React state, (2) writes `localStorage`, (3) adds/removes the `dark` class on `document.documentElement`.

### Relationships

- The Theme Preference is **global** and single per user/browser. It is independent of the application's screen-state machine (`useAppState`) and applies uniformly to the feedback form, loading state, and results dashboard.

### Requirements traceability

| Field / rule | Requirement(s) |
|--------------|----------------|
| `theme` enum + toggle transitions | FR-001, FR-002 |
| `source` / current-mode indication | FR-003, FR-008 |
| Applied to `<html>` (all views) | FR-004, FR-005 |
| `localStorage` persistence | FR-006 |
| Default `"light"` on first visit | FR-007 |
| Invalid/missing value fallback | Edge case: stored preference invalid |
