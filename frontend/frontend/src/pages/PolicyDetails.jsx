import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/common/Card";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const PolicyDetails = () => {
  const { policyId } = useParams();
  const numericPolicyId = useMemo(() => Number(policyId), [policyId]);

  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchDetails = async () => {
      if (!Number.isInteger(numericPolicyId) || numericPolicyId <= 0) {
        setError("Invalid policy ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [policiesRes, claimsRes] = await Promise.all([
          api.get("/user/policies"),
          api.get("/user/claims"),
        ]);

        if (policiesRes?.data?.success === false) {
          throw new Error(policiesRes?.data?.message || "Failed to load policy.");
        }
        if (claimsRes?.data?.success === false) {
          throw new Error(claimsRes?.data?.message || "Failed to load claims.");
        }

        const policies = Array.isArray(policiesRes?.data?.data)
          ? policiesRes.data.data
          : [];
        const allClaims = Array.isArray(claimsRes?.data?.data)
          ? claimsRes.data.data
          : [];

        const currentPolicy = policies.find((item) => item.id === numericPolicyId) || null;
        const policyClaims = allClaims.filter((item) => item.policy_id === numericPolicyId);

        if (mounted) {
          setPolicy(currentPolicy);
          setClaims(policyClaims);
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load policy details.";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetails();
    return () => {
      mounted = false;
    };
  }, [numericPolicyId]);

  if (loading) {
    return (
      <PageContainer>
        <SectionHeader title="Policy Details" subtitle="Loading certificate and claim history." />
        <p style={styles.message}>Loading policy details...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <SectionHeader title="Policy Details" subtitle="There was an issue loading this policy." />
        <p style={styles.error}>{error}</p>
      </PageContainer>
    );
  }

  if (!policy) {
    return (
      <PageContainer>
        <SectionHeader title="Policy Details" subtitle="Requested policy does not exist." />
        <p style={styles.error}>Policy not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader
        title="Policy Details"
        subtitle="View certificate details, status, and related claims for this protection."
      />

      <Card variant="elevated" padding="lg" style={styles.card}>
        <p style={styles.meta}>Policy ID: {policy.id}</p>
        <p style={styles.meta}>Plan: {policy.plan_name}</p>
        <p style={styles.meta}>Status: {policy.status}</p>
        <p style={styles.meta}>Start Date: {formatDate(policy.start_date)}</p>
        <p style={styles.meta}>End Date: {formatDate(policy.end_date)}</p>

        <div style={styles.actions}>
          <Link to={`/claims/new?policyId=${policy.id}`} style={styles.link}>
            Raise Claim
          </Link>
          <Link to={`/receipt/${policy.id}`} style={styles.link}>
            View Receipt
          </Link>
        </div>
      </Card>

      <div style={styles.claimsSection}>
        <h2 style={styles.claimsTitle}>Related Claims</h2>
        {claims.length === 0 ? (
          <p style={styles.empty}>No claims submitted for this policy yet.</p>
        ) : (
          <div style={styles.claimsList}>
            {claims.map((claim) => (
              <Card key={claim.id} variant="subtle" padding="md" style={styles.claimItem}>
                <p style={styles.meta}>Claim ID: {claim.id}</p>
                <p style={styles.meta}>Incident: {claim.incident_type}</p>
                <p style={styles.meta}>Amount: {claim.amount}</p>
                <p style={styles.meta}>Status: {claim.status}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
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
  meta: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    margin: 0,
  },
  actions: {
    marginTop: "14px",
    display: "flex",
    gap: "10px",
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
  claimsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  claimsTitle: {
    color: "var(--text-primary)",
    fontSize: "1.34rem",
  },
  empty: {
    color: "var(--text-secondary)",
  },
  claimsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  },
  claimItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
};

export default PolicyDetails;
