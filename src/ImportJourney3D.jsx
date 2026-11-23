import React,{useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Stars} from '@react-three/drei';

function Scene(){
 const globe=useRef();
 useFrame((_,delta)=>{
  if(globe.current) globe.current.rotation.y += delta*0.035;
 });
 return <>
  <color attach="background" args={['#0b1c2b']}/>
  <ambientLight intensity={1.1}/>
  <directionalLight position={[4,5,5]} intensity={2.2} color="#d9f2ff"/>
  <pointLight position={[-4,1,2]} intensity={2} color="#ed815e"/>
  <Stars radius={35} depth={20} count={650} factor={2} fade speed={0.12}/>
  <group ref={globe}>
   <mesh>
    <sphereGeometry args={[.8,48,48]}/>
    <meshStandardMaterial color="#174a63" metalness={.48} roughness={.35} emissive="#0a3046" emissiveIntensity={.6}/>
   </mesh>
   <mesh scale={1.035}>
    <sphereGeometry args={[.8,32,32]}/>
    <meshBasicMaterial color="#70d5f5" wireframe transparent opacity={.24}/>
   </mesh>
   <mesh rotation={[.9,.3,.2]}>
    <torusGeometry args={[1.12,.009,8,120]}/>
    <meshBasicMaterial color="#79d9f5" transparent opacity={.6}/>
   </mesh>
   <mesh rotation={[1.2,-.6,.5]}>
    <torusGeometry args={[1.42,.006,8,120]}/>
    <meshBasicMaterial color="#efb66d" transparent opacity={.48}/>
   </mesh>
  </group>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.15,0]}>
   <circleGeometry args={[2.4,64]}/>
   <meshBasicMaterial color="#12394c" transparent opacity={.22}/>
  </mesh>
 </>;
}

export default function ImportJourney3D(){
 return <div className="journey-3d">
  <Canvas dpr={[1,1.5]} camera={{position:[0,0,6.8],fov:42}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}}>
   <Scene/>
  </Canvas>
  <div className="journey-fixed-labels">
   <div><b>01 · FACTORY</b><span>Sourcing & supplier selection</span></div>
   <div><b>02 · QUALITY</b><span>Inspection & sample approval</span></div>
   <div><b>03 · FREIGHT</b><span>Container loading & ocean shipping</span></div>
   <div><b>04 · DELIVERY</b><span>Customs clearance & doorstep delivery</span></div>
  </div>
  <div className="journey-3d-caption"><i/> IMPORT JOURNEY <span>CHINA → INDIA</span></div>
 </div>;
}
