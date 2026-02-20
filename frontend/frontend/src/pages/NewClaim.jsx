import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import SectionHeader from "../components/common/SectionHeader";
import PageContainer from "../components/layout/PageContainer";
import { PLAN_COVERAGE } from "../constants/planCoverage";
import api from "../services/api";

const INCIDENT_LABELS = {
  upi_fraud: "UPI Fraud",
  phishing: "Phishing",
  account_takeover: "Account Takeover",
};

const NewClaim = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [policiesLoading, setPoliciesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [policyId, setPolicyId] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const selectedPolicy = useMemo(
    () => policies.find((item) => String(item.id) === String(policyId)),
    [policies, policyId],
  );
  // Incident coverage mirrors backend planModules.js
  // Prevents frontend allowing guaranteed rejected claims
  const allowedIncidents = PLAN_COVERAGE[selectedPolicy?.plan_name] || [];

  const handlePolicyChange = (nextPolicyId) => {
    setPolicyId(nextPolicyId);
    const nextPolicy = policies.find((item) => String(item.id) === String(nextPolicyId));
    const nextAllowedIncidents = PLAN_COVERAGE[nextPolicy?.plan_name] || [];
    if (!nextAllowedIncidents.includes(incidentType)) {
      setIncidentType("");
    }
  };

  useEffect(() => {
    let mounted = true;
    const requestedPolicyId = searchParams.get("policyId");

    const fetchPolicies = async () => {
      try {
        setPoliciesLoading(true);
        setError("");
        const res = await api.get("/user/policies");

        if (res?.data?.success === false) {
          throw new Error(res?.data?.message || "Failed to load policies.");
        }

        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        if (!mounted) return;

        setPolicies(list);

        if (requestedPolicyId) {
          const numericRequestedId = Number(requestedPolicyId);
          const match = list.find((item) => item.id === numericRequestedId);
          if (match) setPolicyId(String(match.id));
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load policies.";
        if (mounted) setError(message);
      } finally {
        if (mounted) setPoliciesLoading(false);
      }
    };

    fetchPolicies();
    return () => {
      mounted = false;
    };
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");

    const numericPolicyId = Number(policyId);
    const numericAmount = Number(amount);

    if (!Number.isInteger(numericPolicyId) || numericPolicyId <= 0) {
      setError("Please select a valid policy.");
      return;
    }
    if (!incidentType) {
      setError("Please select an incident type.");
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post("/claim/create", {
        policyId: numericPolicyId,
        incidentType,
        description: description.trim(),
        amount: numericAmount,
      });

      if (res?.data?.success === false) {
        throw new Error(res?.data?.message || "Failed to create claim.");
      }

      setSuccess("Claim submitted successfully.");
      navigate(`/policies/${numericPolicyId}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to submit claim.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (policiesLoading) {
    return (
      <PageContainer>
        <SectionHeader title="Raise New Claim" subtitle="Loading your policy options." />
        <p style={styles.message}>Loading claim form...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="980px">
      <SectionHeader
        title="Raise New Claim"
        subtitle="Submit incident details with your linked policy to begin the claim process."
      />

      {error ? <p style={styles.error}>{error}</p> : null}
      {success ? <p style={styles.success}>{success}</p> : null}

      {policies.length === 0 ? (
        <Card variant="subtle" padding="lg" style={styles.emptyCard}>
          <p style={styles.emptyTitle}>No eligible policy found.</p>
          <p style={styles.emptyText}>You need an active policy before raising a claim.</p>
          <Link to="/plans" style={styles.emptyLink}>
            Explore Plans
          </Link>
        </Card>
      ) : (
        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label} htmlFor="policyId">
              1. Select Policy
            </label>
            <select
              id="policyId"
              value={policyId}
              onChange={(e) => handlePolicyChange(e.target.value)}
              style={styles.input}
              disabled={submitting}
            >
              <option value="">Select policy</option>
              {policies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  #{policy.id} - {policy.plan_name}
                </option>
              ))}
            </select>

            <label style={styles.label} htmlFor="incidentType">
              2. Incident Type
            </label>
            <select
              id="incidentType"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              style={styles.input}
              disabled={submitting || !policyId}
            >
              <option value="">Select incident</option>
              {allowedIncidents.map((incidentKey) => (
                <option key={incidentKey} value={incidentKey}>
                  {INCIDENT_LABELS[incidentKey] || incidentKey}
                </option>
              ))}
            </select>

            <label style={styles.label} htmlFor="amount">
              3. Claim Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              placeholder="Enter amount"
              disabled={submitting}
            />

            <label style={styles.label} htmlFor="description">
              4. Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textArea}
              placeholder="Describe the incident"
              disabled={submitting}
            />

            <Button type="submit" loading={submitting} disabled={submitting}>
              Submit Claim
            </Button>
          </form>
        </Card>
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
    fontSize: "14px",
  },
  success: {
    color: "#2f6e3f",
    fontSize: "14px",
  },
  emptyCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
  emptyTitle: {
    color: "var(--text-primary)",
    fontSize: "1.02rem",
    fontWeight: 700,
  },
  emptyText: {
    color: "var(--text-secondary)",
  },
  emptyLink: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "var(--accent-primary)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontWeight: 600,
  },
  input: {
    borderRadius: "10px",
    border: "1px solid var(--border)",
    padding: "11px 12px",
    minHeight: "46px",
    color: "var(--text-primary)",
    backgroundColor: "var(--surface)",
  },
  textArea: {
    borderRadius: "10px",
    border: "1px solid var(--border)",
    padding: "10px 12px",
    minHeight: "96px",
    resize: "vertical",
    color: "var(--text-primary)",
    backgroundColor: "var(--surface)",
  },
};

export default NewClaim;
