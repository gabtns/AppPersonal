import { useState, useEffect } from 'react'

export function useClock() {
  const [time, setTime] = useState(() => {
    const n = new Date()
    return { h: n.getHours() % 12, m: n.getMinutes(), s: n.getSeconds() }
  })

  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date()
      setTime({ h: n.getHours() % 12, m: n.getMinutes(), s: n.getSeconds() })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const hourAngle   = time.h * 30 + time.m * 0.5
  const minuteAngle = time.m * 6
  const secondAngle = time.s * 6
  const hh = String(time.h === 0 ? 12 : time.h).padStart(2, '0')
  const mm = String(time.m).padStart(2, '0')
  const ss = String(time.s).padStart(2, '0')

  return { hourAngle, minuteAngle, secondAngle, timeStr: `${hh}:${mm}:${ss}` }
}
