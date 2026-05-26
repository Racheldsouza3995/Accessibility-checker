import React from 'react'
import { skillGroups } from '../data/resume'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Skills.module.css'

export default function Skills() {
  const ref = useFadeUp()

  return (
    <section id="skills" ref={ref} className={`${styles.section} fade-up`}>
      <h2 className={styles.heading}>
        <span className={styles.num}>02.</span> Skills &amp; Technologies
      </h2>

      <div className={styles.grid}>
        {skillGroups.map((group, i) => (
          <div key={i} className={styles.group}>
            <h4 className={styles.groupLabel}>{group.label}</h4>
            <ul className={styles.tags}>
              {group.tags.map((tag, j) => (
                <li key={j} className={styles.tag}>
                  <span className={styles.arrow}>▹</span> {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
