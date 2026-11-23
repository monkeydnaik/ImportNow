import React,{Suspense,useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Float,OrbitControls,Stars,useTexture} from '@react-three/drei';
import * as THREE from 'three';

const routeData=[
  {name:'Hyderabad',lat:17.385,lon:78.486,color:'#f2b65d'},
  {name:'Mumbai',lat:19.076,lon:72.878,color:'#74d5ff'},
  {name:'Chennai',lat:13.082,lon:80.271,color:'#74d5ff'}
];
const source={lat:22.57,lon:114.06};
function point(lat,lon,r=2.025){
  const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(theta)*Math.sin(phi));
}
function Earth(){
  const texture=useTexture('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  texture.colorSpace=THREE.SRGBColorSpace;
  return <group>
    <mesh>
      <sphereGeometry args={[2,72,64]}/>
      <meshStandardMaterial map={texture} roughness={0.88} metalness={0.04}/>
    </mesh>
    <mesh scale={1.045}>
      <sphereGeometry args={[2,48,40]}/>
      <meshBasicMaterial color="#57b9ec" transparent opacity={0.075} side={THREE.BackSide}/>
    </mesh>
  </group>;
}
function Route({destination,index}){
  const curve=useMemo(()=>{
    const a=point(source.lat,source.lon,2.035),b=point(destination.lat,destination.lon,2.035);
    const pts=[];
    for(let i=0;i<=80;i++){const t=i/80;pts.push(a.clone().lerp(b,t).normalize().multiplyScalar(2.035+Math.sin(Math.PI*t)*0.27));}
    return new THREE.CatmullRomCurve3(pts);
  },[destination]);
  return <group>
    <mesh>
      <tubeGeometry args={[curve,100,0.006,6,false]}/>
      <meshBasicMaterial color={index===0?'#f2b65d':'#66c8ef'} transparent opacity={index===0?0.95:0.48}/>
    </mesh>
    <Cargo curve={curve} delay={index*0.28}/>
  </group>;
}
function Cargo({curve,delay}){
  const ref=useRef();
  useFrame(({clock})=>{
    const t=(clock.getElapsedTime()*0.075+delay)%1;
    const p=curve.getPointAt(t),tangent=curve.getTangentAt(t);
    if(ref.current){ref.current.position.copy(p);ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),tangent);}
  });
  return <group ref={ref}>
    <mesh><boxGeometry args={[0.075,0.16,0.065]}/><meshStandardMaterial color="#f0ad50" metalness={0.35} roughness={0.4} emissive="#8b4d18" emissiveIntensity={0.25}/></mesh>
    <mesh position={[0,0.105,0]}><boxGeometry args={[0.08,0.035,0.07]}/><meshBasicMaterial color="#fff0c5"/></mesh>
    <pointLight color="#f2b65d" intensity={0.35} distance={0.45}/>
  </group>;
}
function Pin({lat,lon,color}){
  const p=useMemo(()=>point(lat,lon,2.045),[lat,lon]);
  return <group position={p}>
    <mesh><sphereGeometry args={[0.035,16,12]}/><meshBasicMaterial color={color}/></mesh>
    <mesh scale={1.8}><sphereGeometry args={[0.035,16,12]}/><meshBasicMaterial color={color} transparent opacity={0.18}/></mesh>
  </group>;
}
function Scene(){
  const globe=useRef();
  useFrame(({clock})=>{if(globe.current)globe.current.rotation.y+=0.00045;});
  return <>
    <color attach="background" args={['#091725']}/>
    <ambientLight intensity={1.2}/>
    <directionalLight position={[4,4,5]} intensity={2.1} color="#ffe5c5"/>
    <directionalLight position={[-4,-2,-4]} intensity={1.25} color="#3c9fd4"/>
    <Stars radius={90} depth={45} count={900} factor={2.2} saturation={0} fade speed={0.35}/>
    <group ref={globe} rotation={[0.12,-0.72,0]}>
      <Suspense fallback={<mesh><sphereGeometry args={[2,48,48]}/><meshStandardMaterial color="#24617d" roughness={0.8}/></mesh>}>
        <Earth/>
      </Suspense>
      {routeData.map((d,i)=><React.Fragment key={d.name}><Pin lat={d.lat} lon={d.lon} color={d.color}/><Route destination={d} index={i}/></React.Fragment>)}
      <Pin lat={source.lat} lon={source.lon} color="#ff9b78"/>
      <mesh rotation={[1.1,0.35,0]}><torusGeometry args={[2.17,0.007,6,120]}/><meshBasicMaterial color="#64c9f1" transparent opacity={0.32}/></mesh>
    </group>
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.08}><mesh position={[0,0,0]}><sphereGeometry args={[0.001,8,8]}/><meshBasicMaterial color="#fff"/></mesh></Float>
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI*0.28} maxPolarAngle={Math.PI*0.72} rotateSpeed={0.55} autoRotate autoRotateSpeed={0.22}/>
  </>;
}
export default function TradeGlobe(){
  return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6.5],fov:38}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}} onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;}}>
    <Scene/>
  </Canvas>;
}
