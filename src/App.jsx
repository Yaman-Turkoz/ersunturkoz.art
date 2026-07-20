import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Anasayfa from './pages/Anasayfa'
import Sanatci from './pages/Sanatci'
import SeriDetay from './pages/SeriDetay'
import Iletisim from './pages/Iletisim'

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
          <Routes location={location}>
            <Route path="/" element={<Anasayfa />} />
            <Route path="/sanatci" element={<Sanatci />} />
            <Route path="/eserler/:seriSlug" element={<SeriDetay />} />
            <Route path="/iletisim" element={<Iletisim />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
