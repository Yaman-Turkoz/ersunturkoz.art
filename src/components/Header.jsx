import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import logoIcon from '../assets/logo/logo-icon.png'

const DILLER = [
  { kod: 'tr', etiket: 'TR' },
  { kod: 'en', etiket: 'EN' },
  { kod: 'it', etiket: 'IT' },
]

const BOLUM_LINKLERI = [
  { hedef: 'sanatci-bolum', anahtar: 'nav.sanatci' },
  { hedef: 'koleksiyonlar', anahtar: 'nav.koleksiyonlar' },
  { hedef: 'sergiler', anahtar: 'nav.sergiler' },
]

const menuListe = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
}

const menuOge = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function Header() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAcik, setMenuAcik] = useState(false)

  function bolumeKaydir(e, hedefId) {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(hedefId)?.scrollIntoView({ block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: hedefId } })
    }
  }

  function bolumeKaydirMobil(e, hedefId) {
    setMenuAcik(false)
    bolumeKaydir(e, hedefId)
  }

  useEffect(() => {
    if (!menuAcik) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuAcik(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuAcik])

  const dilButonlari = DILLER.map((dil) => (
    <button
      key={dil.kod}
      type="button"
      onClick={() => i18n.changeLanguage(dil.kod)}
      className={i18n.resolvedLanguage === dil.kod ? 'active' : ''}
    >
      {dil.etiket}
    </button>
  ))

  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-logo">
          <img src={logoIcon} alt="Ersun Türköz" className="site-logo-icon" />
        </Link>

        <div className="site-header-sag">
          <nav className="site-nav">
            {BOLUM_LINKLERI.map((l) => (
              <a key={l.hedef} href={`/#${l.hedef}`} onClick={(e) => bolumeKaydir(e, l.hedef)}>
                {t(l.anahtar)}
              </a>
            ))}
            <Link to="/iletisim">{t('nav.iletisim')}</Link>
          </nav>

          <div className="lang-switcher">{dilButonlari}</div>
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuAcik(true)}
          aria-label={t('nav.menu')}
          aria-expanded={menuAcik}
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {menuAcik && (
          <>
            <motion.div
              className="mobil-menu-overlay"
              onClick={() => setMenuAcik(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="mobil-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <button
                type="button"
                className="mobil-menu-kapat"
                onClick={() => setMenuAcik(false)}
                aria-label={t('eserModal.kapat')}
              >
                ×
              </button>

              <motion.div
                className="mobil-menu-liste"
                variants={menuListe}
                initial="hidden"
                animate="visible"
              >
                {BOLUM_LINKLERI.map((l) => (
                  <motion.div key={l.hedef} variants={menuOge}>
                    <a href={`/#${l.hedef}`} onClick={(e) => bolumeKaydirMobil(e, l.hedef)}>
                      {t(l.anahtar)}
                    </a>
                  </motion.div>
                ))}
                <motion.div variants={menuOge}>
                  <Link to="/iletisim" onClick={() => setMenuAcik(false)}>
                    {t('nav.iletisim')}
                  </Link>
                </motion.div>

                <motion.div variants={menuOge} className="lang-switcher mobil-lang">
                  {dilButonlari}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
