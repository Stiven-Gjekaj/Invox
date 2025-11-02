<div align="center">

<img src="Invox.png" alt="Invox Logo" width="300"/>

### A Professional Static Invoice Maker

_Build beautiful invoices instantly with real-time preview and PDF export_

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Ready-success?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

<p align="center" style="font-weight: bold;">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-available-scripts">Scripts</a> •
  <a href="#-project-structure">Structure</a>
</p>

</div>

---

## 📖 Overview

**Invox** is a fully functional, client-side invoice maker built with React, TypeScript, and Vite. Create professional invoices with real-time dual editing, auto-calculated totals, and one-click PDF export. No backend required—everything runs in your browser.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 User Experience

- ✅ Dual editing mode (form + live preview)
- ✅ Real-time synchronization
- ✅ Inline editable text in preview
- ✅ Responsive mobile & desktop layouts
- ✅ Professional, minimalist design

</td>
<td width="50%">

### 📊 Functionality

- ✅ Multi-currency support (10+ currencies)
- ✅ Configurable tax rates & auto-calculations
- ✅ Add/remove line items dynamically
- ✅ Smart Fill demo data
- ✅ One-click PDF export

</td>
</tr>
</table>

<table>
<tr>
<td width="50%">

### 🛠️ Technical

- ✅ TypeScript for type safety
- ✅ Zustand state management
- ✅ TailwindCSS styling
- ✅ jsPDF + html2canvas for export
- ✅ Comprehensive unit tests

</td>
<td width="50%">

### ♿ Quality

- ✅ Full accessibility (ARIA labels)
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Well-documented code
- ✅ Production-ready build

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Stiven-Gjekaj/Invox.git
cd Invox

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📊 Project Statistics

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Components-5-blue?style=for-the-badge" alt="Components"/><br/>
<b>React Components</b><br/>
Form, Preview, Items, Button
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Tests-20+-green?style=for-the-badge" alt="Tests"/><br/>
<b>Unit Tests</b><br/>
Store, calculations, PDF export
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Currencies-10+-orange?style=for-the-badge" alt="Currencies"/><br/>
<b>Multi-Currency</b><br/>
USD, EUR, GBP, and more
</td>
</tr>
</table>

### Architecture Breakdown

| Layer     | Purpose                           | Key Files                               |
| --------- | --------------------------------- | --------------------------------------- |
| **State** | Zustand store with calculations   | `useInvoiceStore.ts`                    |
| **UI**    | React components with TailwindCSS | `InvoiceForm.tsx`, `InvoicePreview.tsx` |
| **Utils** | PDF export & demo data            | `pdfUtils.ts`, `demoData.ts`            |
| **Tests** | Vitest unit tests                 | `store.test.ts`, `pdfUtils.test.ts`     |
| **Build** | Vite configuration & TypeScript   | `vite.config.ts`, `tsconfig.json`       |

---

## 📱 Available Scripts

<table>
<tr>
<td width="50%">

### Development

```bash
npm run dev
```

Start development server with HMR

```bash
npm run build
```

Create optimized production build

</td>
<td width="50%">

### Testing & Preview

```bash
npm run test
```

Run all unit tests in watch mode

```bash
npm run test:ui
```

Interactive test dashboard

```bash
npm run preview
```

Preview production build locally

</td>
</tr>
</table>

---

## 🎯 How to Use

1. **Fill Company Info** - Enter your company details on the left form
2. **Add Client Details** - Input client information
3. **Set Invoice Details** - Configure invoice number, dates, tax rate, currency
4. **Add Items** - Click "+ Add Item" to add line items
5. **Watch Live Preview** - All changes sync to the right side in real-time
6. **Export PDF** - Click "📥 Download PDF" button to generate and download

### Pro Tips

- Click **"Smart Fill Demo"** to populate with example data
- Click any text in the preview to edit it directly
- Use **"Reset All"** to start fresh
- All data stays in your browser—no server needed

---

## 📁 Project Structure

```
invox/
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main layout & PDF export
│   │   ├── InvoiceForm.tsx # Form inputs
│   │   ├── InvoicePreview.tsx # Live preview
│   │   ├── InvoiceItem.tsx # Line item row
│   │   └── Button.tsx      # Reusable button
│   ├── store/
│   │   └── useInvoiceStore.ts # Zustand store
│   ├── utils/
│   │   ├── pdfUtils.ts     # PDF generation
│   │   └── demoData.ts     # Example invoice
│   ├── __tests__/
│   │   ├── store.test.ts   # Store tests
│   │   └── pdfUtils.test.ts # PDF tests
│   ├── App.css             # Global styles
│   └── main.tsx            # React entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite config
├── vitest.config.ts        # Vitest config
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # TailwindCSS config
└── postcss.config.js       # PostCSS config
```

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Interactive UI dashboard
npm run test:ui

# Watch mode (default)
npm run test
```

### Test Coverage

- **Store Tests**: Calculations, item management, state updates
- **PDF Tests**: Blob generation, error handling, content validation
- **Edge Cases**: Decimal values, zero tax, empty items

---

## 📚 Documentation

<table>
<tr>
<td align="center" width="33%">
<h3>🚀 Setup</h3>
<p>Installation & getting started</p>
</td>
<td align="center" width="33%">
<h3>📖 Features</h3>
<p>What Invox can do</p>
</td>
<td align="center" width="33%">
<h3>🔧 Tech Stack</h3>
<p>Tools & libraries used</p>
</td>
</tr>
<tr>
<td align="center">

See Quick Start section above

</td>
<td align="center">

See Features section above

</td>
<td align="center">

- React 19
- TypeScript 5
- Vite 7
- TailwindCSS 4
- Zustand
- jsPDF + html2canvas

</td>
</tr>
</table>

---

## ♿ Accessibility

Invox is built with accessibility as a core feature:

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation throughout
- ✅ Clear focus indicators
- ✅ Semantic HTML structure
- ✅ Color contrast compliance
- ✅ Mobile-friendly design

---

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Deployment

Build and deploy to any static host:

```bash
npm run build
# Deploy the dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3
# - Any static file host
```

---

## 💡 Key Technologies

| Technology      | Purpose                  | Why                                |
| --------------- | ------------------------ | ---------------------------------- |
| **React 19**    | UI framework             | Fast, component-based              |
| **TypeScript**  | Type safety              | Fewer bugs, better DX              |
| **Vite**        | Build tool               | Lightning-fast dev server          |
| **TailwindCSS** | Styling                  | Utility-first, highly customizable |
| **Zustand**     | State management         | Minimal, unopinionated             |
| **jsPDF**       | PDF generation           | Client-side, no server needed      |
| **html2canvas** | HTML to image conversion | Captures styled content            |
| **Vitest**      | Testing framework        | Fast, Vite-native                  |

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

---

<div align="center">

**Built for freelancers, small businesses, and anyone who needs simple invoicing** ✨

</div>
