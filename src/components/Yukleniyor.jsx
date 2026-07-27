import { useTranslation } from 'react-i18next'

// Suspense fallback — sayfa chunk'ı yüklenirken kısa süre görünür.
// Sade, palete uygun spinner. prefers-reduced-motion CSS'te dönmeyi kapatır.
function Yukleniyor() {
  const { t } = useTranslation()

  return (
    <div className="yukleniyor" role="status" aria-live="polite">
      <span className="yukleniyor-spinner" aria-hidden="true" />
      <span className="yukleniyor-metin">{t('genel.yukleniyor')}</span>
    </div>
  )
}

export default Yukleniyor
