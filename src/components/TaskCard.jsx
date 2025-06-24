
const nextStatus = {
  'To Do': 'In Progress',
  'In Progress': 'Done',
  Done: 'Done'
}

const TaskCard = ({ task, onUpdateStatus }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-2">
      <p className="font-medium">{task.title}</p>
      {task.status !== 'Done' && (
        <button onClick={() => onUpdateStatus(task.id, nextStatus[task.status])} className="text-sm text-blue-600 mt-2">
          Mark as {nextStatus[task.status]}
        </button>
      )}
    </div>
  )
}

export default TaskCard
