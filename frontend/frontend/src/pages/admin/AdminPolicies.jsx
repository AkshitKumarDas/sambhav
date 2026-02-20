import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import { Link } from "react-router-dom";

const AdminPolicies = () => {
  return (
    <PageContainer>
      <SectionHeader
        title="All Policies"
        subtitle="Platform-wide policy management surface."
      />

      <Card variant="subtle" padding="lg" style={styles.card}>
        <p style={styles.icon} aria-hidden="true">
          {String.fromCharCode(8505)}
        </p>
        <p style={styles.title}>Admin endpoint not connected yet.</p>
        <p style={styles.text}>
          Backend currently exposes admin claim endpoints only. Policy-level admin
          listing can be enabled once an endpoint is added.
        </p>
        <Link to="/admin/claims" style={styles.ctaLink}>
          <Button type="button">Go to Claims</Button>
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

export default AdminPolicies;
