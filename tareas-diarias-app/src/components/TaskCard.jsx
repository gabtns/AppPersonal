/**
 * TaskCard — tarjeta de tarea reutilizable para Trabajo, Universidad y Psicología.
 *
 * Props:
 *   label      string   — nombre de la tarea/materia
 *   status     string|null — 'completada' | 'no_completada' | null
 *   isExpanded boolean
 *   accent     string   — color hex del acento de la pantalla
 *   cardBg     string   — color de fondo de la tarjeta
 *   cardBorder string   — color del borde de la tarjeta
 *   question   string|null — texto de pregunta extra (solo Universidad)
 *   onToggle   fn
 *   onComplete fn
 *   onNoComplete fn
 */
export default function TaskCard({
  label, status, isExpanded,
  accent, cardBg, cardBorder,
  question = null,
  onToggle, onComplete, onNoComplete,
}) {
  const hasStatus = status !== null
  const dotColor  = status === 'completada'    ? '#10B981'
                  : status === 'no_completada' ? '#EF4444'
                  : '#2a2a2a'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Cabecera */}
      <div
        onClick={hasStatus ? undefined : onToggle}
        style={{
          background: cardBg, border: `1px solid ${cardBorder}`,
          borderRadius: 13, padding: '16px 18px',
          cursor: hasStatus ? 'default' : 'pointer', userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', flexShrink: 0, background: dotColor }} />
          <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#ccc', lineHeight: 1.35 }}>
            {label}
          </div>
          {hasStatus ? (
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
              whiteSpace: 'nowrap',
              background: status === 'completada' ? '#071A10' : '#1A0707',
              color:      status === 'completada' ? '#10B981' : '#EF4444',
            }}>
              {status === 'completada' ? '✓ Completada' : '✗ No completada'}
            </span>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <path d="M5.5 3l4 4.5-4 4.5" stroke={accent} strokeWidth="1.7" strokeLinecap="round" opacity="0.5"/>
            </svg>
          )}
        </div>
      </div>

      {/* Panel expandido */}
      {isExpanded && !hasStatus && (
        <div style={{
          marginTop: 3, background: '#050505', border: `1px solid ${cardBorder}`,
          borderRadius: '0 0 13px 13px', padding: '12px 16px 14px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {question && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 12px', background: cardBg, border: `1px solid ${cardBorder}`,
              borderRadius: 9,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="8" cy="8" r="7" stroke={accent} strokeWidth="1.4"/>
                <path d="M8 5v.5m0 5.5V9m0-1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, color: accent, fontWeight: 600, lineHeight: 1.4, opacity: 0.8 }}>
                {question}
              </span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onComplete}
              style={{
                flex: 1, padding: '11px 6px', background: '#071A10',
                border: '1px solid #10B981', borderRadius: 10,
                color: '#10B981', fontSize: 13, fontWeight: 700,
              }}
            >✓ Completada</button>
            <button
              onClick={onNoComplete}
              style={{
                flex: 1, padding: '11px 6px', background: '#1A0707',
                border: '1px solid #EF4444', borderRadius: 10,
                color: '#EF4444', fontSize: 13, fontWeight: 700,
              }}
            >✗ No completada</button>
          </div>
        </div>
      )}
    </div>
  )
}
