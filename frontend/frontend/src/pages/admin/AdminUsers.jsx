import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  return (
    <PageContainer>
      <SectionHeader
        title="Users"
        subtitle="Platform-wide user management and account oversight."
      />

      <Card variant="subtle" padding="lg" style={styles.card}>
        <p style={styles.icon} aria-hidden="true">
          {String.fromCharCode(8505)}
        </p>
        <p style={styles.title}>Admin endpoint not connected yet.</p>
        <p style={styles.text}>
          Backend currently does not expose a user listing endpoint for admins.
          This page is intentionally kept as a safe placeholder.
        </p>
        <Link to="/admin" style={styles.ctaLink}>
          <Button type="button">Back to Admin Dashboard</Button>
        </Link>
      </Card>
    </PageContainer>
  );
};

const styles = {
  card: {
    maxWidth: "640px",
    margin: "0 auto",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "10px",
  },
  icon: {
    margin: 0,
    width: "46px",
    height: "46px",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    fontSize: "24px",
    color: "var(--accent-primary)",
    backgroundColor: "rgba(31, 77, 58, 0.1)",
  },
  title: {
    margin: 0,
    color: "var(--text-primary)",
    fontWeight: 700,
    fontSize: "1.06rem",
  },
  text: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "14px",
    lineHeight: 1.6,
    maxWidth: "470px",
  },
  ctaLink: {
    textDecoration: "none",
    marginTop: "8px",
  },
};

export default AdminUsers;
