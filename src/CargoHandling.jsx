import React,{useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {ContactShadows} from '@react-three/drei';
import * as THREE from 'three';

const steel=(color,metalness=.35,roughness=.55)=><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/>;

function Container({position=[0,0,0],color='#d8894d',scale=1}){
 return <group position={position} scale={scale}>
  <mesh castShadow receiveShadow><boxGeometry args={[.78,.48,.56]}/>{steel(color,.38,.62)}</mesh>
  {Array.from({length:11},(_,i)=><mesh key={i} position={[-.36+i*.072,0,.283]}><boxGeometry args={[.014,.42,.012]}/>{steel('#d5d9d5',.35,.6)}</mesh>)}
  <mesh position={[0,.19,.288]}><boxGeometry args={[.7,.018,.012]}/>{steel('#f0d5aa',.3,.55)}</mesh>
  {[-.32,.32].map(x=><mesh key={x} position={[x,.247,.22]}><boxGeometry args={[.07,.025,.07]}/>{steel('#293b46',.55,.4)}</mesh>)}
 </group>;
}

function Hull(){
 const geometry=useMemo(()=>{
  // Longitudinal stations: stern is left, flared bow is right.
  const sections=[[-4.25,.12,.42],[-3.8,.72,.82],[-3.1,1.03,1.02],[-1.8,1.08,1.08],[1.8,1.08,1.08],[3.0,.96,.98],[3.7,.62,.78],[4.12,.06,.38]];
  const p=[],idx=[];
  sections.forEach(([x,w,top])=>p.push(x,.24,-w,x,.24,w,x,-.38,-w*.48,x,-.38,w*.48,x,.24,-top,x,.24,top));
  for(let i=0;i<sections.length-1;i++){
   const a=i*6,b=(i+1)*6;
   // port and starboard sides, bottom and upper flare
   idx.push(a,a+1,b+1,a,b+1,b,a+2,b+2,b+3,a+2,b+3,a+3,a,a+4,b+4,a,b+4,b,a+1,b+1,b+5,a+1,b+5,a+5);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g;
 },[]);
 return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color="#17384d" metalness={.62} roughness={.34} side={THREE.DoubleSide}/></mesh>;
}

function Ship(){
 const deckContainers=useMemo(()=>Array.from({length:24},(_,i)=>({x:-2.55+(i%6)*.98,z:Math.floor(i/6)%2?-.48:.48,y:.58+Math.floor(i/12)*.51,color:['#d66d4e','#d8a45d','#347d92','#e0bd7b','#668d9c','#bd594d'][(i*5+Math.floor(i/6))%6]})),[]);
 return <group>
  <Hull/>
  <mesh position={[-.05,.22,0]} castShadow><boxGeometry args={[7.7,.12,1.95]}/>{steel('#344e5c',.48,.5)}</mesh>
  {/* bow foredeck and stern working deck */}
  <mesh position={[3.2,.42,0]}><boxGeometry args={[1.1,.16,1.15]}/>{steel('#243f50',.5,.45)}</mesh>
  {deckContainers.map((c,i)=><Container key={i} position={[c.x,c.y,c.z]} color={c.color}/>)}
  {/* stern bridge / accommodation block */}
  <group position={[-3.42,.48,0]}>
   <mesh position={[0,.45,0]} castShadow><boxGeometry args={[.78,.92,1.08]}/>{steel('#e5e4d9',.12,.72)}</mesh>
   <mesh position={[0,1.02,0]}><boxGeometry args={[.72,.25,1.0]}/>{steel('#d8e0df',.18,.48)}</mesh>
   <mesh position={[0,1.17,0]}><boxGeometry args={[.62,.18,.86]}/>{steel('#6ea6b8',.35,.28)}</mesh>
   {[-.29,0,.29].map((x,i)=><mesh key={i} position={[x,1.17,.445]}><boxGeometry args={[.17,.1,.025]}/><meshBasicMaterial color="#bce7f0"/></mesh>)}
   <mesh position={[0,1.42,0]}><cylinderGeometry args={[.025,.025,.34,8]}/>{steel('#e8ece8',.3,.4)}</mesh>
   <mesh position={[0,1.61,0]}><boxGeometry args={[.22,.05,.22]}/>{steel('#e8ece8',.3,.4)}</mesh>
   <mesh position={[.22,.15,0]}><boxGeometry args={[.08,.25,.08]}/>{steel('#c95e48',.35,.5)}</mesh>
  </group>
  {/* bow anchor gear and deck fittings */}
  <group position={[3.55,.48,0]}>
   <mesh position={[0,.1,0]}><cylinderGeometry args={[.07,.07,.18,12]}/>{steel('#9aa7a8',.7,.35)}</mesh>
   {[-.22,.22].map(z=><mesh key={z} position={[-.15,.04,z]}><boxGeometry args={[.24,.12,.08]}/>{steel('#a9b5b5',.7,.35)}</mesh>)}
  </group>
  {/* side portholes */}
  {Array.from({length:14},(_,i)=><mesh key={i} position={[-3.1+i*.47,.02,1.045]}><circleGeometry args={[.035,12]}/><meshBasicMaterial color="#e8c98b"/></mesh>)}
  {/* bow bulb / waterline stripe */}
  <mesh position={[3.65,-.22,0]}><sphereGeometry args={[.25,16,10]}/>{steel('#b44f42',.35,.45)}</mesh>
  <mesh position={[0,-.2,0]}><boxGeometry args={[6.7,.035,1.6]}/><meshBasicMaterial color="#bd5146"/></mesh>
 </group>;
}

function GantryCrane({x=0,accent='#d99d53',hookRef,trolleyRef}){
 return <group position={[x,0,0]}>
  {[-1.08,1.08].map(z=><group key={z} position={[0,0,z]}>
   <mesh position={[-.25,2.15,0]} castShadow><boxGeometry args={[.22,4.2,.25]}/>{steel(accent,.52,.42)}</mesh>
   <mesh position={[-.25,.14,0]}><boxGeometry args={[.9,.28,.82]}/>{steel('#485f6b',.55,.48)}</mesh>
  </group>)}
  <mesh position={[-.25,4.2,0]} castShadow><boxGeometry args={[.28,.24,2.5]}/>{steel(accent,.55,.4)}</mesh>
  <mesh position={[.92,4.2,0]}><boxGeometry args={[2.35,.2,.24]}/>{steel('#b77c40',.55,.42)}</mesh>
  <mesh position={[-1.45,4.2,0]}><boxGeometry args={[1.35,.18,.2]}/>{steel(accent,.5,.45)}</mesh>
  <group ref={trolleyRef} position={[.65,3.98,0]}>
   <mesh castShadow><boxGeometry args={[.72,.32,.74]}/>{steel('#344e5d',.65,.4)}</mesh>
   <group ref={hookRef} position={[0,-.16,0]}>
    <mesh position={[0,-.7,0]}><cylinderGeometry args={[.014,.014,1.4,8]}/>{steel('#dce5e8',.8,.3)}</mesh>
    <mesh position={[0,-1.42,0]}><boxGeometry args={[.98,.07,.72]}/>{steel('#eab96c',.65,.35)}</mesh>
    {[-.39,.39].map(z=><mesh key={z} position={[0,-1.48,z]}><torusGeometry args={[.08,.018,8,14]}/>{steel('#e1e9e9',.8,.3)}</mesh>)}
   </group>
  </group>
 </group>;
}

function Ocean({shipRef}){
 const water=useRef(),wake=useRef();
 const geo=useMemo(()=>{
  const g=new THREE.PlaneGeometry(34,17,100,52);g.rotateX(-Math.PI/2);return g;
 },[]);
 useFrame(({clock})=>{
  const t=clock.elapsedTime, pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);pos.setY(i,Math.sin(x*.7+t*1.2)*.035+Math.cos(z*.9+t*.8)*.025);}
  pos.needsUpdate=true;geo.computeVertexNormals();
  if(wake.current&&shipRef.current){wake.current.position.x=shipRef.current.position.x-4.15;wake.current.position.z=.03;wake.current.rotation.y=Math.PI/2;}
 });
 return <group>
  <mesh ref={water} geometry={geo} receiveShadow><meshStandardMaterial color="#0b526b" metalness={.34} roughness={.27} side={THREE.DoubleSide}/></mesh>
  <group ref={wake}>
   {[0,1,2,3].map(i=><mesh key={i} position={[-i*.34,.015,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.16+i*.12,.2+i*.12,32]}/><meshBasicMaterial color="#d7edf0" transparent opacity={.2-i*.035} side={THREE.DoubleSide}/></mesh>)}
  </group>
  {Array.from({length:55},(_,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[-15+(i%11)*3,.025,-7+Math.floor(i/11)*3.4]}><planeGeometry args={[1.1,.018]}/><meshBasicMaterial color="#82d5e3" transparent opacity={.14}/></mesh>)}
 </group>;
}

function PortScene(){
 const ship=useRef(),loadHook=useRef(),unloadHook=useRef(),loadTrolley=useRef(),unloadTrolley=useRef(),lifted=useRef(),delivered=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()%48;
  const ease=v=>{v=THREE.MathUtils.clamp(v,0,1);return v*v*(3-2*v);};
  // Ship waits at China berth, departs after loading, crosses sea, then berths in India.
  const sailing=ease((t-15)/19);
  if(ship.current){ship.current.position.set(THREE.MathUtils.lerp(-5.1,5.0,sailing),.06+Math.sin(clock.elapsedTime*1.15)*.025,0);ship.current.rotation.z=Math.sin(clock.elapsedTime*.7)*.004;}
  const loadY=t<4?THREE.MathUtils.lerp(-.18,-2.1,t/4):t<8?THREE.MathUtils.lerp(-2.1,-.18,(t-4)/4):-.18;
  if(loadHook.current)loadHook.current.position.y=loadY;
  if(loadTrolley.current)loadTrolley.current.position.x=t<4?-.55:t<8?THREE.MathUtils.lerp(-.55,.42,(t-4)/4):.42;
  if(lifted.current){
   if(t<4)lifted.current.position.set(-4.05,Math.max(.55,2.45+loadY),0);
   else if(t<8)lifted.current.position.set(THREE.MathUtils.lerp(-4.05,-3.1,(t-4)/4),2.45+loadY,0);
   else if(t<15)lifted.current.position.set(-3.1,THREE.MathUtils.lerp(2.27,1.18,(t-8)/7),0);
   else lifted.current.position.set(-40,-40,0);
  }
  const unloadY=t<39?-.18:t<43?THREE.MathUtils.lerp(-.18,-2.1,(t-39)/4):-2.1;
  if(unloadHook.current)unloadHook.current.position.y=unloadY;
  if(unloadTrolley.current)unloadTrolley.current.position.x=t<39?.42:t<43?THREE.MathUtils.lerp(.42,-.55,(t-39)/4):-.55;
  if(delivered.current){
   if(t<39)delivered.current.position.set(40,-40,0);
   else if(t<43)delivered.current.position.set(4.05,Math.max(.55,2.45+unloadY),0);
   else delivered.current.position.set(4.05,.55,0);
  }
 });
 return <>
  <color attach="background" args={['#a9c4cf']}/><fog attach="fog" args={['#a9c4cf',15,32]}/>
  <hemisphereLight args={['#e5f3fa','#344e58',1.45]}/>
  <directionalLight position={[-4,10,7]} intensity={2.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
  <directionalLight position={[4,6,-6]} intensity={.8} color="#a7d8e9"/>
  <pointLight position={[-7,5,3]} intensity={35} distance={16} color="#ffd19a"/>
  <Ocean shipRef={ship}/>
  {/* Distant port terminals, gantries and container stacks */}
  <group position={[-7.3,0,-1.6]}>
   <mesh position={[0,-.02,0]}><boxGeometry args={[4,.55,5]}/>{steel('#66777a',.2,.85)}</mesh>
   <GantriesStatic/>
   {Array.from({length:8},(_,i)=><Container key={i} position={[-1.55+(i%4)*.9,.52,1.25+Math.floor(i/4)*.8]} color={['#d47a56','#d9aa64','#3c8295','#d0d3c8'][i%4]} scale={.72}/>)}
  </group>
  <group position={[7.3,0,-1.6]}>
   <mesh position={[0,-.02,0]}><boxGeometry args={[4,.55,5]}/>{steel('#66777a',.2,.85)}</mesh>
   <GantriesStatic accent="#6c9eaa"/>
   {Array.from({length:8},(_,i)=><Container key={i} position={[-1.55+(i%4)*.9,.52,1.25+Math.floor(i/4)*.8]} color={['#d47a56','#d9aa64','#3c8295','#d0d3c8'][i%4]} scale={.72}/>)}
  </group>
  <GantriesStatic/>
  <group position={[-5.1,0,0]}><GantryCrane x={0} hookRef={loadHook} trolleyRef={loadTrolley}/></group>
  <group position={[5.1,0,0]}><GantryCrane x={0} accent="#6fabbc" hookRef={unloadHook} trolleyRef={unloadTrolley}/></group>
  <group ref={ship}><Ship/></group>
  <group ref={lifted}><Container color="#e6a35b"/></group>
  <group ref={delivered}><Container color="#4e9eb3"/></group>
  <ContactShadows position={[0,-.04,0]} opacity={.23} scale={28} blur={3} far={6}/>
 </>;
}
function GantriesStatic({accent='#d99d53'}){
 return <group>
  {[-1.2,1.2].map(z=><mesh key={z} position={[0,2.35,z]} castShadow><boxGeometry args={[.24,4.7,.24]}/>{steel(accent,.5,.48)}</mesh>)}
  <mesh position={[0,4.7,0]} castShadow><boxGeometry args={[.26,.24,2.65]}/>{steel(accent,.5,.45)}</mesh>
  <mesh position={[.8,4.7,0]}><boxGeometry args={[1.7,.18,.18]}/>{steel('#a97742',.5,.48)}</mesh>
 </group>;
}

export default function CargoHandling(){
 return <section className="cargo-ops container" aria-labelledby="cargo-ops-title">
  <div className="cargo-ops-heading"><div><div className="eyebrow"><i/> AUTOMATED 3D PORT OPERATIONS</div><h2 id="cargo-ops-title">A real shipping journey.<br/><em>From port to port.</em></h2></div><p>Watch a container vessel load at its origin, sail across the ocean and unload at its destination. The scene runs automatically.</p></div>
  <div className="cargo-3d-stage"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,9.2,19.5],fov:34}} gl={{antialias:true,powerPreference:'high-performance'}}><PortScene/></Canvas><div className="cargo-3d-label cargo-label-origin">SHENZHEN PORT <small>CHINA · ORIGIN</small></div><div className="cargo-3d-label cargo-label-destination">NHAVA SHEVA <small>INDIA · DESTINATION</small></div><div className="cargo-3d-status"><i/> AUTOMATED CARGO HANDLING <span>LOAD → SAIL → UNLOAD</span></div></div>
  <div className="cargo-route-summary"><div><span>STARTING LOCATION</span><b>Shenzhen Port, China</b><small>Origin · China</small></div><div className="route-summary-line"><i/><span>SEA FREIGHT</span><i/></div><div><span>ENDING LOCATION</span><b>Nhava Sheva Port, India</b><small>Destination · India</small></div><div className="cargo-eta"><span>ESTIMATED SEA FREIGHT</span><b>25–35 days</b><small>ImportNow published sea-freight estimate.</small></div></div>
 </section>;
}
