import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "U";
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuth();
  const loading = false;
  const error = !isAuthenticated
    ? "You are not authenticated."
    : !user
      ? "User profile data is not available."
      : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <PageContainer maxWidth="900px">
        <SectionHeader title="Profile" subtitle="Loading your identity panel." />
        <p style={styles.message}>Loading profile...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="900px">
        <SectionHeader title="Profile" subtitle="Profile information is unavailable." />
        <p style={styles.error}>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="900px">
      <SectionHeader title="Profile" subtitle="Identity and session overview." />
      <Card variant="elevated" padding="lg" style={styles.profileCard}>
        <div style={styles.topRow}>
          <div style={styles.avatar}>{getInitials(user?.name)}</div>
          <div style={styles.userMeta}>
            <p style={styles.name}>{user?.name || "-"}</p>
            <p style={styles.meta}>Role: {role || "-"}</p>
            <p style={styles.meta}>User ID: {user?.id || "-"}</p>
          </div>
        </div>
        <div style={styles.sessionBlock}>
          <p style={styles.sessionTitle}>Session Status</p>
          <p style={styles.sessionText}>Active</p>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </PageContainer>
  );
};

const styles = {
  message: {
    color: "var(--text-secondary)",
  },
  error: {
    color: "#a12727",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "620px",
  },
  topRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(31,77,58,0.18)",
    color: "var(--accent-primary)",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    fontSize: "18px",
  },
  userMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  name: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "1.08rem",
    fontWeight: 700,
  },
  meta: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
  sessionBlock: {
    backgroundColor: "var(--surface-alt)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionTitle: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: 600,
  },
  sessionText: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "14px",
    fontWeight: 700,
  },
};

export default Profile;
