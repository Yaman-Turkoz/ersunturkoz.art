import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const yil = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {yil} Ersun Türköz. {t('footer.hakSaklidir')}
      </p>
    </footer>
  )
}

export default Footer
