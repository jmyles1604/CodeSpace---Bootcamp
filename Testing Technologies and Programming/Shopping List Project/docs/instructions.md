# Shopping List Application — Developer Instructions

**Version:** 1.0
**Date:** 2026-03-03
**Project:** Shopping List App — Team 1

---

## 1. Prerequisites & Infrastructure

### 1.1 Required Tools

| Tool | Purpose | Download |
|------|---------|----------|
| Git | Version control | [git-scm.com](https://git-scm.com/) |
| VS Code | Code editor (recommended) | [code.visualstudio.com](https://code.visualstudio.com/) |
| Live Server | Local development server (VS Code extension) | VS Code Extensions Marketplace |
| Modern Browser | Testing (Chrome, Firefox, Safari, or Edge) | — |
| GitHub CLI (`gh`) | Issue management, PR workflows | [cli.github.com](https://cli.github.com/) |

### 1.2 Git Workflow

The project follows a structured branching model to ensure code quality and prevent untested code from reaching `development` or `main`.

| Branch | Purpose | Merges Into |
|--------|---------|-------------|
| `main` | Production-ready code, deployed to GitHub Pages | — |
| `development` | Integration branch for tested features | `main` (end of Sprint 3) |
| `feature/*` | Individual feature development | `test/*` |
| `test/*` | Testing and verification of features | `development` |

**Workflow:**

```
feature/add-item → test/add-item → development → main
```

1. Create a `feature/*` branch from `development`
2. Develop the feature, commit with conventional messages
3. Push and create a PR from `feature/*` → `test/*`
4. Test thoroughly in the `test/*` branch
5. Create a PR from `test/*` → `development`
6. After review and approval, merge into `development`

### 1.3 Branch Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| `feature/<description>` | `feature/add-item` | New feature development |
| `test/<description>` | `test/add-item` | Testing a feature before merge |
| `fix/<description>` | `fix/input-validation` | Bug fixes |
| `docs/<description>` | `docs/update-readme` | Documentation changes |

### 1.4 GitHub Project Board

The team uses a GitHub Project board for task tracking:

- **Project:** [Shopping List Project Board](https://github.com/orgs/EC-CodeSpace-0012/projects/1)
- **Columns:** Backlog → In Progress → In Review → Done
- All issues are assigned to milestones corresponding to sprints

---

## 2. Project Setup

### 2.1 Folder Structure

```
Shopping-List-Project-Team-1/
├── index.html              # Main HTML page
├── css/
│   └── styles.css          # Custom styles and theme
├── js/
│   └── app.js              # Application logic
├── docs/
│   ├── requirements.md     # Requirements document
│   ├── instructions.md     # This file
│   ├── sprints.md          # Sprint plan
│   ├── shopping-list.md    # Implementation plan
│   └── testing-strategy.md # Test cases and results (Sprint 3)
├── .gitignore              # Git ignore rules
└── README.md               # Project overview and demo link
```

### 2.2 File Purposes

| File | Purpose |
|------|---------|
| `index.html` | Single-page HTML with Bootstrap CDN, semantic structure, and element IDs for JS targeting |
| `css/styles.css` | Custom CSS properties, theme colors, state classes (`.completed`, `.editing`), transitions |
| `js/app.js` | All application logic: CRUD operations, LocalStorage, DOM manipulation, event listeners |
| `.gitignore` | Excludes `.DS_Store`, `node_modules/`, `.env`, IDE config files |
| `README.md` | Project description, team members, setup instructions, live demo link |

### 2.3 Bootstrap CDN Integration

Add the following to `index.html` inside the `<head>` tag:

```html
<!-- Bootstrap 5.3 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7icsOifkntC8ERbjRNItVw77TkOz4Oj3pB"
      crossorigin="anonymous">
```

Add before the closing `</body>` tag:

```html
<!-- Bootstrap 5.3 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>

<!-- App JS -->
<script src="js/app.js"></script>
```

---

## 3. Development Workflows

### 3.1 Adding a New Feature

1. **Pull latest `development`:**
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/add-item
   ```

3. **Develop the feature** — make changes, test locally with Live Server

4. **Commit with conventional messages:**
   ```bash
   git add index.html js/app.js
   git commit -m "feat: add item functionality with input validation"
   ```

5. **Push and create PR to test branch:**
   ```bash
   git push -u origin feature/add-item
   gh pr create --base test/add-item --title "feat: add item functionality"
   ```

6. **Test in the `test/*` branch**, then PR into `development`

### 3.2 Adding CSS Styles

1. Define custom properties in `:root` in `css/styles.css`:
   ```css
   :root {
     --primary-color: #4A90D9;
     --completed-color: #6c757d;
     --danger-color: #dc3545;
   }
   ```

2. Use Bootstrap utility classes first, custom CSS only when needed
3. Use the `.completed` class for completed items (strikethrough, muted color)
4. Use the `.editing` class to show inline edit mode

### 3.3 Working with LocalStorage

```javascript
// Save to LocalStorage
function saveToLocalStorage(items) {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Load from LocalStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem('shoppingList');
  return data ? JSON.parse(data) : [];
}
```

- Call `saveToLocalStorage()` after every add, edit, delete, or toggle operation
- Call `loadFromLocalStorage()` on page load (`DOMContentLoaded` event)

---

## 4. Testing

### 4.1 Manual Testing Approach

Since this is a frontend-only project, testing is performed manually. Each feature must be tested in a dedicated `test/*` branch before merging into `development`.

### 4.2 Test Documentation Format

Document test cases in `docs/testing-strategy.md` using this format:

```markdown
### Test Case: [Component] - [Action] - [Expected Result]

- **Steps:**
  1. Step one
  2. Step two
- **Expected Result:** What should happen
- **Actual Result:** What actually happened
- **Status:** Pass / Fail
- **Browser:** Chrome 120 / Firefox 121 / Safari 17
```

### 4.3 Browser & Viewport Testing Matrix

| Browser | Mobile (320px) | Tablet (768px) | Desktop (1024px+) |
|---------|---------------|----------------|-------------------|
| Chrome | Test | Test | Test |
| Firefox | Test | Test | Test |
| Safari | Test | Test | Test |
| Edge | — | — | Test |

### 4.4 What to Test

- All CRUD operations (add, edit, delete, mark-complete)
- Input validation (empty input, duplicate names)
- LocalStorage persistence (refresh page, close/reopen browser)
- Responsive layout at all breakpoints
- Empty state display
- Toast notifications
- Keyboard navigation and accessibility

---

## 5. Contributing

### 5.1 Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feat:` | New feature | `feat: add item to shopping list` |
| `fix:` | Bug fix | `fix: prevent duplicate items` |
| `style:` | CSS/formatting changes | `style: update completed item styling` |
| `docs:` | Documentation | `docs: add testing strategy` |
| `refactor:` | Code restructuring | `refactor: extract renderList function` |
| `test:` | Testing | `test: verify delete confirmation` |
| `chore:` | Maintenance | `chore: update .gitignore` |

### 5.2 Pull Request Process

1. Create a PR with a clear title and description
2. Reference the related issue number (e.g., `Closes #4`)
3. Ensure the PR targets the correct base branch (`test/*` or `development`)
4. Request review from at least one team member
5. Address all review comments before merging
6. Delete the feature branch after merging

### 5.3 Code Style Guidelines

- Use 2-space indentation for HTML and CSS
- Use 2-space indentation for JavaScript
- Use `const` and `let` — never `var`
- Use template literals for string interpolation
- Use descriptive function and variable names
- Add comments only for non-obvious logic
