import React from 'react';
import MotionText from './MotionText.jsx';
import {ArrowRight,ArrowUpRight,BookOpen,Check,MapPin,Plane,Hotel,Utensils,Languages,Factory,Ship,ShieldCheck,Truck,PackageCheck,Building2,Lightbulb,Car,Store,Wrench,Globe2,ChevronDown} from 'lucide-react';

const industries = [
 {hub:'FOSHAN HUB',title:'Furniture & interiors',items:['Home and villa furniture','Office desks and executive chairs','Hotel and banquet fit-outs'],note:'Project sourcing · MOQ varies',Icon:Building2},
 {hub:'SHENZHEN HUB',title:'Electronics & tech',items:['LED screens and digital signage','Mobile accessories in bulk','Power and smart-device products'],note:'Product compliance checks matter',Icon:Lightbulb},
 {hub:'GUANGZHOU HUB',title:'EV & automotive',items:['Electric mobility products and kits','Selected battery components','Car lighting and accessories'],note:'Import eligibility varies by item',Icon:Car},
 {hub:'GUZHEN HUB',title:'Lighting',items:['Decorative and architectural lights','Commercial LED fixtures','Custom project lighting'],note:'Direct sourcing from lighting makers',Icon:Lightbulb},
 {hub:'YIWU HUB',title:'Supermarket & general goods',items:['Home, kitchen, toys and gifts','Retail and store supplies','Mixed product sourcing'],note:'Small-goods wholesale market',Icon:Store},
 {hub:'PAN-CHINA',title:'Machinery & automation',items:['Production and packaging machines','Vending and automation equipment','Spares and support coordination'],note:'Tell us the machine you need',Icon:Wrench}
];
const deliveryImages=[
 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85'
];
const guideImages=[
 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=85'
];
const industryImages=[
 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85',
 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85',
 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=85',
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85'
];
const deliveries = [
 ['FOSHAN → VILLA','Complete villa furniture','Sofas, dining sets, office furniture and pergolas planned as a consolidated project shipment.','FULL CONTAINER','DOOR DELIVERY'],
 ['YIWU → ADILABAD','Sagar Supermarket','Retail and supermarket products sourced through remote product selection and delivered to the client warehouse.','RETAIL','VIDEO SOURCING'],
 ['CHINA → CONVENTION','Sreeman Convention Centre','Furniture and fixtures for a convention venue, coordinated around project requirements.','HOSPITALITY','BULK ORDER'],
 ['CHINA → HYDERABAD','Smart office desks','Motorised height-adjustable desks sourced for a small office requirement.','LOW MOQ','PROJECT ORDER']
];
const guides = [
 ['01','SOURCING PLAYBOOK','How to shortlist a China manufacturer','Compare factory capability, product specifications, samples and supplier quotations before placing an order.'],
 ['02','SHIPPING BASICS','Sea freight or air freight?','Understand the practical trade-offs between shipping speed, cargo volume, cost inputs and delivery planning.'],
 ['03','IMPORT READINESS','What to prepare before cargo leaves China','A simple checklist covering product details, quality approvals, documents and customs coordination.']
];
const faqs = [
 ['Can I import just one piece?','Some products can be sourced in very small quantities, while others require a factory minimum order. The MOQ depends on the product, supplier and shipping method.'],
 ['How long does delivery take?','Transit and total delivery time depend on the origin, destination, shipping mode, sailing schedule, customs and inland transport. We provide a shipment-specific estimate before you confirm.'],
 ['Do you handle customs and GST?','We coordinate the documentation and customs-clearance process with the relevant professionals. Duties and GST depend on the product classification and current rules.'],
 ['Do I need an Import Export Code (IEC)?','Most commercial imports into India require an IEC, subject to applicable exemptions. Confirm your specific situation with DGFT or your customs professional before ordering.'],
 ['Can I visit the factories myself?','Yes. We can discuss factory visits and business trips based on your product, preferred cities and travel dates.'],
 ['What is a good business to start by importing from China?','That depends on your budget, customer demand, competition, compliance and after-sales needs. Start with a product shortlist and validate landed cost before investing.']
];

function Tag({children}) { return <div className="concept-tag"><i/><MotionText>{children}</MotionText></div>; }
function Heading({tag,title,copy}) { return <div className="concept-heading"><Tag>{tag}</Tag><MotionText as="h2">{title}</MotionText>{copy&&<p>{copy}</p>}</div>; }

export default function HomeAfterCargo(){
 return <>
  <section className="concept-industries-section">
   <div className="container"><Heading tag="WHAT WE IMPORT" title={<>China has a market for every industry.<br/><em>We know where to look.</em></>} copy="Different products have different manufacturing hubs. We help you identify the right region, supplier questions and import considerations."/>
    <div className="concept-industry-grid">{industries.map(({hub,title,items,note,Icon})=><article key={title} className="concept-industry-card"><div className="concept-industry-image"><img src={industryImages[industries.findIndex(x=>x.title===title)]} alt={title+' manufacturing'} loading="lazy"/></div><div className="concept-industry-top"><MotionText>{hub}</MotionText><Icon size={22}/></div><MotionText as="h3">{title}</MotionText><ul>{items.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><small>{note}</small></article>)}</div>
   </div>
  </section>
  <section className="concept-china-section concept-shanghai-section" id="shanghai">
   <div className="container concept-shanghai-grid">
    <div className="concept-shanghai-copy">
     <Tag>OFFICIALLY IN CHINA</Tag>
     <MotionText as="h2">Many claim an office in China. <em>We have the licence.</em></MotionText>
     <p>ImportNow operates through its own registered company in Shanghai, <b>Shanghai Shengqiao Chain Trading Co., Ltd.</b> That means we can sign contracts with factories, pay suppliers locally and stand behind every order.</p>
     <ul className="concept-shanghai-checks">
      <li><span><Check size={16}/></span><div><b>Registered business licence</b><small>Issued in Shanghai, China</small></div></li>
      <li><span><Check size={16}/></span><div><b>Chinese company bank account</b><small>So payments to factories are safe and traceable</small></div></li>
      <li><span><Check size={16}/></span><div><b>Team on the ground</b><small>For factory visits, quality checks and market trips</small></div></li>
      <li><span><Check size={16}/></span><div><b>Indian founder on both sides</b><small>Talk to us in Telugu, Hindi or English</small></div></li>
     </ul>
    </div>
    <div className="concept-shanghai-stage">
     <div className="concept-shanghai-document">
      <div className="concept-shanghai-doc-head"><span>营业执照</span><small>BUSINESS LICENCE</small></div>
      <div className="concept-shanghai-emblem"><Globe2 size={31}/></div>
      <div className="concept-shanghai-doc-fields">
       <span>COMPANY</span><b>Shanghai Shengqiao Chain Trading Co., Ltd.</b>
       <span>LOCATION</span><b>Shanghai, People's Republic of China</b>
       <span>SCOPE</span><b>Supply chain, sourcing &amp; international trade</b>
       <span>SERVING</span><b>Importers across India</b>
      </div>
      <div className="concept-shanghai-doc-foot"><div className="concept-shanghai-qr" aria-hidden="true"><i/><i/><i/><i/></div><div className="concept-shanghai-stamp">SHANGHAI<br/>SHENGQIAO<br/>TRADING</div></div>
      <div className="concept-shanghai-disclaimer">ILLUSTRATIVE COMPANY PROFILE · NOT THE ORIGINAL GOVERNMENT-ISSUED LICENCE</div>
     </div>
     <a className="concept-shanghai-request" href="#/contact">Request original company documents <ArrowUpRight size={15}/></a>
    </div>
   </div>
  </section>
  <section className="concept-trips-section"><div className="container concept-trips-layout">
   <div className="concept-trip-art"><div className="concept-trip-sun"/><div className="concept-trip-label">CANTON FAIR · GUANGZHOU</div><div className="concept-trip-building"><span/><span/><span/><span/></div><div className="concept-trip-city">GUANGZHOU <i/> SHENZHEN <i/> YIWU <i/> FOSHAN</div></div>
   <div><Tag>BUSINESS TRIPS TO CHINA</Tag><MotionText as="h2">Your China business trip<br/><em>with the details taken care of.</em></MotionText><p>Plan visits to trade fairs, wholesale markets and shortlisted factories with practical on-ground guidance. The itinerary is shaped around your sourcing goals.</p><div className="concept-includes"><span><Check/>Visa guidance & invitation letter</span><span><Check/>Hotel planning near key markets</span><span><Check/>Food and local travel guidance</span><span><Check/>Guides and translators</span><span><Check/>Factory visits you choose</span><span><Check/>Sightseeing between market visits</span></div><div className="concept-departures"><div><small>SPRING</small><b>Canton Fair · April–May</b></div><div><small>AUTUMN</small><b>Canton Fair · October–November</b></div></div><a className="button primary" href="#/contact">Plan a China business trip <ArrowUpRight size={16}/></a></div>
  </div></section>
  <section className="concept-deliveries-section"><div className="container"><Heading tag="RECENTLY DELIVERED" title={<>Another shipment coordinated.<br/><em>Another business moving forward.</em></>} copy="Examples of sourcing and delivery requirements across different business types."/><div className="concept-delivery-grid">{deliveries.map(([route,title,copy,a,b],index)=><article className="concept-delivery-card" key={title}><div className="concept-delivery-art"><img src={deliveryImages[index]} alt={title+' delivery project'} loading="lazy"/><MotionText>{route}</MotionText><Truck size={32}/></div><div className="concept-delivery-copy"><MotionText as="h3">{title}</MotionText><p>{copy}</p><div><MotionText as="small">{a}</MotionText><MotionText as="small">{b}</MotionText></div></div></article>)}</div></div></section>
  <section className="concept-testimonials-section"><div className="container"><Heading tag="THE IMPORTNOW STANDARD" title={<>Clear checks.<br/><em>Fewer surprises.</em></>} copy="A practical shipment plan makes responsibilities visible before cargo moves. These are the checkpoints we help customers work through."/><div className="concept-quote-grid"><article><ShieldCheck/><small>01 · BEFORE YOU ORDER</small><MotionText as="h3">Make the supplier decision carefully.</MotionText><p>Review the supplier profile, product specifications, minimum order quantity, quotation and sample requirements before committing.</p></article><article><PackageCheck/><small>02 · BEFORE DISPATCH</small><MotionText as="h3">Agree what is being shipped.</MotionText><p>Confirm approved samples, inspection scope, carton count, packing details and the documents needed for export and import coordination.</p></article><article><Ship/><small>03 · BEFORE ARRIVAL</small><MotionText as="h3">Prepare the hand-off to India.</MotionText><p>Track freight milestones, organise import paperwork with the relevant professionals and plan port release and inland delivery.</p></article></div><p className="fine-print">The exact checks, service responsibilities and third-party arrangements are agreed for each shipment.</p></div></section>
  <section className="concept-guides-section"><div className="container"><div className="concept-guides-row"><div><Tag>IMPORT GUIDES</Tag><MotionText as="h2">Learn before<br/><em>you import.</em></MotionText><p>Practical guidance on product sourcing, shipping, customs and building a business around imported products.</p></div><a className="button secondary" href="https://importnow-concept.vercel.app/blog.html" target="_blank" rel="noreferrer">View all articles <ArrowUpRight size={16}/></a></div><div className="concept-guide-grid">{guides.map(([n,tag,title,copy])=><a className="concept-guide-card" key={n} href="https://importnow-concept.vercel.app/blog.html" target="_blank" rel="noreferrer"><div className="concept-guide-art"><img src={guideImages[Number(n)-1]} alt={title} loading="lazy"/><span>{n}</span><BookOpen size={28}/></div><MotionText as="small">{tag}</MotionText><MotionText as="h3">{title}</MotionText><p>{copy}</p><b>Explore guide <ArrowUpRight size={14}/></b></a>)}</div></div></section>
  <section className="concept-faq-section"><div className="container concept-faq-layout"><div><Tag>QUESTIONS</Tag><MotionText as="h2">Before you<br/><em>import.</em></MotionText><p>Have a product in mind? We can help you identify the next practical questions.</p></div><div className="concept-faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>
  <section className="concept-final-cta concept-quote-section" id="start-importing">
   <div className="concept-quote-shell">
    <div className="concept-quote-intro"><Tag>START IMPORTING</Tag><MotionText as="h2">Tell us what you want to import.<br/><em>We’ll take it from there.</em></MotionText><p>Share the product and quantity. You’ll get supplier options, landed-cost inputs and timelines to help plan your next step — free of charge.</p>
     <div className="concept-quote-contact"><a href="https://wa.me/919989724320" target="_blank" rel="noreferrer"><span>WHATSAPP / CALL</span><b>+91 99897 24320</b></a><a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noreferrer"><span>INSTAGRAM</span><b>@importnow.in</b></a><div><span>OFFICES</span><b>Hyderabad, India · Shanghai, China</b></div></div>
    </div>
    <form className="concept-quote-form" onSubmit={(event)=>{event.preventDefault();const data=new FormData(event.currentTarget);const lines=['Hello ImportNow, I would like a free sourcing quote.','Name: '+data.get('name'),'City: '+(data.get('city')||'Not provided'),'Product: '+data.get('product'),'Quantity: '+(data.get('quantity')||'Not provided'),'Budget: '+(data.get('budget')||'Not specified'),'Details: '+(data.get('details')||'Not provided')];window.open('https://wa.me/919989724320?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener,noreferrer');}}>
     <div className="concept-quote-form-head"><MotionText as="span">01 / YOUR REQUIREMENT</MotionText><b>Get a free sourcing quote</b><small>Tell us a little about what you need.</small></div>
     <div className="concept-quote-fields"><label>Your name *<input name="name" placeholder="Enter your name" required/></label><label>Your city<input name="city" placeholder="e.g. Hyderabad"/></label>
      <label className="wide">What do you want to import? *<select name="product" defaultValue="" required><option value="" disabled>Select a product category</option><option>Furniture & interiors</option><option>Electronics & tech</option><option>EV & automotive</option><option>Lighting</option><option>Supermarket & general goods</option><option>Machinery & automation</option><option>China business trip / Canton Fair</option><option>Something else</option></select></label>
      <label>Approx. quantity<input name="quantity" placeholder="e.g. 100 pieces"/></label><label>Estimated budget<select name="budget" defaultValue=""><option value="">Select a range</option><option>Under ₹1 lakh</option><option>₹1–5 lakh</option><option>₹5–25 lakh</option><option>₹25 lakh+</option><option>Not sure yet</option></select></label>
      <label className="wide">Anything else we should know?<textarea name="details" rows="3" placeholder="Product specifications, links, delivery city or questions..."/></label>
     </div><button className="button primary concept-quote-submit" type="submit">Send enquiry on WhatsApp <ArrowUpRight size={16}/></button><small className="concept-quote-note">No obligation. Your enquiry opens in WhatsApp so you can review it before sending.</small>
    </form>
   </div>
  </section>
 </>;
}
