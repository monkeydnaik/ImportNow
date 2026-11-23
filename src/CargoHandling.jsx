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
  // Purpose-built 3D hull: tapered bow, rounded bilges, broad beam and deep keel.
  const stations=[
   [-4.65,.34,-.34,.34],[-4.25,.72,-.52,.42],[-3.65,.92,-.62,.44],
   [-2.7,1.02,-.68,.45],[-1.2,1.08,-.7,.46],[1.2,1.06,-.68,.46],
   [2.65,.98,-.61,.45],[3.55,.78,-.48,.43],[4.2,.42,-.24,.35],[4.5,.08,-.08,.2]
  ];
  const ring=[
   [0,1],[.72,1],[1,.55],[.88,-.1],[.58,-.78],[0,-1],
   [-.58,-.78],[-.88,-.1],[-1,.55],[-.72,1]
  ];
  const vertices=[],indices=[];
  stations.forEach(([x,w,bottom,top])=>ring.forEach(([z,y])=>{
   vertices.push(x,bottom+(top-bottom)*(y+1)/2,z*w);
  }));
  const n=ring.length;
  for(let i=0;i<stations.length-1;i++)for(let j=0;j<n;j++){
   const a=i*n+j,b=i*n+(j+1)%n,c=(i+1)*n+(j+1)%n,d=(i+1)*n+j;
   indices.push(a,b,d,b,c,d);
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  g.setIndex(indices);g.computeVertexNormals();return g;
 },[]);
 return <group>
  <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color="#17394d" metalness={.68} roughness={.29} side={THREE.DoubleSide}/></mesh>
  <mesh position={[-.05,-.38,0]}><boxGeometry args={[7.8,.07,1.55]}/>{steel('#bd5146',.42,.4)}</mesh>
 </group>;
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
 return <group position={[side*7.25,0,-4.9]}>
  {/* Wide concrete quay with painted safety edge */}
  <mesh position={[0,-.19,0]} receiveShadow><boxGeometry args={[8.4,.5,9.8]}/>{steel('#788687',.18,.88)}</mesh>
  <mesh position={[0,.075,4.72]}><boxGeometry args={[8.4,.12,.28]}/>{steel('#e5c16d',.28,.55)}</mesh>
  {/* Four rows of container stacks, with mixed heights and colours */}
  {Array.from({length:36},(_,i)=><Container key={i}
   position={[-3.05+(i%6)*1.22,.14+Math.floor(i/18)*.53,-3.25+Math.floor(i/6)%3*1.48]}
   color={colors[(i+(side>0?2:0))%colors.length]} scale={.96}/>)}
  {/* Terminal warehouse and office block */}
  <group position={[0,0,-4.15]}>
   <mesh position={[0,.92,0]} castShadow><boxGeometry args={[6.6,1.8,1.55]}/>{steel('#d5d8d3',.18,.8)}</mesh>
   <mesh position={[0,1.88,0]}><boxGeometry args={[6.8,.16,1.72]}/>{steel('#334d5a',.45,.55)}</mesh>
   <mesh position={[0,1.08,.79]}><boxGeometry args={[3.8,.72,.035]}/><meshStandardMaterial color="#6b9cac" metalness={.2} roughness={.3}/></mesh>
   {[-2.45,2.45].map(x=><mesh key={x} position={[x,.58,.8]}><boxGeometry args={[.55,.72,.04]}/>{steel('#8b9da0',.25,.65)}</mesh>)}
  </group>
  {/* Yard light masts */}
  {[-3.35,3.35].map(x=><group key={x} position={[x,.1,-.25]}>
   <mesh position={[0,1.3,0]}><cylinderGeometry args={[.04,.055,2.6,8]}/>{steel('#e3e1d4',.45,.5)}</mesh>
   <mesh position={[0,2.65,0]}><boxGeometry args={[.36,.1,.16]}/><meshBasicMaterial color="#f6d28c"/></mesh>
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
 const deckContainers=useMemo(()=>Array.from({length:42},(_,i)=>({
  x:-3.75+(i%7)*1.16,z:Math.floor(i/7)%2?-.68:.68,
  y:.53+Math.floor(i/14)*.55,
  color:['#d66d4e','#d8a45d','#347d92','#e0bd7b','#668d9c','#bd594d'][(i*5+Math.floor(i/7))%6]
 })),[]);
 return <group scale={[1.3,1.22,1.3]}>
  <Hull/>
  <mesh position={[-.05,.39,0]} castShadow><boxGeometry args={[8.35,.18,2.02]}/>{steel('#354f5d',.55,.43)}</mesh>
  {/* Raised bulwarks and deck walkways */}
  {[-1,1].map(side=><mesh key={side} position={[0,.53,side*.99]}><boxGeometry args={[8.1,.24,.055]}/>{steel('#b9c5c6',.5,.42)}</mesh>)}
  {deckContainers.map((c,i)=><Container key={i} position={[c.x,c.y,c.z]} color={c.color} scale={1.08}/>)}
  {/* Full-height aft accommodation block with bridge glazing */}
  <group position={[-4.05,.48,0]}>
   <mesh position={[0,.62,0]} castShadow><boxGeometry args={[1.35,1.25,1.65]}/>{steel('#e4e4dc',.16,.68)}</mesh>
   <mesh position={[0,1.38,0]} castShadow><boxGeometry args={[1.28,.34,1.58]}/>{steel('#d9e0dc',.18,.5)}</mesh>
   <mesh position={[0,1.62,0]}><boxGeometry args={[1.18,.22,1.48]}/>{steel('#578da0',.38,.27)}</mesh>
   {[-.42,-.14,.14,.42].map((x,i)=><mesh key={i} position={[x,1.62,.755]}><boxGeometry args={[.18,.13,.025]}/><meshBasicMaterial color="#c8edf5"/></mesh>)}
   <mesh position={[0,1.88,0]}><cylinderGeometry args={[.035,.035,.42,10]}/>{steel('#edf0e9',.45,.38)}</mesh>
   <mesh position={[0,2.1,0]}><boxGeometry args={[.28,.06,.28]}/>{steel('#edf0e9',.4,.4)}</mesh>
   <mesh position={[.68,.35,0]}><boxGeometry args={[.16,.42,.16]}/>{steel('#c95e48',.35,.5)}</mesh>
  </group>
  {/* Forecastle, mast, anchor gear and lifeboats */}
  <group position={[3.85,.45,0]}>
   <mesh position={[0,.55,0]}><cylinderGeometry args={[.035,.055,1.1,10]}/>{steel('#dce2df',.5,.4)}</mesh>
   <mesh position={[0,1.1,0]}><boxGeometry args={[.8,.07,.08]}/>{steel('#e2e5df',.4,.45)}</mesh>
   <mesh position={[0,.08,0]}><cylinderGeometry args={[.1,.1,.22,12]}/>{steel('#9aa7a8',.7,.35)}</mesh>
  </group>
  {[-.72,.72].map((z,i)=><group key={i} position={[-2.9,.55,z]}>
   <mesh><boxGeometry args={[.72,.22,.28]}/>{steel('#e9e1ce',.25,.7)}</mesh>
   <mesh position={[0,.14,0]}><boxGeometry args={[.54,.05,.24]}/>{steel('#c65a48',.3,.6)}</mesh>
  </group>)}
  {Array.from({length:18},(_,i)=><mesh key={i} position={[-3.55+i*.42,.03,1.035]}><circleGeometry args={[.035,12]}/><meshBasicMaterial color="#e8c98b"/></mesh>)}
 </group>;
}

function PortScene(){
 const ship=useRef(),loadHook=useRef(),unloadHook=useRef(),loadTrolley=useRef(),unloadTrolley=useRef(),lifted=useRef(),delivered=useRef(),truck=useRef(),tug=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()%60;
  const ease=v=>{v=THREE.MathUtils.clamp(v,0,1);return v*v*(3-2*v);};
  // Vessel enters from open water, berths at origin, sails the sea lane, then approaches destination from offshore.
  const approach=ease(t/8);
  const sailing=ease((t-17)/23);
  const vesselX=t<8?THREE.MathUtils.lerp(-15.5,-5.1,approach):t<17?-5.1:t<40?THREE.MathUtils.lerp(-5.1,5.1,sailing):5.1;
  if(ship.current){ship.current.position.set(vesselX,.06+Math.sin(clock.elapsedTime*1.15)*.025,0);ship.current.rotation.z=Math.sin(clock.elapsedTime*.7)*.004;}
  const loadY=t<8?-.18:t<10?THREE.MathUtils.lerp(-.18,-2.1,(t-8)/2):t<12?THREE.MathUtils.lerp(-2.1,-.18,(t-10)/2):t<15?-.18:t<17?THREE.MathUtils.lerp(-.18,-2.1,(t-15)/2):t<19?THREE.MathUtils.lerp(-2.1,-.18,(t-17)/2):-.18;
  if(loadHook.current)loadHook.current.position.y=loadY;
  if(loadTrolley.current)loadTrolley.current.position.x=t<12?-1.15:t<15?THREE.MathUtils.lerp(-1.15,2.2,(t-12)/3):t<17?2.2:t<19?THREE.MathUtils.lerp(2.2,-1.15,(t-17)/2):-1.15;
  if(lifted.current){
   if(t<10)lifted.current.position.set(-5.1,.55,-4.45);
   else if(t<12)lifted.current.position.set(-5.1,THREE.MathUtils.lerp(.55,2.27,(t-10)/2),-4.45);
   else if(t<15)lifted.current.position.set(-5.1,2.27,THREE.MathUtils.lerp(-4.45,-1.1,(t-12)/3));
   else if(t<17)lifted.current.position.set(ship.current.position.x+2.0,THREE.MathUtils.lerp(2.27,.58,(t-15)/2),-.45);
   else lifted.current.position.set(ship.current.position.x+2.0,.58,-.45);
  }
  const unloadY=t<40?-.18:t<42?THREE.MathUtils.lerp(-.18,-2.1,(t-40)/2):t<44?THREE.MathUtils.lerp(-2.1,-.18,(t-42)/2):t<46?THREE.MathUtils.lerp(-.18,-2.1,(t-44)/2):-2.1;
  if(unloadHook.current)unloadHook.current.position.y=unloadY;
  if(unloadTrolley.current)unloadTrolley.current.position.x=t<42?2.2:t<44?THREE.MathUtils.lerp(2.2,-1.15,(t-42)/2):t<46?-1.15:2.2;
  const truckZ=t<46?-6.0:t<48?THREE.MathUtils.lerp(-6.0,-4.9,ease((t-46)/2)):t<56?THREE.MathUtils.lerp(-4.9,-2.8,ease((t-48)/8)):-2.8;
  if(delivered.current){
   if(t<42)delivered.current.position.set(ship.current.position.x-.95,.58,-.45);
   else if(t<44)delivered.current.position.set(5.1,THREE.MathUtils.lerp(.58,2.27,ease((t-42)/2)),THREE.MathUtils.lerp(-1.1,-4.45,ease((t-42)/2)));
   else if(t<46)delivered.current.position.set(5.1,THREE.MathUtils.lerp(2.27,.55,ease((t-44)/2)),-4.45);
   else if(t<48)delivered.current.position.set(5.1,THREE.MathUtils.lerp(.55,.82,ease((t-46)/2)),THREE.MathUtils.lerp(-4.45,truckZ-.45,ease((t-46)/2)));
   else delivered.current.position.set(5.1,.82,truckZ-.45);
  }
  if(truck.current)truck.current.position.set(5.1,.02,truckZ);
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
  {[-1,1].map((side)=>[-7.1,-4.9,-2.7].map((z,i)=><group key={side+':'+z} position={[side*5.1,0,z]} rotation={[0,-Math.PI/2,0]}>
   <GantryCrane x={0} accent={side<0?'#d99d53':'#6fabbc'} hookRef={i===1?(side<0?loadHook:unloadHook):undefined} trolleyRef={i===1?(side<0?loadTrolley:unloadTrolley):undefined}/>
  </group>))}
  <group ref={ship}><Ship/></group>
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
  <div className="cargo-3d-stage"><Canvas shadows dpr={[1,1.25]} camera={{position:[0,13.6,28.5],fov:38}} gl={{antialias:true,powerPreference:'high-performance'}}><PortScene/></Canvas><div className="cargo-3d-label cargo-label-origin">SHANGHAI PORT <small>CHINA · ORIGIN</small></div><div className="cargo-3d-label cargo-label-destination">CHENNAI PORT <small>INDIA · DESTINATION</small></div><div className="cargo-3d-status"><i/> PORT OPERATION SIMULATION <span>BERTH → LOAD → VOYAGE → UNLOAD → DELIVER</span></div></div>
  <div className="cargo-route-summary"><div><span>STARTING LOCATION</span><b>Shanghai Port, China</b><small>Origin · China</small></div><div className="route-summary-line"><i/><span>SEA FREIGHT</span><i/></div><div><span>ENDING LOCATION</span><b>Chennai Port, India</b><small>Destination · India</small></div><div className="cargo-eta"><span>ESTIMATED SEA FREIGHT</span><b>25–35 days</b><small>Illustrative estimate; route and timing vary.</small></div></div>
 </section>;
}
