<!--
Sync Impact Report:
Version change: None → 1.0.0 (initial constitution)
Modified principles: None (all principles newly established)
Added sections: Core Principles (5), Technology Stack Requirements, Development Workflow, Governance
Removed sections: None
Templates requiring updates: ✅ plan-template.md (constitution check section aligned), ✅ spec-template.md (scope/requirements aligned), ✅ tasks-template.md (task categorization aligned), ✅ commands/speckit.agent-context.update.md (no outdated references)
Follow-up TODOs: None
-->

# Insight Tone Constitution

## Core Principles

### I. PM-Centric Design
All features must be designed specifically for Product Manager workflows and use cases. User experience must prioritize PM productivity, with intuitive interfaces that align with strategic planning, roadmap management, and stakeholder communication needs. Every component must serve a clear PM value proposition.

### II. React-First Architecture
React is the mandatory UI framework for all frontend components. All interactive elements must be implemented as React components with proper state management, props interfaces, and lifecycle hooks. No direct DOM manipulation or alternative frameworks allowed.

### III. Tailwind CSS Styling
Tailwind CSS is the mandatory styling system. All visual designs must use Tailwind utility classes for consistency. Custom CSS is only permitted for animations or complex responsive patterns that cannot be achieved with Tailwind utilities. Design tokens must be derived from Tailwind's configuration.

### IV. Lucide Icon Consistency
Lucide React is the mandatory icon library. All icons must use Lucide components with consistent sizing, color application, and semantic meaning. No custom SVG icons or alternative icon libraries allowed. Icon usage must follow accessibility best practices.

### V. English-Only Content
All code, comments, documentation, logs, and visible UI text must be in English (en-US). No localization or internationalization features allowed. All user-facing content must follow American English conventions and be culturally appropriate for PM audiences.

## Technology Stack Requirements

React, Tailwind CSS, and Lucide React form the mandatory technology stack. All dependencies must be compatible with these core technologies. Development tools, testing frameworks, and build systems must integrate seamlessly with this stack.

## Development Workflow

All development must follow the Spec Kit workflow: specification → planning → tasks → implementation. Code reviews must verify compliance with all constitutional principles. Testing must cover PM-centric user scenarios and edge cases.

## Governance

This constitution supersedes all other project practices and guidelines. Amendments require documentation of changes, impact analysis on existing features, and a migration plan for any breaking changes. All pull requests and reviews must verify constitutional compliance. Use AGENTS.md for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-07-07 | **Last Amended**: 2026-07-07
