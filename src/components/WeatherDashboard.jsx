import React, { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import styles from './WeatherDashboard.module.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const toC = k => Math.round(k - 273.15)
const toF = k => Math.round((k - 273.15) * 9/5 + 32)
const fmt = (k, unit) => unit === 'C' ? `${toC(k)}°C` : `${toF(k)}°F`
const fmtTime = ts => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const fmtDay  = ts => new Date(ts * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

const WX_ICONS = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'⛅',
  '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌦️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️','50d':'🌫️','50n':'🌫️',
}

function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon}>{icon}</span>
      <div>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
    </div>
  )
}

function ForecastCard({ day, unit }) {
  return (
    <div className={styles.forecastCard}>
      <p className={styles.forecastDay}>{fmtDay(day.dt)}</p>
      <span className={styles.forecastIcon}>{WX_ICONS[day.weather[0].icon] || '🌡️'}</span>
      <p className={styles.forecastDesc}>{day.weather[0].description}</p>
      <div className={styles.forecastTemps}>
        <span className={styles.tempHigh}>{fmt(day.main.temp_max, unit)}</span>
        <span className={styles.tempLow}>{fmt(day.main.temp_min, unit)}</span>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label, unit }) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>{payload[0].value}°{unit}</p>
      </div>
    )
  }
  return null
}

export default function WeatherDashboard() {
  const [query, setQuery]       = useState('')
  const [current, setCurrent]   = useState(null)
  const [forecast, setForecast] = useState([])
  const [chartData, setChartData] = useState([])
  const [unit, setUnit]         = useState('C')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [locating, setLocating] = useState(false)

  async function fetchByCoords(lat, lon) {
    setLoading(true); setError('')
    try {
      const [curRes, forRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      ])
      if (!curRes.ok) throw new Error('Could not fetch weather data.')
      const curData = await curRes.json()
      const forData = await forRes.json()
      setCurrent(curData)
      processForecast(forData.list)
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function fetchByCity(cityName) {
    setLoading(true); setError('')
    try {
      const [curRes, forRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
      ])
      if (!curRes.ok) throw new Error('City not found. Please try another.')
      const curData = await curRes.json()
      const forData = await forRes.json()
      setCurrent(curData)
      processForecast(forData.list)
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  function processForecast(list) {
    const days = {}
    list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString()
      if (!days[date]) days[date] = item
    })
    setForecast(Object.values(days).slice(0, 5))
    setChartData(list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: toC(item.main.temp),
      tempK: item.main.temp,
    })))
  }

  function handleSearch() {
    if (!query.trim()) return
    fetchByCity(query.trim())
  }

  function handleLocate() {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      pos => { fetchByCoords(pos.coords.latitude, pos.coords.longitude); setLocating(false) },
      ()  => { setError('Could not get your location.'); setLocating(false) }
    )
  }

  const displayChart = chartData.map(d => ({
    ...d,
    temp: unit === 'C' ? toC(d.tempK) : toF(d.tempK)
  }))

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Tool</p>
        <h2 className={styles.title}>Weather Forecast</h2>
        <p className={styles.subtitle}>
          Search any city or use your location to get current conditions and a 5-day forecast.
        </p>
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search city... e.g. New York"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className={styles.btn} onClick={handleSearch} disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
        <button className={styles.btnOutline} onClick={handleLocate} disabled={locating}>
          {locating ? 'Locating...' : '📍 My Location'}
        </button>
        {current && (
          <button className={styles.btnUnit} onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}>
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </button>
        )}
      </div>

      {error && <p className={styles.error}>⚠ {error}</p>}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Fetching weather data...</p>
        </div>
      )}

      {current && !loading && (
        <>
          <div className={styles.currentCard}>
            <div className={styles.currentLeft}>
              <p className={styles.cityName}>{current.name}, {current.sys.country}</p>
              <div className={styles.currentMain}>
                <span className={styles.currentIcon}>{WX_ICONS[current.weather[0].icon] || '🌡️'}</span>
                <span className={styles.currentTemp}>{fmt(current.main.temp, unit)}</span>
              </div>
              <p className={styles.currentDesc}>{current.weather[0].description}</p>
              <p className={styles.feelsLike}>Feels like {fmt(current.main.feels_like, unit)}</p>
            </div>
            <div className={styles.currentRight}>
              <div className={styles.statsGrid}>
                <StatCard icon="💧" label="Humidity"   value={`${current.main.humidity}%`} />
                <StatCard icon="💨" label="Wind"       value={`${Math.round(current.wind.speed)} m/s`} />
                <StatCard icon="🌅" label="Sunrise"    value={fmtTime(current.sys.sunrise)} />
                <StatCard icon="🌇" label="Sunset"     value={fmtTime(current.sys.sunset)} />
                <StatCard icon="📊" label="Pressure"   value={`${current.main.pressure} hPa`} />
                <StatCard icon="👁️" label="Visibility" value={`${(current.visibility/1000).toFixed(1)} km`} />
              </div>
            </div>
          </div>

          {displayChart.length > 0 && (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>24-Hour Temperature Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={displayChart} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
                  <XAxis dataKey="time" tick={{ fill: '#8892b0', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#8892b0', fontSize: 11 }} unit={`°${unit}`} />
                  <Tooltip content={<CustomTooltip unit={unit} />} />
                  <Line
                    type="monotone" dataKey="temp"
                    stroke="#64ffda" strokeWidth={2}
                    dot={{ fill: '#64ffda', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {forecast.length > 0 && (
            <div className={styles.forecastSection}>
              <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
              <div className={styles.forecastGrid}>
                {forecast.map((day, i) => <ForecastCard key={i} day={day} unit={unit} />)}
              </div>
            </div>
          )}
        </>
      )}

      {!current && !loading && !error && (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🌤️</p>
          <p>Search a city or use your location to get started.</p>
        </div>
      )}
    </div>
  )
}
