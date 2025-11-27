import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Listen to Firestore in realtime
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setTasks(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load tasks", err);
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error("Failed to add task", err);
      setError("Failed to add task. Please try again.");
    }
  };

  // Toggle completion
  const toggleTask = async (task) => {
    const ref = doc(db, "tasks", task.id);

    try {
      await updateDoc(ref, {
        completed: !task.completed,
      });
      setError("");
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Failed to update task. Please try again.");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const ref = doc(db, "tasks", id);

    try {
      await deleteDoc(ref);
      setError("");
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const isAddDisabled = !title.trim();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <div className="app-inner">
        <div className="app-card">
          <header className="app-header">
            <h1 className="app-title">Firestore Task Manager</h1>
          </header>

          {error && <div className="error-alert">{error}</div>}

          <main className="app-main">
            <section className="task-form-section">
              <h2 className="section-title">Add New Task</h2>
              <p className="section-description">
                Capture your tasks with a title and optional description.
                Changes are saved instantly to Firestore.
              </p>
              <form className="task-form" onSubmit={handleAddTask}>
                <div className="field-group">
                  <label htmlFor="task-title">Title</label>
                  <input
                    id="task-title"
                    type="text"
                    placeholder="e.g. Prepare DBMS presentation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="task-description">Description</label>
                  <textarea
                    id="task-description"
                    placeholder="Optional details, links, or notes"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isAddDisabled}
                >
                  Add Task
                </button>
              </form>
            </section>

            <section className="stats-section">
              <h2 className="section-title">Overview</h2>
              <p className="section-description">
                Quick snapshot of your current workload.
              </p>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{totalTasks}</span>
                </div>
                <div className="stat-card stat-card-completed">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">{completedTasks}</span>
                </div>
                <div className="stat-card stat-card-pending">
                  <span className="stat-label">Pending</span>
                  <span className="stat-value">{pendingTasks}</span>
                </div>
              </div>
            </section>
          </main>

          <section className="task-list-section">
            <div className="task-list-header">
              <h2 className="section-title">Tasks</h2>
              <p className="section-description">
                All updates sync in realtime across clients.
              </p>
            </div>

            <div className="task-list">
              {loading && totalTasks === 0 && (
                <p className="muted-text">Loading tasks...</p>
              )}
              {!loading && totalTasks === 0 && (
                <p className="muted-text">
                  No tasks yet. Add one to get started.
                </p>
              )}
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className={`task-card ${
                    task.completed ? "task-card-done" : ""
                  }`}
                >
                  <div className="task-card-main">
                    <div className="task-card-header">
                      <h3 className="task-title">{task.title}</h3>
                      <span
                        className={`task-badge ${
                          task.completed
                            ? "task-badge-completed"
                            : "task-badge-pending"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => toggleTask(task)}
                    >
                      {task.completed ? "Mark Pending" : "Mark Completed"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="footer"></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
