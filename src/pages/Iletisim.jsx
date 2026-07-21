import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Mail, MessageCircle } from 'lucide-react'
import GeriButonu from '../components/GeriButonu'
import whatsappQr from '../assets/whatsapp-qr.png'

const INSTAGRAM_URL = 'https://instagram.com/ersunturkoz_art'
const INSTAGRAM_KULLANICI = '@ersunturkoz_art'
const EPOSTA = 'ersunturkoz.art@gmail.com'

const kap = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const oge = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function InstagramIkon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function Iletisim() {
  const { t } = useTranslation()

  return (
    <div className="page-iletisim">
      <GeriButonu />
      <motion.div className="iletisim-ic" variants={kap} initial="hidden" animate="visible">
        <motion.div className="iletisim-serit" variants={oge}>
          <h1>{t('iletisim.title')}</h1>
          <p className="iletisim-isim">{t('iletisim.isim')}</p>
        </motion.div>

        <motion.div className="iletisim-govde" variants={kap}>
          <motion.a
            className="iletisim-satir"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            variants={oge}
          >
            <span className="iletisim-ikon">
              <InstagramIkon />
            </span>
            <span className="iletisim-satir-metin">
              <span className="iletisim-etiket">{t('iletisim.instagram')}</span>
              <span className="iletisim-deger">{INSTAGRAM_KULLANICI}</span>
            </span>
          </motion.a>

          <motion.a className="iletisim-satir" href={`mailto:${EPOSTA}`} variants={oge}>
            <span className="iletisim-ikon">
              <Mail size={22} strokeWidth={2} />
            </span>
            <span className="iletisim-satir-metin">
              <span className="iletisim-etiket">{t('iletisim.eposta')}</span>
              <span className="iletisim-deger">{EPOSTA}</span>
            </span>
          </motion.a>

          <motion.div className="iletisim-qr" variants={oge}>
            <div className="iletisim-qr-cerceve">
              <img src={whatsappQr} alt="WhatsApp QR" />
            </div>
            <span className="iletisim-qr-etiket">
              <MessageCircle size={18} strokeWidth={2} />
              {t('iletisim.whatsapp')}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Iletisim
