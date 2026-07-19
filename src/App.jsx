import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Anasayfa from './pages/Anasayfa'
import Sanatci from './pages/Sanatci'
import SeriDetay from './pages/SeriDetay'
import Iletisim from './pages/Iletisim'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/sanatci" element={<Sanatci />} />
          <Route path="/eserler/:seriSlug" element={<SeriDetay />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
