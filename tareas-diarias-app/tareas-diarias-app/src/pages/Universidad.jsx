import TaskScreen from '../components/TaskScreen.jsx'

const TASKS = [
  { id: 'analisis-matematico', label: 'Análisis Matemático' },
  { id: 'fisica',              label: 'Física' },
  { id: 'programacion',        label: 'Programación' },
]

export default function Universidad() {
  return (
    <TaskScreen
      sectionLabel="02 — Universidad"
      title="Materias del día"
      accent="#10B981"
      cardBg="#071210"
      cardBorder="#0E2018"
      tasks={TASKS}
      withQuestion={true}
      pantalla="Universidad"
    />
  )
}
