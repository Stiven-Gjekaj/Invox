// app.js
const Invoice = {
  business: {
    name: 'Acme Corporation',
    address: '123 Business St, City, ST 12345',
    email: 'contact@acme.com',
  },
  invoiceMeta: {
    number: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  client: {
    name: 'Client Name LLC',
    email: 'client@example.com',
    address: '456 Client Ave, Town, ST 67890',
  },
  lineItems: [
    { id: '1', description: 'Consulting Services', quantity: 10, unitPrice: 150.00 },
    { id: '2', description: 'Web Development', quantity: 20, unitPrice: 125.00 },
  ],
  tax: 10,
  discountType: 'percent',
  discountValue: 5,
};

let currentTemplate = 'minimal';

// DOM Elements
const elements = {
  businessName: document.getElementById('businessName'),
  businessAddress: document.getElementById('businessAddress'),
  businessEmail: document.getElementById('businessEmail'),
  invoiceNumber: document.getElementById('invoiceNumber'),
  invoiceDate: document.getElementById('invoiceDate'),
  dueDate: document.getElementById('dueDate'),
  clientName: document.getElementById('clientName'),
  clientEmail: document.getElementById('clientEmail'),
  clientAddress: document.getElementById('clientAddress'),
  lineItemsContainer: document.getElementById('lineItemsContainer'),
  itemCount: document.getElementById('itemCount'),
  taxPercent: document.getElementById('taxPercent'),
  discountType: document.getElementById('discountType'),
  discountValue: document.getElementById('discountValue'),
  invoicePreview: document.getElementById('invoicePreview'),
  addItemBtn: document.getElementById('addItemBtn'),
  saveBtn: document.getElementById('saveBtn'),
  loadBtn: document.getElementById('loadBtn'),
  newBtn: document.getElementById('newBtn'),
  printBtn: document.getElementById('printBtn'),
  pdfBtn: document.getElementById('pdfBtn'),
  templateToggle: document.getElementById('templateToggle'),
  validationMessages: document.getElementById('validationMessages'),
  saveModal: document.getElementById('saveModal'),
  loadModal: document.getElementById('loadModal'),
  saveNameInput: document.getElementById('saveNameInput'),
  confirmSaveBtn: document.getElementById('confirmSaveBtn'),
  cancelSaveBtn: document.getElementById('cancelSaveBtn'),
  cancelLoadBtn: document.getElementById('cancelLoadBtn'),
  savedInvoicesList: document.getElementById('savedInvoicesList'),
};

/**
 * Initialize the app
 */
function initApp() {
  loadFromLocalStorage();
  bindEvents();
  setDefaultDates();
  render();
}

/**
 * Load saved invoices from localStorage
 */
function loadFromLocalStorage() {
  const saved = localStorage.getItem('invox-current');
  if (saved) {
    try {
      Object.assign(Invoice, JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load invoice', e);
    }
  }
}

/**
 * Save invoice to localStorage
 */
function saveToLocalStorage() {
  localStorage.setItem('invox-current', JSON.stringify(Invoice));
}

/**
 * Set default invoice date to today
 */
function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  if (!Invoice.invoiceMeta.date || Invoice.invoiceMeta.date === '') {
    Invoice.invoiceMeta.date = today;
  }
  if (!Invoice.invoiceMeta.dueDate || Invoice.invoiceMeta.dueDate === '') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    Invoice.invoiceMeta.dueDate = dueDate.toISOString().split('T')[0];
  }
}

/**
 * Bind all event listeners
 */
function bindEvents() {
  // Business Info
  elements.businessName.addEventListener('input', (e) => {
    Invoice.business.name = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.businessAddress.addEventListener('input', (e) => {
    Invoice.business.address = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.businessEmail.addEventListener('input', (e) => {
    Invoice.business.email = e.target.value;
    saveToLocalStorage();
    render();
  });

  // Invoice Meta
  elements.invoiceNumber.addEventListener('input', (e) => {
    Invoice.invoiceMeta.number = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.invoiceDate.addEventListener('change', (e) => {
    Invoice.invoiceMeta.date = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.dueDate.addEventListener('change', (e) => {
    Invoice.invoiceMeta.dueDate = e.target.value;
    saveToLocalStorage();
    render();
  });

  // Client Info
  elements.clientName.addEventListener('input', (e) => {
    Invoice.client.name = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.clientEmail.addEventListener('input', (e) => {
    Invoice.client.email = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.clientAddress.addEventListener('input', (e) => {
    Invoice.client.address = e.target.value;
    saveToLocalStorage();
    render();
  });

  // Taxes & Discount
  elements.taxPercent.addEventListener('input', (e) => {
    Invoice.tax = parseFloat(e.target.value) || 0;
    saveToLocalStorage();
    render();
  });

  elements.discountType.addEventListener('change', (e) => {
    Invoice.discountType = e.target.value;
    saveToLocalStorage();
    render();
  });

  elements.discountValue.addEventListener('input', (e) => {
    Invoice.discountValue = parseFloat(e.target.value) || 0;
    saveToLocalStorage();
    render();
  });

  // Line Items
  elements.addItemBtn.addEventListener('click', addLineItem);

  // Buttons
  elements.saveBtn.addEventListener('click', openSaveModal);
  elements.loadBtn.addEventListener('click', openLoadModal);
  elements.newBtn.addEventListener('click', createNewInvoice);
  elements.printBtn.addEventListener('click', printInvoice);
  elements.pdfBtn.addEventListener('click', exportPDF);
  elements.templateToggle.addEventListener('click', toggleTemplate);

  // Modal Controls
  elements.confirmSaveBtn.addEventListener('click', confirmSave);
  elements.cancelSaveBtn.addEventListener('click', closeSaveModal);
  elements.cancelLoadBtn.addEventListener('click', closeLoadModal);

  // Keyboard Shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);

  // Validation on field changes
  elements.clientName.addEventListener('blur', validate);
}

/**
 * Add a new line item
 */
function addLineItem() {
  const id = Date.now().toString();
  Invoice.lineItems.push({
    id,
    description: '',
    quantity: 1,
    unitPrice: 0,
  });
  saveToLocalStorage();
  render();
  // Focus on the description field of the new item
  setTimeout(() => {
    const newItem = document.querySelector(`[data-item-id="${id}"] .item-description`);
    if (newItem) newItem.focus();
  }, 100);
}

/**
 * Remove a line item
 */
function removeLineItem(id) {
  Invoice.lineItems = Invoice.lineItems.filter((item) => item.id !== id);
  saveToLocalStorage();
  render();
}

/**
 * Update line item field
 */
function updateLineItem(id, field, value) {
  const item = Invoice.lineItems.find((i) => i.id === id);
  if (item) {
    item[field] = field === 'description' ? value : parseFloat(value) || 0;
    saveToLocalStorage();
    render();
  }
}

/**
 * Calculate subtotal
 */
function calculateSubtotal() {
  return Invoice.lineItems.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice || 0);
  }, 0);
}

/**
 * Calculate tax amount
 */
function calculateTax(subtotal) {
  return (subtotal * Invoice.tax) / 100;
}

/**
 * Calculate discount amount
 */
function calculateDiscount(subtotal) {
  if (Invoice.discountType === 'percent') {
    return (subtotal * Invoice.discountValue) / 100;
  }
  return Invoice.discountValue;
}

/**
 * Calculate grand total
 */
function calculateGrandTotal() {
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  return subtotal + tax - discount;
}

/**
 * Format currency
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

/**
 * Format date
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Render the entire UI
 */
function render() {
  updateFormFields();
  renderLineItems();
  renderInvoicePreview();
  updateItemCount();
}

/**
 * Update form input fields from Invoice object
 */
function updateFormFields() {
  elements.businessName.value = Invoice.business.name;
  elements.businessAddress.value = Invoice.business.address;
  elements.businessEmail.value = Invoice.business.email;
  elements.invoiceNumber.value = Invoice.invoiceMeta.number;
  elements.invoiceDate.value = Invoice.invoiceMeta.date;
  elements.dueDate.value = Invoice.invoiceMeta.dueDate;
  elements.clientName.value = Invoice.client.name;
  elements.clientEmail.value = Invoice.client.email;
  elements.clientAddress.value = Invoice.client.address;
  elements.taxPercent.value = Invoice.tax;
  elements.discountType.value = Invoice.discountType;
  elements.discountValue.value = Invoice.discountValue;
}

/**
 * Render line items
 */
function renderLineItems() {
  elements.lineItemsContainer.innerHTML = Invoice.lineItems
    .map((item) => {
      const lineTotal = (item.quantity * item.unitPrice).toFixed(2);
      return `
        <div class="line-item" data-item-id="${item.id}">
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="item-description"
              placeholder="Item or service description"
              value="${escapeHtml(item.description)}"
              data-field="description"
            >
          </div>
          <div class="form-group">
            <label>Qty</label>
            <input
              type="number"
              placeholder="1"
              value="${item.quantity}"
              data-field="quantity"
              step="0.01"
              min="0"
            >
          </div>
          <div class="form-group">
            <label>Unit Price</label>
            <input
              type="number"
              placeholder="0.00"
              value="${item.unitPrice.toFixed(2)}"
              data-field="unitPrice"
              step="0.01"
              min="0"
            >
          </div>
          <div class="line-item-total">${formatCurrency(lineTotal)}</div>
          <button class="line-item-remove" type="button" title="Remove item" aria-label="Remove ${escapeHtml(item.description)}">×</button>
        </div>
      `;
    })
    .join('');

  // Bind line item event listeners
  elements.lineItemsContainer.querySelectorAll('.line-item').forEach((itemEl) => {
    const itemId = itemEl.getAttribute('data-item-id');

    const inputs = itemEl.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        const field = e.target.getAttribute('data-field');
        updateLineItem(itemId, field, e.target.value);
      });
    });

    const removeBtn = itemEl.querySelector('.line-item-remove');
    removeBtn.addEventListener('click', () => removeLineItem(itemId));
  });
}

/**
 * Render invoice preview
 */
function renderInvoicePreview() {
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const grandTotal = calculateGrandTotal();

  const html = `
    <div class="invoice-header">
      <div>
        <div class="invoice-title">Invoice</div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-meta-item">
          <span class="invoice-meta-label">Invoice #:</span>
          ${escapeHtml(Invoice.invoiceMeta.number)}
        </div>
        <div class="invoice-meta-item">
          <span class="invoice-meta-label">Date:</span>
          ${formatDate(Invoice.invoiceMeta.date)}
        </div>
        <div class="invoice-meta-item">
          <span class="invoice-meta-label">Due:</span>
          ${formatDate(Invoice.invoiceMeta.dueDate)}
        </div>
      </div>
    </div>

    <div class="invoice-info-grid">
      <div class="invoice-info-col">
        <h4>From</h4>
        <p class="invoice-section-content">
          <strong>${escapeHtml(Invoice.business.name)}</strong><br>
          ${escapeHtml(Invoice.business.address).replace(/\n/g, '<br>')}<br>
          ${Invoice.business.email ? `<a href="mailto:${escapeHtml(Invoice.business.email)}" style="color: var(--color-accent);">${escapeHtml(Invoice.business.email)}</a>` : ''}
        </p>
      </div>
      <div class="invoice-info-col">
        <h4>Bill To</h4>
        <p class="invoice-section-content">
          <strong>${escapeHtml(Invoice.client.name)}</strong><br>
          ${escapeHtml(Invoice.client.address).replace(/\n/g, '<br>')}<br>
          ${Invoice.client.email ? `<a href="mailto:${escapeHtml(Invoice.client.email)}" style="color: var(--color-accent);">${escapeHtml(Invoice.client.email)}</a>` : ''}
        </p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-right">Qty</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${Invoice.lineItems
          .map((item) => {
            const total = (item.quantity * item.unitPrice).toFixed(2);
            return `
              <tr>
                <td>${escapeHtml(item.description)}</td>
                <td class="text-right">${item.quantity.toFixed(2)}</td>
                <td class="text-right">${formatCurrency(item.unitPrice)}</td>
                <td class="text-right">${formatCurrency(total)}</td>
              </tr>
            `;
          })
          .join('')}
      </tbody>
    </table>

    <div class="invoice-totals">
      <div class="totals-col">
        <div class="totals-row">
          <span class="totals-label">Subtotal:</span>
          <span class="totals-value">${formatCurrency(subtotal)}</span>
        </div>
        ${Invoice.tax > 0 ? `
          <div class="totals-row">
            <span class="totals-label">Tax (${Invoice.tax}%):</span>
            <span class="totals-value">${formatCurrency(tax)}</span>
          </div>
        ` : ''}
        ${discount > 0 ? `
          <div class="totals-row">
            <span class="totals-label">Discount:</span>
            <span class="totals-value" style="color: var(--color-accent);">-${formatCurrency(discount)}</span>
          </div>
        ` : ''}
        <div class="totals-row total" aria-live="polite">
          <span>Grand Total:</span>
          <span>${formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </div>
  `;

  elements.invoicePreview.innerHTML = html;
}

/**
 * Update line item count
 */
function updateItemCount() {
  elements.itemCount.textContent = Invoice.lineItems.length;
}

/**
 * Validate form
 */
function validate() {
  const errors = [];

  if (!Invoice.business.name.trim()) {
    errors.push('Business name is required');
  }

  if (!Invoice.client.name.trim()) {
    errors.push('Client name is required');
  }

  if (Invoice.lineItems.length === 0) {
    errors.push('At least one line item is required');
  }

  Invoice.lineItems.forEach((item) => {
    if (item.quantity < 0 || item.unitPrice < 0) {
      errors.push('Quantity and unit price must be non-negative');
    }
  });

  displayValidationMessages(errors);
  return errors.length === 0;
}

/**
 * Display validation messages
 */
function displayValidationMessages(errors) {
  const container = elements.validationMessages;

  if (errors.length === 0) {
    container.classList.remove('show');
    container.innerHTML = '';
    return;
  }

  container.classList.add('show');
  container.innerHTML = errors
    .map((error) => `<div class="validation-message">${escapeHtml(error)}</div>`)
    .join('');
}

/**
 * Open save modal
 */
function openSaveModal() {
  elements.saveNameInput.value = `Invoice ${Invoice.invoiceMeta.number}`;
  elements.saveNameInput.focus();
  elements.saveModal.classList.remove('hidden');
}

/**
 * Close save modal
 */
function closeSaveModal() {
  elements.saveModal.classList.add('hidden');
}

/**
 * Confirm save
 */
function confirmSave() {
  const name = elements.saveNameInput.value.trim();
  if (!name) {
    alert('Please enter a name for this invoice');
    return;
  }

  const saved = JSON.parse(localStorage.getItem('invox-saved') || '{}');
  saved[name] = JSON.stringify(Invoice);
  localStorage.setItem('invox-saved', JSON.stringify(saved));

  closeSaveModal();
  alert(`Invoice saved as "${name}"`);
}

/**
 * Open load modal
 */
function openLoadModal() {
  const saved = JSON.parse(localStorage.getItem('invox-saved') || '{}');
  const invoices = Object.entries(saved);

  if (invoices.length === 0) {
    alert('No saved invoices found');
    return;
  }

  elements.savedInvoicesList.innerHTML = invoices
    .map(([name, data]) => {
      const invoiceData = JSON.parse(data);
      const saveDate = new Date(invoiceData.invoiceMeta.date);
      return `
        <div class="saved-item">
          <div class="saved-item-info">
            <h4>${escapeHtml(name)}</h4>
            <p>Invoice #${escapeHtml(invoiceData.invoiceMeta.number)} • ${formatDate(invoiceData.invoiceMeta.date)}</p>
          </div>
          <div class="saved-item-actions">
            <button class="saved-item-load" onclick="loadInvoice('${escapeHtml(name)}')">Load</button>
            <button class="saved-item-delete" onclick="deleteInvoice('${escapeHtml(name)}')">Delete</button>
          </div>
        </div>
      `;
    })
    .join('');

  elements.loadModal.classList.remove('hidden');
}

/**
 * Close load modal
 */
function closeLoadModal() {
  elements.loadModal.classList.add('hidden');
}

/**
 * Load invoice
 */
function loadInvoice(name) {
  const saved = JSON.parse(localStorage.getItem('invox-saved') || '{}');
  const invoiceData = JSON.parse(saved[name]);
  Object.assign(Invoice, invoiceData);
  saveToLocalStorage();
  render();
  closeLoadModal();
}

/**
 * Delete invoice
 */
function deleteInvoice(name) {
  if (!confirm(`Delete invoice "${name}"?`)) return;

  const saved = JSON.parse(localStorage.getItem('invox-saved') || '{}');
  delete saved[name];
  localStorage.setItem('invox-saved', JSON.stringify(saved));

  openLoadModal();
}

/**
 * Create new invoice
 */
function createNewInvoice() {
  if (!confirm('Create a new invoice? Current changes will be lost unless saved.')) return;

  Invoice.business = { name: '', address: '', email: '' };
  Invoice.client = { name: '', address: '', email: '' };
  Invoice.lineItems = [];
  Invoice.invoiceMeta = {
    number: 'INV-' + String(Math.floor(Math.random() * 10000)).padStart(3, '0'),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };
  Invoice.tax = 0;
  Invoice.discountType = 'percent';
  Invoice.discountValue = 0;

  saveToLocalStorage();
  render();
}

/**
 * Toggle template
 */
function toggleTemplate() {
  currentTemplate = currentTemplate === 'minimal' ? 'professional' : 'minimal';
  const templateName = elements.templateToggle.querySelector('.template-name');
  templateName.textContent = currentTemplate === 'minimal' ? 'Minimal' : 'Professional';

  if (currentTemplate === 'professional') {
    document.body.classList.add('template-professional');
  } else {
    document.body.classList.remove('template-professional');
  }
}

/**
 * Print invoice
 */
function printInvoice() {
  window.print();
}

/**
 * Export to PDF
 */
async function exportPDF() {
  try {
    const element = elements.invoicePreview;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const filename = `${Invoice.invoiceMeta.number.replace(/\s+/g, '-')}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('Failed to export PDF. Check console for details.');
  }
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
  // Ctrl+S / Cmd+S: Save
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    openSaveModal();
  }

  // Ctrl+P / Cmd+P: Print (let browser handle)
  if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
    event.preventDefault();
    printInvoice();
  }

  // Ctrl+N / Cmd+N: New
  if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
    event.preventDefault();
    createNewInvoice();
  }
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text || '').replace(/[&<>"']/g, (char) => map[char]);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initApp);
