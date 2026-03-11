/* --------------------- Load Items --------------------- */

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
let pendingDeleteId = null;
let deleteModal = null;

document.addEventListener("DOMContentLoaded", () => {
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    // Attach Clear List button
    document.getElementById('clear-btn').addEventListener('click', clearList);

    renderList();
});


/* --------------------- Add Item --------------------- */

function addItem(name) {
    const trimmed = name.trim();
    if (!trimmed) {
        showToast('Item name cannot be empty!', 'danger');
        return;
    }

    if (items.some(i => i.name.toLowerCase() === trimmed.toLowerCase())) {
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

    document.getElementById('item-input').value = '';
    showToast('Item added successfully!');
}


/* --------------------- Render List --------------------- */

function renderList() {
    const list = document.getElementById('shopping-list');
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = `
            <li id="empty-state" class="list-group-item text-center text-muted">
                Your shopping list is empty.
            </li>
        `;
    } else {
        items.forEach(item => list.appendChild(createItemElement(item)));
    }

    updateCounter();
}


/* --------------------- Create Item Element --------------------- */

function createItemElement(item) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center mt-2';
    li.dataset.id = item.id;

    li.innerHTML = `
        <span>
            <input 
                type="checkbox" 
                class="form-check-input me-2 complete-checkbox"
                ${item.completed ? 'checked' : ''}>
            ${item.name}
        </span>
        <button 
            class="btn btn-danger btn-sm delete-btn"
            onclick="deleteItem('${item.id}')"
        >
            Delete
        </button>
    `;

    return li;
}


/* --------------------- Toast --------------------- */

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show`;
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.style.opacity = '0', 2850);
    setTimeout(() => toast.remove(), 3000);
}


/* --------------------- Local Storage --------------------- */

function saveToLocalStorage(items) {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}


/* --------------------- Counter --------------------- */

function updateCounter() {
    const counter = document.getElementById('item-counter');
    const total = items.length;
    const completed = items.filter(i => i.completed).length;
    counter.textContent = `Total: ${total} | Completed: ${completed}`;
}


/* --------------------- Toggle Complete --------------------- */

function toggleComplete(id) {
    const item = items.find(i => i.id === id);
    if (item) {
        item.completed = !item.completed;
        saveToLocalStorage(items);
        renderList();
    }
}


/* --------------------- Delete Item (Modal Trigger) --------------------- */

function deleteItem(id) {
    pendingDeleteId = id;
    deleteModal.show();
}


/* --------------------- Confirm Delete --------------------- */

document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (!pendingDeleteId) return;

    items = items.filter(item => item.id !== pendingDeleteId);
    saveToLocalStorage(items);
    renderList();
    showToast('Item deleted!', 'danger');

    pendingDeleteId = null;
    deleteModal.hide();
});


/* --------------------- Clear List --------------------- */

function clearList() {
    if (items.length === 0) {
        showToast('List is already empty.', 'warning');
        return;
    }

    items = [];
    saveToLocalStorage(items);
    renderList();
    showToast('All items cleared!', 'danger');
}


/* --------------------- Event Delegation --------------------- */

document.getElementById('shopping-list').addEventListener('click', function (e) {
    const listItem = e.target.closest('li[data-id]');
    if (!listItem) return;

    const id = listItem.dataset.id;

    if (e.target.classList.contains('complete-checkbox')) {
        toggleComplete(id);
    }
});
