import React from 'react';
import {Globe2} from 'lucide-react';

export default function BrandLogo({className=''}) {
 return <a className={['brand',className].filter(Boolean).join(' ')} href="#/" aria-label="ImportNow home">
  <span className="brand-mark" aria-hidden="true"><Globe2 size={23}/></span>
  <span className="brand-wordmark">IMPORT<span>NOW</span><small>CHINA → INDIA</small></span>
 </a>;
}
