import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  // Modal & Toast states
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const newTask = await apiService.createTask({ title, description, priority });
      setTasks((prev) => [newTask, ...prev]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      showToast('Task created successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedStatus = !task.completed;
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id || t.id === task.id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      const id = task._id || task.id;
      await apiService.updateTask(id, { completed: updatedStatus });
      showToast(`Task marked as ${updatedStatus ? 'completed' : 'pending'}`, 'info');
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id || t.id === task.id ? { ...t, completed: !updatedStatus } : t))
      );
      showToast(err.message, 'error');
    }
  };

  const confirmDelete = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteTask = async () => {
    if (!deleteTargetId) return;
    const idToDelete = deleteTargetId;
    setDeleteTargetId(null);

    try {
      await apiService.deleteTask(idToDelete);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== idToDelete));
      showToast('Task deleted successfully', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <section className="task-manager-container glass-card fade-in" id="task-manager-section">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDeleteTask}
        onCancel={() => setDeleteTargetId(null)}
      />

      <div className="section-header">
        <div>
          <h2>⚡ Full-Stack Task Manager (REST + MongoDB Atlas)</h2>
          <p className="subtitle">
            Practicals 4–7: CRUD Operations, Mongoose Validation & JWT Token Protection
          </p>
        </div>
        <button className="btn-secondary" onClick={fetchTasks} title="Refresh Task List">
          🔄 Refresh Tasks
        </button>
      </div>

      {/* New Task Form */}
      <form onSubmit={handleCreateTask} className="task-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Task Title (required)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control flex-grow"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-control-select"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="Description (optional details)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control flex-grow"
          />

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Adding...' : '➕ Add Task'}
          </button>
        </div>
      </form>

      {/* Task List Display with Loading & Error States */}
      {loading ? (
        <Spinner message="Connecting to Express Backend & MongoDB Atlas..." />
      ) : error ? (
        <ErrorMessage
          message={`Backend Connection Error: ${error}. (Ensure Express server is running on http://localhost:5000)`}
          onRetry={fetchTasks}
        />
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>📋 No tasks found in database. Create your first task above!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            const taskId = task._id || task.id;
            return (
              <div
                key={taskId}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox-area">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="task-checkbox"
                    id={`check-${taskId}`}
                  />
                </div>

                <div className="task-details">
                  <h4 className="task-title">{task.title}</h4>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  <div className="task-meta">
                    <span className={`priority-badge priority-${task.priority || 'medium'}`}>
                      {(task.priority || 'medium').toUpperCase()}
                    </span>
                    <span className="task-date">
                      {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Just now'}
                    </span>
                  </div>
                </div>

                <div className="task-actions">
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => confirmDelete(taskId)}
                    title="Delete Task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TaskManager;
