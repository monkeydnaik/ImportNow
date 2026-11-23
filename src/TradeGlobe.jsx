import React,{Suspense,useMemo,useRef} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {useTexture,Html,OrbitControls,Stars} from '@react-three/drei';
import * as THREE from 'three';

const R=2;
const cities=[
 {name:'Shanghai',lat:31.23,lon:121.47,kind:'cn',role:'CHINA · ORIGIN'},
 {name:'Yiwu',lat:29.31,lon:120.08,kind:'cn',role:'SOURCING HUB'},
 {name:'Guangzhou',lat:23.13,lon:113.26,kind:'cn',role:'MANUFACTURING'},
 {name:'Shenzhen',lat:22.54,lon:114.06,kind:'cn',role:'TECHNOLOGY'},
 {name:'Nhava Sheva',lat:18.95,lon:72.95,kind:'in',role:'INDIA · WEST'},
 {name:'Chennai',lat:13.08,lon:80.27,kind:'in',role:'INDIA · PORT'},
 {name:'Hyderabad',lat:17.39,lon:78.49,kind:'in',role:'INDIA · DELIVERY'},
 {name:'Vizag',lat:17.69,lon:83.22,kind:'in',role:'INDIA · EAST'}
];
const cityByName=Object.fromEntries(cities.map(c=>[c.name,c]));
function point(lat,lon,r=R){
 const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
 return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
}
const routeData=[
 ['Shanghai','Chennai',0xe3241b,0],
 ['Yiwu','Nhava Sheva',0xff9c52,.3],
 ['Guangzhou','Vizag',0xffffff,.62],
 ['Shenzhen','Hyderabad',0xffffff,.15],
 ['Shanghai','Hyderabad',0xe3241b,.48],
 ['Guangzhou','Chennai',0xff5548,.82]
];
const texBase='https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/';
function Earth(){
 const [color,normal,specular,night,clouds]=useTexture([
  texBase+'earth_atmos_2048.jpg',
  texBase+'earth_normal_2048.jpg',
  texBase+'earth_specular_2048.jpg',
  texBase+'earth_lights_2048.png',
  texBase+'earth_clouds_1024.png'
 ]);
 color.colorSpace=THREE.SRGBColorSpace;
 night.colorSpace=THREE.SRGBColorSpace;
 clouds.colorSpace=THREE.SRGBColorSpace;
 const material=useMemo(()=>new THREE.MeshPhongMaterial({
  map:color,normalMap:normal,normalScale:new THREE.Vector2(.8,-.8),
  specularMap:specular,specular:new THREE.Color(0x526d91),shininess:26,
  emissiveMap:night,emissive:new THREE.Color(0xffb86d),emissiveIntensity:1.15
 }),[color,normal,specular,night]);
 const cloudRef=useRef();
 useFrame(({clock})=>{if(cloudRef.current)cloudRef.current.rotation.y=clock.elapsedTime*.009;});
 return <group>
  <mesh><sphereGeometry args={[R,128,128]}/><primitive object={material} attach="material"/></mesh>
  <mesh ref={cloudRef} scale={1.012}><sphereGeometry args={[R,96,96]}/><meshPhongMaterial map={clouds} transparent opacity={.7} depthWrite={false} shininess={4}/></mesh>
  <mesh scale={1.025}><sphereGeometry args={[R,80,80]}/><meshBasicMaterial color="#68bff0" transparent opacity={.09} side={THREE.BackSide}/></mesh>
  <mesh scale={1.085}><sphereGeometry args={[R,64,64]}/><meshBasicMaterial color="#4d94d8" transparent opacity={.055} side={THREE.BackSide}/></mesh>
 </group>;
}
function CityPin({city}){
 const p=useMemo(()=>point(city.lat,city.lon,R*1.006),[city]);
 const ring=useRef(),dot=useRef();
 const normal=p.clone().normalize();
 const quaternion=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),normal);
 const color=city.kind==='cn'?'#ef5543':'#f5c06d';
 useFrame(({clock})=>{
  const t=(clock.elapsedTime*.55+(city.lat%7)*.13)%1;
  if(ring.current){ring.current.scale.setScalar(1+t*2.2);ring.current.material.opacity=(1-t)*.8;}
  if(dot.current)dot.current.scale.setScalar(1+Math.sin(clock.elapsedTime*2.5+city.lon)*.12);
 });
 const showLabel=['Shanghai','Guangzhou','Shenzhen','Hyderabad','Chennai','Nhava Sheva'].includes(city.name);
 return <group position={p}>
  <mesh ref={dot}><sphereGeometry args={[.024,16,16]}/><meshBasicMaterial color={color}/></mesh>
  <mesh ref={ring} quaternion={quaternion}><ringGeometry args={[.035,.047,36]}/><meshBasicMaterial color={color} transparent opacity={.7} side={THREE.DoubleSide} depthWrite={false}/></mesh>
  {showLabel&&<Html position={[city.name==='Nhava Sheva'||city.name==='Hyderabad'?-.34:.28,city.name==='Chennai'?-.12:.17,.04]} center distanceFactor={5.6} occlude={false}>
   <div className="globe-city-label"><b>{city.name}</b><span>{city.role}</span></div>
  </Html>}
 </group>;
}
function TradeRoute({route,index}){
 const [from,to,color,offset]=route;
 const curve=useMemo(()=>{
  const a=point(cityByName[from].lat,cityByName[from].lon,R*1.025);
  const b=point(cityByName[to].lat,cityByName[to].lon,R*1.025);
  const control=a.clone().add(b).normalize().multiplyScalar(R+a.distanceTo(b)*.48);
  return new THREE.QuadraticBezierCurve3(a,control,b);
 },[from,to]);
 const pulse=useRef();
 const geometry=useMemo(()=>new THREE.TubeGeometry(curve,96,.0065,7,false),[curve]);
 useFrame(({clock})=>{
  if(!pulse.current)return;
  const t=(clock.elapsedTime*.085+offset)%1;
  pulse.current.position.copy(curve.getPoint(t));
  pulse.current.scale.setScalar(.75+Math.sin(clock.elapsedTime*5+index)*.2);
 });
 return <group>
  <mesh geometry={geometry}><meshBasicMaterial color={color} transparent opacity={index===0?.88:.4} depthWrite={false}/></mesh>
  <mesh ref={pulse}><sphereGeometry args={[.022,12,12]}/><meshBasicMaterial color={index===0?'#fff0c7':'#b5eaff'} toneMapped={false}/></mesh>
 </group>;
}
function MiniShip({route}){
 const ref=useRef();
 const curve=useMemo(()=>{
  const a=point(cityByName[route[0]].lat,cityByName[route[0]].lon,R*1.035);
  const b=point(cityByName[route[1]].lat,cityByName[route[1]].lon,R*1.035);
  return new THREE.QuadraticBezierCurve3(a,a.clone().add(b).normalize().multiplyScalar(R+a.distanceTo(b)*.5),b);
 },[route]);
 useFrame(({clock})=>{
  const t=(clock.elapsedTime*.055+.24)%1,p=curve.getPoint(t),tan=curve.getTangent(t);
  if(ref.current){ref.current.position.copy(p);ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),tan);}
 });
 return <group ref={ref} scale={.65}>
  <mesh position={[0,0,0]}><boxGeometry args={[.16,.025,.055]}/><meshStandardMaterial color="#e7a45c" metalness={.35} roughness={.45}/></mesh>
  <mesh position={[-.025,.035,0]}><boxGeometry args={[.07,.05,.05]}/><meshStandardMaterial color="#2c718d"/></mesh>
  <mesh position={[.035,.035,0]}><boxGeometry args={[.055,.05,.05]}/><meshStandardMaterial color="#df6551"/></mesh>
  <mesh position={[-.055,.025,0]}><boxGeometry args={[.025,.04,.045]}/><meshStandardMaterial color="#e7e8e2"/></mesh>
 </group>;
}
function GlobeScene(){
 const focus=useMemo(()=>point(22,96,1),[]);
 const baseY=-Math.atan2(focus.x,focus.z),baseX=Math.asin(focus.y);
 return <>
  <color attach="background" args={['#071522']}/>
  <ambientLight intensity={.38}/>
  <hemisphereLight args={['#c9e5f4','#142a3a',.72]}/>
  <directionalLight position={[-5,3,6]} intensity={2.6} color="#fff0d8"/>
  <directionalLight position={[5,-2,-5]} intensity={.7} color="#398bc4"/>
  <Stars radius={90} depth={45} count={1200} factor={2.1} saturation={0} fade speed={.25}/>
  <group rotation={[baseX,baseY,0]}>
   <Suspense fallback={<mesh><sphereGeometry args={[R,48,48]}/><meshStandardMaterial color="#1d5671"/></mesh>}>
    <Earth/>
   </Suspense>
   {cities.map(city=><CityPin key={city.name} city={city}/>)}
   {routeData.map((route,i)=><TradeRoute key={route[0]+route[1]} route={route} index={i}/>)}
   <MiniShip route={routeData[0]}/>
   <mesh rotation={[1.15,.35,0]}><torusGeometry args={[2.17,.007,6,128]}/><meshBasicMaterial color="#6bcaf0" transparent opacity={.3}/></mesh>
  </group>
  <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI*.28} maxPolarAngle={Math.PI*.72} rotateSpeed={.48} autoRotate autoRotateSpeed={.16}/>
 </>;
}
export default function TradeGlobe(){
 return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6.65],fov:38}} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}} onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=1.08;}}>
  <GlobeScene/>
 </Canvas>;
}
