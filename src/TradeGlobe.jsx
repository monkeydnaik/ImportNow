import React,{Suspense,useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Float,Html,OrbitControls,Stars,useTexture} from '@react-three/drei';
import * as THREE from 'three';

const locations=[
  {name:'Shenzhen',lat:22.57,lon:114.06,color:'#ff9b78',role:'CHINA HUB'},
  {name:'Hyderabad',lat:17.385,lon:78.486,color:'#f2b65d',role:'INDIA'},
  {name:'Mumbai',lat:19.076,lon:72.878,color:'#74d5ff',role:'INDIA'},
  {name:'Chennai',lat:13.082,lon:80.271,color:'#74d5ff',role:'INDIA'}
];
const source=locations[0];
const destinations=locations.slice(1);
function point(lat,lon,r=2.025){
  const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
}
function Earth(){
  const texture=useTexture('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  texture.colorSpace=THREE.SRGBColorSpace;
  return <group>
    <mesh><sphereGeometry args={[2,72,64]}/><meshStandardMaterial map={texture} roughness={0.88} metalness={0.04}/></mesh>
    <mesh scale={1.045}><sphereGeometry args={[2,48,40]}/><meshBasicMaterial color="#57b9ec" transparent opacity={0.075} side={THREE.BackSide}/></mesh>
    <mesh scale={1.012}><sphereGeometry args={[2,48,40]}/><meshBasicMaterial color="#8edcff" transparent opacity={0.035} wireframe/></mesh>
  </group>;
}
function Route({destination,index}){
  const curve=useMemo(()=>{
    const a=point(source.lat,source.lon,2.035),b=point(destination.lat,destination.lon,2.035),pts=[];
    for(let i=0;i<=100;i++){const t=i/100;pts.push(a.clone().lerp(b,t).normalize().multiplyScalar(2.035+Math.sin(Math.PI*t)*0.19));}
    return new THREE.CatmullRomCurve3(pts);
  },[destination]);
  return <group>
    <mesh><tubeGeometry args={[curve,120,0.007,7,false]}/><meshBasicMaterial color={index===0?'#f2b65d':'#66c8ef'} transparent opacity={index===0?0.95:0.56}/></mesh>
    <ShipVessel curve={curve} delay={index*0.33}/>
  </group>;
}
function ShipVessel({curve,delay}){
  const ref=useRef();
  useFrame(({clock})=>{
    const t=(clock.getElapsedTime()*0.055+delay)%1,p=curve.getPointAt(t),tangent=curve.getTangentAt(t);
    if(ref.current){ref.current.position.copy(p);ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),tangent);}
  });
  const containerColors=['#e5a45a','#3d91a5','#d56a54','#8cb7c8','#d6bd83','#47738c'];
  return <group ref={ref} scale={2.05}>
    <mesh position={[0,0,0]}><boxGeometry args={[0.13,0.36,0.052]}/><meshStandardMaterial color="#d94f43" metalness={0.28} roughness={0.42}/></mesh>
    <mesh position={[0,0.205,0.018]} rotation={[0,0,Math.PI]}><coneGeometry args={[0.066,0.13,4]}/><meshStandardMaterial color="#ed6a51" metalness={0.25} roughness={0.4}/></mesh>
    {containerColors.map((color,i)=><mesh key={i} position={[i%2===0?-0.037:0.037,-0.105+Math.floor(i/2)*0.09,0.052]}><boxGeometry args={[0.058,0.078,0.048]}/><meshStandardMaterial color={color} metalness={0.22} roughness={0.48}/></mesh>)}
    <mesh position={[0,-0.12,0.085]}><boxGeometry args={[0.045,0.052,0.045]}/><meshStandardMaterial color="#f2f4f2" roughness={0.65}/></mesh>
    <mesh position={[0,-0.235,-0.008]}><boxGeometry args={[0.018,0.12,0.008]}/><meshBasicMaterial color="#9bdcf3" transparent opacity={0.5}/></mesh>
    <pointLight color="#f2b65d" intensity={0.8} distance={0.8}/>
  </group>;
}
function Pin({location}){
  const p=useMemo(()=>point(location.lat,location.lon,2.045),[location]);
  return <group position={p}>
    <mesh><sphereGeometry args={[0.035,18,14]}/><meshBasicMaterial color={location.color}/></mesh>
    <mesh scale={2.1}><sphereGeometry args={[0.035,18,14]}/><meshBasicMaterial color={location.color} transparent opacity={0.15}/></mesh>
    <Html position={p.clone().normalize().multiplyScalar(0.12)} center distanceFactor={5} occlude={false}>
      <div className="globe-city-label"><b>{location.name}</b><span>{location.role}</span></div>
    </Html>
  </group>;
}
function Scene(){
  const globe=useRef();
  useFrame(()=>{if(globe.current)globe.current.rotation.y+=0.00022;});
  return <>
    <color attach="background" args={['#071321']}/>
    <ambientLight intensity={1.25}/>
    <directionalLight position={[4,4,5]} intensity={2.2} color="#ffe5c5"/>
    <directionalLight position={[-4,-2,-4]} intensity={1.3} color="#3c9fd4"/>
    <pointLight position={[0,0,5]} intensity={0.6} color="#69c9ef"/>
    <Stars radius={90} depth={45} count={1100} factor={2.2} saturation={0} fade speed={0.35}/>
    <group ref={globe} rotation={[0.12,-0.72,0]}>
      <Suspense fallback={<mesh><sphereGeometry args={[2,48,48]}/><meshStandardMaterial color="#24617d" roughness={0.8}/></mesh>}>
        <Earth/>
      </Suspense>
      {locations.map(location=><Pin key={location.name} location={location}/>)}
      {destinations.map((destination,i)=><Route key={destination.name} destination={destination} index={i}/>)}
      <mesh rotation={[1.1,0.35,0]}><torusGeometry args={[2.17,0.007,6,120]}/><meshBasicMaterial color="#64c9f1" transparent opacity={0.32}/></mesh>
    </group>
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.08}><mesh position={[0,0,0]}><sphereGeometry args={[0.001,8,8]}/><meshBasicMaterial color="#fff"/></mesh></Float>
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI*0.28} maxPolarAngle={Math.PI*0.72} rotateSpeed={0.55} autoRotate autoRotateSpeed={0.18}/>
  </>;
}
export default function TradeGlobe(){
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6.5],fov:38}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}} onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;}}>
    <Scene/>
  </Canvas>;
}
