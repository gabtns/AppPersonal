/**
 * TaskScreen — layout reutilizable para Trabajo, Universidad y Psicología.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskCard from './TaskCard.jsx'
import { logEntry } from '../lib/logEntry.js'
import { useClock } from '../hooks/useClock.js'

function MiniClock({ hourAngle, minuteAngle, secondAngle }) {
  const size = 36, cx = 18, cy = 18, r = 15
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="#0D0D0D" stroke="#1E1E1E" strokeWidth="1" />
      <line
        x1={cx} y1={cy}
        x2={cx + 7 * Math.cos((hourAngle - 90) * Math.PI / 180)}
        y2={cy + 7 * Math.sin((hourAngle - 90) * Math.PI / 180)}
        stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + 11 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
        y2={cy + 11 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
        stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + 12 * Math.cos((secondAngle - 90) * Math.PI / 180)}
        y2={cy + 12 * Math.sin((secondAngle - 90) * Math.PI / 180)}
        stroke="#F59E0B" strokeWidth="1" strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={2} fill="#F59E0B" />
    </svg>
  )
}

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
  const { hourAngle, minuteAngle, secondAngle, timeStr } = useClock()

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
        {/* Reloj mini + hora */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <MiniClock hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />
          <span style={{ fontSize: 13, color: '#555', fontVariantNumeric: 'tabular-nums' }}>{timeStr}</span>
        </div>
      </div>

      {/* Lista */}
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
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
