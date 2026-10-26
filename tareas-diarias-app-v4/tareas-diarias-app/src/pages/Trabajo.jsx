import TaskScreen from '../components/TaskScreen.jsx'

const TASKS = [
  { id: 'auditoria-ciclos',    label: 'Auditoría de Ciclos' },
  { id: 'auditoria-moliendas', label: 'Auditoría de Moliendas' },
  { id: 'revision-stock',      label: 'Revisión de movimientos de stock' },
  { id: 'revision-armadores',  label: 'Revisión de armadores' },
]

export default function Trabajo() {
  return (
    <TaskScreen
      sectionLabel="01 — Trabajo"
      title="Tareas del día"
      accent="#3B82F6"
      cardBg="#080F1A"
      cardBorder="#122035"
      tasks={TASKS}
      pantalla="Trabajo"
    />
  )
}
