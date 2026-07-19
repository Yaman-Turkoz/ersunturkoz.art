import { useTranslation } from 'react-i18next'

function Iletisim() {
  const { t } = useTranslation()

  return (
    <section className="page page-iletisim">
      <h1>{t('iletisim.title')}</h1>
      <p>{t('iletisim.body')}</p>
    </section>
  )
}

export default Iletisim
