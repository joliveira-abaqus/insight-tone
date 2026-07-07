# Insight Tone — Spec-Driven Development with Devin

A hands-on case study: from a one-line product idea to a working prototype using [GitHub Spec Kit](https://github.com/github/spec-kit) and [Devin](https://docs.devin.ai/cli).

---

## 1. Objective

Freeform prompting ("build me an app that does X") forces a coding agent to guess your architecture, constraints, and definition of "done" all at once. **Spec-Driven Development (SDD)** is a better path.

Spec Kit breaks the work into explicit, reviewable stages — rules first, then requirements, then the technical plan, then the tasks, then the code. Each stage produces a Markdown artifact that the next stage reads and respects, so the agent never improvises past what was scoped.

**Insight Tone** is the example product built to demonstrate this end to end: a single-page prototype for Product Managers that turns raw, pasted user feedback into an instant dashboard — sentiment metrics, issue categories, and a structured feedback table — with no manual tagging.

This README covers:

- What Spec Kit is and why it pairs well with Devin
- How to install and initialize it
- The full SDD workflow (Constitution → Specify → Plan → Tasks → Implement)
- The exact prompts used to build Insight Tone
- How Spec Kit manages `AGENTS.md`
- How to run the app locally

---

## 2. What is Spec Kit

[Spec Kit](https://github.com/github/spec-kit) ([docs](https://github.github.com/spec-kit/)) is GitHub's open-source, MIT-licensed toolkit for Spec-Driven Development. It ships as a Python CLI (`specify`) that scaffolds a project with slash commands your coding agent runs directly in the repo.

Key ideas:

- **Specifications become executable.** They generate the implementation instead of merely describing it.
- **Agent-agnostic.** Works with 30+ AI coding agents — Claude Code, GitHub Copilot, Cursor, Codex, Devin CLI, and more.
- **Technology-agnostic.** The same workflow applies to a React SPA, a .NET backend, or a legacy migration.
- **Auditable by design.** Every phase produces a reviewable Markdown file — a paper trail you can hand to another engineer or another agent.

---

## 3. Prerequisites

| Tool | Purpose |
|---|---|
| [**Node.js 18+**](https://nodejs.org/) | Runtime for the React app (`npm install`, `npm run dev`) |
| [**uv**](https://docs.astral.sh/uv/) | Python package manager used to install the Specify CLI |
| **Python 3.11+** | Required by the Specify CLI |
| **Git** | Version control |
| **Devin CLI** (or Desktop) | AI coding agent — [install docs](https://docs.devin.ai/cli) |

---

## 4. Installation

### 4.1 Install the Specify CLI

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

### 4.2 Initialize the project for Devin

```bash
specify init insight-tone --integration devin
cd insight-tone
```

This installs Spec Kit as **Devin Skills** under `.devin/skills/`, creates the shared `.specify/` scaffolding, and generates a top-level `AGENTS.md` context file. Right after init, the project root looks like this:

```
insight-tone/
├── .devin/          # Devin skills (slash commands)
├── .specify/        # Templates, memory, workflows
└── AGENTS.md        # Shared context file Devin reads every session
```

### 4.3 Available commands

Inside a Devin session (CLI or Desktop), the Spec Kit phases become slash commands:

| Command | Phase |
|---|---|
| `/speckit-constitution` | Set project-wide rules |
| `/speckit-specify` | Define what to build |
| `/speckit-clarify` | Remove ambiguity *(optional)* |
| `/speckit-plan` | Design how to build it |
| `/speckit-tasks` | Break plan into work items |
| `/speckit-implement` | Execute the task list |
| `/speckit-analyze` | Cross-artifact consistency check *(optional)* |

---

## 5. The Spec-Driven Development Workflow

| Phase | Artifact produced | What it does |
|---|---|---|
| **Constitution** | `.specify/memory/constitution.md` | Permanent rulebook — stack, style, constraints. Everything downstream respects it. |
| **Specify** | `specs/<feature>/spec.md` | What you're building: user stories and acceptance criteria. No implementation details. |
| **Clarify** *(optional)* | Updates to `spec.md` | Structured pass to remove ambiguity before locking in a technical plan. |
| **Plan** | `specs/<feature>/plan.md` | Technical design: folder structure, state management, component architecture. Checked against the Constitution. |
| **Tasks** | `specs/<feature>/tasks.md` | Plan broken into small, sequential, file-scoped work items. |
| **Implement** | Source code | Devin executes the task list and writes the real code. |

Each command reads the Markdown artifact the previous one produced — skipping a step means the next step is guessing again.

---

## 6. Step-by-Step: Building Insight Tone

### Step 1 — Constitution

Establishes the non-negotiable rules for the whole project: who it's for, the mandatory stack, and the language every output must be written in.

```
/speckit-constitution Establish that the "Insight Tone" project is a prototype focused on Product
Managers. The mandatory stack must be React, Tailwind CSS, and Lucide React for icons. All
code, comments, documentation, logs, and visible UI text must be generated in English (en-US).
```

This writes `.specify/memory/constitution.md`. From this point on, every downstream phase inherits these rules — Devin won't reach for a different stack or default to the wrong UI language.

### Step 2 — Specify

Defines **what** will be built — screens, states, and user-facing behavior — deliberately avoiding implementation details like hooks or component names.

```
/speckit-specify Define the scope of Insight Tone as a single-page app (SPA) with two screen
states controlled by one React state:

1. Initial State — a form with a large text field to paste user feedback and a prominent "Generate
Insights" button.
2. Results State — a dashboard with sentiment metrics, a Tailwind-simulated chart for issue
categories, and a data table with structured feedback. Include a back button to reset the state.
```

### Step 3 — Plan

Turns the spec into a concrete technical design: folder structure, state management, and interaction details such as the loading state.

```
/speckit-plan Create a detailed component architecture plan inside the 'src' folder. The plan
must include the folder structure, local state management for toggling between the two screens,
and the simulation of a 2-second loading effect (spinner) when the button is clicked, before
rendering the dashboard data.
```

This is where the "how" shows up — and it's checked against the Constitution before anything gets built.

### Step 4 — Tasks

Breaks the plan into concrete, actionable, file-scoped work items — including specific example data so Devin has something real to render.

```
/speckit-tasks Generate the actionable task list. Tasks must cover: 1. Global layout with a
Tailwind-styled sidebar (Slate/Zinc). 2. Data-entry card component. 3. Results dashboard
components — metric cards, horizontal category bars, and a table hard-coded with 3 real
feedback examples: a crash bug, a PDF-export feature request, and a UX tweak to the save
button.
```

### Step 5 — Implement

Executes the generated tasks, produces the real files, and wires everything together so the app is demo-ready.

```
/speckit-implement Execute the previously generated tasks, creating the necessary files and
injecting the Tailwind CSS. Make sure the app is ready to run locally with 'npm run dev' and that
the interface is visually clean, modern, and in English for the presentation to PMs.
```

Before starting, Devin validates that the constitution, spec, plan, and tasks are all in place — it won't improvise past what was scoped.

---

## 7. Project Structure

After implementation, the repository looks like this:

```
insight-tone/
├── .devin/                          # Devin skills (slash commands)
├── .specify/                        # Spec Kit templates, memory, workflows
├── specs/
│   └── 001-insight-tone-spa/
│       ├── spec.md                  # Feature specification
│       ├── plan.md                  # Technical design
│       ├── tasks.md                 # File-scoped work items
│       ├── research.md              # Phase 0 research output
│       ├── data-model.md            # Data model definitions
│       ├── quickstart.md            # Validation scenarios
│       └── contracts/               # UI contracts
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── FeedbackForm/
│   │   ├── Layout/
│   │   ├── LoadingSpinner/
│   │   └── ResultsDashboard/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   └── utils/
├── AGENTS.md
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 8. AGENTS.md and Project Context

`AGENTS.md` is the shared context file Devin reads at the start of every session. Spec Kit manages a section of it automatically, delimited by:

```
<!-- SPECKIT START -->
...
<!-- SPECKIT END -->
```

That section is created by `specify init` and kept up to date by `/speckit-plan`, which extracts the tech stack straight from `plan.md`. For Insight Tone, React, Tailwind CSS, and Lucide React are registered there automatically.

Everything **outside** the markers is preserved and never overwritten — even on upgrades. That's where you add anything the SDD workflow doesn't cover:

- Operational commands (build, lint, test, ports)
- Branch, commit, and PR conventions
- Business or compliance rules outside any single feature spec
- A reminder that new features should go through `/speckit-specify → /speckit-plan → /speckit-tasks` before any code is written

For a disposable prototype like Insight Tone, none of this is strictly necessary. For a real, ongoing repository, it's worth adding.

---

## 9. Running the App Locally

Once `/speckit-implement` completes:

```bash
npm install
npm run dev
```

Vite starts on `http://localhost:5173` by default (the exact URL is printed in the terminal).

The app opens with the **Initial State** — a feedback textarea and a "Generate Insights" button. Submitting triggers a 2-second simulated loading state, then transitions to the **Results State** — sentiment metrics, category bars, and a data table with three hard-coded feedback examples (a crash bug, a PDF-export request, and a UX tweak to the save button). A back button resets to the Initial State.

---

## 10. Using Spec Kit in a Real Repo — Next Steps

1. Install Spec Kit and run `specify init <project> --integration devin` against a real repository.
2. Write a Constitution once — mandatory stack, language, conventions — and let every later phase inherit it for free.
3. Add repo-specific operational instructions to `AGENTS.md` outside the `SPECKIT START/END` markers (see Section 8).
4. Run one pilot end to end, the way Insight Tone was built here, before scaling the pattern to bigger projects.

---

## 11. References

- Spec Kit repository: [github.com/github/spec-kit](https://github.com/github/spec-kit)
- Spec Kit documentation: [github.github.com/spec-kit](https://github.github.com/spec-kit/)
- Devin documentation: [docs.devin.ai/cli](https://docs.devin.ai/cli)
