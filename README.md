# ImportNow — China-to-India Import & Sourcing Experience

A responsive, maritime-inspired web experience for **ImportNow**, focused on helping Indian businesses understand the China-to-India sourcing and import journey.

The project combines a navy nautical-chart visual identity with interactive trade-route storytelling, 3D visualisations, practical import-planning tools and enquiry flows.

## Project links

- **Live project preview:** https://import-now-nine.vercel.app/
- **Company website:** https://www.importnow.in/
- **GitHub repository:** https://github.com/monkeydnaik/ImportNow
- **Default branch:** `main`

> The company website link is provided as a company reference. This repository contains a separate web project and should not be mistaken for the production company's official website unless it is deployed and approved by the company.

## Experience highlights

- **Maritime visual direction** — deep navy surfaces, nautical-chart detailing, warm gold accents and sea-glass teal.
- **Interactive 3D Earth** — a Three.js globe with animated city markers, curved China-to-India trade routes, moving vessel pulses, a miniature cargo ship and atmospheric lighting.
- **Globe information overlays** — a top status label, a China/India city-information panel and a bottom route indicator sit above the 3D canvas. The city names in the panel are a readable overlay; the animated map pins and routes are rendered in the 3D scene.
- **Cargo journey storytelling** — shipment milestones and cargo-handling visuals designed to explain the import process.
- **Port visualisation** — a schematic Nhava Sheva port chart with terminal and approach-lane details. It is illustrative and not intended for navigation.
- **China sourcing journey** — visual introduction to key sourcing destinations including Guangzhou, Shenzhen, Yiwu and Foshan.
- **Import-planning utilities** — landed-cost planning, CBM calculation, air chargeable-weight calculation, RFQ preparation and an import-readiness checklist.
- **Enquiry experience** — responsive contact and WhatsApp-oriented enquiry flows.

## Main experience areas

- **Hero and Earth visual:** the main landing section pairs the headline and enquiry actions with the interactive globe and its overlay labels.
- **Services and industries:** service cards and industry examples explain the sourcing, inspection, freight and delivery support workflow.
- **Import process:** step-based explanations and cargo-journey visuals show the stages from product brief to delivery.
- **China sourcing destinations:** Guangzhou, Shenzhen, Yiwu and Foshan are presented as sourcing hubs.
- **Nhava Sheva port chart:** a separate schematic port illustration provides a location-focused visual reference.
- **Tools and enquiry:** import-planning utilities and contact forms support early-stage enquiries.

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

## Visual and interaction notes

The globe's city markers and trade routes are 3D objects rendered by Three.js. The city-name information panel and the top/bottom route labels are HTML overlays positioned over the globe frame so they remain readable while the Earth rotates. They are informational overlays, not geospatial labels attached to the rotating surface.

The globe uses externally hosted Earth textures. An internet connection is required for the textured Earth assets to load; the scene includes a basic fallback globe while the textures are loading.

## Accuracy and usage notes

This project is a website experience and visual explanation of import workflows. It does **not** provide live vessel tracking, real-time port conditions, customs or legal advice, supplier verification, guaranteed shipping timelines, or a binding landed-cost quotation.

Port maps, route graphics, locations, shipment milestones and trade illustrations are demonstrative. Confirm company details, supplier information, shipping arrangements, regulatory requirements and all commercial terms independently before relying on them.

## Contributing

Keep changes focused, preserve the existing React/Vite architecture, and test the production build with `npm run build` before submitting changes.
