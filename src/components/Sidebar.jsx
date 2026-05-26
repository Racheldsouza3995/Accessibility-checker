import React, { useState, useEffect } from 'react'
import { profile } from '../data/resume'
import styles from './Sidebar.module.css'

const navItems = [
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
]

export default function Sidebar() {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h1 className={styles.name}>{profile.name}</h1>
          <h2 className={styles.role}>Full-Stack Web Developer</h2>
          <p className={styles.tagline}>I build accessible, pixel-perfect digital experiences for the web.</p>

          <nav className={styles.nav}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navItem} ${active === item.id ? styles.navActive : ''}`}
              >
                <span className={styles.navLine} />
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.socials}>
          <a href="https://github.com/Racheldsouza3995" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/dsouzarachel64" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
