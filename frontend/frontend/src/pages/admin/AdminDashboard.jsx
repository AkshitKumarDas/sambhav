import { useEffect, useMemo, useState } from "react";
import Card from "../../components/common/Card";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import api from "../../services/api";

const EMPTY_METRICS = {
  totalUsers: 0,
  totalPolicies: 0,
  totalClaims: 0,
  approvedClaims: 0,
  rejectedClaims: 0,
  totalPayout: 0,
  totalExposure: 0,
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/admin/metrics");
        const payload =
          res?.data?.data && typeof res.data.data === "object" ? res.data.data : res?.data || {};

        if (res?.data?.success === false) {
          throw new Error(res?.data?.message || "Failed to load admin metrics.");
        }

        if (mounted) {
          setMetrics({
            totalUsers: Number(payload.totalUsers || 0),
            totalPolicies: Number(payload.totalPolicies || 0),
            totalClaims: Number(payload.totalClaims || 0),
            approvedClaims: Number(payload.approvedClaims || 0),
            rejectedClaims: Number(payload.rejectedClaims || 0),
            totalPayout: Number(payload.totalPayout || 0),
            totalExposure: Number(payload.totalExposure || 0),
          });
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load admin metrics.";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMetrics();
    return () => {
      mounted = false;
    };
  }, []);

  const approvalRate = useMemo(() => {
    if (metrics.totalClaims <= 0) return "0.0";
    return ((metrics.approvedClaims / metrics.totalClaims) * 100).toFixed(1);
  }, [metrics.approvedClaims, metrics.totalClaims]);

  return (
    <PageContainer>
      <SectionHeader
        title="Admin Risk Dashboard"
        subtitle="Operational risk and financial sustainability view across the system."
      />

      {loading ? <p style={styles.message}>Loading admin metrics...</p> : null}
      {error ? <p style={styles.error}>{error}</p> : null}

      {!loading && !error ? (
        <div style={styles.stack}>
          <div style={styles.rowGrid}>
            <MetricCard label="Total Users" value={metrics.totalUsers} />
            <MetricCard label="Total Policies" value={metrics.totalPolicies} />
            <MetricCard label="Total Claims" value={metrics.totalClaims} />
          </div>

          <div style={styles.rowGrid}>
            <MetricCard label="Approved Claims" value={metrics.approvedClaims} />
            <MetricCard label="Rejected Claims" value={metrics.rejectedClaims} />
            <MetricCard label="Approval Rate" value={`${approvalRate}%`} />
          </div>

          <div style={styles.rowGridLast}>
            <MetricCard label="Total Payout" value={formatCurrency(metrics.totalPayout)} />
            <MetricCard label="Total Exposure" value={formatCurrency(metrics.totalExposure)} />
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
};

const MetricCard = ({ label, value }) => (
  <Card variant="elevated" padding="lg" style={styles.metricCard}>
    <p style={styles.metricLabel}>{label}</p>
    <p style={styles.metricValue}>{value}</p>
  </Card>
);

const styles = {
  message: {
    color: "var(--text-secondary)",
  },
  error: {
    color: "#a12727",
    fontSize: "14px",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  rowGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  rowGridLast: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "14px",
  },
  metricCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderLeft: "3px solid var(--accent-primary)",
    minHeight: "140px",
  },
  metricLabel: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  metricValue: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "clamp(2rem, 3.4vw, 2.9rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    fontFamily: '"Playfair Display", serif',
  },
};

export default AdminDashboard;
