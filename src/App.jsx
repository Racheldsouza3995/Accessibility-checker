import React, { useEffect, useState } from 'react'
import Sidebar               from './components/Sidebar'
import Hero                  from './components/Hero'
import About                 from './components/About'
import Skills                from './components/Skills'
import Experience            from './components/Experience'
import Projects              from './components/Projects'
import Contact               from './components/Contact'
import AccessibilityChecker  from './components/AccessibilityChecker'
import WeatherDashboard      from './components/WeatherDashboard'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300)
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => { clearTimeout(t); window.removeEventListener('hashchange', onHash) }
  }, [])

  const renderTool = () => {
    if (hash === '#accessibility-checker') return <AccessibilityChecker />
    if (hash === '#weather-dashboard')     return <WeatherDashboard />
    return null
  }

  const tool = renderTool()

  return (
    <div className={`layout ${loaded ? 'loaded' : ''}`}>
      <Sidebar />
      <main className="main">
        {tool ? tool : (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <footer className="footer">
              <p>Designed &amp; Built by <span>Rachel Dsouza</span></p>
            </footer>
          </>
        )}
      </main>
    </div>
  )
}
