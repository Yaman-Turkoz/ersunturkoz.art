import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoIcon from '../assets/logo/logo-icon.png'

const DILLER = [
  { kod: 'tr', etiket: 'TR' },
  { kod: 'en', etiket: 'EN' },
  { kod: 'it', etiket: 'IT' },
]

function Header() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  function bolumeKaydir(e, hedefId) {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(hedefId)?.scrollIntoView({ block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: hedefId } })
    }
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <img src={logoIcon} alt="" className="site-logo-icon" />
        <span>Ersun Türköz</span>
      </Link>

      <div className="site-header-sag">
        <nav className="site-nav">
          <a href="/#sanatci-bolum" onClick={(e) => bolumeKaydir(e, 'sanatci-bolum')}>
            {t('nav.sanatci')}
          </a>
          <a href="/#koleksiyonlar" onClick={(e) => bolumeKaydir(e, 'koleksiyonlar')}>
            {t('nav.eserler')}
          </a>
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
      </div>
    </header>
  )
}

export default Header
