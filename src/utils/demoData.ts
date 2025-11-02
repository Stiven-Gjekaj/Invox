import { InvoiceState } from '../store/useInvoiceStore';

export const demoInvoiceData: InvoiceState = {
  companyName: 'Tech Solutions Inc.',
  companyEmail: 'hello@techsolutions.com',
  companyPhone: '+1 (415) 555-0123',
  companyAddress: '123 Innovation Drive, San Francisco, CA 94105',
  companyLogo: '',

  clientName: 'Acme Corporation',
  clientEmail: 'billing@acme.com',
  clientAddress: '456 Enterprise Boulevard, New York, NY 10001',

  invoiceNumber: 'INV-2024-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: 'USD',
  taxRate: 8,
  notes: 'Thank you for your business! Please make payment within 30 days of invoice date.',

  items: [
    {
      id: '1',
      description: 'Web Development Services - Frontend',
      quantity: 40,
      unitPrice: 150,
    },
    {
      id: '2',
      description: 'UI/UX Design Consultation',
      quantity: 8,
      unitPrice: 200,
    },
    {
      id: '3',
      description: 'Project Management & Coordination',
      quantity: 5,
      unitPrice: 175,
    },
    {
      id: '4',
      description: 'Testing and Quality Assurance',
      quantity: 10,
      unitPrice: 125,
    },
  ],

  // These methods are added by Zustand
  getSubtotal: function () {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  },
  getTaxAmount: function () {
    return (this.getSubtotal() * this.taxRate) / 100;
  },
  getTotal: function () {
    return this.getSubtotal() + this.getTaxAmount();
  },

  // Required by InvoiceState but won't be called in demo
  setCompanyInfo: () => {},
  setClientInfo: () => {},
  setInvoiceDetails: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  setItems: () => {},
  resetAll: () => {},
};
