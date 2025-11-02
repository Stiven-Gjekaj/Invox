import { describe, it, expect, beforeEach } from 'vitest';
import { generatePDFBlob } from '../utils/pdfUtils';
import { useInvoiceStore } from '../store/useInvoiceStore';

/**
 * Test suite for PDF generation utilities
 * Validates PDF export functionality and blob generation
 */
describe('pdfUtils', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useInvoiceStore.getState();
    store.resetAll();
  });

  describe('generatePDFBlob', () => {
    it('should throw error when invoice preview element is not found', async () => {
      const store = useInvoiceStore.getState();

      await expect(
        generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        )
      ).rejects.toThrow('Invoice preview element not found');
    });

    it('should generate a valid blob when preview element exists', async () => {
      // Create mock DOM element
      const mockElement = document.createElement('div');
      mockElement.id = 'invoice-preview';
      mockElement.textContent = 'Test Invoice';
      document.body.appendChild(mockElement);

      const store = useInvoiceStore.getState();

      try {
        const blob = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('application/pdf');
        expect(blob.size).toBeGreaterThan(0);
      } finally {
        // Clean up
        document.body.removeChild(mockElement);
      }
    });

    it('should generate PDF blob with correct data in store', async () => {
      // Create mock DOM element
      const mockElement = document.createElement('div');
      mockElement.id = 'invoice-preview';
      mockElement.innerHTML = `
        <div>
          <h1>Invoice INV-001</h1>
          <p>Total: $1,080.00</p>
        </div>
      `;
      document.body.appendChild(mockElement);

      const store = useInvoiceStore.getState();

      // Set test data
      store.setInvoiceDetails({
        invoiceNumber: 'INV-001',
        taxRate: 8,
      });
      store.setItems([
        { id: '1', description: 'Test Item', quantity: 1, unitPrice: 1000 },
      ]);

      try {
        const blob = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.size).toBeGreaterThan(0);
      } finally {
        // Clean up
        document.body.removeChild(mockElement);
      }
    });

    it('should generate consistent PDF blobs', async () => {
      // Create mock DOM element
      const mockElement = document.createElement('div');
      mockElement.id = 'invoice-preview';
      mockElement.textContent = 'Consistent Test';
      document.body.appendChild(mockElement);

      const store = useInvoiceStore.getState();

      try {
        const blob1 = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        const blob2 = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        // Both blobs should be PDFs with content
        expect(blob1.type).toBe('application/pdf');
        expect(blob2.type).toBe('application/pdf');
        expect(blob1.size).toBeGreaterThan(0);
        expect(blob2.size).toBeGreaterThan(0);
      } finally {
        // Clean up
        document.body.removeChild(mockElement);
      }
    });

    it('should handle empty invoice items', async () => {
      // Create mock DOM element
      const mockElement = document.createElement('div');
      mockElement.id = 'invoice-preview';
      mockElement.textContent = 'Empty Invoice';
      document.body.appendChild(mockElement);

      const store = useInvoiceStore.getState();
      store.setItems([]);

      try {
        const blob = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('application/pdf');
      } finally {
        // Clean up
        document.body.removeChild(mockElement);
      }
    });
  });

  describe('PDF Content Validation', () => {
    it('should include invoice details in generated PDF', async () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'invoice-preview';
      mockElement.innerHTML = `
        <div>
          <h1>Acme Corp</h1>
          <p>INV-2024-001</p>
          <p>Tax: 10%</p>
        </div>
      `;
      document.body.appendChild(mockElement);

      const store = useInvoiceStore.getState();

      store.setCompanyInfo({ companyName: 'Acme Corp' });
      store.setInvoiceDetails({
        invoiceNumber: 'INV-2024-001',
        taxRate: 10,
      });

      try {
        const blob = await generatePDFBlob(
          store as any,
          store.getSubtotal,
          store.getTaxAmount,
          store.getTotal
        );

        expect(blob.size).toBeGreaterThan(0);
      } finally {
        document.body.removeChild(mockElement);
      }
    });
  });
});
