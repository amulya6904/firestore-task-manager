import { useState } from "react";
import "./App.css";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (action) => {
    setLoading(true);
    setError("");
    try {
      if (action === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      const code = err?.code;
      const messages = {
        "auth/configuration-not-found":
          "Authentication is not fully configured. Make sure Email/Password sign-in is enabled in Firebase Console.",
        "auth/user-not-found": "No account found with that email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/email-already-in-use": "This email is already in use.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password is too weak. Try a stronger one.",
      };
      const fallback = "Something went wrong. Please try again.";
      setError(messages[code] || fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-inner">
        <div className="app-card auth-card">
          <header className="app-header">
            <h1 className="app-title">Firestore Task Manager</h1>
            <p className="section-description">
              Sign in or create an account to manage your tasks.
            </p>
          </header>

          {error && <div className="error-alert">{error}</div>}

          <main className="app-main">
            <div className="task-form-section">
              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="field-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="auth-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAuth("login")}
                  disabled={loading}
                >
                  {loading ? "Working..." : "Login"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleAuth("register")}
                  disabled={loading}
                >
                  {loading ? "Working..." : "Register"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
