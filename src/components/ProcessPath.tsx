import { useLocale } from '../lib/i18n'

type ProcessPathProps = {
  steps: string[][]
  tone: 'light' | 'dark'
}

export function ProcessPath({ steps, tone }: ProcessPathProps) {
  const { t } = useLocale()
  return (
    <ol className={`process-path process-path-${tone}`}>
      {steps.map(([title, cue], index) => {
        const number = String(index + 1).padStart(2, '0')

        return (
          <li className="reveal" key={title}>
            <div className="process-path-copy">
              <span>{t('STEP', 'المرحلة')} {number}</span>
              <h3>{title}</h3>
              <p>{cue}</p>
            </div>
            <span className="process-path-node" aria-hidden="true">{number}</span>
          </li>
        )
      })}
    </ol>
  )
}
