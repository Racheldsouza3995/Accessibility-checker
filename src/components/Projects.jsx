import React from 'react'
import { projects } from '../data/resume'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Projects.module.css'

function EmptyState() {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyIcon}>🚀</p>
      <p>Projects coming soon!</p>
      <p className={styles.emptySub}>Currently building a full-stack blog app with React + Node.js + PostgreSQL.</p>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.folderIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className={styles.cardLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live site">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>
      <ul className={styles.techList}>
        {project.tech.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}

export default function Projects() {
  const ref = useFadeUp()

  return (
    <section id="projects" ref={ref} className={`${styles.section} fade-up`}>
      <h2 className={styles.heading}>
        <span className={styles.num}>04.</span> Things I've Built
      </h2>

      {projects.length === 0
        ? <EmptyState />
        : <div className={styles.grid}>{projects.map((p, i) => <ProjectCard key={i} project={p} />)}</div>
      }
    </section>
  )
}
