import React from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './About.module.css'

export default function About() {
  const ref = useFadeUp()

  const specialties = [
    'Accessibility (WCAG/ADA)',
    'SEO Optimization',
    'CMS Administration',
    'Responsive Design',
    'Agile / Scrum',
    'Performance Optimization',
  ]

  return (
    <section id="about" ref={ref} className={`${styles.section} fade-up`}>
      <h2 className={styles.heading}>
        <span className={styles.num}>01.</span> About Me
      </h2>
      <div className={styles.grid}>
        <div className={styles.text}>
          <p>I am a results-driven web developer with <strong>5+ years of experience</strong> building responsive, accessible web applications. My toolkit includes React.js, Next.js, TypeScript, and Node.js and I am equally comfortable working with CMS platforms like Drupal and WordPress.</p>
          <p>I currently work at <strong>Verizon</strong> as a Junior Developer in Communications, where I maintain an enterprise Drupal CMS serving 300+ internal users and publish content that has driven a 15% boost in returning visitors.</p>
          <p>I hold a <strong>Master of Science in Information Technology</strong> from Montclair State University, and I have worked across healthcare, enterprise, and education platforms always chasing the next performance win.</p>
          <p>When I am not coding, I enjoy tutoring students in Data Mining and Computer Security because explaining complex things simply is its own kind of craft.</p>
          <div className={styles.specialties}>
            <p className={styles.specialtiesLabel}>Things I focus on:</p>
            <ul className={styles.specialtiesList}>
              {specialties.map((s, i) => (
                <li key={i}><span className={styles.arrow}>▹</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imageInner}>
            <img src="/profile.jpg" alt="Rachel Dsouza" className={styles.photo} />
            <div className={styles.imageBorder} />
          </div>
        </div>
      </div>
    </section>
  )
}