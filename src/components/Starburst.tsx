import { assetPath } from '../lib/paths'

type StarburstProps = {
  className?: string
  label?: string
}

export function Starburst({ className = '', label }: StarburstProps) {
  return (
    <span className={`starburst ${className}`} aria-label={label} role={label ? 'img' : undefined} aria-hidden={label ? undefined : true}>
      <img src={assetPath('/wahaj-logo.png')} alt="" />
    </span>
  )
}
