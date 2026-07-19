import { useTranslation } from 'react-i18next'

function Sanatci() {
  const { t } = useTranslation()

  return (
    <section className="page page-sanatci">
      <h1>{t('sanatci.title')}</h1>
      <p>{t('sanatci.body')}</p>
    </section>
  )
}

export default Sanatci
