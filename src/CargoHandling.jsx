import React,{useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,ContactShadows,Float} from '@react-three/drei';
import * as THREE from 'three';

function Container({position=[0,0,0],color='#d8894d',scale=1}) {
 return <group position={position} scale={scale}>
  <mesh castShadow receiveShadow><boxGeometry args={[.72,.42,.48]}/><meshStandardMaterial color={color} metalness:.28 roughness:.58/></mesh>
  {Array.from({length:7},(_,i)=><mesh key={i} position={[-.31+i*.103,0,.244]}><boxGeometry args={[.018,.37,.012]}/><meshStandardMaterial color="#f4c28b" metalness:.2 roughness:.55/></mesh>)}
  <mesh position={[0,0,.252]}><boxGeometry args={[.66,.025,.014]}/><meshStandardMaterial color="#f7d8a9" metalness:.2/></mesh>
 </group>;
}
function Crane({x=-4.2,hookRef,accent='#d99a52'}) {
 return <group position={[x,0,0]}>
  <mesh position={[0,2.05,0]} castShadow><boxGeometry args={[.16,3.9,.18]}/><meshStandardMaterial color="#b77d42" metalness:.45 roughness:.48/></mesh>
  <mesh position={[.82,3.94,0]} castShadow><boxGeometry args={[2.05,.16,.24]}/><meshStandardMaterial color={accent} metalness:.48 roughness:.42/></mesh>
  <mesh position={[-.45,3.94,0]}><boxGeometry args={[.72,.12,.2]}/><meshStandardMaterial color="#efbd70" metalness:.35/></mesh>
  <mesh position={[1.55,3.55,0]}><boxGeometry args={[.25,.72,.3]}/><meshStandardMaterial color="#344e5d" metalness:.3/></mesh>
  <mesh position={[-.48,.18,0]}><boxGeometry args={[.16,.36,.7]}/><meshStandardMaterial color="#536a75" metalness:.5/></mesh>
  <group ref={hookRef} position={[.8,2.7,0]}>
   <mesh position={[0,-.65,0]}><cylinderGeometry args={[.012,.012,1.3,8]}/><meshStandardMaterial color="#cbd7d9" metalness:.7/></mesh>
   <mesh position={[0,-1.32,0]}><boxGeometry args={[.86,.07,.58]}/><meshStandardMaterial color="#efbd70" metalness:.5/></mesh>
   <mesh position={[0,-1.43,0]}><torusGeometry args={[.12,.025,8,16]}/><meshStandardMaterial color="#d9e3e4" metalness:.7/></mesh>
  </group>
 </group>;
}
function Vessel({refShip}) {
 const colors=['#d76d50','#d9a05b','#357f95','#e4b66e','#6b9cab','#bd604d','#d7a15c','#407d91'];
 return <group ref={refShip}>
  <mesh position={[0,.45,0]} castShadow receiveShadow>
   <boxGeometry args={[3.1,.48,1.08]}/><meshStandardMaterial color="#172f43" metalness:.52 roughness:.42/>
  </mesh>
  <mesh position={[0,.19,0]} rotation={[0,0,Math.PI]} castShadow>
   <coneGeometry args={[.78,.62,4]}/><meshStandardMaterial color="#c74f43" metalness:.32 roughness:.48/>
  </mesh>
  {Array.from({length:8},(_,i)=><Container key={i} position={[-1.15+(i%4)*.76,.83+Math.floor(i/4)*.45,0]} color={colors[i]}/>)}
  <group position={[1.18,.83,0]}>
   <mesh position={[0,.35,0]}><boxGeometry args={[.48,.8,.55]}/><meshStandardMaterial color="#e9ece8" roughness:.7/></mesh>
   <mesh position={[0,.82,0]}><boxGeometry args={[.36,.16,.42]}/><meshStandardMaterial color="#8eb8c4" metalness:.25/></mesh>
   <mesh position={[0,.98,0]}><boxGeometry args={[.035,.22,.04]}/><meshStandardMaterial color="#e8eeee"/></mesh>
  </group>
  <mesh position={[0,.16,-.57]}><boxGeometry args={[2.5,.035,.025]}/><meshBasicMaterial color="#f0b76a"/></mesh>
 </group>;
}
function PortScene(){
 const ship=useRef(),leftHook=useRef(),rightHook=useRef(),liftCargo=useRef(),unloadCargo=useRef(),water=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()%32;
  const smooth=v=>v*v*(3-2*v);
  const travel=smooth(THREE.MathUtils.clamp((t-13)/13,0,1));
  if(ship.current){ship.current.position.x=THREE.MathUtils.lerp(-2.35,2.35,travel);ship.current.position.y=.03+Math.sin(clock.elapsedTime*1.4)*.035;ship.current.rotation.z=Math.sin(clock.elapsedTime*.8)*.012;}
  const loadY=t<3?THREE.MathUtils.lerp(2.55,.7,t/3):t<7?THREE.MathUtils.lerp(.7,2.55,(t-3)/4):2.55;
  if(leftHook.current)leftHook.current.position.y=loadY;
  if(liftCargo.current){
   if(t<3)liftCargo.current.position.set(-3.4,Math.max(.48,loadY-1.48),.05);
   else if(t<7)liftCargo.current.position.set(THREE.MathUtils.lerp(-3.4,-2.3,(t-3)/4),loadY-1.48,.05);
   else if(t<13)liftCargo.current.position.set(-2.3,.83,.05);
   else liftCargo.current.position.set(-20,-20,0);
  }
  const unloadY=t<25?2.55:t<29?THREE.MathUtils.lerp(2.55,.65,(t-25)/4):.65;
  if(rightHook.current)rightHook.current.position.y=unloadY;
  if(unloadCargo.current){
   if(t<25)unloadCargo.current.position.set(20,-20,0);
   else if(t<29)unloadCargo.current.position.set(3.4,Math.max(.48,unloadY-1.45),.05);
   else unloadCargo.current.position.set(3.4,.48,.05);
  }
  if(water.current)water.current.position.x=Math.sin(clock.elapsedTime*.16)*.12;
 });
 return <>
  <color attach="background" args={['#091b2b']}/>
  <fog attach="fog" args={['#091b2b',10,23]}/>
  <ambientLight intensity={1.5}/>
  <directionalLight position={[3,8,5]} intensity={2.7} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
  <pointLight position={[-5,4,3]} intensity={90} distance={12} color="#f3b86f"/>
  <pointLight position={[5,4,-3]} intensity={65} distance={10} color="#66c5df"/>
  <Environment preset="city"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.22,0]} receiveShadow><planeGeometry args={[30,16]}/><meshStandardMaterial color="#0b4058" metalness:.42 roughness:.25/></mesh>
  <group ref={water}>
   {Array.from({length:12},(_,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[-5+i*.95,-.19,-1.7+(i%3)*1.5]}><ringGeometry args={[.22,.25,32]}/><meshBasicMaterial color="#78cde0" transparent opacity={.3}/></mesh>)}
  </group>
  <mesh position={[-4.45,.05,0]}><boxGeometry args={[2.2,.42,2.2]}/><meshStandardMaterial color="#647984" roughness:.8/></mesh>
  <mesh position={[4.45,.05,0]}><boxGeometry args={[2.2,.42,2.2]}/><meshStandardMaterial color="#647984" roughness:.8/></mesh>
  <Crane x={-4.25} hookRef={leftHook}/>
  <Crane x={4.25} hookRef={rightHook} accent="#73a9b9"/>
  <group ref={ship}><Vessel refShip={null}/></group>
  <group ref={liftCargo}><Container color="#e8a35a"/></group>
  <group ref={unloadCargo}><Container color="#4d9caf"/></group>
  <ContactShadows position={[0,-.2,0]} opacity={.3} scale={18} blur={2.5} far={4}/>
 </>
}
export default function CargoHandling(){
 return <section className="cargo-ops container" aria-labelledby="cargo-ops-title">
  <div className="cargo-ops-heading"><div><div className="eyebrow"><i/> AUTOMATED 3D PORT OPERATIONS</div><h2 id="cargo-ops-title">From dock to destination.<br/><em>Watch every move.</em></h2></div><p>A continuous 3D cargo operation: cranes load the vessel, the ship crosses the water, and the destination crane unloads the container.</p></div>
  <div className="cargo-3d-stage"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,7.4,12.8],fov:39}} gl={{antialias:true,powerPreference:'low-power'}}><PortScene/></Canvas><div className="cargo-3d-label cargo-label-origin">SHENZHEN PORT <small>CHINA · ORIGIN</small></div><div className="cargo-3d-label cargo-label-destination">NHAVA SHEVA <small>INDIA · DESTINATION</small></div><div className="cargo-3d-status"><i/> AUTOMATED CARGO HANDLING <span>LOADING → SAILING → UNLOADING</span></div></div>
  <div className="cargo-route-summary"><div><span>STARTING LOCATION</span><b>Shenzhen Port, China</b><small>Origin · China</small></div><div className="route-summary-line"><i/><span>SEA FREIGHT</span><i/></div><div><span>ENDING LOCATION</span><b>Nhava Sheva Port, India</b><small>Destination · India</small></div><div className="cargo-eta"><span>ESTIMATED TRANSIT</span><b>12–16 days</b><small>Illustrative estimate; actual transit varies.</small></div></div>
 </section>;
}
