import React from 'react'
import { profile } from '../data/resume'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.intro}>Hi, my name is</p>
      <h1 className={styles.name}>{profile.name}.</h1>
      <h2 className={styles.role}>I build things on the web.</h2>
      <p className={styles.desc}>{profile.summary}</p>
      <div className={styles.cta}>
        <a href="#experience" className={styles.btn}>Check out my experience</a>
        <a href={`mailto:${profile.email}`} className={styles.btnGhost}>Get In Touch</a>
      </div>
    </section>
  )
}
