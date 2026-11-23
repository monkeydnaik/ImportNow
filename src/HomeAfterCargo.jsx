import React from 'react';
import {ArrowRight,ArrowUpRight,BookOpen,Check,MapPin,Plane,Hotel,Utensils,Languages,Factory,Ship,ShieldCheck,Truck,PackageCheck,Building2,Lightbulb,Car,Store,Wrench,Globe2,Quote,ChevronDown} from 'lucide-react';

const journey = [
 ['01','Product sourcing','We find manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, then compare options and negotiate on your behalf.'],
 ['02','Factory inspection','Our China-side team can visit the factory to review business credentials, samples and production capability.'],
 ['03','Quality control','Arrange pre-shipment checks with photo and video updates before cargo is sealed.'],
 ['04','Shipping & logistics','Coordinate full-container and shared-container sea freight, plus air cargo options for urgent orders.'],
 ['05','Customs coordination','Prepare import documents and coordinate duties, GST and clearance with the relevant customs professionals.'],
 ['06','Doorstep delivery','Plan the final movement from the Indian port to your shop, warehouse, villa or project site.']
];
const process = [
 ['01','Source the right factory','Share the product and specifications. We shortlist manufacturers and request clear quotations.'],
 ['02','Inspect & approve samples','Review samples and supplier details before confirming production. Factory visits can be arranged where suitable.'],
 ['03','Quality check & loading','Agree on inspection points, count cartons and coordinate container loading.'],
 ['04','Ocean freight','Your cargo sails to India. We share shipment milestones and status updates.'],
 ['05','Customs clearance','Coordinate documents, duties and GST with the customs broker for the shipment.'],
 ['06','Delivered to your door','Arrange port release, inland transport and delivery to your business address.']
];
const industries = [
 {hub:'FOSHAN HUB',title:'Furniture & interiors',items:['Home and villa furniture','Office desks and executive chairs','Hotel and banquet fit-outs'],note:'Project sourcing · MOQ varies',Icon:Building2},
 {hub:'SHENZHEN HUB',title:'Electronics & tech',items:['LED screens and digital signage','Mobile accessories in bulk','Power and smart-device products'],note:'Product compliance checks matter',Icon:Lightbulb},
 {hub:'GUANGZHOU HUB',title:'EV & automotive',items:['Electric mobility products and kits','Selected battery components','Car lighting and accessories'],note:'Import eligibility varies by item',Icon:Car},
 {hub:'GUZHEN HUB',title:'Lighting',items:['Decorative and architectural lights','Commercial LED fixtures','Custom project lighting'],note:'Direct sourcing from lighting makers',Icon:Lightbulb},
 {hub:'YIWU HUB',title:'Supermarket & general goods',items:['Home, kitchen, toys and gifts','Retail and store supplies','Mixed product sourcing'],note:'Small-goods wholesale market',Icon:Store},
 {hub:'PAN-CHINA',title:'Machinery & automation',items:['Production and packaging machines','Vending and automation equipment','Spares and support coordination'],note:'Tell us the machine you need',Icon:Wrench}
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

function Tag({children}) { return <div className="concept-tag"><i/>{children}</div>; }
function Heading({tag,title,copy}) { return <div className="concept-heading"><Tag>{tag}</Tag><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>; }

export default function HomeAfterCargo(){
 return <>
  <section className="concept-process-section">
   <div className="container">
    <div className="concept-intro-row"><Heading tag="HOW IT WORKS" title={<>One team from the factory floor<br/><em>to your front door.</em></>} copy="A smooth import needs clear communication, sensible checks and a shipment plan that everyone understands."/></div>
    <div className="concept-service-grid">{journey.map(([n,title,copy])=><article className="concept-service-card" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><div className="concept-card-rule"/></article>)}</div>
   </div>
  </section>
  <section className="concept-how-section">
   <div className="container">
    <div className="concept-how-top"><div><Tag>YOUR SHIPMENT, STEP BY STEP</Tag><h2>Watch your order travel<br/><em>from China to India.</em></h2><p>From the first supplier conversation to delivery at your business, every stage has a clear next step.</p></div><div className="concept-route-card"><div><small>ORIGIN</small><b>Shanghai / China</b></div><span className="concept-route-track"><i/></span><div><small>DESTINATION</small><b>Chennai / India</b></div><strong>DAY 34 <small>ILLUSTRATIVE SHIPMENT MILESTONE</small></strong></div></div>
    <div className="concept-timeline">{process.map(([n,title,copy])=><article key={n}><b>{n}</b><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
   </div>
  </section>
  <section className="concept-industries-section">
   <div className="container"><Heading tag="WHAT WE IMPORT" title={<>China has a market for every industry.<br/><em>We know where to look.</em></>} copy="Different products have different manufacturing hubs. We help you identify the right region, supplier questions and import considerations."/>
    <div className="concept-industry-grid">{industries.map(({hub,title,items,note,Icon})=><article key={title} className="concept-industry-card"><div className="concept-industry-top"><span>{hub}</span><Icon size={22}/></div><h3>{title}</h3><ul>{items.map(x=><li key={x}><Check size={14}/>{x}</li>)}</ul><small>{note}</small></article>)}</div>
   </div>
  </section>
  <section className="concept-china-section"><div className="container concept-china-layout">
   <div><Tag>OFFICIALLY IN CHINA</Tag><h2>Local presence.<br/><em>Closer to the source.</em></h2><p>ImportNow operates through its China-side company, Shanghai Shengqiao Chain Trading Co., Ltd., to coordinate supplier conversations, factory visits and quality checks. Confirm the contracting entity and payment arrangements for your specific order before proceeding.</p><ul className="concept-check-list"><li><Check/>Supplier and factory coordination on the ground</li><li><Check/>Local communication for sourcing and inspections</li><li><Check/>Support for factory visits and market trips</li><li><Check/>Speak with our team in Telugu, Hindi or English</li></ul></div>
   <div className="concept-license-card"><div className="concept-license-seal"><Globe2 size={28}/></div><small>CHINA OPERATIONS · COMPANY PROFILE</small><h3>SHANGHAI<br/>SHENGQIAO<br/>TRADING</h3><div className="concept-license-line"/><span>COMPANY NAME</span><b>Shanghai Shengqiao Chain Trading Co., Ltd.</b><span>LOCATION</span><b>Shanghai, China</b><span>BUSINESS FOCUS</span><b>Sourcing · Supplier coordination · Trade support</b><span>DOCUMENT VERIFICATION</span><b>Company registration details can be requested from our team.</b><em>THIS PROFILE IS NOT A BUSINESS LICENCE OR CERTIFICATE</em><a className="button secondary" href="#/contact">Request company documents <ArrowUpRight size={15}/></a></div>
  </div></section>
  <section className="concept-trips-section"><div className="container concept-trips-layout">
   <div className="concept-trip-art"><div className="concept-trip-sun"/><div className="concept-trip-label">CANTON FAIR · GUANGZHOU</div><div className="concept-trip-building"><span/><span/><span/><span/></div><div className="concept-trip-city">GUANGZHOU <i/> SHENZHEN <i/> YIWU <i/> FOSHAN</div></div>
   <div><Tag>BUSINESS TRIPS TO CHINA</Tag><h2>Your China business trip<br/><em>with the details taken care of.</em></h2><p>Plan visits to trade fairs, wholesale markets and shortlisted factories with practical on-ground guidance. The itinerary is shaped around your sourcing goals.</p><div className="concept-includes"><span><Check/>Visa guidance & invitation letter</span><span><Check/>Hotel planning near key markets</span><span><Check/>Food and local travel guidance</span><span><Check/>Guides and translators</span><span><Check/>Factory visits you choose</span><span><Check/>Sightseeing between market visits</span></div><div className="concept-departures"><div><small>SPRING</small><b>Canton Fair · April–May</b></div><div><small>AUTUMN</small><b>Canton Fair · October–November</b></div></div><a className="button primary" href="#/contact">Plan a China business trip <ArrowUpRight size={16}/></a></div>
  </div></section>
  <section className="concept-deliveries-section"><div className="container"><Heading tag="RECENTLY DELIVERED" title={<>Another shipment coordinated.<br/><em>Another business moving forward.</em></>} copy="Examples of sourcing and delivery requirements across different business types."/><div className="concept-delivery-grid">{deliveries.map(([route,title,copy,a,b])=><article className="concept-delivery-card" key={title}><div className="concept-delivery-art"><span>{route}</span><div className="concept-delivery-boxes"><i/><i/><i/><i/></div><Truck size={32}/></div><div className="concept-delivery-copy"><h3>{title}</h3><p>{copy}</p><div><small>{a}</small><small>{b}</small></div></div></article>)}</div></div></section>
  <section className="concept-testimonials-section"><div className="container"><Heading tag="CLIENT STORIES" title={<>Real sourcing goals.<br/><em>Real conversations.</em></>} copy="Every import is different. Here are examples of the kind of support clients value."/><div className="concept-quote-grid"><article><Quote/><p>“The market visits helped us understand product options and compare suppliers in person. Having local guidance made the trip easier to plan.”</p><b>Business trip client</b><small>China market visit</small></article><article><Quote/><p>“We selected products remotely, reviewed details before confirming and coordinated delivery to our warehouse.”</p><b>Retail sourcing client</b><small>Yiwu · Retail</small></article><article><Quote/><p>“The sourcing and shipment steps were explained clearly, so we knew what approvals were needed before moving ahead.”</p><b>Project import client</b><small>Furniture · Hospitality</small></article></div></div></section>
  <section className="concept-guides-section"><div className="container"><div className="concept-guides-row"><div><Tag>IMPORT GUIDES</Tag><h2>Learn before<br/><em>you import.</em></h2><p>Practical guidance on product sourcing, shipping, customs and building a business around imported products.</p></div><a className="button secondary" href="https://importnow-concept.vercel.app/blog.html" target="_blank" rel="noreferrer">View all articles <ArrowUpRight size={16}/></a></div><div className="concept-guide-grid">{guides.map(([n,tag,title,copy])=><a className="concept-guide-card" key={n} href="https://importnow-concept.vercel.app/blog.html" target="_blank" rel="noreferrer"><div className="concept-guide-art"><span>{n}</span><BookOpen size={28}/><i/></div><small>{tag}</small><h3>{title}</h3><p>{copy}</p><b>Explore guide <ArrowUpRight size={14}/></b></a>)}</div></div></section>
  <section className="concept-faq-section"><div className="container concept-faq-layout"><div><Tag>QUESTIONS</Tag><h2>Before you<br/><em>import.</em></h2><p>Have a product in mind? We can help you identify the next practical questions.</p></div><div className="concept-faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>
  <section className="concept-final-cta"><Tag>START IMPORTING</Tag><h2>Tell us what you want to import.<br/><em>We’ll help plan the next step.</em></h2><p>Share the product, quantity and destination. We’ll help you understand supplier options, cost inputs and likely timelines before you commit.</p><a className="button primary" href="#/contact">Start your import enquiry <ArrowUpRight size={16}/></a></section>
 </>;
}
