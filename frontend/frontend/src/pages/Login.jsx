import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import api from "../services/api";

const getPayload = (res) => {
  const root = res?.data || {};
  return root?.data && typeof root.data === "object" ? root.data : root;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const showSignupSuccess = Boolean(location.state?.signupSuccess);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const payload = getPayload(res);
      const token = payload?.token || "";
      const user = payload?.user || null;

      if (!token) {
        setError("Login response did not include a token.");
        return;
      }

      login({ token, user });
      navigate(user?.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <section style={styles.brandPanel}>
        <div style={styles.brandOverlay} />
        <div style={styles.brandContent}>
          <p style={styles.eyebrow}>SAMBHAV DIGITAL SAFETY</p>
          <h1 style={styles.brandTitle}>Your Digital Safety, Secured.</h1>
          <p style={styles.brandText}>
            Access your cyber protection dashboard and manage your digital safety with confidence.
          </p>
          <p style={styles.brandFootnote}>Prevention-first cyber protection system.</p>
        </div>
      </section>

      <section style={styles.formPanel}>
        <Card variant="elevated" padding="lg" style={styles.formCard}>
          <h2 style={styles.formTitle}>Secure Sign In</h2>
          <p style={styles.formSubtitle}>We use encrypted authentication to protect your data.</p>
          {showSignupSuccess ? (
            <p style={styles.success}>Account created successfully. Sign in to continue.</p>
          ) : null}

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
              disabled={loading}
              placeholder="you@example.com"
            />

            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
              disabled={loading}
              placeholder="Enter your password"
            />

            {error ? <p style={styles.error}>{error}</p> : null}

            <Button type="submit" fullWidth loading={loading} style={styles.submitButton}>
              Sign In
            </Button>
          </form>

          <p style={styles.altText}>
            New to Sambhav?{" "}
            <Link to="/signup" style={styles.altLink}>
              Create account
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 96px)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid var(--border)",
    backgroundColor: "var(--surface)",
    boxShadow: "var(--shadow-soft)",
  },
  brandPanel: {
    position: "relative",
    minHeight: "440px",
    padding: "48px clamp(24px, 5vw, 56px)",
    display: "flex",
    alignItems: "center",
    background:
      "radial-gradient(120% 130% at 0% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 48%, rgba(0,0,0,0) 100%), linear-gradient(145deg, #1f4d3a 0%, #173a2d 55%, #10271f 100%)",
  },
  brandOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(130deg, rgba(255,255,255,0.07), rgba(255,255,255,0) 40%), radial-gradient(circle at 80% 20%, rgba(196,138,58,0.22), rgba(196,138,58,0) 40%)",
    pointerEvents: "none",
  },
  brandContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "460px",
  },
  eyebrow: {
    color: "rgba(255,255,255,0.78)",
    letterSpacing: "0.12em",
    fontSize: "12px",
    fontWeight: 600,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: "clamp(2rem, 3.2vw, 3rem)",
    lineHeight: 1.14,
  },
  brandText: {
    color: "rgba(255,255,255,0.86)",
    fontSize: "16px",
    lineHeight: 1.6,
  },
  brandFootnote: {
    color: "rgba(255,255,255,0.72)",
    fontSize: "14px",
    marginTop: "6px",
  },
  formPanel: {
    display: "grid",
    placeItems: "center",
    padding: "clamp(22px, 4vw, 40px)",
    backgroundColor: "var(--bg)",
  },
  formCard: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formTitle: {
    fontSize: "30px",
  },
  formSubtitle: {
    marginBottom: "4px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "4px",
  },
  label: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontWeight: 500,
  },
  input: {
    minHeight: "48px",
    padding: "0 14px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
  },
  success: {
    color: "#2f6e3f",
    fontSize: "14px",
    marginTop: "2px",
  },
  error: {
    color: "#a12727",
    fontSize: "14px",
    marginTop: "2px",
  },
  submitButton: {
    marginTop: "6px",
    minHeight: "48px",
  },
  altText: {
    marginTop: "2px",
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  altLink: {
    color: "var(--accent-primary)",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default Login;
