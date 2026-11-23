import React,{Suspense,useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {ContactShadows,useGLTF} from '@react-three/drei';
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
  // Bevelled naval hull profile: tapered bow, fuller midship and transom stern.
  const outline=new THREE.Shape();
  outline.moveTo(-4.28,-.34);
  outline.lineTo(3.42,-.34);
  outline.quadraticCurveTo(4.22,-.32,4.38,.08);
  outline.lineTo(3.82,.25);
  outline.lineTo(-3.72,.25);
  outline.quadraticCurveTo(-4.3,.18,-4.28,-.34);
  const g=new THREE.ExtrudeGeometry(outline,{depth:1.82,steps:1,bevelEnabled:true,bevelSegments:4,bevelSize:.075,bevelThickness:.075,curveSegments:16});
  g.translate(0,0,-.91);
  g.computeVertexNormals();
  return g;
 },[]);
 return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color="#17384d" metalness={.62} roughness={.34} side={THREE.DoubleSide}/></mesh>;
}


const VESSEL_MODEL='https://tevy.dev/models/container-ship/v1/lod0.glb';

function ImportedVessel(){
 const {scene}=useGLTF(VESSEL_MODEL);
 const model=useMemo(()=>{
  const object=scene.clone(true);
  object.traverse(node=>{if(node.isMesh){node.castShadow=true;node.receiveShadow=true;}});
  const bounds=new THREE.Box3().setFromObject(object);
  const size=bounds.getSize(new THREE.Vector3());
  const center=bounds.getCenter(new THREE.Vector3());
  return {object,scale:8.2/Math.max(size.z,1),offset:[-center.x,0,-center.z]};
 },[scene]);
 return <group rotation={[0,Math.PI/2,0]} scale={model.scale}>
  <primitive object={model.object} position={model.offset}/>
 </group>;
}

class VesselFallback extends React.Component{
 constructor(props){super(props);this.state={failed:false};}
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(error){console.warn('External vessel model unavailable; using the built-in vessel.',error);}
 render(){return this.state.failed?this.props.fallback:this.props.children;}
}

function PortTerminal({side=1,accent='#d99d53'}){
 const colors=['#c96b50','#d4a15d','#3e8092','#c7d1ce','#a94e45','#668b9a'];
 return <group position={[side*5.1,0,-4.6]}>
  <mesh position={[0,-.19,0]} receiveShadow><boxGeometry args={[5.7,.48,4.8]}/>{steel('#7d8989',.12,.9)}</mesh>
  <mesh position={[0,.055,2.25]}><boxGeometry args={[5.7,.13,.28]}/>{steel('#b5b8ad',.12,.88)}</mesh>
  {Array.from({length:8},(_,i)=><group key={i} position={[-2.45+(i%4)*1.55,.14,-2.45+Math.floor(i/4)*1.5]}>
   <mesh castShadow><boxGeometry args={[1.25,.12,.12]}/>{steel('#e5b65f',.35,.55)}</mesh>
   <mesh position={[0,.12,0]}><cylinderGeometry args={[.07,.07,.22,10]}/>{steel('#344b55',.6,.45)}</mesh>
  </group>)}
  {Array.from({length:12},(_,i)=><Container key={i} position={[-2.0+(i%4)*1.28,.14+Math.floor(i/4)*.5,-1.55+Math.floor(i/4)*.05]} color={colors[(i+ (side>0?2:0))%colors.length]} scale={1.18}/>)}
  <group position={[0,0,-3.05]}>
   <mesh position={[0,.85,0]} castShadow><boxGeometry args={[4.7,1.7,1.25]}/>{steel('#d5d8d3',.18,.8)}</mesh>
   <mesh position={[0,1.75,0]}><boxGeometry args={[4.9,.14,1.42]}/>{steel('#334d5a',.45,.55)}</mesh>
   <mesh position={[0,1.05,.64]}><boxGeometry args={[2.5,.68,.035]}/><meshStandardMaterial color="#6b9cac" metalness={.2} roughness={.3}/></mesh>
   {[-1.65,1.65].map(x=><mesh key={x} position={[x,.5,.66]}><boxGeometry args={[.48,.6,.04]}/>{steel('#8b9da0',.25,.65)}</mesh>)}
  </group>
  {[-2.5,2.5].map(x=><group key={x} position={[x,.1,-.3]}>
   <mesh position={[0,.85,0]}><cylinderGeometry args={[.035,.035,1.7,8]}/>{steel('#e3e1d4',.45,.5)}</mesh>
   <mesh position={[0,1.72,0]}><sphereGeometry args={[.1,10,8]}/><meshBasicMaterial color="#f6d28c"/></mesh>
  </group>)}
 </group>;
}

function YardTruck({truckRef}){
 return <group ref={truckRef}>
  <mesh position={[0,.32,0]} castShadow><boxGeometry args={[1.35,.32,2.5]}/>{steel('#263d4a',.45,.55)}</mesh>
  <mesh position={[0,.72,.78]} castShadow><boxGeometry args={[1.22,.86,.9]}/>{steel('#e4a64f',.3,.5)}</mesh>
  <mesh position={[0,1.02,.8]}><boxGeometry args={[.98,.35,.025]}/><meshStandardMaterial color="#83b9c6" metalness={.2} roughness={.25}/></mesh>
  <mesh position={[0,.54,-.45]}><boxGeometry args={[1.3,.16,1.25]}/>{steel('#879397',.5,.6)}</mesh>
  {[-.52,.52].flatMap(x=>[-.78,.78].map(z=><mesh key={x+':'+z} position={[x,.22,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.22,.22,.13,16]}/>{steel('#202a30',.08,.9)}</mesh>))}
  <mesh position={[0,.52,-.45]}><boxGeometry args={[1.05,.12,1.18]}/>{steel('#d7d8d1',.25,.7)}</mesh>
 </group>;
}

function Tugboat(){
 return <group position={[0,0,0]}>
  <mesh position={[0,.16,0]}><boxGeometry args={[1.65,.3,.7]}/>{steel('#e7e2d2',.3,.6)}</mesh>
  <mesh position={[.1,.45,0]}><boxGeometry args={[.62,.38,.56]}/>{steel('#d85c49',.3,.55)}</mesh>
  <mesh position={[.1,.48,.29]}><boxGeometry args={[.42,.19,.025]}/><meshBasicMaterial color="#b9dbe2"/></mesh>
  <mesh position={[-.55,.06,0]}><coneGeometry args={[.25,.45,12]}/>{steel('#263f4c',.35,.55)}</mesh>
 </group>;
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
  <mesh position={[1.0,4.2,0]}><boxGeometry args={[4.8,.2,.24]}/>{steel('#b77c40',.55,.42)}</mesh>
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
 const ship=useRef(),loadHook=useRef(),unloadHook=useRef(),loadTrolley=useRef(),unloadTrolley=useRef(),lifted=useRef(),delivered=useRef(),truck=useRef(),tug=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()%60;
  const ease=v=>{v=THREE.MathUtils.clamp(v,0,1);return v*v*(3-2*v);};
  // Vessel enters from open water, berths at origin, sails the sea lane, then approaches destination from offshore.
  const approach=ease(t/8);
  const sailing=ease((t-15)/23);
  const vesselX=t<8?THREE.MathUtils.lerp(-15.5,-5.1,approach):t<15?-5.1:t<38?THREE.MathUtils.lerp(-5.1,5.1,sailing):5.1;
  if(ship.current){ship.current.position.set(vesselX,.06+Math.sin(clock.elapsedTime*1.15)*.025,0);ship.current.rotation.z=Math.sin(clock.elapsedTime*.7)*.004;}
  const loadY=t<8?-.18:t<10?THREE.MathUtils.lerp(-.18,-2.1,(t-8)/2):t<12?THREE.MathUtils.lerp(-2.1,-.18,(t-10)/2):-.18;
  if(loadHook.current)loadHook.current.position.y=loadY;
  if(loadTrolley.current)loadTrolley.current.position.x=t<10?-1.15:t<12?THREE.MathUtils.lerp(-1.15,2.2,(t-10)/2):2.2;
  if(lifted.current){
   if(t<10)lifted.current.position.set(-5.1,.55,-4.45);
   else if(t<12)lifted.current.position.set(-5.1,THREE.MathUtils.lerp(.55,2.27,(t-10)/2),-4.45);
   else if(t<15)lifted.current.position.set(-5.1,2.27,THREE.MathUtils.lerp(-4.45,-1.1,(t-12)/3));
   else lifted.current.position.set(ship.current.position.x+2.0,.58,-.45);
  }
  const unloadY=t<40?-.18:t<42?THREE.MathUtils.lerp(-.18,-2.1,(t-40)/2):t<44?THREE.MathUtils.lerp(-2.1,-.18,(t-42)/2):-.18;
  if(unloadHook.current)unloadHook.current.position.y=unloadY;
  if(unloadTrolley.current)unloadTrolley.current.position.x=t<40?2.2:t<42?THREE.MathUtils.lerp(2.2,-1.15,(t-40)/2):t<44?THREE.MathUtils.lerp(-1.15,2.2,(t-42)/2):2.2;
  if(delivered.current){
   if(t<40)delivered.current.position.set(ship.current.position.x-.95,.58,0);
   else if(t<44)delivered.current.position.set(4.05,Math.max(.55,2.45+unloadY),0);
   else if(t<46)delivered.current.position.set(4.05,.55,0);
   else delivered.current.position.set(7.55,.82,THREE.MathUtils.lerp(-6.0,-2.4,ease((t-46)/8)));
  }
  if(truck.current)truck.current.position.set(7.55,.02,t<46?-6.0:t<54?THREE.MathUtils.lerp(-6.0,-2.4,ease((t-46)/8)):-2.4);
  if(tug.current){
   tug.current.position.set(THREE.MathUtils.lerp(-1.8,2.2,(Math.sin(clock.elapsedTime*.25)+1)/2),.04,3.8);
   tug.current.rotation.y=Math.sin(clock.elapsedTime*.3)*.12;
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
  <PortTerminal side={-1} accent="#d99d53"/>
  <PortTerminal side={1} accent="#6fabbc"/>

  <group ref={tug}><Tugboat/></group>
  <group position={[-5.1,0,-3.3]} rotation={[0,-Math.PI/2,0]}><GantryCrane x={0} hookRef={loadHook} trolleyRef={loadTrolley}/></group>
  <group position={[5.1,0,-3.3]} rotation={[0,-Math.PI/2,0]}><GantryCrane x={0} accent="#6fabbc" hookRef={unloadHook} trolleyRef={unloadTrolley}/></group>
  <group ref={ship}><VesselFallback fallback={<Ship/>}><Suspense fallback={<Ship/>}><ImportedVessel/></Suspense></VesselFallback></group>
  <group ref={lifted}><Container color="#e6a35b"/></group>
  <group ref={delivered}><Container color="#4e9eb3"/></group>
  <YardTruck truckRef={truck}/>
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
  <div className="cargo-ops-heading"><div><div className="eyebrow"><i/> 3D PORT LOGISTICS IN 3D</div><h2 id="cargo-ops-title">Watch your order travel<br/><em>from China to India.</em></h2></div><p>A loaded container ship approaches from open water, cranes transfer cargo at the quay, and the vessel sails to the destination terminal for unloading and onward truck delivery. This is an illustrative 3D port operation, not live vessel tracking.</p></div>
  <div className="cargo-3d-stage"><Canvas shadows dpr={[1,1.25]} camera={{position:[0,10.8,22.5],fov:36}} gl={{antialias:true,powerPreference:'high-performance'}}><PortScene/></Canvas><div className="cargo-3d-label cargo-label-origin">SHANGHAI PORT <small>CHINA · ORIGIN</small></div><div className="cargo-3d-label cargo-label-destination">CHENNAI PORT <small>INDIA · DESTINATION</small></div><div className="cargo-3d-status"><i/> PORT OPERATION SIMULATION <span>BERTH → LOAD → VOYAGE → UNLOAD → DELIVER</span></div></div>
  <div className="cargo-route-summary"><div><span>STARTING LOCATION</span><b>Shanghai Port, China</b><small>Origin · China</small></div><div className="route-summary-line"><i/><span>SEA FREIGHT</span><i/></div><div><span>ENDING LOCATION</span><b>Chennai Port, India</b><small>Destination · India</small></div><div className="cargo-eta"><span>ESTIMATED SEA FREIGHT</span><b>25–35 days</b><small>Illustrative estimate; route and timing vary.</small></div></div>
 </section>;
}
