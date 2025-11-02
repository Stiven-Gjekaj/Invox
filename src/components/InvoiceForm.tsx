import React from 'react';
import { useInvoiceStore } from '../store/useInvoiceStore';
import InvoiceItem from './InvoiceItem';
import Button from './Button';
import { demoInvoiceData } from '../utils/demoData';

/**
 * InvoiceForm Component
 * Provides form inputs for all invoice details, company info, client info, and items
 * All changes are synchronized with the Zustand store in real-time
 */
const InvoiceForm: React.FC = () => {
  const store = useInvoiceStore();

  const currencies = ['USD', 'EUR', 'GBP', 'ALL', 'AUD', 'CAD', 'CHF', 'JPY', 'CNY', 'INR'];

  const handleFillDemo = () => {
    // Populate form with demo data
    store.setCompanyInfo({
      companyName: demoInvoiceData.companyName,
      companyEmail: demoInvoiceData.companyEmail,
      companyPhone: demoInvoiceData.companyPhone,
      companyAddress: demoInvoiceData.companyAddress,
    });

    store.setClientInfo({
      clientName: demoInvoiceData.clientName,
      clientEmail: demoInvoiceData.clientEmail,
      clientAddress: demoInvoiceData.clientAddress,
    });

    store.setInvoiceDetails({
      invoiceNumber: demoInvoiceData.invoiceNumber,
      invoiceDate: demoInvoiceData.invoiceDate,
      dueDate: demoInvoiceData.dueDate,
      currency: demoInvoiceData.currency,
      taxRate: demoInvoiceData.taxRate,
      notes: demoInvoiceData.notes,
    });

    store.setItems(demoInvoiceData.items);
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-6 lg:w-1/2">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Maker</h1>
          <p className="text-gray-600">Edit invoice details below. Changes sync in real-time.</p>
        </div>

        {/* Company Information */}
        <section className="mb-8" aria-labelledby="company-heading">
          <h2 id="company-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Company Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                id="company-name"
                type="text"
                value={store.companyName}
                onChange={(e) => store.setCompanyInfo({ companyName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Company name"
              />
            </div>
            <div>
              <label htmlFor="company-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="company-email"
                type="email"
                value={store.companyEmail}
                onChange={(e) => store.setCompanyInfo({ companyEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Company email"
              />
            </div>
            <div>
              <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                id="company-phone"
                type="tel"
                value={store.companyPhone}
                onChange={(e) => store.setCompanyInfo({ companyPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Company phone"
              />
            </div>
            <div>
              <label htmlFor="company-address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="company-address"
                value={store.companyAddress}
                onChange={(e) => store.setCompanyInfo({ companyAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                aria-label="Company address"
              />
            </div>
          </div>
        </section>

        {/* Client Information */}
        <section className="mb-8" aria-labelledby="client-heading">
          <h2 id="client-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Client Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="client-name" className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                id="client-name"
                type="text"
                value={store.clientName}
                onChange={(e) => store.setClientInfo({ clientName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Client name"
              />
            </div>
            <div>
              <label htmlFor="client-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="client-email"
                type="email"
                value={store.clientEmail}
                onChange={(e) => store.setClientInfo({ clientEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Client email"
              />
            </div>
            <div>
              <label htmlFor="client-address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="client-address"
                value={store.clientAddress}
                onChange={(e) => store.setClientInfo({ clientAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                aria-label="Client address"
              />
            </div>
          </div>
        </section>

        {/* Invoice Details */}
        <section className="mb-8" aria-labelledby="invoice-heading">
          <h2 id="invoice-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Invoice Details
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <input
                  id="invoice-number"
                  type="text"
                  value={store.invoiceNumber}
                  onChange={(e) => store.setInvoiceDetails({ invoiceNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Invoice number"
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={store.currency}
                  onChange={(e) => store.setInvoiceDetails({ currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Currency"
                >
                  {currencies.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="invoice-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Date
                </label>
                <input
                  id="invoice-date"
                  type="date"
                  value={store.invoiceDate}
                  onChange={(e) => store.setInvoiceDetails({ invoiceDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Invoice date"
                />
              </div>
              <div>
                <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  id="due-date"
                  type="date"
                  value={store.dueDate}
                  onChange={(e) => store.setInvoiceDetails({ dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Due date"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tax-rate" className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                id="tax-rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={store.taxRate}
                onChange={(e) => store.setInvoiceDetails({ taxRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tax rate"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                value={store.notes}
                onChange={(e) => store.setInvoiceDetails({ notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                aria-label="Invoice notes"
              />
            </div>
          </div>
        </section>

        {/* Invoice Items */}
        <section className="mb-8" aria-labelledby="items-heading">
          <h2 id="items-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Invoice Items
          </h2>
          <div className="space-y-3">
            {/* Item Headers */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Unit Price</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items */}
            {store.items.map((item, index) => (
              <InvoiceItem
                key={item.id}
                item={item}
                onUpdate={store.updateItem}
                onRemove={store.removeItem}
                index={index}
              />
            ))}
          </div>

          {/* Add Item Button */}
          <Button
            onClick={() => store.addItem()}
            variant="secondary"
            className="mt-4 w-full"
            aria-label="Add new invoice item"
          >
            + Add Item
          </Button>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-10 pb-10">
          <Button
            onClick={handleFillDemo}
            variant="secondary"
            aria-label="Fill form with demo data"
          >
            Smart Fill Demo
          </Button>
          <Button
            onClick={() => store.resetAll()}
            variant="secondary"
            aria-label="Clear all invoice data"
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
