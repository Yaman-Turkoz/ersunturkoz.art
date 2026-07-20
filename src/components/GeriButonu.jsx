import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function GeriButonu({ className = '' }) {
  const { t } = useTranslation()

  return (
    <Link to="/" className={`geri-butonu ${className}`.trim()}>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span>{t('genel.geri')}</span>
    </Link>
  )
}

export default GeriButonu
