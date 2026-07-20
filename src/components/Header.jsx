import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoIcon from '../assets/logo/logo-icon.png'

const DILLER = [
  { kod: 'tr', etiket: 'TR' },
  { kod: 'en', etiket: 'EN' },
  { kod: 'it', etiket: 'IT' },
]

function Header() {
  const { t, i18n } = useTranslation()

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <img src={logoIcon} alt="" className="site-logo-icon" />
        <span>Ersun Türköz</span>
      </Link>

      <nav className="site-nav">
        <Link to="/sanatci">{t('nav.sanatci')}</Link>
        <Link to="/iletisim">{t('nav.iletisim')}</Link>
      </nav>

      <div className="lang-switcher">
        {DILLER.map((dil) => (
          <button
            key={dil.kod}
            type="button"
            onClick={() => i18n.changeLanguage(dil.kod)}
            className={i18n.resolvedLanguage === dil.kod ? 'active' : ''}
          >
            {dil.etiket}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Header
