import React,{useEffect,useRef} from 'react';
import {mountVoyageScene} from './voyageScene.js';

const journeySteps=[
 ['Source the right factory','Share the product and specifications. The China team shortlists manufacturers and coordinates quotations.'],
 ['Inspect and approve samples','Review samples and factory checks before production moves ahead.'],
 ['Quality check and loading','Cartons are checked, counted and prepared before the port cranes lift containers aboard.'],
 ['Ocean freight','The vessel sails from Shanghai across the open sea towards India.'],
 ['Customs and port release','The vessel reaches India, containers are discharged and import clearance is coordinated.'],
 ['Delivered to your door','A road truck carries the released cargo from the terminal to the delivery destination.']
];
const milestoneDays=[1,5,12,18,22,28,32,35];

export default function CargoHandling(){
 const sectionRef=useRef(null),canvasRef=useRef(null),fillRef=useRef(null),boatRef=useRef(null),dayRef=useRef(null),loadingRef=useRef(null);
 useEffect(()=>{
  if(!sectionRef.current||!canvasRef.current)return;
  const root=sectionRef.current;
  const steps=[...root.querySelectorAll('.j-step')];
  const milestones=[...root.querySelectorAll('.j-ms')];
  return mountVoyageScene({
   section:root,canvas:canvasRef.current,steps,milestones,
   fill:fillRef.current,boat:boatRef.current,dayEl:dayRef.current,loadingEl:loadingRef.current
  });
 },[]);
 return <section className="cargo-journey" id="journey" ref={sectionRef} aria-labelledby="cargo-journey-title">
  <div className="cargo-journey-sticky">
   <canvas ref={canvasRef} className="cargo-sea" aria-hidden="true"/>
   <div className="cargo-sea-loading" ref={loadingRef}>BUILDING THE PORT ENVIRONMENT…</div>
   <div className="cargo-sea-shade"/>
   <div className="cargo-sea-badge"><i/> ILLUSTRATIVE SHIPMENT VIEW <span>NOT LIVE TRACKING</span></div>
   <div className="cargo-journey-ui">
    <div className="container cargo-journey-wrap">
     <div className="cargo-journey-head">
      <div className="eyebrow"><i/> FROM FACTORY FLOOR TO FRONT DOOR</div>
      <h2 id="cargo-journey-title">Watch your order travel<br/><em>from China to India.</em></h2>
      <p>A detailed port-to-port simulation, driven by your scroll. Follow the ship, container handling and delivery sequence across an illustrative 35-day journey.</p>
     </div>
     <ol className="j-steps">
      {journeySteps.map(([title,copy],i)=><li className={'j-step'+(i===0?' on':'')} key={title}>
       <span className="n">{i+1}</span><div><h4>{title}</h4><p>{copy}</p></div>
      </li>)}
     </ol>
     <div className="j-milestones" aria-label="Shipment milestones">
      {milestoneDays.map((day,i)=><span className={'j-ms'+(i===0?' on':'')} key={day}>D{day} · {['Supplier confirmed','Production started','Quality inspection','Cargo ready','Departed Shanghai','In transit','Arrived in India','Delivered'][i]}</span>)}
     </div>
     <div className="j-route">
      <div className="j-port"><span className="cargo-flag">🇨🇳</span><div><span className="pname">Shanghai</span><small>Origin port · China</small></div></div>
      <div className="j-track"><div className="j-fill" ref={fillRef}/><div className="j-boat" ref={boatRef}>🚢</div></div>
      <div className="j-port"><div className="j-destination"><span className="pname">Hyderabad</span><small>Delivery · India</small></div><span className="cargo-flag">🇮🇳</span></div>
      <div className="j-day" ref={dayRef}>Day 1</div>
     </div>
     <div className="cargo-journey-footnote">SIMULATION · 35 DAYS · SHANGHAI → INDIA · ACTUAL TRANSIT TIMES VARY</div>
    </div>
   </div>
  </div>
 </section>;
}
