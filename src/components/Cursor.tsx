import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const el = cursor.current
    if (!el) return
    const move = (event: PointerEvent) => {
      el.style.setProperty('--x', `${event.clientX}px`)
      el.style.setProperty('--y', `${event.clientY}px`)
    }
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button')
      setLabel(target?.dataset.cursor || (target ? '↗' : ''))
    }
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    return () => {
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
    }
  }, [])

  return <div ref={cursor} className={label ? 'cursor is-active' : 'cursor'} aria-hidden="true"><span>{label}</span></div>
}
