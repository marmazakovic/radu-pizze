import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { STORAGE_KEYS } from './config/site'
import { CartProvider } from './context/CartContext'
import { BackgroundDecor } from './components/BackgroundDecor'
import { Carousel } from './components/Carousel'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LoadingScreen } from './components/LoadingScreen'
import { Location } from './components/Location'
import { Menu } from './components/Menu'
import { Navbar } from './components/Navbar'
import { Order } from './components/Order'

function App() {
  const [ready, setReady] = useState(
    () => localStorage.getItem(STORAGE_KEYS.loadingSeen) === '1',
  )

  const onLoadingComplete = () => {
    localStorage.setItem(STORAGE_KEYS.loadingSeen, '1')
    setReady(true)
  }

  return (
    <CartProvider>
      <a href="#main-content" className="skip-link">
        Preskoči na sadržaj
      </a>

      <AnimatePresence>
        {!ready && <LoadingScreen key="loader" onComplete={onLoadingComplete} />}
      </AnimatePresence>

      {ready && (
        <>
          <BackgroundDecor />
          <Navbar />
          <main id="main-content">
            <Hero />
            <Carousel />
            <Menu />
            <Location />
            <Order />
          </main>
          <Footer />
          <CookieBanner />
        </>
      )}
    </CartProvider>
  )
}

export default App
