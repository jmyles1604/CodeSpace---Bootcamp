# Shopping List Application — Implementation Plan

**Version:** 1.0
**Date:** 2026-03-03
**Project:** Shopping List App — Team 1

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| HTML5 | 5 | Page structure and semantic markup |
| CSS3 | 3 | Custom styling, theme, transitions |
| JavaScript | ES6+ | Application logic, DOM manipulation |
| Bootstrap | 5.3 | Responsive grid, components, utilities |

---

## Phase 1: Project Setup

Create the initial project structure and configuration files.

### Files to Create

| File | Purpose |
|------|---------|
| `index.html` | Main HTML page with Bootstrap CDN |
| `css/styles.css` | Custom CSS theme and state classes |
| `js/app.js` | Application logic (CRUD, LocalStorage, events) |
| `.gitignore` | Exclude `.DS_Store`, `node_modules/`, `.env`, IDE configs |
| `README.md` | Project overview (update existing) |

### Git Setup

```bash
git checkout -b development
git push -u origin development
```

---

## Phase 2: Base UI

Build the HTML structure using semantic elements and Bootstrap components.

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopping List</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Header -->
  <header class="bg-primary text-white text-center py-4">
    <h1>Shopping List</h1>
  </header>

  <!-- Main Content -->
  <main class="container my-4">
    <!-- Input Area -->
    <div class="input-group mb-3">
      <input type="text" id="item-input" class="form-control" placeholder="Add an item...">
      <button id="add-btn" class="btn btn-primary">Add</button>
    </div>

    <!-- Shopping List -->
    <ul id="shopping-list" class="list-group">
      <!-- Items rendered by JavaScript -->
    </ul>

    <!-- Empty State -->
    <div id="empty-state" class="text-center text-muted py-5" style="display: none;">
      <p>Your list is empty — add some items!</p>
    </div>
  </main>

  <!-- Footer -->
  <footer class="container mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <span id="item-counter">0 items</span>
      <button id="clear-btn" class="btn btn-outline-danger btn-sm">Clear All</button>
    </div>
  </footer>

  <!-- Toast Container -->
  <div class="toast-container position-fixed top-0 end-0 p-3" id="toast-container"></div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

### Key Elements & IDs

| Element | ID | Purpose |
|---------|-----|---------|
| Text Input | `#item-input` | User enters item name |
| Add Button | `#add-btn` | Triggers addItem() |
| List Container | `#shopping-list` | Holds all list items |
| Empty State | `#empty-state` | Shows when list is empty |
| Item Counter | `#item-counter` | Displays item count |
| Clear Button | `#clear-btn` | Triggers clearAll() |
| Toast Container | `#toast-container` | Holds toast notifications |

---

## Phase 3: CSS Theme

Define custom properties and state classes.

### Custom Properties

```css
:root {
  --primary-color: #4A90D9;
  --primary-hover: #357ABD;
  --completed-color: #6c757d;
  --completed-bg: #f8f9fa;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --transition-speed: 0.3s;
}
```

### State Classes

```css
/* Completed item styling */
.list-group-item.completed {
  text-decoration: line-through;
  color: var(--completed-color);
  background-color: var(--completed-bg);
  transition: all var(--transition-speed) ease;
}

/* Editing mode styling */
.list-group-item.editing {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(74, 144, 217, 0.25);
}
```

---

## Phase 4: Core CRUD

Implement all data operations and rendering.

### Data Structure

```javascript
// Item object schema
const item = {
  id: Date.now().toString(),
  name: 'Milk',
  completed: false,
  createdAt: new Date().toISOString()
};

// Items array (in-memory state)
let items = [];
```

### Core Functions

#### `renderList()`

Renders all items to the DOM. Called after every state change.

```javascript
function renderList() {
  const list = document.getElementById('shopping-list');
  const emptyState = document.getElementById('empty-state');
  list.innerHTML = '';

  if (items.length === 0) {
    emptyState.style.display = 'block';
    list.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    list.style.display = 'block';
    items.forEach(item => {
      list.appendChild(createItemElement(item));
    });
  }

  updateCounter();
}
```

#### `addItem(name)`

Validates input, creates a new item, and updates the list.

```javascript
function addItem(name) {
  const trimmed = name.trim();
  if (!trimmed) return; // FR-ITEM-005: empty validation

  // FR-ITEM-006: duplicate check
  if (items.some(item => item.name.toLowerCase() === trimmed.toLowerCase())) {
    showToast('Item already exists!', 'warning');
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    name: trimmed,
    completed: false,
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
  saveToLocalStorage(items);
  renderList();
  showToast('Item added!', 'success');
}
```

#### `deleteItem(id)`

Removes an item after confirmation.

```javascript
function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  items = items.filter(item => item.id !== id);
  saveToLocalStorage(items);
  renderList();
  showToast('Item deleted!', 'danger');
}
```

#### `toggleComplete(id)`

Toggles the completed status of an item.

```javascript
function toggleComplete(id) {
  const item = items.find(item => item.id === id);
  if (item) {
    item.completed = !item.completed;
    saveToLocalStorage(items);
    renderList();
  }
}
```

#### `editItem(id, newName)`

Updates an item's name with validation.

```javascript
function editItem(id, newName) {
  const trimmed = newName.trim();
  if (!trimmed) return;

  const item = items.find(item => item.id === id);
  if (item) {
    item.name = trimmed;
    saveToLocalStorage(items);
    renderList();
    showToast('Item updated!', 'success');
  }
}
```

---

## Phase 5: LocalStorage

Implement persistent storage using the browser's LocalStorage API.

### `saveToLocalStorage(items)`

```javascript
function saveToLocalStorage(items) {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}
```

### `loadFromLocalStorage()`

```javascript
function loadFromLocalStorage() {
  const data = localStorage.getItem('shoppingList');
  return data ? JSON.parse(data) : [];
}
```

### Initialization

```javascript
document.addEventListener('DOMContentLoaded', () => {
  items = loadFromLocalStorage();
  renderList();
});
```

---

## Phase 6: UI Polish

Add visual enhancements and improve user experience.

### Empty State

- Display a friendly message when the list is empty: "Your list is empty — add some items!"
- Hide the message when items exist

### Toast Notifications

```javascript
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0 show`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"></button>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 576px | Single column, full-width input |
| Tablet | 576px–991px | Centered container, comfortable spacing |
| Desktop | 992px+ | Max-width container, spacious layout |

---

## Phase 7: Documentation & Deployment

### README Updates

- Add project description and features list
- Add technology stack badges
- Add setup/installation instructions
- Add live demo link (GitHub Pages URL)
- Add team member credits

### Testing Strategy

- Create `docs/testing-strategy.md` with all test cases
- Execute tests across browsers and viewports
- Document results with pass/fail status

### GitHub Pages Deployment

1. Go to repository **Settings** → **Pages**
2. Set source to **Deploy from a branch**
3. Select `main` branch, `/ (root)` folder
4. Save and wait for deployment
5. Verify live URL: `https://ec-codespace-0012.github.io/Shopping-List-Project-Team-1/`

---

## Verification Plan

After all phases are complete, verify the following:

| # | Check | Status |
|---|-------|--------|
| 1 | `index.html` loads without errors | ☐ |
| 2 | Bootstrap CSS and JS render correctly | ☐ |
| 3 | Custom CSS theme applies (colors, transitions) | ☐ |
| 4 | Add item works with Enter key and Add button | ☐ |
| 5 | Empty input is rejected with feedback | ☐ |
| 6 | Duplicate item is rejected with feedback | ☐ |
| 7 | Edit item inline with save/cancel works | ☐ |
| 8 | Delete item with confirmation works | ☐ |
| 9 | Mark-as-complete toggles styling | ☐ |
| 10 | Item counter updates accurately | ☐ |
| 11 | Clear All removes all items | ☐ |
| 12 | LocalStorage persists across page refresh | ☐ |
| 13 | Empty state message displays when list is empty | ☐ |
| 14 | Toast notifications appear for all actions | ☐ |
| 15 | Responsive layout works on mobile, tablet, desktop | ☐ |
| 16 | No console errors in any browser | ☐ |
| 17 | Application deployed to GitHub Pages | ☐ |
| 18 | All assets load on the live URL | ☐ |
