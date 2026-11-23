import React,{useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,ContactShadows} from '@react-three/drei';
import * as THREE from 'three';

function Container({position=[0,0,0],color='#d8894d',scale=1}){
 return <group position={position} scale={scale}>
  <mesh castShadow={true} receiveShadow={true}><boxGeometry args={[.78,.46,.52]}/><meshStandardMaterial color={color} metalness={.24} roughness={0.66}/></mesh>
  {Array.from({length:9},(_,i)=><mesh key={i} position={[-.35+i*.087,0,.264]}><boxGeometry args={[.018,.4,.012]}/><meshStandardMaterial color="#f2c28a" metalness={.25} roughness={.55}/></mesh>)}
  <mesh position={[0,.18,.27]}><boxGeometry args={[.68,.018,.014]}/><meshStandardMaterial color="#f3d5a6"/></mesh>
 </group>;
}
function Hull(){
 const geometry=React.useMemo(()=>{
  const sections=[[-4.15,.02],[-3.65,1.08],[-2.8,1.3],[2.65,1.3],[3.45,.86],[4.05,.05]];
  const verts=[],indices=[];
  sections.forEach(([x,w])=>{verts.push(x,.24,-w,x,.24,w,x,-.34,-w*.76,x,-.34,w*.76)});
  for(let i=0;i<sections.length-1;i++){
   const a=i*4,b=(i+1)*4;
   indices.push(a,a+1,b+1,a,b+1,b,a+2,b+2,b+3,a+2,b+3,a+3,a,a+2,b+2,a,b+2,b,a+1,b+1,b+3,a+1,b+3,a+3);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(indices);g.computeVertexNormals();return g;
 },[]);
 return <mesh geometry={geometry} castShadow={true} receiveShadow={true}><meshStandardMaterial color="#19384d" metalness={0.55} roughness={0.38} side={THREE.DoubleSide}/></mesh>;
}
function Ship(){
 const colors=['#df7657','#d7a35e','#3d8298','#e6bd79','#669eaa','#bd594c','#d7a15c','#3f7187','#d87550','#e0b66d','#3b849c','#d1d9d7'];
 return <group>
  <Hull/>
  <mesh position={[-.1,.25,0]}><boxGeometry args={[7.5,.1,2.25]}/><meshStandardMaterial color="#263f4d" metalness={0.35} roughness={0.65}/></mesh>
  {Array.from({length:12},(_,i)=><Container key={i} position={[-2.65+(i%4)*1.65,.62+Math.floor(i/4)*.49,Math.floor(i/4)%2?-.48:.48]} color={colors[i]}/>)}
  <group position={[-3.2,.55,0]}>
   <mesh position={[0,.5,0]}><boxGeometry args={[.68,1.1,1.1]}/><meshStandardMaterial color="#e8e8df" roughness={0.72}/></mesh>
   <mesh position={[0,1.1,0]}><boxGeometry args={[.52,.14,.8]}/><meshStandardMaterial color="#9fc8d2" metalness={0.25} roughness={0.3}/></mesh>
   <mesh position={[0,1.27,0]}><boxGeometry args={[.06,.22,.07]}/><meshStandardMaterial color="#e8e8df"/></mesh>
   <mesh position={[.36,.38,0]}><boxGeometry args={[.06,.35,.16]}/><meshStandardMaterial color="#d6a65f"/></mesh>
  </group>
  <mesh position={[0,.32,1.14]}><boxGeometry args={[6.7,.045,.025]}/><meshBasicMaterial color="#f3bd6c"/></mesh>
 </group>;
}
function Crane({position,hook,trolley}){
 return <group position={position}>
  {[-.95,.95].map((z,i)=><group key={i} position={[0,0,z]}>
   <mesh position={[-.12,1.95,0]} castShadow={true}><boxGeometry args={[.2,3.8,.22]}/><meshStandardMaterial color="#d69b52" metalness={0.5} roughness={0.42}/></mesh>
   <mesh position={[-.12,.12,0]}><boxGeometry args={[.85,.24,.7]}/><meshStandardMaterial color="#485f6b" metalness={0.5}/></mesh>
  </group>)}
  <mesh position={[-.12,3.85,0]} castShadow={true}><boxGeometry args={[.25,.24,2.15]}/><meshStandardMaterial color="#e5ad60" metalness={0.5} roughness={0.4}/></mesh>
  <mesh position={[.88,3.85,0]}><boxGeometry args={[2.2,.22,.22]}/><meshStandardMaterial color="#bd8748" metalness={0.55}/></mesh>
  <group ref={trolley} position={[.7,3.62,0]}>
   <mesh><boxGeometry args={[.7,.3,.68]}/><meshStandardMaterial color="#344e5c" metalness={0.5}/></mesh>
   <group ref={hook} position={[0,-.18,0]}>
    <mesh position={[0,-.62,0]}><cylinderGeometry args={[.018,.018,1.2,8]}/><meshStandardMaterial color="#dce5e8" metalness={0.8}/></mesh>
    <mesh position={[0,-1.24,0]}><boxGeometry args={[.96,.07,.65]}/><meshStandardMaterial color="#eab96c" metalness={0.6}/></mesh>
    {[-.4,.4].map(z=><mesh key={z} position={[0,-1.29,z]}><torusGeometry args={[.09,.018,8,14]}/><meshStandardMaterial color="#e1e9e9" metalness={0.8}/></mesh>)}
   </group>
  </group>
  <mesh position={[.9,3.35,0]}><boxGeometry args={[.1,.5,.14]}/><meshStandardMaterial color="#344e5c"/></mesh>
 </group>;
}
function Water(){
 const group=useRef();
 useFrame(({clock})=>{if(group.current)group.current.children.forEach((m,i)=>{m.position.z=Math.sin(clock.elapsedTime*.7+i*.9)*.025;m.material.opacity=.12+(.06*Math.sin(clock.elapsedTime+i));});});
 return <group ref={group}>{Array.from({length:36},(_,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[-7+(i%12)*1.25,-.28,-3+Math.floor(i/12)*3]}><planeGeometry args={[.8,.018]}/><meshBasicMaterial color="#66c4d8" transparent={true} opacity={.16}/></mesh>)}</group>;
}
function PortScene(){
 const ship=useRef(),leftHook=useRef(),rightHook=useRef(),leftTrolley=useRef(),rightTrolley=useRef(),loaded=useRef(),unloaded=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()%38;
  const smooth=v=>v*v*(3-2*v);
  if(ship.current){
   const travel=smooth(THREE.MathUtils.clamp((t-13)/17,0,1));
   ship.current.position.x=THREE.MathUtils.lerp(-2.2,2.25,travel);
   ship.current.position.y=.05+Math.sin(clock.elapsedTime*1.1)*.035;
   ship.current.rotation.z=Math.sin(clock.elapsedTime*.65)*.008;
   ship.current.rotation.y=Math.sin(clock.elapsedTime*.4)*.012;
  }
  const lift=t<4?THREE.MathUtils.lerp(.68,2.25,t/4):t<8?THREE.MathUtils.lerp(2.25,.72,(t-4)/4):2.25;
  if(leftHook.current)leftHook.current.position.y=lift;
  if(leftTrolley.current)leftTrolley.current.position.x=t<4?-.35:t<8?THREE.MathUtils.lerp(-.35,.55,(t-4)/4):.55;
  if(loaded.current){
   if(t<4)loaded.current.position.set(-4.2,Math.max(.5,lift-1.45),0);
   else if(t<8)loaded.current.position.set(THREE.MathUtils.lerp(-4.2,-2.35,(t-4)/4),lift-1.45,0);
   else if(t<13)loaded.current.position.set(-2.35,.96,0);
   else loaded.current.position.set(-30,-30,0);
  }
  const down=t<31?2.25:t<35?THREE.MathUtils.lerp(2.25,.72,(t-31)/4):.72;
  if(rightHook.current)rightHook.current.position.y=down;
  if(rightTrolley.current)rightTrolley.current.position.x=t<31?.5:t<35?THREE.MathUtils.lerp(.5,-.35,(t-31)/4):-.35;
  if(unloaded.current){
   if(t<31)unloaded.current.position.set(30,-30,0);
   else if(t<35)unloaded.current.position.set(4.2,Math.max(.5,down-1.45),0);
   else unloaded.current.position.set(4.2,.5,0);
  }
 });
 return <>
  <color attach="background" args={['#081a29']}/><fog attach="fog" args={['#081a29',12,25]}/>
  <ambientLight intensity={1.25}/><hemisphereLight args={['#d9efff','#173343',1.2]}/>
  <directionalLight position={[2,9,6]} intensity={2.8} castShadow={true} shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
  <pointLight position={[-5,5,3]} intensity={75} distance={14} color="#f2b46b"/><pointLight position={[5,5,-3]} intensity={80} distance={14} color="#65c5dc"/>
  <Environment preset="city"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.34,0]} receiveShadow={true}><planeGeometry args={[30,16]}/><meshStandardMaterial color="#123d50" metalness={0.42} roughness={0.3}/></mesh>
  <Water/>
  <mesh position={[-4.8,.02,0]}><boxGeometry args={[2.4,.5,3.5]}/><meshStandardMaterial color="#596c73" roughness={0.9}/></mesh>
  <mesh position={[4.8,.02,0]}><boxGeometry args={[2.4,.5,3.5]}/><meshStandardMaterial color="#596c73" roughness={0.9}/></mesh>
  <Crane position={[-4.5,0,0]} hook={leftHook} trolley={leftTrolley}/>
  <Crane position={[4.5,0,0]} hook={rightHook} trolley={rightTrolley}/>
  <group ref={ship}><Ship/></group>
  <group ref={loaded}><Container color="#e6a35b"/></group>
  <group ref={unloaded}><Container color="#4e9eb3"/></group>
  <ContactShadows position={[0,-.32,0]} opacity={.42} scale={20} blur={2.5} far={4}/>
 </>;
}
export default function CargoHandling(){
 return <section className="cargo-ops container" aria-labelledby="cargo-ops-title">
  <div className="cargo-ops-heading"><div><div className="eyebrow"><i/> AUTOMATED 3D PORT OPERATIONS</div><h2 id="cargo-ops-title">A real shipping journey.<br/><em>From port to port.</em></h2></div><p>Watch an automated port sequence with a detailed container vessel, working gantry cranes, loading, ocean transit and unloading.</p></div>
  <div className="cargo-3d-stage"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,8.8,15.5],fov:36}} gl={{antialias:true,powerPreference:'high-performance'}}><PortScene/></Canvas><div className="cargo-3d-label cargo-label-origin">SHENZHEN PORT <small>CHINA · ORIGIN</small></div><div className="cargo-3d-label cargo-label-destination">NHAVA SHEVA <small>INDIA · DESTINATION</small></div><div className="cargo-3d-status"><i/> AUTOMATED CARGO HANDLING <span>LOAD → SAIL → UNLOAD</span></div></div>
  <div className="cargo-route-summary"><div><span>STARTING LOCATION</span><b>Shenzhen Port, China</b><small>Origin · China</small></div><div className="route-summary-line"><i/><span>SEA FREIGHT</span><i/></div><div><span>ENDING LOCATION</span><b>Nhava Sheva Port, India</b><small>Destination · India</small></div><div className="cargo-eta"><span>ESTIMATED SEA FREIGHT</span><b>25–35 days</b><small>Typical sea-freight range stated by ImportNow.</small></div></div>
 </section>;
}
