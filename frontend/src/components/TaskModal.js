import React, { useState, useEffect } from "react";
import "./TaskModal.css";

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    entity_name: "",
    task_type: "Call",
    time: "",
    contact_person: "",
    note: "",
    status: "Open", // Default to "Open"
  });

  useEffect(() => {
    if (task) {
      setFormData(task); // Pre-fill data for Edit Task
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass form data to the parent
  };

  const toggleStatus = () => {
    setFormData({
      ...formData,
      status: formData.status === "Open" ? "Closed" : "Open",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "New Task"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Status Toggle */}
        <div className="status-toggle">
          <button
            className={`status-btn ${formData.status === "Open" ? "active" : ""}`}
            onClick={toggleStatus}
          >
            Open
          </button>
          <button
            className={`status-btn ${formData.status === "Closed" ? "active" : ""}`}
            onClick={toggleStatus}
          >
            Closed
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Entity Name */}
            <div className="form-group">
              <label htmlFor="entity_name">Entity Name:</label>
              <input
                type="text"
                id="entity_name"
                name="entity_name"
                value={formData.entity_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time */}
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Task Type */}
            <div className="form-group">
              <label htmlFor="task_type">Task Type:</label>
              <select
                id="task_type"
                name="task_type"
                value={formData.task_type}
                onChange={handleChange}
              >
                <option value="Call">Call</option>
                <option value="Meeting">Meeting</option>
                <option value="Video Call">Video Call</option>
              </select>
            </div>

            {/* Contact Person */}
            <div className="form-group">
              <label htmlFor="contact_person">Contact Person:</label>
              <input
                type="text"
                id="contact_person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                required
              />
            </div>

            {/* Note */}
            <div className="form-group">
              <label htmlFor="note">Note (optional):</label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
