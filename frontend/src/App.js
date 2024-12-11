// src/App.js
import React, { useState } from 'react';
import TaskTable from './components/TaskTable';
import TaskModal from './components/TaskModal';
import { TaskService } from './services/taskService';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = (task) => {
    TaskService.addTask(task);
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <div>
     
      <TaskTable
        onEdit={handleEditTask}
        onDelete={(id) => {
          TaskService.deleteTask(id);
        }}
        onToggleStatus={(id) => TaskService.toggleStatus(id)}
      />
      {isModalOpen && (
        <TaskModal task={currentTask} onSave={handleAddTask} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
