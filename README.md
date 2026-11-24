# ImportNow — China-to-India Import & Sourcing Experience

A responsive, maritime-inspired web experience for **ImportNow**, focused on helping Indian businesses understand the China-to-India sourcing and import journey.

The project combines a navy nautical-chart visual identity with interactive trade-route storytelling, 3D visualisations, practical import-planning tools and enquiry flows.

## Project links

- **Company website:** https://www.importnow.in/
- **GitHub repository:** https://github.com/monkeydnaik/ImportNow
- **Default branch:** `main`

> The company website link is provided as a company reference. This repository contains a separate web project and should not be mistaken for the production company's official website unless it is deployed and approved by the company.

## Experience highlights

- **Maritime visual direction** — deep navy surfaces, nautical-chart detailing, warm gold accents and sea-glass teal.
- **Interactive trade visualisation** — a Three.js globe and China-to-India trade-route presentation.
- **Cargo journey storytelling** — shipment milestones and cargo-handling visuals designed to explain the import process.
- **Port visualisation** — a schematic Nhava Sheva port chart with terminal and approach-lane details. It is illustrative and not intended for navigation.
- **China sourcing journey** — visual introduction to key sourcing destinations including Guangzhou, Shenzhen, Yiwu and Foshan.
- **Import-planning utilities** — landed-cost planning, CBM calculation, air chargeable-weight calculation, RFQ preparation and an import-readiness checklist.
- **Enquiry experience** — responsive contact and WhatsApp-oriented enquiry flows.

## Technology

- React 18
- Vite
- Three.js
- Lucide React
- CSS with responsive layouts and motion-conscious styling

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deployment

The project is configured for a Vite-style deployment.

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Deploy the repository's `main` branch through your chosen hosting provider and configure any required environment variables in that provider's project settings.

## Configuration

If the enquiry flow uses a WhatsApp destination, configure:

- `VITE_WHATSAPP_NUMBER` — the business WhatsApp number in international digits-only format.

Use only a verified business contact number. Do not commit private credentials or API keys to the repository.

## Accuracy and usage notes

This project is a website experience and visual explanation of import workflows. It does **not** provide live vessel tracking, real-time port conditions, customs or legal advice, supplier verification, guaranteed shipping timelines, or a binding landed-cost quotation.

Port maps, route graphics, locations, shipment milestones and trade illustrations are demonstrative. Confirm company details, supplier information, shipping arrangements, regulatory requirements and all commercial terms independently before relying on them.

## Contributing

Keep changes focused, preserve the existing React/Vite architecture, and test the production build with `npm run build` before submitting changes.
