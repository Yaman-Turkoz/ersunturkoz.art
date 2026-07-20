import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import './i18n'
import './styles/tokens.css'
import './index.css'
import App from './App.jsx'

// Tarayıcının sayfa yenilemede eski scroll konumunu geri yüklemesini kapat;
// böylece anasayfa/sayfalar her zaman en üstten açılır.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
