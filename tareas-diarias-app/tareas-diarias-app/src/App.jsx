import { Routes, Route } from 'react-router-dom'
import Landing     from './pages/Landing.jsx'
import Trabajo     from './pages/Trabajo.jsx'
import Universidad from './pages/Universidad.jsx'
import Psicologia  from './pages/Psicologia.jsx'
import Filosofia   from './pages/Filosofia.jsx'

// Centrar en pantalla como si fuera un teléfono
const shell = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  background: '#080808',
}

export default function App() {
  return (
    <div style={shell}>
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/trabajo"     element={<Trabajo />} />
        <Route path="/universidad" element={<Universidad />} />
        <Route path="/psicologia"  element={<Psicologia />} />
        <Route path="/filosofia"   element={<Filosofia />} />
      </Routes>
    </div>
  )
}
