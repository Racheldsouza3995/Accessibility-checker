import React from 'react'
import { profile } from '../data/resume'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useFadeUp()

  return (
    <section id="contact" ref={ref} className={`${styles.section} fade-up`}>
      <p className={styles.overline}><span className={styles.num}>05.</span> What's Next?</p>
      <h2 className={styles.heading}>Get In Touch</h2>
      <p className={styles.desc}>
        I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open!
      </p>
      <a href={`mailto:${profile.email}`} className={styles.btn}>Say Hello</a>
    </section>
  )
}
