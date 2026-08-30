import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BackgroundDecor } from './components/BackgroundDecor'
import { Carousel } from './components/Carousel'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LoadingScreen } from './components/LoadingScreen'
import { Location } from './components/Location'
import { Menu } from './components/Menu'
import { Navbar } from './components/Navbar'
import { Order } from './components/Order'

function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <AnimatePresence>{!ready && <LoadingScreen key="loader" onComplete={() => setReady(true)} />}</AnimatePresence>

      {ready && (
        <>
          <BackgroundDecor />
          <Navbar />
          <main>
            <Hero />
            <Carousel />
            <Menu />
            <Location />
            <Order />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
