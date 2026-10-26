import { useNavigate } from 'react-router-dom'
import { useClock } from '../hooks/useClock.js'

const CATEGORIES = [
  { path: '/trabajo',     label: 'Trabajo',     sub: '4 tareas pendientes',  accent: '#3B82F6', bg: '#080F1A', border: '#122035' },
  { path: '/universidad', label: 'Universidad',  sub: '3 materias del día',   accent: '#10B981', bg: '#071210', border: '#0E2018' },
  { path: '/psicologia',  label: 'Psicología',   sub: '4 tareas pendientes',  accent: '#A78BFA', bg: '#0C0916', border: '#1A1230' },
  { path: '/filosofia',   label: 'Filosofía',    sub: 'Reflexión del día',    accent: '#F59E0B', bg: '#130E04', border: '#271808' },
]

function AnalogClock({ hourAngle, minuteAngle, secondAngle, size = 160 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 8
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="#0D0D0D" stroke="#1E1E1E" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180
        const inner = i % 3 === 0 ? r - 14 : r - 9
        return (
          <line key={i}
            x1={cx + inner * Math.cos(a)} y1={cy + inner * Math.sin(a)}
            x2={cx + (r - 3) * Math.cos(a)} y2={cy + (r - 3) * Math.sin(a)}
            stroke={i % 3 === 0 ? '#444' : '#2a2a2a'} strokeWidth={i % 3 === 0 ? 1.8 : 1}
          />
        )
      })}
      <line
        x1={cx} y1={cy}
        x2={cx + (r * 0.52) * Math.cos((hourAngle - 90) * Math.PI / 180)}
        y2={cy + (r * 0.52) * Math.sin((hourAngle - 90) * Math.PI / 180)}
        stroke="#e0e0e0" strokeWidth="3.5" strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + (r * 0.75) * Math.cos((minuteAngle - 90) * Math.PI / 180)}
        y2={cy + (r * 0.75) * Math.sin((minuteAngle - 90) * Math.PI / 180)}
        stroke="#bbb" strokeWidth="2.5" strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + (r * 0.82) * Math.cos((secondAngle - 90) * Math.PI / 180)}
        y2={cy + (r * 0.82) * Math.sin((secondAngle - 90) * Math.PI / 180)}
        stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={3.5} fill="#F59E0B" />
    </svg>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { hourAngle, minuteAngle, secondAngle, timeStr } = useClock()

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
  const capitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  return (
    <div style={{ width: 390, minHeight: 844, background: '#080808', display: 'flex', flexDirection: 'column' }}>

      {/* Clock section — alineado a la izquierda */}
      <div style={{ paddingTop: 56, paddingBottom: 24, paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <AnalogClock hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} size={160} />
        <div>
          <div style={{ fontSize: 38, fontWeight: 700, color: '#e8e8e8', letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>
            {timeStr}
          </div>
          <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{capitalized}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: 1, background: '#111', marginBottom: 20 }} />

      {/* Título + label */}
      <div style={{ paddingLeft: 20, marginBottom: 14 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#e8e8e8', marginBottom: 4 }}>Tareas diarias</div>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#444' }}>
          Categorías
        </span>
      </div>

      {/* Category cards — más grandes */}
      <div style={{ width: '100%', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CATEGORIES.map(c => (
          <button
            key={c.path}
            onClick={() => navigate(c.path)}
            style={{
              width: '100%', background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 16, padding: '22px 22px',
              display: 'flex', alignItems: 'center', gap: 16,
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{
              width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
              background: c.accent, boxShadow: `0 0 10px ${c.accent}66`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#ccc' }}>{c.label}</div>
              <div style={{ fontSize: 13, color: '#444', marginTop: 4 }}>{c.sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </button>
        ))}
      </div>

    </div>
  )
}
