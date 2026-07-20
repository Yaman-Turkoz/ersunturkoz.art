import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    // Header'dan bir bölüme kaydırma isteniyorsa (state.scrollTo) en üste
    // atlama; o kaydırmayı Anasayfa hallediyor.
    if (state?.scrollTo) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, state])

  return null
}

export default ScrollToTop
