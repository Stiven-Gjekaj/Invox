import React from 'react';
import { InvoiceItem as InvoiceItemType } from '../store/useInvoiceStore';
import Button from './Button';

interface InvoiceItemProps {
  item: InvoiceItemType;
  onUpdate: (id: string, data: Partial<InvoiceItemType>) => void;
  onRemove: (id: string) => void;
  index: number;
}

/**
 * Reusable row component for invoice items
 * Allows editing description, quantity, and unit price
 */
const InvoiceItem: React.FC<InvoiceItemProps> = ({
  item,
  onUpdate,
  onRemove,
  index,
}) => {
  const total = item.quantity * item.unitPrice;

  return (
    <div
      className="grid grid-cols-12 gap-2 mb-3 p-3 bg-gray-50 rounded-lg"
      role="row"
      aria-label={`Invoice item ${index + 1}`}
    >
      {/* Description */}
      <input
        type="text"
        placeholder="Item description"
        value={item.description}
        onChange={(e) => onUpdate(item.id, { description: e.target.value })}
        className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Item ${index + 1} description`}
      />

      {/* Quantity */}
      <input
        type="number"
        min="0"
        step="1"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 0 })}
        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Item ${index + 1} quantity`}
      />

      {/* Unit Price */}
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={item.unitPrice}
        onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Item ${index + 1} unit price`}
      />

      {/* Total */}
      <div className="col-span-2 px-3 py-2 bg-white rounded-lg border border-gray-300 flex items-center justify-end font-semibold">
        ${total.toFixed(2)}
      </div>

      {/* Remove Button */}
      <div className="col-span-1 flex items-center">
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove item ${index + 1}`}
        >
          ✕
        </Button>
      </div>
    </div>
  );
};

export default InvoiceItem;
