import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/common/Card";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const Receipt = () => {
  const { policyId } = useParams();

  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchReceipt = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/receipt/${policyId}`);

        if (res?.data?.success === false) {
          throw new Error(res?.data?.message || "Failed to load receipt.");
        }

        if (mounted) {
          setReceipt(res?.data?.data || null);
        }
      } catch (err) {
        const status = err?.response?.status;
        let message = "Failed to load receipt.";

        if (status === 403) message = "You are not allowed to view this receipt.";
        else if (status === 404) message = "Receipt not found for this policy.";
        else if (status === 401) message = "Session expired. Please login again.";
        else {
          message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            message;
        }

        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchReceipt();
    return () => {
      mounted = false;
    };
  }, [policyId]);

  if (loading) {
    return (
      <PageContainer maxWidth="900px">
        <SectionHeader title="Receipt" subtitle="Loading receipt details." />
        <p style={styles.message}>Loading receipt...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="900px">
        <SectionHeader title="Receipt" subtitle="There was an issue loading this receipt." />
        <p style={styles.error}>{error}</p>
      </PageContainer>
    );
  }

  if (!receipt) {
    return (
      <PageContainer maxWidth="900px">
        <SectionHeader title="Receipt" subtitle="Receipt is not available for this policy." />
        <p style={styles.error}>Receipt not available.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="900px">
      <SectionHeader title="Receipt" subtitle="Official transaction and policy issuance details." />
      <Card variant="elevated" padding="lg" style={styles.card}>
        <p style={styles.item}>Receipt Number: {receipt.receipt_number}</p>
        <p style={styles.item}>Plan: {receipt.plan_name}</p>
        <p style={styles.item}>Premium Amount: {receipt.premium_amount}</p>
        <p style={styles.item}>Policy ID: {receipt.policy_id}</p>
        <p style={styles.item}>Created At: {formatDate(receipt.created_at)}</p>
      </Card>

      <div style={styles.actions}>
        <Link to={`/policies/${receipt.policy_id}`} style={styles.link}>
          Back to Policy
        </Link>
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
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  item: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  link: {
    color: "var(--accent-primary)",
    textDecoration: "none",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "13px",
    backgroundColor: "var(--surface)",
    width: "fit-content",
    fontWeight: 600,
  },
};

export default Receipt;
