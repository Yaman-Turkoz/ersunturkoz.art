import { useTranslation } from 'react-i18next'
import DilGecis from './DilGecis'

function Footer() {
  const { t } = useTranslation()
  const yil = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <DilGecis as="p">
        © {yil} Ersun Türköz. {t('footer.hakSaklidir')}
      </DilGecis>
    </footer>
  )
}

export default Footer
