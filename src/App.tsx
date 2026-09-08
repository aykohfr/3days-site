import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Loader from './Loader'

gsap.registerPlugin(ScrollTrigger)

const Experience = lazy(() => import('./Experience'))

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
  const [enable3d, setEnable3d] = useState(false)
  const cursor = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('is-loading')
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1450)
    const loadedTimer = window.setTimeout(() => {
      setLoaded(true)
      document.documentElement.classList.remove('is-loading')
    }, 2050)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(loadedTimer)
      document.documentElement.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    if (!loaded) return

    const media = window.matchMedia('(min-width: 760px) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnable3d(media.matches)
    const delayedStart = window.setTimeout(update, 180)
    media.addEventListener('change', update)

    return () => {
      window.clearTimeout(delayedStart)
      media.removeEventListener('change', update)
    }
  }, [loaded])

  useEffect(() => {
    if (!loaded) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const move = (event: MouseEvent) => {
      if (!cursor.current) return
      gsap.to(cursor.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: 'power3.out',
        overwrite: true,
      })
    }
    window.addEventListener('mousemove', move, { passive: true })

    if (reducedMotion) {
      return () => window.removeEventListener('mousemove', move)
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const ctx = gsap.context(() => {
      gsap.from('.hero__eyebrow, .hero__title .line, .hero__foot', {
        y: 72,
        opacity: 0,
        stagger: 0.075,
        duration: 1.05,
        ease: 'power4.out',
      })

      gsap.to('.hero__title', {
        yPercent: -11,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.to('.hero__foot', {
        y: 72,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '45% top',
          end: 'bottom top',
          scrub: 0.7,
        },
      })

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 86, opacity: 0, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              end: 'top 48%',
              scrub: 0.55,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.project').forEach((card) => {
        const visual = card.querySelector<HTMLElement>('.project__visual')
        const orb = card.querySelector<HTMLElement>('.project__orb')
        const meta = card.querySelector<HTMLElement>('.project__meta')

        gsap.fromTo(
          card,
          { y: 150, rotateX: 9, opacity: 0.12 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              end: 'top 50%',
              scrub: 0.7,
            },
          },
        )

        if (visual) {
          gsap.fromTo(
            visual,
            { clipPath: 'inset(8% 5% 8% 5%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'top 42%',
                scrub: 0.65,
              },
            },
          )
        }

        if (orb) {
          gsap.fromTo(
            orb,
            { rotation: -10, scale: 0.84 },
            {
              rotation: 8,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: meta,
                start: 'top 96%',
                end: 'top 78%',
                scrub: 0.4,
              },
            },
          )
        }
      })

      gsap.to('.manifesto__word', {
        xPercent: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.fromTo(
        '.statement',
        { rotate: -2.5, scale: 0.96 },
        {
          rotate: -1.2,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: '.statement',
            start: 'top bottom',
            end: 'center center',
            scrub: 0.6,
          },
        },
      )

      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      lenis.off('scroll', onScroll)
      lenis.destroy()
      window.removeEventListener('mousemove', move)
    }
  }, [loaded])

  const setCursor = (label = '') => {
    if (!cursor.current || !cursorLabel.current) return
    cursor.current.classList.toggle('cursor--active', Boolean(label))
    cursorLabel.current.textContent = label
  }

  return (
    <>
      {!loaded && <Loader leaving={leaving} />}
      <a className="skip-link" href="#content">Aller au contenu</a>
      <div ref={cursor} className="cursor" aria-hidden="true"><span ref={cursorLabel} /></div>
      <div className="grain" aria-hidden="true" />

      {enable3d ? (
        <Suspense fallback={<div className="webgl-fallback" aria-hidden="true" />}>
          <Experience />
        </Suspense>
      ) : (
        <div className="webgl-fallback" aria-hidden="true" />
      )}

      <header className="nav">
        <a className="nav__brand" href="#top" aria-label="Aykoh — retour à l'accueil">AYKOH®</a>
        <nav className="nav__links" aria-label="Navigation principale">
          <a href="#work">WORK</a>
          <a href="#studio">STUDIO</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <span className="nav__status"><i /> AVAILABLE / 2026</span>
      </header>

      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__eyebrow">INDEPENDENT CREATIVE DEVELOPER — BELGIUM / WORLDWIDE</div>
          <h1 className="hero__title" id="hero-title">
            <span className="line">DIGITAL</span>
            <span className="line hero__title--indent">EXPERIENCES</span>
            <span className="line hero__title--outline">WITHOUT LIMITS.</span>
          </h1>
          <div className="hero__foot">
            <p>DESIGN / CODE / 3D / MOTION</p>
            <p className="hero__intro">Je transforme des idées simples en expériences numériques qui ont du poids, du rythme et une présence.</p>
            <a className="round-link" href="#work" aria-label="Voir les projets" onMouseEnter={() => setCursor('VIEW')} onMouseLeave={() => setCursor('')}><span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="manifesto" id="studio" aria-labelledby="approach-title">
          <div className="manifesto__word" aria-hidden="true">OBSESSION</div>
          <div className="manifesto__content reveal">
            <span className="kicker">/ 001 — APPROACH</span>
            <h2 id="approach-title">Créer moins.<br />Créer <em>mieux.</em></h2>
            <p>Pas d'interface générique. Pas de mouvement décoratif. Chaque interaction doit renforcer l'identité, guider l'utilisateur ou créer une sensation précise.</p>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-head reveal">
            <span className="kicker">/ 002 — SELECTED WORK</span>
            <h2 id="work-title">THREE<br />EXPERIMENTS.</h2>
            <span className="section-count">03 / 03</span>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className={`project project--${project.id}`} key={project.id} onMouseEnter={() => setCursor('OPEN')} onMouseLeave={() => setCursor('')}>
                <div className="project__visual" aria-hidden="true">
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

        <section className="capabilities" aria-labelledby="capabilities-title">
          <div className="section-head reveal">
            <span className="kicker">/ 003 — CAPABILITIES</span>
            <h2 id="capabilities-title">ONE SYSTEM.<br />MULTIPLE LAYERS.</h2>
          </div>
          <div className="capabilities__list">
            {capabilities.map(([id, title, body]) => (
              <div className="capability reveal" key={id}>
                <span>{id}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <b aria-hidden="true">↗</b>
              </div>
            ))}
          </div>
        </section>

        <section className="statement" aria-label="Design, code et 3D">
          <div className="statement__track" aria-hidden="true">
            <span>DESIGN IS MOTION — CODE IS MATERIAL — 3D IS SPACE — </span>
            <span>DESIGN IS MOTION — CODE IS MATERIAL — 3D IS SPACE — </span>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <span className="kicker reveal">/ 004 — NEXT PROJECT</span>
          <h2 className="reveal" id="contact-title">MAKE IT<br /><i>UNIGNORABLE.</i></h2>
          <div className="contact__bottom reveal">
            <p>Une idée, une marque, un lancement ou juste l'envie de construire quelque chose de différent.</p>
            <a href="mailto:contact@aykoh.fr" onMouseEnter={() => setCursor('MAIL')} onMouseLeave={() => setCursor('')}>CONTACT@AYKOH.FR <span aria-hidden="true">↗</span></a>
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
