import React from 'react';
import {motion,useReducedMotion} from 'framer-motion';

const parentVariants={
 hidden:{},
 visible:{transition:{staggerChildren:0.014,delayChildren:0.025}}
};
const letterVariants={
 hidden:{opacity:0,y:13,filter:'blur(4px)',rotateX:-35},
 visible:{opacity:1,y:0,filter:'blur(0px)',rotateX:0,transition:{duration:.42,ease:[.22,1,.36,1]}}
};

function flatten(node){
 if(node==null||typeof node==='boolean')return '';
 if(typeof node==='string'||typeof node==='number')return String(node);
 if(Array.isArray(node))return node.map(flatten).join('');
 if(React.isValidElement(node))return node.type==='br'?' ':flatten(node.props.children);
 return '';
}
function split(node,nextKey){
 if(node==null||typeof node==='boolean')return node;
 if(typeof node==='string'||typeof node==='number'){
  return Array.from(String(node)).map(char=><motion.span className="motion-letter" variants={letterVariants} key={nextKey()}>{char===' '?'\u00a0':char}</motion.span>);
 }
 if(Array.isArray(node))return node.map(splitNode=>split(splitNode,nextKey));
 if(React.isValidElement(node)){
  if(node.type==='br')return React.cloneElement(node,{key:node.key??nextKey()});
  return React.cloneElement(node,{key:node.key??nextKey()},split(node.props.children,nextKey));
 }
 return node;
}
export default function MotionText({as='span',children,className='',...props}){
 const reduce=useReducedMotion();
 const Component=motion[as]||motion.span;
 let index=0;
 const nextKey=()=>String(index++);
 const label=flatten(children).replace(/\s+/g,' ').trim();
 return <Component className={['motion-text',className].filter(Boolean).join(' ')} aria-label={label||undefined} variants={parentVariants} initial={reduce?false:'hidden'} whileInView={reduce?undefined:'visible'} viewport={{once:true,amount:.62}} {...props}>
  <span className="motion-text-visual" aria-hidden="true">{split(children,nextKey)}</span>
 </Component>;
}
