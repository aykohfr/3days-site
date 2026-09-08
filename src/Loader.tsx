import { Lottie } from 'lottie-react'
import loaderAnimation from './ae/loader.json'

export default function Loader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`}>
      <div className="loader__mark">
        <Lottie src={loaderAnimation} loop autoplay />
        <span>A</span>
      </div>
      <div className="loader__meta">
        <span>AYKOH / DIGITAL EXPERIENCE</span>
        <span>2026</span>
      </div>
    </div>
  )
}
