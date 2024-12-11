import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import './TaskTable.css';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleAddTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks();
    }
    setIsModalOpen(false);
  };

  const handleEditTask = async (task) => {
    const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks();
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    filter ? task.task_type === filter : true
  );

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>New Task</button>
      <select onChange={handleFilter}>
        <option value="">All</option>
        <option value="Call">Call</option>
        <option value="Meeting">Meeting</option>
        <option value="Video Call">Video Call</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Entity Name</th>
            <th>Task Type</th>
            <th>Time</th>
            <th>Contact Person</th>
            <th>Note</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.date}</td>
              <td>{task.entity_name}</td>
              <td>{task.task_type}</td>
              <td>{task.time}</td>
              <td>{task.contact_person}</td>
              <td>{task.note}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => setCurrentTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <TaskModal
          task={currentTask}
          onSave={currentTask ? handleEditTask : handleAddTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskTable;
