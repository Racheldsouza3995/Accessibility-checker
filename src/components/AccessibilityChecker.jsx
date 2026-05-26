import React, { useState } from 'react'
import styles from './AccessibilityChecker.module.css'

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor']
const IMPACT_LABELS = {
  critical: '🔴 Critical',
  serious:  '🟠 Serious',
  moderate: '🟡 Moderate',
  minor:    '🔵 Minor',
}

function ScoreRing({ score }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 80 ? '#64ffda' : score >= 50 ? '#f0c040' : '#ff6b6b'

  return (
    <div className={styles.scoreRing}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#233554" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className={styles.scoreText}>
        <span className={styles.scoreNum} style={{ color }}>{score}</span>
        <span className={styles.scoreLabel}>/ 100</span>
      </div>
    </div>
  )
}

function IssueCard({ violation }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.issueCard} ${styles[violation.impact]}`}>
      <div className={styles.issueHeader} onClick={() => setOpen(o => !o)}>
        <div className={styles.issueLeft}>
          <span className={styles.impactBadge}>{IMPACT_LABELS[violation.impact] || violation.impact}</span>
          <span className={styles.issueId}>{violation.id}</span>
        </div>
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className={styles.issueBody}>
          <p className={styles.issueDesc}>{violation.description}</p>
          <p className={styles.issueHelp}><strong>How to fix:</strong> {violation.help}</p>
          {violation.helpUrl && (
            <a href={violation.helpUrl} target="_blank" rel="noreferrer" className={styles.issueLink}>
              Learn more →
            </a>
          )}
          {violation.nodes?.length > 0 && (
            <div className={styles.nodes}>
              <p className={styles.nodesLabel}>Affected elements ({violation.nodes.length}):</p>
              {violation.nodes.slice(0, 3).map((node, i) => (
                <code key={i} className={styles.nodeCode}>{node.target?.join(', ')}</code>
              ))}
              {violation.nodes.length > 3 && (
                <p className={styles.moreNodes}>+{violation.nodes.length - 3} more elements</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ResultsSummary({ results }) {
  const counts = IMPACT_ORDER.reduce((acc, impact) => {
    acc[impact] = results.violations.filter(v => v.impact === impact).length
    return acc
  }, {})

  const totalIssues = results.violations.length
  const totalPasses = results.passes?.length || 0
  const score = Math.max(0, Math.round(100 - (counts.critical * 25 + counts.serious * 15 + counts.moderate * 8 + counts.minor * 3)))

  const grouped = IMPACT_ORDER.reduce((acc, impact) => {
    acc[impact] = results.violations.filter(v => v.impact === impact)
    return acc
  }, {})

  return (
    <div className={styles.results}>
      <div className={styles.resultsTop}>
        <ScoreRing score={score} />
        <div className={styles.resultsMeta}>
          <h3 className={styles.resultsTitle}>Accessibility Report</h3>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNum} style={{ color: '#ff6b6b' }}>{totalIssues}</span>
              <span className={styles.statLabel}>Issues Found</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum} style={{ color: '#64ffda' }}>{totalPasses}</span>
              <span className={styles.statLabel}>Checks Passed</span>
            </div>
            {IMPACT_ORDER.map(impact => (
              counts[impact] > 0 && (
                <div key={impact} className={styles.stat}>
                  <span className={styles.statNum}>{counts[impact]}</span>
                  <span className={styles.statLabel}>{impact}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {totalIssues === 0 ? (
        <div className={styles.allPass}>
          <p>🎉 No accessibility violations found!</p>
          <p className={styles.allPassSub}>All {totalPasses} checks passed.</p>
        </div>
      ) : (
        <div className={styles.issuesList}>
          <h4 className={styles.issuesTitle}>Issues to Fix</h4>
          {IMPACT_ORDER.map(impact =>
            grouped[impact].map((v, i) => <IssueCard key={i} violation={v} />)
          )}
        </div>
      )}
    </div>
  )
}

export default function AccessibilityChecker() {
  const [mode, setMode]       = useState('url')
  const [url, setUrl]         = useState('')
  const [html, setHtml]       = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')

  async function runAxe(htmlString) {
    const { default: axe } = await import('axe-core')
    const container = document.createElement('div')
    container.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1280px;'
    container.innerHTML = htmlString
    document.body.appendChild(container)
    try {
      const result = await axe.run(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] }
      })
      return result
    } finally {
      document.body.removeChild(container)
    }
  }

  async function handleScan() {
    setError('')
    setResults(null)
    setLoading(true)

    try {
      if (mode === 'html') {
        if (!html.trim()) throw new Error('Please paste some HTML to analyse.')
        const result = await runAxe(html)
        setResults(result)
      } else {
        if (!url.trim()) throw new Error('Please enter a URL.')
        let fetchUrl = url.trim()
        if (!fetchUrl.startsWith('http')) fetchUrl = 'https://' + fetchUrl

        // Use allorigins CORS proxy
        const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(fetchUrl)}`
        const res = await fetch(proxy)
        if (!res.ok) throw new Error('Could not fetch the URL. Try pasting the HTML instead.')
        const data = await res.json()
        if (!data.contents) throw new Error('Could not retrieve page content.')
        const result = await runAxe(data.contents)
        setResults(result)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Tool</p>
        <h2 className={styles.title}>Accessibility Checker</h2>
        <p className={styles.subtitle}>
          Analyse any webpage or HTML snippet for WCAG 2.0/2.1 AA compliance issues using axe-core — the same engine used by Google and Deloitte.
        </p>
      </div>

      <div className={styles.card}>
        {/* Mode toggle */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'url' ? styles.tabActive : ''}`}
            onClick={() => { setMode('url'); setResults(null); setError('') }}
          >🔗 Scan URL</button>
          <button
            className={`${styles.tab} ${mode === 'html' ? styles.tabActive : ''}`}
            onClick={() => { setMode('html'); setResults(null); setError('') }}
          >{'</>'} Paste HTML</button>
        </div>

        {mode === 'url' ? (
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleScan()}
            />
            <button className={styles.btn} onClick={handleScan} disabled={loading}>
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        ) : (
          <div className={styles.htmlMode}>
            <textarea
              className={styles.textarea}
              placeholder={'Paste your HTML here...\n\n<html>\n  <body>\n    <img src="photo.jpg">\n    <button>Click</button>\n  </body>\n</html>'}
              value={html}
              onChange={e => setHtml(e.target.value)}
              rows={10}
            />
            <button className={styles.btn} onClick={handleScan} disabled={loading}>
              {loading ? 'Analysing...' : 'Analyse HTML'}
            </button>
          </div>
        )}

        {error && <p className={styles.error}>⚠ {error}</p>}

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Running accessibility checks...</p>
          </div>
        )}
      </div>

      {results && <ResultsSummary results={results} />}
    </div>
  )
}
