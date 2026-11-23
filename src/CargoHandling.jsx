import React from 'react';

export default function CargoHandling(){
 return <section className="cargo-ops container" aria-labelledby="cargo-ops-title">
  <div className="cargo-ops-heading">
   <div><div className="eyebrow"><i/> PORT OPERATIONS</div><h2 id="cargo-ops-title">Cargo moves.<br/><em>Every box has a place.</em></h2></div>
   <p>Watch a container move between vessel and quay through a simple loading and unloading cycle.</p>
  </div>
  <div className="cargo-terminal" role="img" aria-label="Animated port crane transfers shipping containers between a cargo vessel and the dock">
   <div className="terminal-sky"><span className="terminal-sun"/><span className="terminal-cloud cloud-a"/><span className="terminal-cloud cloud-b"/></div>
   <div className="terminal-crane"><div className="crane-tower"/><div className="crane-top"/><div className="crane-arm"/><div className="crane-cabin"/><div className="crane-cable"/><div className="crane-spreader"/></div>
   <div className="cargo-transfer cargo-transfer-one"><span/></div>
   <div className="cargo-transfer cargo-transfer-two"><span/></div>
   <div className="terminal-ship"><div className="ship-bridge"/><div className="ship-deck"><i/><i/><i/><i/><i/><i/></div><div className="ship-hull"/></div>
   <div className="terminal-quay"><span className="quay-mark">IMPORTNOW · PORT 01</span><i/><i/><i/></div>
   <div className="terminal-water"><span/><span/><span/></div>
   <div className="terminal-status"><b><i/> LIVE CARGO HANDLING</b><span>LOAD → TRANSFER → UNLOAD</span></div>
  </div>
  <div className="cargo-ops-steps"><div><b>01</b><span>LOAD</span><small>Container lifted from vessel</small></div><div><b>02</b><span>TRANSFER</span><small>Crane moves cargo across the quay</small></div><div><b>03</b><span>UNLOAD</span><small>Container placed in the port yard</small></div></div>
 </section>;
}
