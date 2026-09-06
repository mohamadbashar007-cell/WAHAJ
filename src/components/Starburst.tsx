import { assetPath } from '../lib/paths'

type StarburstProps = {
  className?: string
  label?: string
  tone?: 'light' | 'dark'
}

export function Starburst({ className = '', label, tone = 'light' }: StarburstProps) {
  return (
    <span className={`starburst ${className}`} aria-label={label} role={label ? 'img' : undefined} aria-hidden={label ? undefined : true}>
      <img src={assetPath(tone === 'dark' ? '/wahaj-logo-dark.png' : '/wahaj-logo.png')} alt="" />
    </span>
  )
}
