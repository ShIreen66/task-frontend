import { useState } from 'react'
import API from '../api.js'
import { logout } from '../auth.js'
import TaskCard from '../components/TaskCard.jsx'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks')
    setTasks(data)
  }

  const handleAdd = async () => {
    if (!title) return
    await API.post('/tasks', { title, status: 'To Do' })
    setTitle('')
    fetchTasks()
  }

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status })
    fetchTasks()
  }

  const grouped = {
    'To Do': [],
    'In Progress': [],
    Done: [],
  }

  tasks.forEach((task) => grouped[task.status]?.push(task))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow">Task Dashboard</h1>
        <button onClick={() => { logout(); navigate('/login') }} className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition-transform">Logout</button>
      </div>

      <div className="flex gap-4 mb-10">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task Title" className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white" />
        <button onClick={handleAdd} className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-transform">Add</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.keys(grouped).map((status) => (
          <div key={status} className="bg-white rounded-2xl shadow-lg p-6 min-h-[350px] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2 border-gray-200">{status}</h2>
            <div className="flex-1 flex flex-col gap-4">
              {grouped[status].length === 0 ? (
                <div className="text-gray-400 italic text-center mt-8">No tasks</div>
              ) : (
                grouped[status].map((task) => (
                  <TaskCard key={task.id} task={task} onUpdateStatus={updateStatus} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
