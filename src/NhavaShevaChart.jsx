import React from 'react';
import MotionText from './MotionText.jsx';

export default function NhavaShevaChart(){
 return <section className="nhava-chart-section" aria-labelledby="nhava-chart-title">
  <div className="container nhava-chart-layout">
   <div className="nhava-chart-copy">
    <div className="nhava-chart-kicker"><i/> INDIA ARRIVAL / PORT REFERENCE</div>
    <MotionText as="h2" id="nhava-chart-title">The route meets<br/><em>the Indian coast.</em></MotionText>
    <p>Nhava Sheva is a key arrival point on the west coast of India. The chart view gives the shipment journey a real port context, from the sea approach to the terminal hand-off.</p>
    <div className="nhava-coordinate-block">
     <span>19° 02′ 25″ N</span>
     <span>73° 01′ 42″ E</span>
     <small>NHAVA SHEVA PORT · INDIA</small>
    </div>
    <div className="nhava-chart-legend"><span><i className="legend-gold"/> TERMINAL & QUAY</span><span><i className="legend-teal"/> DEPTH CONTOURS</span><span><i className="legend-route"/> APPROACH LANE</span></div>
   </div>
   <div className="nhava-chart-panel">
    <div className="nhava-chart-topline"><span><i/> WESTERN INDIA · ARABIAN SEA</span><span>PORT STUDY / 01</span></div>
    <svg className="nhava-chart-map" viewBox="0 0 1000 570" role="img" aria-labelledby="nhava-map-title nhava-map-desc">
     <title id="nhava-map-title">Illustrative nautical chart of Nhava Sheva Port</title>
     <desc id="nhava-map-desc">A stylised port diagram showing terminal blocks, quay edges, approach lanes, bathymetric contours and a vessel position. It is a visual illustration, not a navigational chart.</desc>
     <defs>
      <pattern id="nhava-grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#d4a36a" strokeOpacity=".18" strokeWidth="1"/><circle cx="0" cy="0" r="1.8" fill="#d4a36a" fillOpacity=".45"/></pattern>
      <pattern id="nhava-terminal-grid" width="30" height="22" patternUnits="userSpaceOnUse"><path d="M30 0H0V22" fill="none" stroke="#d4a36a" strokeOpacity=".5" strokeWidth="1"/></pattern>
      <linearGradient id="nhava-water" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0c2635"/><stop offset="1" stopColor="#07131f"/></linearGradient>
     </defs>
     <rect width="1000" height="570" fill="url(#nhava-water)"/>
     <rect width="1000" height="570" fill="url(#nhava-grid)"/>
     <g fill="none" stroke="#65b8b8" strokeOpacity=".36" strokeWidth="1.4">
      <path d="M-30 110C120 45 245 80 355 145S560 245 690 180 900 85 1040 140"/>
      <path d="M-30 145C120 80 245 115 355 180S560 280 690 215 900 120 1040 175"/>
      <path d="M-30 180C120 115 245 150 355 215S560 315 690 250 900 155 1040 210"/>
      <path d="M-30 430C120 365 245 400 355 465S560 565 690 500 900 405 1040 460"/>
      <path d="M-30 395C120 330 245 365 355 430S560 530 690 465 900 370 1040 425"/>
      <path d="M-30 360C120 295 245 330 355 395S560 495 690 430 900 335 1040 390"/>
     </g>
     <g fill="#d4a36a" fillOpacity=".12" stroke="#d4a36a" strokeWidth="2">
      <path d="M0 0H1000V78L918 80 870 112 800 108 744 142 675 142 625 173 556 175 514 204 438 205 392 232 318 228 278 260 216 257 175 290 112 280 78 310 0 300Z"/>
      <path d="M0 0H1000V78L918 80 870 112 800 108 744 142 675 142 625 173 556 175 514 204 438 205 392 232 318 228 278 260 216 257 175 290 112 280 78 310 0 300Z" fill="url(#nhava-terminal-grid)" stroke="none"/>
     </g>
     <g fill="none" stroke="#d4a36a" strokeWidth="3" strokeLinecap="square">
      <path d="M160 70V255M220 65V250M280 55V230M340 45V220M400 40V205M460 32V190"/>
      <path d="M145 80H485M135 135H470M120 190H440"/>
      <path d="M490 180L610 245 610 300 520 265Z"/>
      <path d="M510 205L630 270M530 225L650 290"/>
     </g>
     <g fill="#d4a36a" fillOpacity=".12" stroke="#d4a36a" strokeOpacity=".8" strokeWidth="1.4">
      <rect x="90" y="95" width="68" height="38"/><rect x="165" y="95" width="48" height="38"/><rect x="220" y="95" width="62" height="38"/>
      <rect x="295" y="95" width="58" height="38"/><rect x="360" y="95" width="68" height="38"/><rect x="435" y="95" width="45" height="38"/>
      <rect x="82" y="148" width="72" height="35"/><rect x="162" y="148" width="55" height="35"/><rect x="225" y="148" width="75" height="35"/>
      <rect x="308" y="148" width="65" height="35"/><rect x="380" y="148" width="72" height="35"/>
     </g>
     <g stroke="#e8b978" strokeWidth="2" fill="none">
      <path d="M90 278L500 278 560 322 720 322"/><path d="M90 290L490 290 548 334 720 334"/>
      <path d="M95 278V300M170 278V300M245 278V300M320 278V300M395 278V300"/>
     </g>
     <g fill="none" stroke="#e7b36b" strokeWidth="2.5" strokeDasharray="8 9">
      <path d="M950 475C825 445 795 390 710 372S590 340 510 340 380 330 285 300"/>
     </g>
     <g transform="translate(730 380) rotate(-18)">
      <path d="M-48-13H36L53 0 34 15H-42L-55 0Z" fill="#d7a66a" fillOpacity=".2" stroke="#f0c27d" strokeWidth="2"/>
      <path d="M-20-13V-29H12V-13M-8-29V-38H5V-29" stroke="#f0c27d" strokeWidth="2" fill="none"/>
      <path d="M-40 0H42" stroke="#f0c27d" strokeWidth="1"/>
     </g>
     <g fill="#e7bd7c" fontFamily="DM Mono,monospace" fontSize="13" letterSpacing="2">
      <text x="105" y="55">TERMINAL ZONE</text><text x="655" y="95">HARBOUR EDGE</text>
      <text x="745" y="350">VESSEL / APPROACH</text><text x="770" y="525">ARABIAN SEA</text>
      <text x="78" y="350">QUAY LINE</text>
     </g>
     <g stroke="#d4a36a" strokeWidth="1.5" fill="none"><path d="M905 70V125M895 85L905 70 915 85"/><circle cx="905" cy="70" r="20"/></g>
     <text x="905" y="145" fill="#d4a36a" fontFamily="DM Mono,monospace" fontSize="12" textAnchor="middle">N</text>
     <g fill="#70c4c1" fontFamily="DM Mono,monospace" fontSize="11"><text x="610" y="470">12 m</text><text x="530" y="420">15 m</text><text x="420" y="480">18 m</text></g>
    </svg>
    <div className="nhava-chart-bottomline"><span>19° 02′ 25″ N / 73° 01′ 42″ E</span><span>SCHEMATIC VISUAL · NOT FOR NAVIGATION</span></div>
   </div>
  </div>
 </section>;
}
