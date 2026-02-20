import { useEffect, useState } from "react";
import ClaimCard from "../components/dashboard/ClaimCard";
import DBSCard from "../components/dashboard/DBSCard";
import PolicyCard from "../components/dashboard/PolicyCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ClaimTimeline from "../components/dashboard/ClaimTimeline";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const defaultSummary = {
  dbsScore: 70,
  policyCount: 0,
  claimCount: 0,
};

const toTimestamp = (value) => {
  if (!value) return 0;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const formatActivityTime = (timestamp) => {
  if (!timestamp) return "Date unavailable";
  const date = new Date(timestamp);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const buildActivities = (policies, claims, dbsLatest) => {
  const events = [];

  policies.forEach((policy) => {
    events.push({
      id: `policy-${policy.id}`,
      text: `Policy #${policy.id} activated`,
      timestamp: toTimestamp(policy.created_at || policy.start_date || policy.end_date),
    });
  });

  claims.forEach((claim) => {
    events.push({
      id: `claim-${claim.id}`,
      text: `Claim #${claim.id} submitted`,
      timestamp: toTimestamp(claim.created_at),
    });
  });

  if (dbsLatest) {
    events.push({
      id: `dbs-${dbsLatest.id || "latest"}`,
      text: "Cyber score updated",
      timestamp: toTimestamp(dbsLatest.created_at),
    });
  }

  return events
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      time: formatActivityTime(item.timestamp),
    }));
};

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(defaultSummary);
  const [latestDbs, setLatestDbs] = useState(null);
  const [claims, setClaims] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [summaryRes, dbsRes, policiesRes, claimsRes] = await Promise.all([
        api.get("/user/summary"),
        api.get("/dbs/latest"),
        api.get("/user/policies"),
        api.get("/user/claims"),
      ]);

      if (summaryRes?.data?.success === false) {
        throw new Error(summaryRes?.data?.message || "Failed to load dashboard summary.");
      }
      if (dbsRes?.data?.success === false) {
        throw new Error(dbsRes?.data?.message || "Failed to load DBS status.");
      }
      if (policiesRes?.data?.success === false) {
        throw new Error(policiesRes?.data?.message || "Failed to load policy activity.");
      }
      if (claimsRes?.data?.success === false) {
        throw new Error(claimsRes?.data?.message || "Failed to load claim activity.");
      }

      const summaryData = summaryRes?.data?.data || defaultSummary;
      const dbsData = dbsRes?.data?.data || null;
      const policyList = Array.isArray(policiesRes?.data?.data) ? policiesRes.data.data : [];
      const claimList = Array.isArray(claimsRes?.data?.data) ? claimsRes.data.data : [];

      const sortedClaims = [...claimList].sort((a, b) => {
        const byDate = toTimestamp(b.created_at) - toTimestamp(a.created_at);
        if (byDate !== 0) return byDate;
        return Number(b.id || 0) - Number(a.id || 0);
      });

      setSummary({
        dbsScore: Number(summaryData?.dbsScore ?? 70),
        policyCount: Number(summaryData?.policyCount ?? 0),
        claimCount: Number(summaryData?.claimCount ?? 0),
      });
      setLatestDbs(dbsData);
      setClaims(sortedClaims);
      setActivities(buildActivities(policyList, claimList, dbsData));
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Summary fetch failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <SectionHeader title="Dashboard" subtitle="Loading your latest protection status." />
        <p style={styles.message}>Loading dashboard...</p>
      </PageContainer>
    );
  }

  const score = Number(latestDbs?.score ?? summary?.dbsScore ?? 70);

  return (
    <PageContainer>
      <SectionHeader
        title={`Welcome back, ${user?.name || "User"}`}
        subtitle="Your digital protection status as of today."
      />

      {error ? <p style={styles.error}>{error}</p> : null}

      <div style={styles.grid}>
        <DBSCard score={score} />
        <PolicyCard count={summary.policyCount} />
        <ClaimCard count={summary.claimCount} />
      </div>

      <div style={styles.lowerGrid}>
        <RecentActivity activities={activities} />
        <ClaimTimeline claims={claims} />
      </div>
    </PageContainer>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  lowerGrid: {
    marginTop: "18px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  error: {
    color: "#a12727",
    marginTop: "-6px",
    marginBottom: "2px",
    fontSize: "14px",
  },
  message: {
    color: "var(--text-secondary)",
  },
};

export default Dashboard;
