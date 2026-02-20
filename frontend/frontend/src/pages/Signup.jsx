import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Name, email, password, and confirm password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (response?.data?.success === false) {
        throw new Error(response?.data?.message || "Signup failed.");
      }

      navigate("/login", {
        replace: true,
        state: { signupSuccess: true },
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Could not create account. Please try again.";
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
          <h1 style={styles.brandTitle}>Build Your Secure Access Layer.</h1>
          <p style={styles.brandText}>
            Create your Sambhav account to activate prevention-first digital protection and unified
            cyber support.
          </p>
          <p style={styles.brandFootnote}>Institution-grade trust for everyday digital life.</p>
        </div>
      </section>

      <section style={styles.formPanel}>
        <Card variant="elevated" padding="lg" style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Your Sambhav Account</h2>
          <p style={styles.formSubtitle}>
            Start with secure credentials. You can complete everything else inside your dashboard.
          </p>

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              autoComplete="name"
              disabled={loading}
              placeholder="Your full name"
            />

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

            <label style={styles.label} htmlFor="phone">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              autoComplete="tel"
              disabled={loading}
              placeholder="+91 XXXXX XXXXX"
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
              autoComplete="new-password"
              disabled={loading}
              placeholder="Create a strong password"
            />

            <label style={styles.label} htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              autoComplete="new-password"
              disabled={loading}
              placeholder="Re-enter your password"
            />

            {error ? <p style={styles.error}>{error}</p> : null}

            <Button type="submit" fullWidth loading={loading} style={styles.submitButton}>
              Create Account
            </Button>
          </form>

          <p style={styles.altText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.altLink}>
              Sign in
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
    maxWidth: "540px",
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

export default Signup;
