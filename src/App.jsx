import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  Ship,
  FileCheck2,
  Truck,
  ArrowRight,
  Menu,
  X,
  Play,
  Pause,
  Calculator,
  Plane,
  Package,
  MapPin,
  Calendar,
  BookOpen,
  MessageCircle,
  Send,
  Sparkles,
  Check,
  Building2,
  ChevronRight,
  Globe,
  PhoneCall,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

/**
 * Custom Flag Icons (China & India) rendered cleanly as scalable inline SVGs
 * so they appear crisply across all operating systems and mobile browsers.
 */
const ChinaFlag = ({ className = "w-4 h-3 rounded-[2px] shadow-xs shrink-0" }) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="China Flag">
    <rect width="30" height="20" fill="#DE2910" />
    <polygon points="5,2 6.1,5.4 3.2,3.3 6.8,3.3 3.9,5.4" fill="#FFDE00" />
    <circle cx="10" cy="2.2" r="0.7" fill="#FFDE00" />
    <circle cx="11.8" cy="4" r="0.7" fill="#FFDE00" />
    <circle cx="11.8" cy="6.6" r="0.7" fill="#FFDE00" />
    <circle cx="10" cy="8.4" r="0.7" fill="#FFDE00" />
  </svg>
);

const IndiaFlag = ({ className = "w-4 h-3 rounded-[2px] shadow-xs shrink-0" }) => (
  <svg viewBox="0 0 30 20" className={className} aria-label="India Flag">
    <rect width="30" height="6.67" y="0" fill="#FF9933" />
    <rect width="30" height="6.67" y="6.67" fill="#FFFFFF" />
    <rect width="30" height="6.67" y="13.33" fill="#138808" />
    <circle cx="15" cy="10" r="2.3" fill="none" stroke="#000080" strokeWidth="0.6" />
    <circle cx="15" cy="10" r="0.5" fill="#000080" />
  </svg>
);

/**
 * Custom IMPORTNOW Brand Wordmark with signature Globe/Location-Pin 'O'
 */
const BrandLogo = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center font-black tracking-tighter text-xl sm:text-2xl text-[#111111] select-none focus:outline-none group"
    aria-label="ImportNow Home"
  >
    <span>IMP</span>
    <span className="relative inline-flex items-center justify-center mx-[1px] w-5 h-5 sm:w-6 sm:h-6">
      <svg
        viewBox="0 0 28 28"
        className="w-full h-full transition-transform duration-300 group-hover:rotate-12"
        fill="none"
      >
        {/* Outer globe ring */}
        <circle cx="14" cy="14" r="10.5" stroke="#111111" strokeWidth="3.2" />
        {/* Latitude / Longitude arcs */}
        <ellipse cx="14" cy="14" rx="5.2" ry="10.5" stroke="#111111" strokeWidth="1.6" />
        <line x1="3.5" y1="14" x2="24.5" y2="14" stroke="#111111" strokeWidth="1.6" />
        {/* Coral-Red route pin dot */}
        <circle cx="19.5" cy="8.5" r="3.4" fill="#E1251B" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    </span>
    <span>RTNOW</span>
  </button>
);

/**
 * Domain Data: End-to-End Services, Journey Steps, Categories, Trips & Insights
 */
const SERVICES_DATA = [
  {
    id: 'sourcing',
    step: '01',
    title: 'Product sourcing',
    shortDesc:
      'We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.',
    deliverables: [
      '3–5 vetted factory quotes within 72 hours',
      'Direct ex-factory (EXW / FOB) pricing without trading middlemen',
      'OEM / private-label packaging & mold customization support'
    ],
    hubs: 'Yiwu • Shenzhen • Guangzhou • Foshan',
    icon: Search
  },
  {
    id: 'inspection',
    step: '02',
    title: 'Factory inspection',
    shortDesc:
      'Our team visits the factory in person. We check licenses, samples and production capacity before you pay.',
    deliverables: [
      'Chinese business license & export permit verification',
      'On-floor assembly line & machinery capacity audit',
      'Physical sample collection & consolidation at our Shanghai office'
    ],
    hubs: 'On-site Shanghai & Guangdong Field Engineers',
    icon: ShieldCheck
  },
  {
    id: 'qc',
    step: '03',
    title: 'Quality control',
    shortDesc:
      'Pre-shipment checks with photo and video reports, done before the container is sealed.',
    deliverables: [
      'AQL standard defect & functional stress testing',
      'HD video walkthrough + measurement checklist before balance payment',
      'Tamper-evident container loading supervision'
    ],
    hubs: 'Pre-Shipment & During-Production Checks',
    icon: CheckCircle2
  },
  {
    id: 'shipping',
    step: '04',
    title: 'Shipping & logistics',
    shortDesc:
      'Full container and shared container sea freight from Chinese ports, plus air cargo for urgent orders.',
    deliverables: [
      'Weekly LCL consolidation & 20ft / 40ft HQ FCL sailings',
      'Express air freight (4–7 days) for high-velocity SKUs',
      'Live Bill of Lading & vessel milestone tracking'
    ],
    hubs: 'Ningbo • Shanghai • Yantian • Nansha',
    icon: Ship
  },
  {
    id: 'customs',
    step: '05',
    title: 'Customs clearance',
    shortDesc:
      'Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.',
    deliverables: [
      'Pre-arrival HSN code classification & BIS/WPC compliance check',
      'Bill of Entry filing, IGST & Basic Customs Duty calculation',
      'Zero-demurrage fast-track clearance at Nhava Sheva, Chennai & Mundra'
    ],
    hubs: 'Nhava Sheva • Chennai • Mundra • Delhi ICD',
    icon: FileCheck2
  },
  {
    id: 'delivery',
    step: '06',
    title: 'Doorstep delivery',
    shortDesc:
      'Final-mile transport from Indian ports directly to your warehouse or store anywhere in India.',
    deliverables: [
      'Insured pan-India containerized & part-truckload dispatch',
      '100% compliant Indian tax invoice for seamless ITC claim',
      'Dedicated account manager until unloading at your dock'
    ],
    hubs: '28 States & 8 Union Territories Covered',
    icon: Truck
  }
];

const JOURNEY_STEPS = [
  {
    step: 1,
    progress: 12,
    badge: 'China Factory Hub',
    title: 'Source the right factory',
    desc: 'Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.',
    eta: 'Days 1–4',
    location: 'Guangzhou / Yiwu'
  },
  {
    step: 2,
    progress: 34,
    badge: 'Shanghai QC Team',
    title: 'On-site audit & sample approval',
    desc: 'Our registered Shanghai team visits the production line, verifies licenses, and sends live HD inspection videos.',
    eta: 'Days 5–12',
    location: 'Shanghai / Shenzhen'
  },
  {
    step: 3,
    progress: 56,
    badge: 'Port Consolidation',
    title: 'Container loading & export sealing',
    desc: 'Goods are palletized, barcode-verified, and loaded into FCL or shared LCL containers under camera supervision.',
    eta: 'Days 13–16',
    location: 'Port of Shanghai / Ningbo'
  },
  {
    step: 4,
    progress: 78,
    badge: 'Ocean Transit & Customs',
    title: 'Sea freight & Indian port clearance',
    desc: 'Real-time vessel tracking across the Indian Ocean with pre-filed HSN documentation, duty & GST clearance.',
    eta: 'Days 17–30',
    location: 'Nhava Sheva / Chennai Port'
  },
  {
    step: 5,
    progress: 96,
    badge: 'India Doorstep',
    title: 'Delivered to your warehouse door',
    desc: 'Cleared cargo travels via insured Indian surface freight straight to your warehouse with full GST billing.',
    eta: 'Days 31–34',
    location: 'Your Indian Warehouse'
  }
];

const IMPORT_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics & Smart Gadgets',
    moq: '50 pcs',
    leadTime: '18–25 Days',
    dutyRate: 0.18,
    popularItems: ['TWS Earbuds & GaN Chargers', 'Smart Home & LED Drivers', 'Mobile Accessories & Cables', 'POS & Commercial Displays'],
    hub: 'Shenzhen & Dongguan'
  },
  {
    id: 'machinery',
    name: 'Machinery & Industrial Tools',
    moq: '1 pc',
    leadTime: '28–38 Days',
    dutyRate: 0.15,
    popularItems: ['CNC & Laser Cutting Machines', 'Packaging & Sealing Lines', 'Commercial Kitchen Equipment', 'Power Tools & Spare Parts'],
    hub: 'Suzhou, Wenzhou & Foshan'
  },
  {
    id: 'home',
    name: 'Home, Kitchen & Lifestyle',
    moq: '100 pcs',
    leadTime: '22–30 Days',
    dutyRate: 0.20,
    popularItems: ['Stainless Vacuum Flasks', 'Modular Storage & Organizers', 'Architectural Lighting', 'Ergonomic Office Furniture'],
    hub: 'Yiwu & Yongkang'
  },
  {
    id: 'packaging',
    name: 'Packaging & Retail Supplies',
    moq: '500 pcs',
    leadTime: '20–28 Days',
    dutyRate: 0.18,
    popularItems: ['Custom Rigid Magnetic Boxes', 'Cosmetic Airless Pumps & Jars', 'Biodegradable Pouches', 'Retail Display Racks'],
    hub: 'Guangzhou & Wenzhou'
  }
];

const TRADE_ROUTES = [
  { from: 'Guangzhou', to: 'Chennai', transit: '14 Days Sea' },
  { from: 'Shanghai', to: 'Nhava Sheva', transit: '16 Days Sea' },
  { from: 'Yiwu', to: 'Mundra', transit: '18 Days Sea' },
  { from: 'Shenzhen', to: 'Delhi Air Cargo', transit: '4 Days Air' },
  { from: 'Ningbo', to: 'Kolkata', transit: '15 Days Sea' }
];

const BLOG_ARTICLES = [
  {
    tag: 'CUSTOMS & COMPLIANCE',
    readTime: '4 min read',
    title: 'How to avoid BIS & HSN classification holds at Nhava Sheva in 2026',
    excerpt: 'A practical pre-shipment checklist for Indian importers bringing electronics, toys, and steel hardware from China.'
  },
  {
    tag: 'SOURCING STRATEGY',
    readTime: '5 min read',
    title: '1688.com vs. Canton Fair: Where do real factories actually quote?',
    excerpt: 'How our Shanghai procurement team filters out trading companies posing as Tier-1 manufacturers.'
  },
  {
    tag: 'LOGISTICS MATH',
    readTime: '3 min read',
    title: 'LCL Shared Container vs. 20ft FCL: Finding your break-even CBM',
    excerpt: 'Exact volume thresholds where switching from shared cargo to a dedicated container saves up to 28% per unit.'
  }
];

/**
 * Interactive Port & Container Ship SVG Scene for "How It Works"
 */
const PortJourneyVisual = ({ activeStep, onSelectStep, isPlaying, setIsPlaying }) => {
  const current = JOURNEY_STEPS[activeStep - 1];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#DDE7F0] via-[#C8D8E6] to-[#3B5978] border border-gray-200/80 shadow-xl">
      {/* Top Status Bar inside Visual */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 pt-4 sm:pt-5">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#111111] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#E1251B] animate-pulse" />
          <span>LIVE CORRIDOR: {current.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#111111]/85 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md">
            Est. Timeline: {current.eta}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-[#111111] text-xs font-bold px-3 py-1.5 rounded-full shadow-xs transition cursor-pointer"
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E1251B]" /> : <Play className="w-3.5 h-3.5 text-[#E1251B]" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto-Play'}</span>
          </button>
        </div>
      </div>

      {/* Illustrated 3D-Style Port & Container Ship Scene */}
      <div className="relative w-full h-[250px] sm:h-[310px] select-none overflow-hidden">
        <svg
          viewBox="0 0 900 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Port crane loading a container ship traveling from China to India"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6EEF5" />
              <stop offset="100%" stopColor="#BFD1E2" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5C7D99" />
              <stop offset="45%" stopColor="#456682" />
              <stop offset="100%" stopColor="#2C465E" />
            </linearGradient>
            <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1A202C" />
              <stop offset="100%" stopColor="#2D3748" />
            </linearGradient>
          </defs>

          {/* Sky backdrop */}
          <rect width="900" height="190" fill="url(#skyGrad)" />

          {/* Distant City Skyline Silhouette (Shanghai / Chennai) */}
          <g fill="#A8BED1" opacity="0.55">
            <rect x="40" y="105" width="22" height="75" rx="2" />
            <rect x="68" y="85" width="18" height="95" rx="2" />
            <rect x="92" y="115" width="28" height="65" rx="2" />
            <rect x="740" y="95" width="24" height="85" rx="2" />
            <rect x="772" y="75" width="20" height="105" rx="2" />
            <rect x="800" y="110" width="32" height="70" rx="2" />
          </g>

          {/* Port Terminal Quay & Warehouse */}
          <rect x="0" y="162" width="900" height="26" fill="#CBD5E1" />
          <rect x="0" y="184" width="900" height="8" fill="#64748B" />
          <rect x="520" y="112" width="210" height="50" fill="#F8FAFC" rx="3" />
          <polygon points="515,112 625,90 735,112" fill="#B91C1C" />

          {/* Stacked Terminal Containers on Dock */}
          <g>
            <rect x="545" y="146" width="34" height="16" fill="#E1251B" rx="1" />
            <rect x="582" y="146" width="34" height="16" fill="#1E3A8A" rx="1" />
            <rect x="619" y="146" width="34" height="16" fill="#0F766E" rx="1" />
            <rect x="562" y="130" width="34" height="16" fill="#D97706" rx="1" />
            <rect x="599" y="130" width="34" height="16" fill="#E1251B" rx="1" />
          </g>

          {/* Twin Red Gantry Port Cranes */}
          <g stroke="#DC2626" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Crane 1 */}
            <path d="M270,180 L292,48 L332,48 L350,180" />
            <path d="M250,74 L465,74" strokeWidth="6" />
            <path d="M292,48 L445,74" strokeWidth="2.5" />
            <path d="M292,48 L255,74" strokeWidth="2.5" />
            {/* Hoist Cable & Spreader */}
            <line x1="395" y1="74" x2="395" y2="122" stroke="#1E293B" strokeWidth="2" />
            <rect x="376" y="122" width="38" height="14" fill="#E1251B" stroke="none" rx="1.5" />

            {/* Crane 2 (Background) */}
            <g opacity="0.82" transform="translate(115, 6) scale(0.94)">
              <path d="M270,180 L292,48 L332,48 L350,180" />
              <path d="M250,74 L465,74" strokeWidth="6" />
              <path d="M292,48 L445,74" strokeWidth="2.5" />
            </g>
          </g>

          {/* Harbor Water Surface */}
          <rect x="0" y="192" width="900" height="128" fill="url(#waterGrad)" />

          {/* Subtle Water Ripples */}
          <g stroke="#93C5FD" strokeWidth="1.5" opacity="0.28" strokeLinecap="round">
            <line x1="70" y1="215" x2="170" y2="215" />
            <line x1="590" y1="225" x2="720" y2="225" />
            <line x1="120" y1="275" x2="290" y2="275" />
            <line x1="640" y1="280" x2="820" y2="280" />
          </g>

          {/* Animated Container Vessel moving smoothly along corridor */}
          <g
            style={{
              transform: `translateX(${(activeStep - 1) * 58 - 60}px)`,
              transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            {/* Water Reflection */}
            <ellipse cx="385" cy="242" rx="165" ry="11" fill="#0F172A" opacity="0.35" />

            {/* Ship Hull */}
            <path
              d="M225,212 L530,212 L555,222 L535,238 L242,238 Z"
              fill="url(#hullGrad)"
            />
            {/* Red Waterline Stripe */}
            <path d="M238,231 L541,231 L535,238 L242,238 Z" fill="#E1251B" />

            {/* Bridge / Wheelhouse */}
            <rect x="255" y="176" width="28" height="36" fill="#FFFFFF" rx="2" />
            <rect x="251" y="182" width="36" height="6" fill="#1E293B" rx="1" />

            {/* Multi-color Stacked Cargo Containers */}
            <g>
              {/* Bottom Row */}
              <rect x="292" y="198" width="36" height="14" fill="#E1251B" rx="1" />
              <rect x="331" y="198" width="36" height="14" fill="#2563EB" rx="1" />
              <rect x="370" y="198" width="36" height="14" fill="#059669" rx="1" />
              <rect x="409" y="198" width="36" height="14" fill="#D97706" rx="1" />
              <rect x="448" y="198" width="36" height="14" fill="#E1251B" rx="1" />
              {/* Middle Row */}
              <rect x="302" y="183" width="36" height="14" fill="#0284C7" rx="1" />
              <rect x="341" y="183" width="36" height="14" fill="#E1251B" rx="1" />
              <rect x="380" y="183" width="36" height="14" fill="#4F46E5" rx="1" />
              <rect x="419" y="183" width="36" height="14" fill="#16A34A" rx="1" />
              {/* Top Row */}
              <rect x="322" y="168" width="36" height="14" fill="#F59E0B" rx="1" />
              <rect x="361" y="168" width="36" height="14" fill="#E1251B" rx="1" />
              <rect x="400" y="168" width="36" height="14" fill="#1D4ED8" rx="1" />
            </g>

            {/* Brand Tag on Hull */}
            <text
              x="395"
              y="225"
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="800"
              letterSpacing="1.5"
              textAnchor="middle"
            >
              IMPORTNOW LINE
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Floating Step Card + Interactive China -> India Progress Slider */}
      <div className="relative z-10 px-4 sm:px-6 pb-5 -mt-14 sm:-mt-16">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E1251B] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              {current.step}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-base sm:text-lg text-[#111111]">
                  {current.title}
                </h4>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E1251B] bg-red-50 px-2.5 py-0.5 rounded-full">
                  {current.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                {current.desc}
              </p>
            </div>
          </div>

          {/* Interactive China -> India Route Track */}
          <div className="mt-4 pt-3.5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <ChinaFlag className="w-5 h-3.5 rounded-[2px]" />
                <span className="text-[11px] font-bold text-gray-700 hidden sm:inline">CN</span>
              </div>

              {/* Dotted Progress Track with Clickable Milestones */}
              <div className="relative flex-1 h-7 flex items-center">
                {/* Base Dotted Track */}
                <div className="w-full border-b-2 border-dashed border-gray-300" />
                {/* Active Coral Progress Line */}
                <div
                  className="absolute left-0 h-[3px] bg-[#E1251B] rounded-full transition-all duration-500"
                  style={{ width: `${current.progress}%` }}
                />

                {/* Step Milestone Dots */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  {JOURNEY_STEPS.map((s) => {
                    const isCompleted = s.step <= activeStep;
                    const isCurrent = s.step === activeStep;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => {
                          setIsPlaying(false);
                          onSelectStep(s.step);
                        }}
                        className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#E1251B] text-white scale-115 ring-4 ring-red-100'
                            : isCompleted
                            ? 'bg-[#111111] text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-gray-500'
                        }`}
                        aria-label={`Step ${s.step}: ${s.title}`}
                      >
                        {s.step}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-gray-700 hidden sm:inline">IN</span>
                <IndiaFlag className="w-5 h-3.5 rounded-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Interactive Sourcing Quote Modal
 */
const QuoteModal = ({ isOpen, onClose, initialProduct = '', initialCategory = 'electronics' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    product: initialProduct,
    category: initialCategory,
    quantity: '200 units',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, product: initialProduct }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-[#111111] mb-3">
              <ChinaFlag />
              <span>→</span>
              <IndiaFlag />
              <span>Shanghai Sourcing Desk</span>
            </div>

            <h3 id="quote-modal-title" className="text-2xl font-extrabold text-[#111111] tracking-tight">
              Get a free factory quote
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Share what you want to import. Our Shanghai procurement team will send 3 verified factory quotes with landed India pricing within 48 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Name / Link *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GaN 65W Charger or 1688 URL"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Target Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 pcs / 1 CBM"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Specifications / Indian Delivery City</label>
                <textarea
                  rows={3}
                  placeholder="Mention target price, custom branding needs, and delivery city (e.g. Mumbai, Delhi, Bengaluru)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#111111]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-black/85 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <span>Request Verified Factory Quotes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h4 className="text-2xl font-extrabold text-[#111111]">Sourcing Brief Received!</h4>
            <p className="text-sm text-gray-600 mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#111111]">{formData.name || 'Partner'}</span>. Our Shanghai & India desk has assigned your inquiry for{' '}
              <span className="font-semibold text-[#111111]">{formData.product || 'your product'}</span> and will reach out on{' '}
              <span className="font-semibold text-[#111111]">{formData.phone}</span> shortly.
            </p>
            <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-xs text-gray-500 border border-gray-100">
              Reference ID: <span className="font-mono font-bold text-[#111111]">IN-SH-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <button
              onClick={resetAndClose}
              className="mt-6 px-8 py-3 rounded-full bg-[#111111] text-white text-sm font-bold hover:bg-black/85 transition cursor-pointer"
            >
              Back to ImportNow
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Main Application Component
 */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState('sourcing');
  const [activeJourneyStep, setActiveJourneyStep] = useState(1);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState('');
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState('Hi ImportNow team! I want to get a sourcing & shipping quote from China to India.');

  // Landed Cost Estimator State
  const [fobUsd, setFobUsd] = useState(2500);
  const [shippingMode, setShippingMode] = useState('sea_lcl'); // sea_lcl | sea_fcl | air
  const [exchangeRate] = useState(84.5);

  // Auto-advance interactive China -> India route simulation
  useEffect(() => {
    if (!isJourneyPlaying) return;
    const timer = setInterval(() => {
      setActiveJourneyStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 3600);
    return () => clearInterval(timer);
  }, [isJourneyPlaying]);

  const activeCategoryObj = IMPORT_CATEGORIES.find((c) => c.id === selectedCategory) || IMPORT_CATEGORIES[0];

  // Landed cost calculation (FOB + International Freight + Basic Duty + 18% IGST)
  const freightMultiplier = shippingMode === 'air' ? 0.24 : shippingMode === 'sea_lcl' ? 0.09 : 0.055;
  const cifUsd = fobUsd * (1 + freightMultiplier);
  const customsDutyUsd = cifUsd * activeCategoryObj.dutyRate;
  const igstUsd = (cifUsd + customsDutyUsd) * 0.18;
  const clearanceAndLocalUsd = 145;
  const totalLandedUsd = Math.round(cifUsd + customsDutyUsd + igstUsd + clearanceAndLocalUsd);
  const totalLandedInr = Math.round(totalLandedUsd * exchangeRate);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'What we import', href: '#what-we-import' },
    { label: 'China trips', href: '#china-trips' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openQuoteWithPreset = (productText = '') => {
    setQuoteInitialProduct(productText);
    setQuoteModalOpen(true);
  };

  return (
    <div id="home" className="min-h-screen bg-[#F9FAFB] text-[#111111] font-sans antialiased selection:bg-[#E1251B] selection:text-white">
      {/* Subtle CSS Keyframes for Continuous Corridor Marquee */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-corridor {
          display: flex;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .animate-corridor:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =====================================================================
          1. STICKY HEADER & FLOATING CARD MOBILE MENU
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#F9FAFB]/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <BrandLogo onClick={() => scrollToSection('#home')} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-gray-700 hover:text-[#111111] transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openQuoteWithPreset('')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black/85 text-white text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white border border-gray-200/90 shadow-xs flex items-center justify-center text-[#111111] hover:bg-gray-50 transition cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Floating White Card Drawer (Replicating Reference Screenshot 2) */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-16 bg-black/15 backdrop-blur-[1px] md:hidden z-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="md:hidden fixed left-4 right-4 top-[72px] z-40 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
              <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left py-3 px-3 rounded-xl text-base font-semibold text-[#111111] hover:bg-gray-50 active:bg-gray-100 transition flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteWithPreset('');
                  }}
                  className="w-full py-3.5 px-5 rounded-full bg-[#111111] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Get a free sourcing quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* =====================================================================
          2. HERO SECTION (#home)
         ===================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16">
        {/* Subtle Ambient Globe Halo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-b from-blue-100/60 via-slate-100/30 to-transparent blur-2xl"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left / Main Column */}
            <div className="lg:col-span-7">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-full px-3.5 py-1.5 shadow-2xs mb-6">
                <ChinaFlag />
                <span className="text-gray-400 text-xs font-bold">→</span>
                <IndiaFlag />
                <span className="text-xs font-semibold text-gray-800">
                  Trusted by 500+ Indian businesses
                </span>
              </div>

              {/* Signature Two-Tone Headline */}
              <h1 className="text-[2.5rem] leading-[1.06] sm:text-5xl lg:text-[3.65rem] font-black tracking-tight text-[#111111]">
                Import directly from China.{' '}
                <span className="block text-[#E1251B] mt-1">
                  Without the guesswork.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.
              </p>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openQuoteWithPreset('')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#111111] hover:bg-black/85 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <span>Get a free sourcing quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('#how-it-works')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-gray-50 text-[#111111] font-bold text-sm sm:text-base border border-gray-200 shadow-2xs transition cursor-pointer"
                >
                  <span>See how it works</span>
                </button>
              </div>

              {/* 2x2 KPI Metrics Grid (Exact match to reference hierarchy) */}
              <div className="mt-10 pt-8 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
                    500+
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Businesses served
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
                    83K+
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Community on Instagram
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
                    1 pc
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                    MOQ on many products
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
                    Shanghai
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Own registered company
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live China -> India Trade Operations Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#E1251B]">
                        Direct Ground Presence
                      </div>
                      <div className="text-sm font-extrabold text-[#111111]">
                        Shanghai ↔ India Desk
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Active
                  </span>
                </div>

                {/* Live Corridor Card Breakdown */}
                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#F9FAFB] border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ChinaFlag className="w-6 h-4 rounded-[2px]" />
                      <div>
                        <div className="text-xs font-bold text-[#111111]">Shanghai & Yiwu Hubs</div>
                        <div className="text-[11px] text-gray-500">Factory audits, QC & consolidation</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-700 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                      CN-PVG
                    </span>
                  </div>
