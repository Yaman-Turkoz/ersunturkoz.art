import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Yukleniyor from './components/Yukleniyor'
// İlk açılan sayfa: eager yüklenir (fallback flaş'ı olmasın).
import Anasayfa from './pages/Anasayfa'
// Diğer route'lar: talep edildiğinde lazy yüklenir (route bazlı code-splitting).
const Sanatci = lazy(() => import('./pages/Sanatci'))
const SeriDetay = lazy(() => import('./pages/SeriDetay'))
const Iletisim = lazy(() => import('./pages/Iletisim'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Suspense fallback={<Yukleniyor />}>
            <Routes location={location}>
              <Route path="/" element={<Anasayfa />} />
              <Route path="/sanatci" element={<Sanatci />} />
              <Route path="/eserler/:seriSlug" element={<SeriDetay />} />
              <Route path="/iletisim" element={<Iletisim />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
