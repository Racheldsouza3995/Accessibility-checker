import React, { useEffect, useState } from 'react'
import Sidebar    from './components/Sidebar'
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Experience from './components/Experience'
import Projects   from './components/Projects'
import Contact    from './components/Contact'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`layout ${loaded ? 'loaded' : ''}`}>
      <Sidebar />
      <main className="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <footer className="footer">
          <p>Designed &amp; Built by <span>Rachel Dsouza</span></p>
        </footer>
      </main>
    </div>
  )
}
