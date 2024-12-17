import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import './TaskTable.css';
import { FaFlask, FaPhone, FaUsers, FaVideo, FaMapMarker } from 'react-icons/fa'; // Flask icon import

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskTypeFilter, setTaskTypeFilter] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [teamMembersFilter, setTeamMembersFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility

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

  const handleSaveTask = async (task) => {
    if (currentTask) {
      const response = await fetch(`http://localhost:5000/tasks/${currentTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        fetchTasks();
      }
    } else {
      handleAddTask(task);
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Open' ? 'Closed' : 'Open';
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    return (
      (taskTypeFilter.length ? taskTypeFilter.includes(task.task_type) : true) &&
      (teamMembersFilter ? task.team_members.includes(teamMembersFilter) : true) &&
      (statusFilter ? task.status === statusFilter : true)
    );
  });

  const handleTaskTypeChange = (type) => {
    setTaskTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <div className="task-table-container">
      <div className="controls">
        <button className="btn-new-task" onClick={() => setIsModalOpen(true)}>New Task</button>
      </div>

      {/* Task Type Header with Dropdown */}
      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('date_created')}>Date <FaFlask className="flask-icon" /></th>
            <th onClick={() => handleSort('entity_name')}>Entity Name <FaFlask className="flask-icon" /></th>
            <th>
              <div className="task-type-header" onClick={toggleDropdown}>
                Task Type <FaFlask className="flask-icon" />
              </div>
              {/* Task Type Dropdown */}
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <label>
                    <input
                      type="checkbox"
                      checked={taskTypeFilter.includes('Call')}
                      onChange={() => handleTaskTypeChange('Call')}
                    />
                    <FaPhone className="task-icon" />
                    
                    Call
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={taskTypeFilter.includes('Meeting')}
                      onChange={() => handleTaskTypeChange('Meeting')}
                    />
                    <FaUsers className="task-icon" />
                    
                    Meeting
                  </label>
                  <label>
                 
                    <input
                      type="checkbox"
                      checked={taskTypeFilter.includes('Video Call')}
                      onChange={() => handleTaskTypeChange('Video Call')}
                    /> 
                     <FaVideo className="task-icon" />
                    
                    Video Call
                  </label>
                </div>
              )}
            </th>
            <th onClick={() => handleSort('time')}>Time <FaFlask className="flask-icon" /></th>
            <th onClick={() => handleSort('contact_person')}>Contact Person <FaFlask className="flask-icon" /></th>
            
            <th onClick={() => handleSort('note')}>Note <FaFlask className="flask-icon" /></th>
            <th onClick={() => handleSort('status')}>Status <FaFlask className="flask-icon" /></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.date_created}</td>
              <td>{task.entity_name}</td>
              <td>{task.task_type}</td>
              <td>{task.time}</td>
              <td>{task.contact_person}</td>
              <td>{task.note}</td>
              <td>
                <div className="status-container">
                  <div className="status-text">{task.status}</div>
                  <div className="hover-popup">
                    <div className="popup-header">Status</div>
                    <div className="popup-options">
                      <div
                        className={`popup-option ${task.status === 'Open' ? 'active' : ''}`}
                        onClick={() => handleChangeStatus(task.id, 'Open')}
                      >
                        Open
                      </div>
                      <div
                        className={`popup-option ${task.status === 'Closed' ? 'active' : ''}`}
                        onClick={() => handleChangeStatus(task.id, 'Closed')}
                      >
                        Closed
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="dropdown">
                  <button className="dropdown-btn">Options</button>
                  <div className="dropdown-content">
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <button onClick={() => handleChangeStatus(task.id, task.status)}>
                      Change Status to {task.status === 'Open' ? 'Closed' : 'Open'}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <TaskModal
          task={currentTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskTable;
