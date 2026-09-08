import { useEffect, useState } from 'react'
import { Lottie } from 'lottie-react'

export default function Loader({ leaving }: { leaving: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - start) / 1300) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} role="status" aria-live="polite" aria-label="Chargement de l'expérience Aykoh">
      <div className="loader__top">
        <span>AYKOH®</span>
        <span>EXPERIENCE / 2026</span>
      </div>

      <div className="loader__stage" aria-hidden="true">
        <div className="loader__mark">
          <Lottie src="/ae/loader.json" autoplay loop={false} renderer="svg" />
          <span>A</span>
        </div>
        <div className="loader__counter">{String(progress).padStart(3, '0')}</div>
      </div>

      <div className="loader__bottom">
        <span>DESIGN / CODE / 3D / MOTION</span>
        <div className="loader__progress"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <span>INITIALISING</span>
      </div>
    </div>
  )
}
