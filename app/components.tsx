import Link from "next/link";
import { ArrowRight, BrainCircuit, ChevronRight, CircleCheck, Menu, Sparkles } from "lucide-react";

export const nav = [
  ["Product", "/product"], ["How it works", "/how-it-works"], ["Use cases", "/use-cases"], ["Company", "/company"]
];

export function Logo({ light=false }: {light?: boolean}) {
  return <Link href="/decision-in-motion" className={`logo ${light ? "light" : ""}`} aria-label="GPTMinds home"><span className="logoMark"><i/><i/><i/></span>GPTMinds</Link>
}

export function Nav({ mode="light", accent="Access" }: {mode?: "light"|"dark"|"trace", accent?: string}) {
  return <header className={`nav nav-${mode}`}><Logo light={mode==="dark"}/><nav>{nav.map(([n,h])=><Link href={h} key={h}>{n}</Link>)}</nav><Link className="navCta" href="/request-access">{accent}<ArrowRight size={15}/></Link><Menu className="mobileMenu" aria-label="Menu"/></header>
}

export function Footer({ dark=false }: {dark?: boolean}) {
 return <footer className={dark ? "footer dark" : "footer"}><div><Logo light={dark}/><p>A decision engine for small businesses.</p></div><div className="footerLinks"><section><b>Explore</b>{nav.map(([n,h])=><Link href={h} key={h}>{n}</Link>)}</section><section><b>Connect</b><Link href="/request-access">Request access</Link><Link href="/contact">Contact</Link></section><section><b>Legal</b><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></section></div><small>© 2026 GPTMinds, Inc.</small></footer>
}

export function Eyebrow({children}: {children: React.ReactNode}) { return <div className="eyebrow"><Sparkles size={13}/>{children}</div> }
export function Button({href="/request-access", children="Request early access", ghost=false}: {href?:string, children?:React.ReactNode, ghost?:boolean}) { return <Link href={href} className={ghost ? "button ghost" : "button"}>{children}<ArrowRight size={17}/></Link> }
export function SectionHead({eyebrow,title,body,center=false}: {eyebrow:string,title:string,body?:string,center?:boolean}) { return <div className={`sectionHead ${center?"center":""}`}><span>{eyebrow}</span><h2>{title}</h2>{body&&<p>{body}</p>}</div> }

export const TraceCard = ({compact=false}:{compact?:boolean}) => <div className={`traceCard ${compact?"compact":""}`}>
  <div className="traceTop"><span>DECISION TRACE · DT-0186</span><span className="resolved"><CircleCheck size={13}/> Resolved</span></div>
  <h3>Reschedule a long-time patient?</h3>
  <div className="traceFlow">
    <div><small>TRIGGER</small><b>Same-day change request</b><p>Patient has a time-sensitive conflict</p></div><ChevronRight/>
    <div><small>CONTEXT</small><b>8-year patient</b><p>Previous flexibility promised</p></div><ChevronRight/>
    <div><small>DECISION</small><b>Make an exception</b><p>Offer protected Friday slot</p></div>
  </div>
  <div className="evidence"><BrainCircuit size={16}/><span><b>Why:</b> Relationship history + prior commitment outweighed the standard 24-hour policy.</span></div>
</div>;

export const facts = [
 ["01","Connect the fragments","GPTMinds assembles the relevant context from the systems where work already happens."],
 ["02","Model how work relates","It maps customers, commitments, rules, events, and the people with authority to decide."],
 ["03","Learn from decisions","Every escalation becomes a reusable trace: what mattered, what happened, and whether it worked."],
 ["04","Act with judgment","AI handles the next similar situation—or brings a clear, evidence-backed choice to a human."]
];

export function Founder({dark=false}:{dark?:boolean}) { return <section className={`founder ${dark?"dark":""}`}><div className="founderMonogram">VT</div><div><Eyebrow>Founder-market fit</Eyebrow><h2>Built from nine years inside the problem.</h2><p>Vijay Thirumalai is a software engineer who built data infrastructure for large enterprises—and a bootstrapped software services company to approximately $10M in revenue. Running it for nine years made the problem visceral: hundreds of small decisions accumulated around the owner.</p><p>After five months working closely with eye doctors, dentists, and other service businesses, he is transitioning out of day-to-day operations to build GPTMinds full-time.</p><b>Vijay Thirumalai <span>· Founder, GPTMinds</span></b></div></section> }

export function BuildNote({dark=false}:{dark?:boolean}) {return <section className={`buildNote ${dark?"dark":""}`}><span className="pulse"/><div><b>Building now, with real businesses</b><p>We’re working alongside a small group of service-business owners to build customer-specific versions. This is early, hands-on product work—not a claim of broad deployment.</p></div><Button/></section>}
