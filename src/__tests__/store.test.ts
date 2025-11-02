import { describe, it, expect, beforeEach } from 'vitest';
import { useInvoiceStore } from '../store/useInvoiceStore';

/**
 * Test suite for Zustand invoice store
 * Validates calculations for totals, taxes, and item management
 */
describe('useInvoiceStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const store = useInvoiceStore();
    store.resetAll();
  });

  describe('Calculations', () => {
    it('should calculate subtotal correctly', () => {
      const store = useInvoiceStore.getState();

      store.setItems([
        { id: '1', description: 'Item 1', quantity: 2, unitPrice: 100 },
        { id: '2', description: 'Item 2', quantity: 3, unitPrice: 50 },
      ]);

      const subtotal = store.getSubtotal();
      expect(subtotal).toBe(350); // (2 * 100) + (3 * 50) = 350
    });

    it('should calculate tax amount correctly', () => {
      const store = useInvoiceStore.getState();

      store.setItems([
        { id: '1', description: 'Item 1', quantity: 100, unitPrice: 100 },
      ]);
      store.setInvoiceDetails({ taxRate: 10 });

      const taxAmount = store.getTaxAmount();
      expect(taxAmount).toBe(1000); // 10000 * 10% = 1000
    });

    it('should calculate total correctly with tax', () => {
      const store = useInvoiceStore.getState();

      store.setItems([
        { id: '1', description: 'Item 1', quantity: 1, unitPrice: 1000 },
      ]);
      store.setInvoiceDetails({ taxRate: 8 });

      const total = store.getTotal();
      expect(total).toBe(1080); // 1000 + (1000 * 8%) = 1080
    });

    it('should handle zero tax rate', () => {
      const store = useInvoiceStore.getState();

      store.setItems([
        { id: '1', description: 'Item 1', quantity: 1, unitPrice: 500 },
      ]);
      store.setInvoiceDetails({ taxRate: 0 });

      const total = store.getTotal();
      expect(total).toBe(500); // No tax should be added
    });

    it('should handle decimal values in calculations', () => {
      const store = useInvoiceStore.getState();

      store.setItems([
        { id: '1', description: 'Item 1', quantity: 1.5, unitPrice: 99.99 },
      ]);
      store.setInvoiceDetails({ taxRate: 5 });

      const subtotal = store.getSubtotal();
      const total = store.getTotal();

      expect(subtotal).toBeCloseTo(149.985, 2);
      expect(total).toBeCloseTo(157.484, 2);
    });
  });

  describe('Item Management', () => {
    it('should add new item', () => {
      const store = useInvoiceStore.getState();
      const initialLength = store.items.length;

      store.addItem();

      expect(store.items.length).toBe(initialLength + 1);
    });

    it('should remove item by id', () => {
      const store = useInvoiceStore.getState();
      const itemToRemove = store.items[0];

      store.removeItem(itemToRemove.id);

      expect(store.items.find((item) => item.id === itemToRemove.id)).toBeUndefined();
    });

    it('should update item properties', () => {
      const store = useInvoiceStore.getState();
      const item = store.items[0];

      store.updateItem(item.id, {
        description: 'Updated Description',
        quantity: 5,
        unitPrice: 250,
      });

      const updated = store.items.find((i) => i.id === item.id);
      expect(updated?.description).toBe('Updated Description');
      expect(updated?.quantity).toBe(5);
      expect(updated?.unitPrice).toBe(250);
    });

    it('should set multiple items at once', () => {
      const store = useInvoiceStore.getState();
      const newItems = [
        { id: '1', description: 'Item A', quantity: 1, unitPrice: 100 },
        { id: '2', description: 'Item B', quantity: 2, unitPrice: 200 },
      ];

      store.setItems(newItems);

      expect(store.items).toEqual(newItems);
    });

    it('should calculate correct subtotal after removing items', () => {
      const store = useInvoiceStore.getState();
      store.setItems([
        { id: '1', description: 'Item 1', quantity: 1, unitPrice: 100 },
        { id: '2', description: 'Item 2', quantity: 1, unitPrice: 100 },
      ]);

      store.removeItem('1');

      expect(store.getSubtotal()).toBe(100);
    });
  });

  describe('State Management', () => {
    it('should set company info', () => {
      const store = useInvoiceStore.getState();

      store.setCompanyInfo({
        companyName: 'Test Company',
        companyEmail: 'test@company.com',
      });

      expect(store.companyName).toBe('Test Company');
      expect(store.companyEmail).toBe('test@company.com');
    });

    it('should set client info', () => {
      const store = useInvoiceStore.getState();

      store.setClientInfo({
        clientName: 'Test Client',
        clientEmail: 'client@test.com',
      });

      expect(store.clientName).toBe('Test Client');
      expect(store.clientEmail).toBe('client@test.com');
    });

    it('should set invoice details', () => {
      const store = useInvoiceStore.getState();

      store.setInvoiceDetails({
        invoiceNumber: 'INV-123',
        currency: 'EUR',
        taxRate: 15,
      });

      expect(store.invoiceNumber).toBe('INV-123');
      expect(store.currency).toBe('EUR');
      expect(store.taxRate).toBe(15);
    });

    it('should reset all state to initial values', () => {
      const store = useInvoiceStore.getState();

      // Modify store
      store.setCompanyInfo({ companyName: 'Modified Company' });
      store.setInvoiceDetails({ taxRate: 25 });

      // Reset
      store.resetAll();

      // Should be back to initial state
      expect(store.companyName).toBe('Your Company Name');
      expect(store.taxRate).toBe(10);
    });
  });
});
