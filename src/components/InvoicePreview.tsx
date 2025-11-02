import React from 'react';
import { useInvoiceStore } from '../store/useInvoiceStore';

/**
 * InvoicePreview Component
 * Displays a live editable invoice preview
 * Shows all invoice details formatted as a professional invoice
 * Includes editable inline text for live editing capabilities
 */
const InvoicePreview: React.FC = () => {
  const store = useInvoiceStore();
  const subtotal = store.getSubtotal();
  const taxAmount = store.getTaxAmount();
  const total = store.getTotal();

  return (
    <div
      id="invoice-preview"
      className="w-full h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-white p-8 lg:w-1/2"
      role="region"
      aria-label="Invoice preview"
    >
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 border-b-2 border-blue-600 pb-6">
          <div>
            <h1
              className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                store.setCompanyInfo({ companyName: e.currentTarget.textContent || '' })
              }
            >
              {store.companyName}
            </h1>
            <p className="text-gray-600 text-sm mt-2">INVOICE</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Invoice #</p>
            <p
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                store.setInvoiceDetails({ invoiceNumber: e.currentTarget.textContent || '' })
              }
            >
              {store.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Invoice Date</p>
            <p
              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                store.setInvoiceDetails({ invoiceDate: e.currentTarget.textContent || '' })
              }
            >
              {store.invoiceDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Due Date</p>
            <p
              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                store.setInvoiceDetails({ dueDate: e.currentTarget.textContent || '' })
              }
            >
              {store.dueDate}
            </p>
          </div>
        </div>

        {/* Company & Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">From</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p
                className="font-medium cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setCompanyInfo({ companyName: e.currentTarget.textContent || '' })
                }
              >
                {store.companyName}
              </p>
              <p
                className="cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setCompanyInfo({ companyAddress: e.currentTarget.textContent || '' })
                }
              >
                {store.companyAddress}
              </p>
              <p
                className="cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setCompanyInfo({ companyPhone: e.currentTarget.textContent || '' })
                }
              >
                {store.companyPhone}
              </p>
              <p
                className="cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setCompanyInfo({ companyEmail: e.currentTarget.textContent || '' })
                }
              >
                {store.companyEmail}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">Bill To</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p
                className="font-medium cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setClientInfo({ clientName: e.currentTarget.textContent || '' })
                }
              >
                {store.clientName}
              </p>
              <p
                className="cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setClientInfo({ clientAddress: e.currentTarget.textContent || '' })
                }
              >
                {store.clientAddress}
              </p>
              <p
                className="cursor-pointer hover:text-blue-600 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  store.setClientInfo({ clientEmail: e.currentTarget.textContent || '' })
                }
              >
                {store.clientEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8" role="table" aria-label="Invoice items table">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left px-4 py-3 font-semibold">Description</th>
              <th className="text-center px-4 py-3 font-semibold w-20">Qty</th>
              <th className="text-right px-4 py-3 font-semibold w-28">Unit Price</th>
              <th className="text-right px-4 py-3 font-semibold w-28">Total</th>
            </tr>
          </thead>
          <tbody>
            {store.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                <td className="px-4 py-3 text-gray-900">{item.description}</td>
                <td className="px-4 py-3 text-center text-gray-900">{item.quantity}</td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {store.currency} {item.unitPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {store.currency} {(item.quantity * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-end mb-10">
          <div className="w-full sm:w-80">
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal:</span>
              <span className="font-medium">
                {store.currency} {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-700 border-b-2 border-gray-200 pb-4">
              <span>Tax ({store.taxRate}%):</span>
              <span className="font-medium">
                {store.currency} {taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-3 bg-blue-600 text-white px-4 rounded-lg">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-lg">
                {store.currency} {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">Notes</p>
          <p
            className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              store.setInvoiceDetails({ notes: e.currentTarget.textContent || '' })
            }
          >
            {store.notes}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Thank you for your business!</p>
          <p>Generated with Invox Invoice Maker</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
