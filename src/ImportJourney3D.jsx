import React,{useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Stars} from '@react-three/drei';
import * as THREE from 'three';

function CargoShip(){
 const boat=useRef();
 useFrame(({clock})=>{
  const t=clock.getElapsedTime()*0.42;
  if(boat.current){
   boat.current.position.set(Math.cos(t)*2.05,Math.sin(t*1.2)*0.12,Math.sin(t)*1.12);
   boat.current.rotation.y=-Math.atan2(Math.cos(t)*1.12,-Math.sin(t)*2.05);
   boat.current.rotation.z=Math.sin(t*1.2)*0.035;
  }
 });
 const colors=['#f2b45f','#3b8da8','#e76d59','#8ab9c9','#d7c18d'];
 return <group ref={boat} scale={1.35}>
  <mesh position={[0,-.12,0]}><boxGeometry args={[.42,.13,1.08]}/><meshStandardMaterial color="#e35f4d" metalness={.3} roughness={.4}/></mesh>
  <mesh position={[0,-.015,.02]} rotation={[0,0,Math.PI]}><coneGeometry args={[.18,.32,4]}/><meshStandardMaterial color="#f17a5e" metalness={.2}/></mesh>
  {colors.map((c,i)=><mesh key={i} position={[(i%2?-.09:.09),.015,-.29+Math.floor(i/2)*.18]}><boxGeometry args={[.17,.14,.19]}/><meshStandardMaterial color={c} metalness={.25} roughness={.5}/></mesh>)}
  <mesh position={[0,.11,.28]}><boxGeometry args={[.13,.2,.12]}/><meshStandardMaterial color="#e9eef0"/></mesh>
  <mesh position={[0,-.2,-.05]}><boxGeometry args={[.055,.015,1.2]}/><meshBasicMaterial color="#77d8f4" transparent opacity={.55}/></mesh>
  <pointLight position={[0,.2,0]} color="#f2b45f" intensity={1.2} distance={1.8}/>
 </group>;
}
function Scene(){
 const globe=useRef();
 useFrame(({clock})=>{if(globe.current)globe.current.rotation.y=clock.getElapsedTime()*.075;});
 return <>
  <color attach="background" args={['#0b1c2b']}/>
  <ambientLight intensity={1.1}/>
  <directionalLight position={[4,5,5]} intensity={2.2} color="#d9f2ff"/>
  <pointLight position={[-4,1,2]} intensity={2} color="#ed815e"/>
  <Stars radius={35} depth={20} count={650} factor={2} fade speed={.3}/>
  <group ref={globe}>
   <mesh><sphereGeometry args={[.8,48,48]}/><meshStandardMaterial color="#174a63" metalness={.48} roughness={.35} emissive="#0a3046" emissiveIntensity={.6}/></mesh>
   <mesh scale={1.035}><sphereGeometry args={[.8,32,32]}/><meshBasicMaterial color="#70d5f5" wireframe transparent opacity={.24}/></mesh>
   <mesh rotation={[.9,.3,.2]}><torusGeometry args={[1.12,.009,8,120]}/><meshBasicMaterial color="#79d9f5" transparent opacity={.6}/></mesh>
   <mesh rotation={[1.2,-.6,.5]}><torusGeometry args={[1.42,.006,8,120]}/><meshBasicMaterial color="#efb66d" transparent opacity={.48}/></mesh>
  </group>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.15,0]}><circleGeometry args={[2.4,64]}/><meshBasicMaterial color="#12394c" transparent opacity={.22}/></mesh>
  <CargoShip/>

 </>;
}
export default function ImportJourney3D(){
 return <div className="journey-3d"><Canvas dpr={[1,1.5]} camera={{position:[0,0,6.8],fov:42}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}}><Scene/></Canvas><div className="journey-fixed-labels"><div><b>01 · FACTORY</b><span>Sourcing & supplier selection</span></div><div><b>02 · QUALITY</b><span>Inspection & sample approval</span></div><div><b>03 · FREIGHT</b><span>Container loading & ocean shipping</span></div><div><b>04 · DELIVERY</b><span>Customs clearance & doorstep delivery</span></div></div><div className="journey-3d-caption"><i/> LIVE IMPORT JOURNEY <span>CHINA → INDIA</span></div></div>;
}
