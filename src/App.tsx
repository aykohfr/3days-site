import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Experience from './Experience'
import Loader from './Loader'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'OBSIDIAN', type: 'Interactive identity', note: 'Realtime / WebGL' },
  { id: '02', title: 'ZERO//ONE', type: 'Digital launch', note: 'Motion / Direction' },
  { id: '03', title: 'NOCTURNE', type: 'Immersive platform', note: '3D / Experience' },
]

const capabilities = [
  ['01', 'Creative development', 'Interfaces sur mesure, systèmes fluides et expériences web performantes.'],
  ['02', 'Realtime 3D', 'WebGL, shaders, particules et objets interactifs directement dans le navigateur.'],
  ['03', 'Motion systems', 'Transitions cinématiques, rythme typographique et chorégraphies pilotées par le scroll.'],
  ['04', 'Visual direction', 'Systèmes visuels sobres, radicaux et cohérents, pensés comme des maquettes de design.'],
]

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const cursor = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1150)
    const loadedTimer = window.setTimeout(() => setLoaded(true), 1800)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(loadedTimer)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true })
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const move = (event: MouseEvent) => {
      if (!cursor.current) return
      gsap.to(cursor.current, { x: event.clientX, y: event.clientY, duration: 0.22, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move)

    const ctx = gsap.context(() => {
      gsap.from('.hero__eyebrow, .hero__title .line, .hero__foot', {
        y: 70,
        opacity: 0,
        stagger: 0.08,
        duration: 1.15,
        delay: 1.55,
        ease: 'power4.out',
      })

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 70, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.project').forEach((card, index) => {
        gsap.fromTo(card, { y: 130, rotateX: 10, opacity: 0 }, {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })

      gsap.to('.manifesto__word', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })

    return () => {
      ctx.revert()
      lenis.off('scroll', onScroll)
      lenis.destroy()
      window.removeEventListener('mousemove', move)
    }
  }, [])

  const setCursor = (label = '') => {
    if (!cursor.current || !cursorLabel.current) return
    cursor.current.classList.toggle('cursor--active', Boolean(label))
    cursorLabel.current.textContent = label
  }

  return (
    <>
      {!loaded && <Loader leaving={leaving} />}
      <div ref={cursor} className="cursor"><span ref={cursorLabel} /></div>
      <div className="grain" aria-hidden="true" />
      <Experience />

      <header className="nav">
        <a className="nav__brand" href="#top" aria-label="Aykoh accueil">AYKOH®</a>
        <nav className="nav__links" aria-label="Navigation principale">
          <a href="#work">WORK</a>
          <a href="#studio">STUDIO</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <span className="nav__status"><i /> AVAILABLE / 2026</span>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__eyebrow">INDEPENDENT CREATIVE DEVELOPER — BELGIUM / WORLDWIDE</div>
          <h1 className="hero__title">
            <span className="line">DIGITAL</span>
            <span className="line hero__title--indent">EXPERIENCES</span>
            <span className="line hero__title--outline">WITHOUT LIMITS.</span>
          </h1>
          <div className="hero__foot">
            <p>DESIGN / CODE / 3D / MOTION</p>
            <p className="hero__intro">Je transforme des idées simples en expériences numériques qui ont du poids, du rythme et une présence.</p>
            <a className="round-link" href="#work" onMouseEnter={() => setCursor('VIEW')} onMouseLeave={() => setCursor('')}><span>↓</span></a>
          </div>
        </section>

        <section className="manifesto" id="studio">
          <div className="manifesto__word">OBSESSION</div>
          <div className="manifesto__content reveal">
            <span className="kicker">/ 001 — APPROACH</span>
            <h2>Créer moins.<br />Créer <em>mieux.</em></h2>
            <p>Pas d'interface générique. Pas de mouvement décoratif. Chaque interaction doit renforcer l'identité, guider l'utilisateur ou créer une sensation précise.</p>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-head reveal">
            <span className="kicker">/ 002 — SELECTED WORK</span>
            <h2>THREE<br />EXPERIMENTS.</h2>
            <span className="section-count">03 / 03</span>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className={`project project--${project.id}`} key={project.id} onMouseEnter={() => setCursor('OPEN')} onMouseLeave={() => setCursor('')}>
                <div className="project__visual">
                  <div className="project__orb" />
                  <span className="project__stamp">AYK / {project.id}</span>
                  <span className="project__cross">+</span>
                </div>
                <div className="project__meta">
                  <span>{project.id}</span>
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                  <span>{project.note}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities">
          <div className="section-head reveal">
            <span className="kicker">/ 003 — CAPABILITIES</span>
            <h2>ONE SYSTEM.<br />MULTIPLE LAYERS.</h2>
          </div>
          <div className="capabilities__list">
            {capabilities.map(([id, title, body]) => (
              <div className="capability reveal" key={id}>
                <span>{id}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <b>↗</b>
              </div>
            ))}
          </div>
        </section>

        <section className="statement">
          <div className="statement__track">
            <span>DESIGN IS MOTION — CODE IS MATERIAL — 3D IS SPACE — </span>
            <span>DESIGN IS MOTION — CODE IS MATERIAL — 3D IS SPACE — </span>
          </div>
        </section>

        <section className="contact" id="contact">
          <span className="kicker reveal">/ 004 — NEXT PROJECT</span>
          <h2 className="reveal">MAKE IT<br /><i>UNIGNORABLE.</i></h2>
          <div className="contact__bottom reveal">
            <p>Une idée, une marque, un lancement ou juste l'envie de construire quelque chose de différent.</p>
            <a href="mailto:contact@aykoh.fr" onMouseEnter={() => setCursor('MAIL')} onMouseLeave={() => setCursor('')}>CONTACT@AYKOH.FR <span>↗</span></a>
          </div>
          <footer>
            <span>© 2026 AYKOH</span>
            <span>CREATIVE DEVELOPMENT / BELGIUM</span>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>
    </>
  )
}
