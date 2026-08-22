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

  // Edit task state
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editCompleted, setEditCompleted] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Modal & Toast states
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const getTaskId = (task) => task._id || task.id;

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

  const handleToggleComplete = async (task, e) => {
    e?.stopPropagation();
    const targetId = getTaskId(task);
    const updatedStatus = !task.completed;
    
    // Strictly isolate update to selected task only
    setTasks((prev) =>
      prev.map((t) => (getTaskId(t) === targetId ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await apiService.updateTask(targetId, { completed: updatedStatus });
      showToast(`Task marked as ${updatedStatus ? 'completed' : 'pending'}`, 'info');
    } catch (err) {
      // Revert on failure for this target ID only
      setTasks((prev) =>
        prev.map((t) => (getTaskId(t) === targetId ? { ...t, completed: !updatedStatus } : t))
      );
      showToast(err.message, 'error');
    }
  };

  const openEditModal = (task, e) => {
    e?.stopPropagation();
    setEditingTask(task);
    setEditTitle(task.title || '');
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'medium');
    setEditCompleted(Boolean(task.completed));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTask || !editTitle.trim()) return;

    const targetId = getTaskId(editingTask);
    setUpdating(true);

    try {
      const updated = await apiService.updateTask(targetId, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        completed: editCompleted
      });

      // Update state for selected task only
      setTasks((prev) =>
        prev.map((t) => (getTaskId(t) === targetId ? updated : t))
      );

      setEditingTask(null);
      showToast('Task updated successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const confirmDelete = (id, e) => {
    e?.stopPropagation();
    setDeleteTargetId(id);
  };

  const handleDeleteTask = async () => {
    if (!deleteTargetId) return;
    const idToDelete = deleteTargetId;
    setDeleteTargetId(null);

    try {
      await apiService.deleteTask(idToDelete);
      // Strictly remove selected task only
      setTasks((prev) => prev.filter((t) => getTaskId(t) !== idToDelete));
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Task"
        message="Are you sure you want to delete this specific task? This action cannot be undone."
        onConfirm={handleDeleteTask}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal-backdrop fade-in">
          <div className="modal-content glass-card pop-in" style={{ maxWidth: '480px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>✏️ Edit Task</h3>
              <button className="toast-close" onClick={() => setEditingTask(null)}>&times;</button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="form-control-select"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="editCompletedCheck"
                  checked={editCompleted}
                  onChange={(e) => setEditCompleted(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                />
                <label htmlFor="editCompletedCheck" style={{ cursor: 'pointer', margin: 0 }}>Mark as Completed</label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingTask(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={updating}>
                  {updating ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="section-header">
        <div>
          <h2>⚡ Full-Stack Task Manager (REST + MongoDB Atlas)</h2>
          <p className="subtitle">
            Practicals 4–7: Isolated Task Actions, Inline Editing, CRUD & Validation
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

      {/* Task List Display */}
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
            const taskId = getTaskId(task);
            return (
              <div
                key={taskId}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox-area">
                  <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={(e) => handleToggleComplete(task, e)}
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
                    className="btn-icon btn-edit"
                    onClick={(e) => openEditModal(task, e)}
                    title="Edit Task"
                    aria-label="Edit Task"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={(e) => confirmDelete(taskId, e)}
                    title="Delete Task"
                    aria-label="Delete Task"
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
