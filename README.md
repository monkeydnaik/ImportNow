# ImportNow Replica

A responsive China-to-India import services concept website.

## Stack
- React 18 + Vite
- Three.js interactive 3D Earth and trade-route scene
- Lucide React icon system
- Responsive CSS, accessible navigation and enquiry form

## Pages
Home, Services, Industries, How it works, About and Contact.

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Vercel
Framework preset: Vite  
Build command: `npm run build`  
Output directory: `dist`

Optional environment variable: `VITE_WHATSAPP_NUMBER` (verified business WhatsApp number in international digits-only format). If unset, the contact form prepares and copies the enquiry rather than opening an unconfigured number.

The globe uses Three.js from jsDelivr and an Earth texture from threejs.org, so the interactive 3D scene needs an internet connection. It has an offline-style fallback visual base (untextured globe) if the Earth texture cannot load.

All locations, route paths, service descriptions and trade graphics are illustrative. This is not live vessel tracking, customs advice, supplier verification or a promise of logistics service. Confirm real company details and import requirements before business use.
