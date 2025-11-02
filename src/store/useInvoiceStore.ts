import { create } from 'zustand';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceState {
  // Company Info
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyLogo: string;

  // Client Info
  clientName: string;
  clientEmail: string;
  clientAddress: string;

  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  taxRate: number;
  notes: string;

  // Items
  items: InvoiceItem[];

  // Actions
  setCompanyInfo: (info: Partial<InvoiceState>) => void;
  setClientInfo: (info: Partial<InvoiceState>) => void;
  setInvoiceDetails: (info: Partial<InvoiceState>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, data: Partial<InvoiceItem>) => void;
  setItems: (items: InvoiceItem[]) => void;
  resetAll: () => void;

  // Computed
  getSubtotal: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
}

const initialState = {
  companyName: 'Your Company Name',
  companyEmail: 'info@company.com',
  companyPhone: '+1 (555) 000-0000',
  companyAddress: '123 Business Street, City, State 12345',
  companyLogo: '',

  clientName: 'Client Name',
  clientEmail: 'client@email.com',
  clientAddress: '456 Client Ave, City, State 67890',

  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  currency: 'USD',
  taxRate: 10,
  notes: 'Thank you for your business!',

  items: [
    {
      id: '1',
      description: 'Web Design Services',
      quantity: 1,
      unitPrice: 1500,
    },
  ],
};

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  ...initialState,

  setCompanyInfo: (info) => set(info),
  setClientInfo: (info) => set(info),
  setInvoiceDetails: (info) => set(info),

  addItem: () => {
    const { items } = get();
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    set({ items: [...items, newItem] });
  },

  removeItem: (id: string) => {
    const { items } = get();
    set({ items: items.filter((item) => item.id !== id) });
  },

  updateItem: (id: string, data: Partial<InvoiceItem>) => {
    const { items } = get();
    set({
      items: items.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    });
  },

  setItems: (items: InvoiceItem[]) => set({ items }),

  resetAll: () => set(initialState),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  },

  getTaxAmount: () => {
    const { getSubtotal, taxRate } = get();
    return (getSubtotal() * taxRate) / 100;
  },

  getTotal: () => {
    const { getSubtotal, getTaxAmount } = get();
    return getSubtotal() + getTaxAmount();
  },
}));
