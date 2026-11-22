# ImportNow — China to India

Responsive multi-page React website concept for a China-to-India sourcing and import-coordination business.

## Stack
- React 18 + Vite
- Lucide React icons
- Custom responsive CSS and CSS 3D-style port illustration

## Pages
Home, Services, Industries, How it works, About, Insights, Contact, Landed Cost Planner, Shipment Tracking Demo.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Vercel
Build command: `npm run build`; output directory: `dist`; install command: `npm install`.

Optional project environment variable: `VITE_WHATSAPP_NUMBER` — set this to the company's verified WhatsApp number in international format with country code, digits only (no `+`, spaces or punctuation). Until it is configured, WhatsApp actions stay disabled and the site will not send enquiries to an invented number. Set it in Vercel Project Settings → Environment Variables, then redeploy.

Hash-based navigation is used so all pages work without server-side router rewrites.

## Before real business use
Verify company details, licences, contact information, service availability, testimonials and operational claims with the business owner. Connect enquiry handling to an approved CRM/backend before collecting customer data. The landed-cost planner is illustrative only and is not a customs quote or tax determination. The shipment page is sample UI only and is not connected to live carrier data. Confirm product-specific import rules with qualified professionals and official authorities.
