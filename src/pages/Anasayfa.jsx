import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SERILER_ANASAYFA_QUERY, SERGILER_QUERY, SITE_AYARLARI_QUERY } from '../lib/queries'
import SergiModal from '../components/SergiModal'
import logoFull from '../assets/logo/logo-full.png'
import logoMobile from '../assets/logo/logo-mobile.png'

const MOBIL_SORGU = '(max-width: 768px)'

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function Anasayfa() {
  const { t } = useTranslation()
  const location = useLocation()
  const [seriler, setSeriler] = useState([])
  const [sergiler, setSergiler] = useState([])
  const [siteAyarlari, setSiteAyarlari] = useState(null)
  const [veriHazir, setVeriHazir] = useState(false)
  const [seciliSergi, setSeciliSergi] = useState(null)
  const [mobil, setMobil] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBIL_SORGU).matches,
  )
  const bekleyenKaydirmaRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia(MOBIL_SORGU)
    const degisti = (e) => setMobil(e.matches)
    mq.addEventListener('change', degisti)
    return () => mq.removeEventListener('change', degisti)
  }, [])

  useEffect(() => {
    let iptal = false
    Promise.all([
      client.fetch(SERILER_ANASAYFA_QUERY),
      client.fetch(SERGILER_QUERY),
      client.fetch(SITE_AYARLARI_QUERY),
    ])
      .then(([serilerVerisi, sergilerVerisi, ayarlar]) => {
        if (iptal) return
        setSeriler(serilerVerisi)
        setSergiler(sergilerVerisi)
        setSiteAyarlari(ayarlar)
      })
      .finally(() => {
        if (!iptal) setVeriHazir(true)
      })
    return () => {
      iptal = true
    }
  }, [])

  // Kaydırma hedefini yakala: öncelik header'dan gelen state.scrollTo'da
  // (yumuşak kaydırma); yoksa bir seriden dönüş bayrağı (anında koleksiyonlar).
  useEffect(() => {
    const stateHedef = location.state?.scrollTo
    const bayrakHedef = sessionStorage.getItem('anasayfaScroll')
    const hedef = stateHedef || bayrakHedef
    if (!hedef) return
    bekleyenKaydirmaRef.current = { hedef, yumusak: Boolean(stateHedef) }
    if (bayrakHedef) sessionStorage.removeItem('anasayfaScroll')
    if (stateHedef) window.history.replaceState({}, '')
  }, [location.state])

  // Bekleyen kaydırmayı uygula. İçerik (özellikle Sanatçı fotoğrafı) yüklenince
  // yükseklik değiştiği için veriHazir olana kadar hedefi tazeleyip yeniden
  // konumlanır; nihai konumda hedefi temizler.
  useEffect(() => {
    if (!bekleyenKaydirmaRef.current) return
    const { hedef, yumusak } = bekleyenKaydirmaRef.current
    const kareId = requestAnimationFrame(() => {
      document.getElementById(hedef)?.scrollIntoView({
        block: 'start',
        behavior: yumusak ? 'smooth' : 'instant',
      })
      if (veriHazir) bekleyenKaydirmaRef.current = null
    })
    return () => cancelAnimationFrame(kareId)
  }, [seriler, sergiler, siteAyarlari, veriHazir])

  return (
    <div className="page-anasayfa">
      <section className="hero">
        {siteAyarlari?.heroEserGorseli && (
          <motion.img
            src={urlFor(siteAyarlari.heroEserGorseli).width(1200).url()}
            alt=""
            className="hero-eser-gorseli"
            initial={mobil ? { opacity: 0, y: 12 } : { opacity: 0, x: -50 }}
            animate={mobil ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}

        {mobil ? (
          <motion.img
            src={logoMobile}
            alt="Ersun Türköz"
            className="hero-logo-mobil"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ) : (
          <motion.img
            src={logoFull}
            alt="Ersun Türköz"
            className="hero-logo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}
      </section>

      <motion.section className="tanitim" id="sanatci-bolum" {...sectionReveal}>
        <div className="tanitim-icerik">
          {siteAyarlari?.sanatciFotografi && (
            <div className="tanitim-foto">
              <img
                src={urlFor(siteAyarlari.sanatciFotografi).width(600).height(800).fit('crop').url()}
                alt=""
              />
            </div>
          )}
          <div className="tanitim-metin">
            <h2>{t('home.tanitimBaslik')}</h2>
            <p>{t('home.tanitimMetin')}</p>
            <Link to="/sanatci" className="tanitim-link">
              {t('home.sanatciKesfet')}
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="seriler" id="koleksiyonlar" {...sectionReveal}>
        <div className="seriler-ic">
          <h2 className="bolum-baslik">{t('home.koleksiyonlar')}</h2>
          <div className="kart-grid">
            {seriler.map((seri) => (
              <Link
                key={seri._id}
                to={`/eserler/${seri.slug}`}
                className="kart"
                onClick={() => sessionStorage.setItem('anasayfaScroll', 'koleksiyonlar')}
              >
                <div className="kart-gorsel-alan">
                  {seri.kapakGorseli && (
                    <img src={urlFor(seri.kapakGorseli).width(500).height(667).fit('crop').url()} alt="" />
                  )}
                </div>
                <div className="kart-bilgi">
                  <h2>{seri.baslik}</h2>
                  <span className="kart-altbilgi">{t('home.seriEtiket')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {sergiler.length > 0 && (
        <motion.section className="sergiler" id="sergiler" {...sectionReveal}>
          <div className="sergiler-ic">
            <h2 className="bolum-baslik">{t('home.gecmisSergiler')}</h2>
            <div className="sergi-liste">
              {sergiler.map((sergi) => (
                <div key={sergi._id} className="sergi-satir">
                  <button
                    type="button"
                    className="sergi-gorsel"
                    onClick={() => setSeciliSergi(sergi)}
                    aria-label={sergi.baslik}
                  >
                    {sergi.gorseller?.[0] && (
                      <img
                        src={urlFor(sergi.gorseller[0]).width(600).height(450).fit('crop').url()}
                        alt=""
                      />
                    )}
                    <span className="sergi-gorsel-overlay" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M9 21H3v-6" />
                        <path d="M21 3l-7 7" />
                        <path d="M3 21l7-7" />
                      </svg>
                    </span>
                  </button>

                  <div className="sergi-metin">
                    <h3>{sergi.baslik}</h3>
                    {sergi.aciklama && <p>{sergi.aciklama}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <AnimatePresence>
        {seciliSergi && (
          <SergiModal sergi={seciliSergi} onClose={() => setSeciliSergi(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Anasayfa
