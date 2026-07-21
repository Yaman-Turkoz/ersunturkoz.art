import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

const FORMSPREE_URL = 'https://formspree.io/f/mykrpljr'
const EPOSTA_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const acilis = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

function GeriOk() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function IlgiFormu({ eserBasligi, onGeri }) {
  const { t } = useTranslation()
  const [adSoyad, setAdSoyad] = useState('')
  const [eposta, setEposta] = useState('')
  const [telefon, setTelefon] = useState('')
  const [hatalar, setHatalar] = useState({})
  const [durum, setDurum] = useState('idle') // idle | gonderiliyor | basarili | hata

  function dogrula() {
    const yeni = {}
    if (!adSoyad.trim()) yeni.adSoyad = t('ilgiForm.zorunlu')
    if (!eposta.trim()) yeni.eposta = t('ilgiForm.zorunlu')
    else if (!EPOSTA_REGEX.test(eposta.trim())) yeni.eposta = t('ilgiForm.gecersizEposta')
    if (!telefon.trim()) yeni.telefon = t('ilgiForm.zorunlu')
    setHatalar(yeni)
    return Object.keys(yeni).length === 0
  }

  async function gonder(e) {
    e.preventDefault()
    if (durum === 'gonderiliyor') return
    if (!dogrula()) return

    setDurum('gonderiliyor')
    try {
      const yanit = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'Ad Soyad': adSoyad.trim(),
          email: eposta.trim(),
          Telefon: telefon.trim(),
          'İlgilenilen Eser': eserBasligi,
          _subject: `Eser İlgi: ${eserBasligi}`,
        }),
      })

      if (yanit.ok) {
        setDurum('basarili')
        setAdSoyad('')
        setEposta('')
        setTelefon('')
        setHatalar({})
      } else {
        setDurum('hata')
      }
    } catch {
      setDurum('hata')
    }
  }

  if (durum === 'basarili') {
    return (
      <motion.div className="ilgi-form-sonuc" {...acilis}>
        <p className="ilgi-form-basarili">{t('ilgiForm.basariliMesaj')}</p>
        <button type="button" className="eser-modal-ilgileniyorum" onClick={onGeri}>
          {t('ilgiForm.geri')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div className="ilgi-form-panel" {...acilis}>
      <button type="button" className="ilgi-form-geri" onClick={onGeri}>
        <GeriOk />
        {t('ilgiForm.geri')}
      </button>

      <h2 className="ilgi-form-baslik">{t('ilgiForm.baslik')}</h2>
      {eserBasligi && <p className="ilgi-form-eser">{eserBasligi}</p>}

      <form onSubmit={gonder} noValidate>
        <div className="ilgi-alan">
          <label htmlFor="ilgi-ad">{t('ilgiForm.adSoyad')}</label>
          <input
            id="ilgi-ad"
            type="text"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            aria-invalid={Boolean(hatalar.adSoyad)}
          />
          {hatalar.adSoyad && <span className="ilgi-hata">{hatalar.adSoyad}</span>}
        </div>

        <div className="ilgi-alan">
          <label htmlFor="ilgi-eposta">{t('ilgiForm.eposta')}</label>
          <input
            id="ilgi-eposta"
            type="email"
            value={eposta}
            onChange={(e) => setEposta(e.target.value)}
            aria-invalid={Boolean(hatalar.eposta)}
          />
          {hatalar.eposta && <span className="ilgi-hata">{hatalar.eposta}</span>}
        </div>

        <div className="ilgi-alan">
          <label htmlFor="ilgi-telefon">{t('ilgiForm.telefon')}</label>
          <input
            id="ilgi-telefon"
            type="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            aria-invalid={Boolean(hatalar.telefon)}
          />
          {hatalar.telefon && <span className="ilgi-hata">{hatalar.telefon}</span>}
        </div>

        {durum === 'hata' && (
          <p className="ilgi-form-hata-mesaj">{t('ilgiForm.hataMesaj')}</p>
        )}

        <button
          type="submit"
          className="eser-modal-ilgileniyorum"
          disabled={durum === 'gonderiliyor'}
        >
          {durum === 'gonderiliyor' ? t('ilgiForm.gonderiliyor') : t('ilgiForm.gonder')}
        </button>
      </form>
    </motion.div>
  )
}

export default IlgiFormu
