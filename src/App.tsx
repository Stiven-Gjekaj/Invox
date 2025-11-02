import React, { useState } from 'react';
import { useInvoiceStore } from './store/useInvoiceStore';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import Button from './components/Button';
import { generatePDF } from './utils/pdfUtils';
import './App.css';

/**
 * Main App Component
 * Manages the layout with dual editing mode (form on left, preview on right)
 * Handles PDF export functionality
 */
const App: React.FC = () => {
  const store = useInvoiceStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await generatePDF(
        {
          ...store,
          getSubtotal: store.getSubtotal,
          getTaxAmount: store.getTaxAmount,
          getTotal: store.getTotal,
        },
        store.getSubtotal,
        store.getTaxAmount,
        store.getTotal
      );
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row" role="application" aria-label="Invoice Maker Application">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Invox</h1>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-white hover:bg-blue-700 p-2 rounded"
          aria-label="Toggle form and preview"
          aria-expanded={showMobileMenu}
        >
          {showMobileMenu ? '✕' : '☰'}
        </button>
      </div>

      {/* Form Container */}
      <div className={`${showMobileMenu ? 'block' : 'hidden'} lg:block lg:w-1/2`}>
        <InvoiceForm />
      </div>

      {/* Preview Container */}
      <div className={`${showMobileMenu ? 'hidden' : 'block'} lg:block lg:w-1/2 relative`}>
        <InvoicePreview />

        {/* PDF Export Button (Sticky) */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
          <Button
            onClick={handleExportPDF}
            disabled={isExporting}
            aria-label={isExporting ? 'Exporting PDF' : 'Download invoice as PDF'}
          >
            {isExporting ? 'Exporting...' : '📥 Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
