import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import SectionHeader from "../components/common/SectionHeader";
import PageContainer from "../components/layout/PageContainer";
import api from "../services/api";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchPolicies = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/user/policies");

        if (res?.data?.success === false) {
          throw new Error(res?.data?.message || "Failed to load policies.");
        }

        if (mounted) {
          setPolicies(Array.isArray(res?.data?.data) ? res.data.data : []);
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load policies.";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPolicies();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <SectionHeader title="Policies" subtitle="Loading your active protections." />
        <p style={styles.message}>Loading policies...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <SectionHeader title="Policies" subtitle="We could not load your policy list right now." />
        <p style={styles.error}>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader title="Your Policies" subtitle="Review policy status, validity, and actions." />

      {policies.length === 0 ? (
        <Card variant="subtle" padding="lg" style={styles.emptyCard}>
          <p style={styles.emptyTitle}>No active policies yet.</p>
          <p style={styles.emptyText}>Activate a protection plan to begin coverage.</p>
          <Link to="/plans" style={styles.emptyCta}>
            Explore Plans
          </Link>
        </Card>
      ) : (
        <div style={styles.list}>
          {policies.map((policy) => (
            <Card key={policy.id} variant="elevated" padding="lg" style={styles.card}>
              <div style={styles.row}>
                <h3 style={styles.plan}>{policy.plan_name}</h3>
                <span style={styles.status}>{policy.status}</span>
              </div>
              <p style={styles.meta}>Policy ID: {policy.id}</p>
              <p style={styles.meta}>Start: {formatDate(policy.start_date)}</p>
              <p style={styles.meta}>End: {formatDate(policy.end_date)}</p>

              <div style={styles.actions}>
                <Link to={`/policies/${policy.id}`} style={styles.link}>
                  View Details
                </Link>
                <Link to={`/claims/new?policyId=${policy.id}`} style={styles.link}>
                  Raise Claim
                </Link>
                <Link to={`/receipt/${policy.id}`} style={styles.link}>
                  View Receipt
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
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
  emptyCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    maxWidth: "560px",
  },
  emptyTitle: {
    color: "var(--text-primary)",
    fontWeight: 700,
    fontSize: "1.02rem",
  },
  emptyText: {
    color: "var(--text-secondary)",
  },
  emptyCta: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "var(--accent-primary)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "14px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  plan: {
    textTransform: "capitalize",
    color: "var(--text-primary)",
    margin: 0,
    fontSize: "1.08rem",
  },
  status: {
    textTransform: "capitalize",
    fontSize: "12px",
    padding: "4px 9px",
    borderRadius: "999px",
    backgroundColor: "rgba(31,77,58,0.12)",
    color: "var(--accent-primary)",
    fontWeight: 600,
  },
  meta: {
    color: "var(--text-secondary)",
    fontSize: "13px",
    margin: 0,
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  link: {
    color: "var(--accent-primary)",
    textDecoration: "none",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "12px",
    backgroundColor: "var(--surface)",
    fontWeight: 600,
  },
};

export default Policies;
