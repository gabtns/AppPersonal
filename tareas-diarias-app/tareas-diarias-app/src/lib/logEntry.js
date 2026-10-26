/**
 * logEntry — escribe una fila en Google Sheets via /api/log.
 *
 * Para la pestaña "Tareas":
 *   logEntry({ sheet: 'Tareas', pantalla, tarea, estado })
 *
 * Para la pestaña "Filosofía":
 *   logEntry({ sheet: 'Filosofía', corriente, autor, libro, tema, reflexion })
 */
export async function logEntry(payload) {
  try {
    const res = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error('logEntry error:', await res.text())
  } catch (err) {
    // No bloquear la UI si el log falla
    console.error('logEntry network error:', err)
  }
}
