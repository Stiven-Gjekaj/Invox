# Invox - Professional Invoice Maker

A fully functional, static, professional invoice maker website built with **React**, **TypeScript**, and **Vite**. Create, customize, and export invoices to PDF with a modern, responsive interface.

## 🌟 Features

### Core Features
- **Dual Editing Mode**: Real-time synchronization between form inputs and live invoice preview
- **PDF Export**: One-click PDF generation with professional formatting for A4 size
- **Smart Fill Demo**: Populate the invoice with realistic example data for quick testing
- **Multi-Currency Support**: 10+ currency options (USD, EUR, GBP, ALL, AUD, CAD, CHF, JPY, CNY, INR)
- **Tax Calculation**: Configurable tax rates with automatic total calculations
- **Inline Editing**: Click to edit text directly in the invoice preview
- **Responsive Design**: Seamless experience on desktop and mobile devices

### Technical Features
- **Client-Side Only**: No backend or database required - all data stays in your browser
- **Type-Safe**: Full TypeScript support for robust development
- **State Management**: Zustand for lightweight, efficient state management
- **Accessible**: ARIA labels, keyboard navigation, and proper focus management
- **Professional Styling**: TailwindCSS with minimalist, clean design
- **Well-Tested**: Comprehensive unit tests for calculations and PDF export

## 🎨 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + PostCSS + Autoprefixer
- **State Management**: Zustand
- **PDF Generation**: jsPDF + html2canvas
- **Testing**: Vitest + Testing Library
- **Development**: ESLint, TypeScript strict mode

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Stiven-Gjekaj/Invox.git
cd Invox
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173` in your browser.

## 🚀 Usage

### Creating an Invoice

1. **Fill Company Information**: Enter your company name, email, phone, and address on the left form panel
2. **Add Client Details**: Input the client's name, email, and billing address
3. **Set Invoice Details**: Configure invoice number, date, due date, currency, and tax rate
4. **Add Items**: Click "+ Add Item" to add line items with descriptions, quantities, and unit prices
5. **Watch Live Preview**: All changes sync instantly to the right preview panel
6. **Export to PDF**: Click the "📥 Download PDF" button to generate and download your invoice

### Smart Fill Demo
Click the **"Smart Fill Demo"** button to automatically populate all fields with realistic example data. Perfect for testing the layout and features without manual entry.

### Reset All
Use the **"Reset All"** button to clear all data and start fresh.

### Inline Editing
Click any text in the invoice preview to edit it directly. Changes automatically sync back to the form.

## 📊 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deployment.

### Run Tests
```bash
npm run test
```
Runs all unit tests using Vitest in watch mode.

### Test UI Dashboard
```bash
npm run test:ui
```
Opens an interactive test dashboard in your browser.

## 🧪 Testing

The project includes comprehensive unit tests covering:

- **Store Tests** (`src/__tests__/store.test.ts`)
  - Subtotal, tax, and total calculations
  - Item management (add, remove, update)
  - State management operations
  - Edge cases (decimal values, zero tax, etc.)

- **PDF Utility Tests** (`src/__tests__/pdfUtils.test.ts`)
  - PDF blob generation
  - PDF content validation
  - Error handling

Run tests with:
```bash
npm run test      # Run all tests
npm run test:ui   # Interactive UI dashboard
```

## 📁 Project Structure

```
Invox/
├── src/
│   ├── components/
│   │   ├── App.tsx              # Main app component with layout
│   │   ├── InvoiceForm.tsx       # Form for invoice details
│   │   ├── InvoicePreview.tsx    # Live invoice preview
│   │   ├── InvoiceItem.tsx       # Line item component
│   │   └── Button.tsx            # Reusable button component
│   ├── store/
│   │   └── useInvoiceStore.ts   # Zustand state management
│   ├── utils/
│   │   ├── pdfUtils.ts          # PDF generation utilities
│   │   └── demoData.ts          # Example invoice data
│   ├── __tests__/
│   │   ├── store.test.ts        # Store unit tests
│   │   └── pdfUtils.test.ts     # PDF utility tests
│   ├── App.css                  # Global styles
│   └── main.tsx                 # React entry point
├── public/                       # Static assets
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── vitest.config.ts             # Vitest configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
└── postcss.config.js            # PostCSS configuration
```

## ♿ Accessibility

Invox is built with accessibility as a priority:

- **ARIA Labels**: All interactive elements have descriptive ARIA labels
- **Keyboard Navigation**: Full keyboard support for all form inputs and buttons
- **Focus Management**: Clear focus indicators for keyboard users
- **Semantic HTML**: Proper heading hierarchy and semantic structure
- **Color Contrast**: Professional color scheme that meets WCAG standards
- **Responsive**: Mobile-friendly design with proper touch targets

## 🎯 Key Components

### useInvoiceStore (Zustand)
Centralized state management for all invoice data:
- Company information
- Client information
- Invoice details
- Line items
- Calculations (subtotal, tax, total)

### InvoiceForm
Left panel with form inputs for all invoice data. Features:
- Organized sections (Company, Client, Invoice Details, Items)
- Real-time validation and sync
- Smart Fill and Reset buttons

### InvoicePreview
Right panel showing live invoice preview. Features:
- Professional invoice layout
- Inline editable text
- Auto-calculated totals
- Mobile-responsive design

### PDF Export
One-click PDF generation:
- Uses html2canvas to capture the invoice preview
- Generates multi-page PDFs with jsPDF
- Automatic file naming with invoice number

## 🔄 Real-Time Synchronization

The application uses Zustand's reactive subscriptions to ensure instant synchronization:
- Form input changes → Store update → Preview refresh
- Preview inline edits → Store update → Form refresh
- All calculations computed in real-time

## 🌐 Deployment

To deploy Invox:

1. **Build the project**
```bash
npm run build
```

2. **Deploy the `dist/` folder** to your hosting provider:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static file host

Example with Vercel:
```bash
npm install -g vercel
vercel
```

## 📄 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/Stiven-Gjekaj/Invox/issues).

## 🎓 Learning Resources

This project demonstrates:
- React hooks and state management with Zustand
- TypeScript for type-safe React development
- TailwindCSS for utility-first styling
- PDF generation in the browser
- Responsive design patterns
- Accessibility best practices
- Unit testing with Vitest

---

**Built with ❤️ by the Invox team**

Made for freelancers, small business owners, and anyone who needs a simple, professional invoice maker.
