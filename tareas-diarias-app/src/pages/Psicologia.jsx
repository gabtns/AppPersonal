import TaskScreen from '../components/TaskScreen.jsx'

const TASKS = [
  { id: 'auditoria-ciclos',    label: 'Auditoría de Ciclos' },
  { id: 'auditoria-moliendas', label: 'Auditoría de Moliendas' },
  { id: 'revision-stock',      label: 'Revisión de movimientos de stock' },
  { id: 'revision-armadores',  label: 'Revisión de armadores' },
]

export default function Psicologia() {
  return (
    <TaskScreen
      sectionLabel="03 — Psicología"
      title="Tareas del día"
      accent="#A78BFA"
      cardBg="#0C0916"
      cardBorder="#1A1230"
      tasks={TASKS}
      pantalla="Psicología"
    />
  )
}
