import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { logEntry } from '../lib/logEntry.js'

const ACCENT  = '#F59E0B'
const CARD_BG = '#130E04'
const BORDER  = '#271808'

const TOPICS = [
  {
    id: 'empirismo',
    label: 'Empirismo',
    philosophers: [
      { id: 'hume',  name: 'David Hume',  years: '1711–1776' },
      { id: 'locke', name: 'John Locke',  years: '1632–1704' },
    ],
  },
  {
    id: 'racionalismo',
    label: 'Racionalismo',
    philosophers: [
      { id: 'descartes', name: 'René Descartes',  years: '1596–1650' },
      { id: 'spinoza',   name: 'Baruch Spinoza',  years: '1632–1677' },
    ],
  },
  {
    id: 'aristoteles',
    label: 'Aristóteles',
    philosophers: [
      { id: 'metafisica',        name: 'Metafísica',          years: '384–322 a.C.' },
      { id: 'etica-nicomaquea',  name: 'Ética Nicomáquea',   years: '384–322 a.C.' },
    ],
  },
  {
    id: 'nietzsche',
    label: 'Nietzsche',
    philosophers: [
      { id: 'zaratustra',  name: 'Así habló Zaratustra',           years: '1844–1900' },
      { id: 'mas-alla',    name: 'Más allá del bien y del mal',    years: '1844–1900' },
    ],
  },
]

export default function Filosofia() {
  const navigate = useNavigate()
  const [view,     setView]     = useState('topics')      // 'topics' | 'philosophers' | 'form'
  const [topic,    setTopic]    = useState(null)
  const [author,   setAuthor]   = useState(null)
  const [saved,    setSaved]    = useState(false)

  const temaRef      = useRef(null)
  const reflexionRef = useRef(null)
  const libroRef     = useRef(null)

  function pickTopic(t) {
    setTopic(t)
    setView('philosophers')
  }

  function pickAuthor(a) {
    setAuthor(a)
    setView('form')
  }

  function handleSave() {
    logEntry({
      sheet: 'Filosofía',
      corriente: topic?.label ?? '',
      autor:     author?.name  ?? '',
      libro:     libroRef.current?.value    ?? '',
      tema:      temaRef.current?.value     ?? '',
      reflexion: reflexionRef.current?.value ?? '',
    })
    setSaved(true)
  }

  /* ── Shared header ─────────────────────────────────────────────────────── */
  function Header({ onBack, section, title }) {
    return (
      <div style={{
        padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
      }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 38, height: 38, background: CARD_BG,
              border: `1px solid ${BORDER}`, borderRadius: 11, flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: ACCENT, opacity: 0.5, marginBottom: 2 }}>
            {section}
          </div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#ddd' }}>{title}</div>
        </div>
      </div>
    )
  }

  /* ── VIEW: topics ────────────────────────────────────────────────────── */
  if (view === 'topics') return (
    <div style={{ width: 390, minHeight: 844, background: '#080808', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={() => navigate('/')} section="04 — Filosofía" title="Corrientes del día" />
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {TOPICS.map(t => (
          <button
            key={t.id}
            onClick={() => pickTopic(t)}
            style={{
              background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 13,
              padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0, background: ACCENT, opacity: 0.4 }} />
            <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#ccc' }}>{t.label}</div>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M5.5 3l4 4.5-4 4.5" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )

  /* ── VIEW: philosophers ─────────────────────────────────────────────── */
  if (view === 'philosophers') return (
    <div style={{ width: 390, minHeight: 844, background: '#080808', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={() => setView('topics')} section={`04 — ${topic?.label}`} title="Filósofos / Textos" />
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {topic?.philosophers.map(p => (
          <button
            key={p.id}
            onClick={() => pickAuthor(p)}
            style={{
              background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 13,
              padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#ccc' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 3 }}>{p.years}</div>
            </div>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M5.5 3l4 4.5-4 4.5" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )

  /* ── VIEW: form ─────────────────────────────────────────────────────── */
  const inputStyle = {
    width: '100%', background: CARD_BG, border: `1px solid ${BORDER}`,
    borderRadius: 10, padding: '12px 14px', color: '#ccc', fontSize: 14,
    resize: 'vertical', minHeight: 80, fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#080808', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={() => setView('philosophers')} section={`${topic?.label} — ${author?.name}`} title="Reflexión" />

      {saved ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
          <div style={{ fontSize: 40 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT }}>Guardado</div>
          <div style={{ fontSize: 13, color: '#555', textAlign: 'center' }}>Tu reflexión fue registrada correctamente.</div>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: 16, padding: '12px 28px', background: '#1A100002',
              border: `1px solid ${ACCENT}`, borderRadius: 10, color: ACCENT, fontSize: 14, fontWeight: 700,
            }}
          >
            Volver al inicio
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: ACCENT, opacity: 0.6, display: 'block', marginBottom: 6 }}>
              Libro / Texto
            </label>
            <textarea ref={libroRef} placeholder="¿Qué texto estás trabajando?" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: ACCENT, opacity: 0.6, display: 'block', marginBottom: 6 }}>
              Tema central
            </label>
            <textarea ref={temaRef} placeholder="¿Cuál es el tema principal?" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: ACCENT, opacity: 0.6, display: 'block', marginBottom: 6 }}>
              Reflexión personal
            </label>
            <textarea ref={reflexionRef} placeholder="¿Qué pensás sobre esto?" style={{ ...inputStyle, minHeight: 120 }} />
          </div>
          <button
            onClick={handleSave}
            style={{
              marginTop: 4, padding: '14px', background: '#1A1002',
              border: `1px solid ${ACCENT}`, borderRadius: 12, color: ACCENT,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Guardar reflexión
          </button>
        </div>
      )}
    </div>
  )
}
