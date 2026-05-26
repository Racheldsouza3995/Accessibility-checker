import React, { useState } from 'react'
import { experience } from '../data/resume'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Experience.module.css'

export default function Experience() {
  const [active, setActive] = useState(0)
  const ref = useFadeUp()
  const job = experience[active]

  return (
    <section id="experience" ref={ref} className={`${styles.section} fade-up`}>
      <h2 className={styles.heading}>
        <span className={styles.num}>03.</span> Where I've Worked
      </h2>

      <div className={styles.layout}>
        <div className={styles.tabs}>
          {experience.map((exp, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <h3 className={styles.role}>
            {job.role} <span className={styles.at}>@ {job.company}</span>
          </h3>
          <p className={styles.period}>{job.period} · {job.location}</p>
          <ul className={styles.bullets}>
            {job.bullets.map((b, i) => (
              <li key={i}>
                <span className={styles.arrow}>▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
