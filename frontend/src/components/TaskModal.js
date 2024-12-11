import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    entity_name: '',
    task_type: 'Call',
    time: '',
    contact_person: '',
    note: '',
    status: 'Open',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Entity Name:
            <input
              type="text"
              name="entity_name"
              value={formData.entity_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Task Type:
            <select
              name="task_type"
              value={formData.task_type}
              onChange={handleChange}
            >
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Video Call">Video Call</option>
            </select>
          </label>
          <label>
            Contact Person:
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Note (optional):
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
