/**
 * TaskScreen — layout reutilizable para Trabajo, Universidad y Psicología.
 *
 * Props:
 *   sectionLabel  string   — "01 — Trabajo"
 *   title         string   — "Tareas del día"
 *   accent        string   — color hex del acento
 *   cardBg        string
 *   cardBorder    string
 *   tasks         array    — [{ id, label }]
 *   withQuestion  boolean  — si mostrar pregunta "¿Revisaste los pendientes?"
 *   pantalla      string   — nombre para el log ("Trabajo"|"Universidad"|"Psicología")
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskCard from './TaskCard.jsx'
import { logEntry } from '../lib/logEntry.js'

export default function TaskScreen({
  sectionLabel, title, accent,
  cardBg, cardBorder,
  tasks: taskDefs,
  withQuestion = false,
  pantalla,
}) {
  const navigate = useNavigate()
  const [statuses, setStatuses] = useState({})
  const [expanded, setExpanded] = useState(null)

  function toggle(id) {
    if (statuses[id]) return
    setExpanded(prev => prev === id ? null : id)
  }

  function mark(id, value) {
    setStatuses(prev => ({ ...prev, [id]: value }))
    setExpanded(null)
    const task = taskDefs.find(t => t.id === id)
    logEntry({
      sheet: 'Tareas',
      pantalla,
      tarea: task?.label ?? id,
      estado: value === 'completada' ? 'Completada' : 'No completada',
    })
  }

  const doneCount   = taskDefs.filter(t => statuses[t.id]).length
  const progressPct = Math.round((doneCount / taskDefs.length) * 100)

  return (
    <div style={{ width: 390, minHeight: 844, background: '#080808', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <div style={{
        padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: `1px solid ${cardBorder}`, flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 38, height: 38, background: cardBg,
            border: `1px solid ${cardBorder}`, borderRadius: 11, flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke={accent} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: accent, opacity: 0.5, marginBottom: 2 }}>
            {sectionLabel}
          </div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#ddd' }}>{title}</div>
        </div>
        <div style={{ fontSize: 13, color: accent, fontWeight: 700, flexShrink: 0 }}>
          {doneCount}/{taskDefs.length}
        </div>
      </div>

      {/* Lista */}
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9, overflowY: 'auto' }}>
        {taskDefs.map(t => (
          <TaskCard
            key={t.id}
            label={t.label}
            status={statuses[t.id] ?? null}
            isExpanded={expanded === t.id}
            accent={accent}
            cardBg={cardBg}
            cardBorder={cardBorder}
            question={withQuestion ? `¿Revisaste los pendientes de ${t.label}?` : null}
            onToggle={() => toggle(t.id)}
            onComplete={() => mark(t.id, 'completada')}
            onNoComplete={() => mark(t.id, 'no_completada')}
          />
        ))}
      </div>

      {/* Progreso */}
      <div style={{ padding: '14px 20px 34px', flexShrink: 0, borderTop: `1px solid ${cardBorder}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
          <span style={{ fontSize: 11, color: accent, opacity: 0.3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            Progreso diario
          </span>
          <span style={{ fontSize: 11, color: accent, fontWeight: 700 }}>{progressPct}%</span>
        </div>
        <div style={{ height: 4, background: cardBorder, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            width: `${progressPct}%`, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

    </div>
  )
}
