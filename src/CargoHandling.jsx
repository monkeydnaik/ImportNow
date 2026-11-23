import React,{useEffect,useRef,useState} from 'react';

export default function CargoHandling(){
 const terminalRef=useRef(null);
 const shipRef=useRef(null);
 const destinationRef=useRef(null);
 const [phase,setPhase]=useState('ready');
 const [dragging,setDragging]=useState(false);
 const [dragPoint,setDragPoint]=useState(null);
 const [notice,setNotice]=useState('Drag the container from the China dock onto the ship.');
 const [isTouch,setIsTouch]=useState(false);

 useEffect(()=>{
  if(phase!=='sailing') return;
  const timer=window.setTimeout(()=>{setPhase('arrived');setNotice('Ship arrived in India. Drag the container to the India port to unload.');},2600);
  return ()=>window.clearTimeout(timer);
 },[phase]);

 const pointFromEvent=(event)=>{
  const rect=terminalRef.current?.getBoundingClientRect();
  if(!rect)return null;
  return {x:event.clientX-rect.left,y:event.clientY-rect.top};
 };
 const beginDrag=(event)=>{
  if(phase!=='ready'&&phase!=='arrived')return;
  if(phase==='ready'&&event.currentTarget.dataset.cargo!=='dock')return;
  if(phase==='arrived'&&event.currentTarget.dataset.cargo!=='ship')return;
  event.preventDefault();
  event.currentTarget.setPointerCapture?.(event.pointerId);
  setIsTouch(event.pointerType==='touch');
  setDragPoint(pointFromEvent(event));
  setDragging(true);
 };
 const moveDrag=(event)=>{if(dragging)setDragPoint(pointFromEvent(event));};
 const finishDrag=(event)=>{
  if(!dragging)return;
  const target=phase==='ready'?shipRef.current:destinationRef.current;
  const rect=target?.getBoundingClientRect();
  const hit=rect&&event.clientX>=rect.left-18&&event.clientX<=rect.right+18&&event.clientY>=rect.top-18&&event.clientY<=rect.bottom+18;
  setDragging(false);setDragPoint(null);
  if(!hit){setNotice(phase==='ready'?'Drop the container on the highlighted ship deck.':'Drop the container inside the highlighted India port.');return;}
  if(phase==='ready'){setPhase('loaded');setNotice('Container secured. The ship is leaving China for India…');window.setTimeout(()=>setPhase(current=>current==='loaded'?'sailing':current),450);}
  else{setPhase('unloaded');setNotice('Cargo unloaded successfully at the India destination port.');}
 };
 const reset=()=>{setPhase('ready');setDragging(false);setDragPoint(null);setNotice('Drag the container from the China dock onto the ship.');};
 const cargoStyle=dragging&&dragPoint?{left:dragPoint.x,top:dragPoint.y}:undefined;
 const phaseLabel={ready:'READY TO LOAD',loaded:'CARGO SECURED',sailing:'AT SEA · IN TRANSIT',arrived:'ARRIVED IN INDIA',unloaded:'DELIVERY COMPLETE'}[phase];
 return <section className="cargo-ops container" aria-labelledby="cargo-ops-title">
  <div className="cargo-ops-heading">
   <div><div className="eyebrow"><i/> INTERACTIVE PORT OPERATIONS</div><h2 id="cargo-ops-title">Your cargo journey.<br/><em>Take it from port to port.</em></h2></div>
   <p>Drag the container to load the vessel. Once it reaches India, drag it again to unload and complete the journey.</p>
  </div>
  <div ref={terminalRef} className={`cargo-terminal cargo-phase-${phase}`} onPointerMove={moveDrag} onPointerUp={finishDrag} onPointerCancel={finishDrag}>
   <div className="terminal-sky"><span className="terminal-sun"/><span className="terminal-cloud cloud-a"/><span className="terminal-cloud cloud-b"/></div>
   <div className="terminal-crane"><div className="crane-tower"/><div className="crane-top"/><div className="crane-arm"/><div className="crane-cabin"/><div className="crane-cable"/><div className="crane-spreader"/></div>
   <div className="terminal-quay terminal-origin"><span className="quay-mark">CHINA · SHENZHEN PORT</span><i/><i/><i/></div>
   <div className="terminal-quay terminal-destination"><span className="quay-mark">INDIA · NHAVA SHEVA</span><i/><i/><i/></div>
   <div className="terminal-ship" ref={shipRef}><div className="ship-bridge"/><div className="ship-deck"><i/><i/><i/><i/><i/><i/></div><div className="ship-hull"/></div>
   <div className="terminal-water"><span/><span/><span/></div>
   <div className="ship-drop-zone" aria-label="Ship loading target"><span>SHIP DECK</span></div>
   <div className="destination-drop-zone" ref={destinationRef} aria-label="India unloading target"><span>INDIA PORT</span></div>
   {(phase==='ready'||phase==='arrived')&&<div className={`draggable-container ${dragging?'is-dragging':''} ${phase==='arrived'?'on-ship':''}`} data-cargo={phase==='ready'?'dock':'ship'} style={cargoStyle} onPointerDown={beginDrag} role="button" tabIndex={0} aria-label="Drag cargo container" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(phase==='ready'){setPhase('loaded');setNotice('Container secured. The ship is leaving China for India…');window.setTimeout(()=>setPhase(v=>v==='loaded'?'sailing':v),450)}else{setPhase('unloaded');setNotice('Cargo unloaded successfully at the India destination port.')}}}}><span className="cargo-grip">⠿</span><b>BOX 01</b><small>{phase==='ready'?'DRAG TO SHIP':'DRAG TO PORT'}</small></div>}
   <div className="terminal-status"><b><i/> {phaseLabel}</b><span>CHINA → INDIA</span></div>
   <div className="cargo-instruction" aria-live="polite">{notice}</div>
   {phase==='unloaded'&&<div className="cargo-complete"><b>JOURNEY COMPLETE</b><span>Container unloaded at destination</span><button type="button" onClick={reset}>Replay journey ↻</button></div>}
  </div>
  <div className="cargo-ops-steps"><div className={phase==='ready'?'is-active':''}><b>01</b><span>LOAD</span><small>Drag cargo onto the vessel</small></div><div className={phase==='sailing'||phase==='loaded'?'is-active':''}><b>02</b><span>SAIL</span><small>Ship travels to India</small></div><div className={phase==='arrived'||phase==='unloaded'?'is-active':''}><b>03</b><span>UNLOAD</span><small>Drag cargo to the destination</small></div></div>
  <div className="cargo-route-summary">
   <div><span>STARTING LOCATION</span><b>Shenzhen Port, China</b><small>Origin · China</small></div>
   <div className="route-summary-line"><i/> <span>SEA FREIGHT</span> <i/></div>
   <div><span>ENDING LOCATION</span><b>Nhava Sheva Port, India</b><small>Destination · India</small></div>
   <div className="cargo-eta"><span>ESTIMATED TRANSIT</span><b>12–16 days</b><small>Illustrative estimate; actual transit varies.</small></div>
  </div>
 </section>;
}
