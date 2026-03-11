# Shopping List Application — Sprint Plan

**Version:** 1.0
**Date:** 2026-03-03
**Project:** Shopping List App — Team 1
**Sprint Duration:** 1 week per sprint

---

## Git Workflow

All development follows this branching model:

```
feature/* → test/* → development → main
```

| Step | Action | Branch |
|------|--------|--------|
| 1 | Create feature branch from `development` | `feature/<name>` |
| 2 | Develop and commit | `feature/<name>` |
| 3 | Push and PR into test branch | `feature/<name>` → `test/<name>` |
| 4 | Test and verify in test branch | `test/<name>` |
| 5 | PR into development | `test/<name>` → `development` |
| 6 | Final release merge (Sprint 3 only) | `development` → `main` |

**Rule:** No untested code is merged into `development`. Every feature must pass through a `test/*` branch.

---

## Sprint 1 — Project Setup & UI Foundation

**Duration:** 2026-03-04 to 2026-03-10
**Milestone:** Sprint 1: Project Setup & UI Foundation
**Goal:** Configured development environment, folder structure, git workflow, and base responsive HTML/CSS layout with Bootstrap.

### Tasks

#### Dev A — Repository Structure & Git Workflow

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Create folder structure (`css/`, `js/`, `docs/`) | CON-001, CON-002 | `feature/repo-setup` |
| Set up git branching workflow (`development`, branch protections) | CON-002 | `feature/repo-setup` |
| Create `.gitignore` (`.DS_Store`, `node_modules/`, `.env`) | CON-003 | `feature/repo-setup` |
| Update `README.md` with project description, team, and setup instructions | — | `feature/repo-setup` |

#### Dev B — Bootstrap Integration & HTML Layout

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Add Bootstrap 5.3 CDN (CSS + JS Bundle) to `index.html` | FR-UI-001 | `feature/html-layout` |
| Create semantic HTML structure (header, main, footer) | UI-COMP-001 to UI-COMP-004 | `feature/html-layout` |
| Add element IDs for JavaScript targeting (`#item-input`, `#add-btn`, `#shopping-list`, etc.) | — | `feature/html-layout` |
| Ensure responsive layout with Bootstrap grid | FR-UI-001 | `feature/html-layout` |

#### Dev C — Custom CSS Theme

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Define CSS custom properties (`:root` variables for colors) | FR-UI-002 | `feature/css-theme` |
| Create `.completed` class (strikethrough, muted color) | FR-UI-005 | `feature/css-theme` |
| Create `.editing` class for inline edit mode | FR-UI-005 | `feature/css-theme` |
| Add CSS transitions for smooth state changes | FR-UI-002 | `feature/css-theme` |

### Definition of Done

- [ ] Code reviewed by at least one team member
- [ ] `index.html` renders correctly with Bootstrap styling
- [ ] Page is responsive across mobile (320px), tablet (768px), and desktop (1024px+) viewports
- [ ] Custom CSS variables and state classes are defined and working
- [ ] All features tested via `test/*` branches before merging
- [ ] All code merged into `development` branch
- [ ] No console errors in the browser

---

## Sprint 2 — Core CRUD Features

**Duration:** 2026-03-11 to 2026-03-17
**Milestone:** Sprint 2: Core CRUD Features
**Goal:** All CRUD operations working — add, edit, delete, mark-as-complete — with LocalStorage persistence.

> **Dependency Note:** Dev A must merge first. Dev A's work provides the data structure, `renderList()` function, and item counter that Dev B and Dev C depend on.

### Tasks

#### Dev A — Add Item & Core Rendering

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Implement `addItem()` function with input validation | FR-ITEM-001, FR-ITEM-005 | `feature/add-item` |
| Implement duplicate item prevention | FR-ITEM-006 | `feature/add-item` |
| Implement `renderList()` function to display all items | FR-LIST-001, FR-LIST-002 | `feature/add-item` |
| Implement item counter ("X of Y items completed") | FR-UI-003 | `feature/add-item` |

#### Dev B — Delete & Mark-as-Complete

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Implement `deleteItem()` with confirmation prompt | FR-ITEM-003 | `feature/delete-complete` |
| Implement `toggleComplete()` to mark/unmark items | FR-ITEM-004 | `feature/delete-complete` |
| Use event delegation for list item buttons | — | `feature/delete-complete` |
| Update item counter after delete/toggle operations | FR-UI-003 | `feature/delete-complete` |

#### Dev C — Edit Item & LocalStorage

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Implement inline `editItem()` with save/cancel | FR-ITEM-002 | `feature/edit-storage` |
| Implement `saveToLocalStorage()` | FR-DATA-001 | `feature/edit-storage` |
| Implement `loadFromLocalStorage()` on page load | FR-DATA-002 | `feature/edit-storage` |
| Implement `clearLocalStorage()` for Clear All action | FR-DATA-003 | `feature/edit-storage` |

### Definition of Done

- [ ] All CRUD operations work correctly (add, edit, delete, mark-complete)
- [ ] Input validation prevents empty and duplicate items
- [ ] LocalStorage persists data across page refresh
- [ ] Item counter updates accurately after all operations
- [ ] Each feature tested via `test/*` branches before merging
- [ ] No console errors in the browser
- [ ] All code merged into `development` branch

---

## Sprint 3 — UI Polish, Documentation & Deployment

**Duration:** 2026-03-18 to 2026-03-24
**Milestone:** Sprint 3: UI Polish, Documentation & Deployment
**Goal:** Polished responsive UI, complete documentation, and live GitHub Pages deployment.

### Tasks

#### Dev A — Testing Strategy & Execution

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Create `docs/testing-strategy.md` with test case template | TEST-GEN-001, TEST-GEN-002 | `feature/testing-docs` |
| Write test cases for all CRUD operations | TEST-GEN-002 | `feature/testing-docs` |
| Execute all test cases and document results | TEST-GEN-001 | `feature/testing-docs` |
| File bug issues for any failures found during testing | — | `feature/testing-docs` |

#### Dev B — UI Polish & Accessibility

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Implement empty state message when list is empty | FR-UI-002 | `feature/ui-polish` |
| Implement toast notifications for user actions | FR-UI-004 | `feature/ui-polish` |
| Refine responsive layout for all breakpoints | FR-UI-001 | `feature/ui-polish` |
| Add favicon | — | `feature/ui-polish` |
| Improve accessibility (ARIA labels, keyboard navigation) | FR-UI-005 | `feature/ui-polish` |

#### Dev C — Documentation & Deployment

| Task | Requirement IDs | Branch |
|------|----------------|--------|
| Finalize `README.md` with live demo link and screenshots | CON-001 | `feature/deploy-docs` |
| Add code comments for complex logic | NFR-MAINT-001 | `feature/deploy-docs` |
| Deploy to GitHub Pages | CON-001 | `feature/deploy-docs` |
| Verify all assets load on the live URL | CON-001 | `feature/deploy-docs` |

### Definition of Done

- [ ] Application deployed to GitHub Pages and accessible via live URL
- [ ] All static assets (CSS, JS, Bootstrap) load correctly on the deployed site
- [ ] `docs/testing-strategy.md` is complete with test results
- [ ] `README.md` includes live demo link
- [ ] Empty state message displays correctly when list is empty
- [ ] Toast notifications appear for add, edit, and delete actions
- [ ] Application is accessible (keyboard navigation, ARIA labels)
- [ ] Each feature tested via `test/*` branches before merging
- [ ] All code merged into `development` branch
- [ ] `development` branch merged into `main`
