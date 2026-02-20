import Card from "../common/Card";

const ClaimCard = ({ count = 0 }) => {
  const claimState = count > 0 ? `${count} in process` : "No active claims";
  const tone = count > 0 ? "under_review" : "submitted";
  const badge =
    tone === "under_review"
      ? styles.badgeReview
      : styles.badgeNeutral;

  return (
    <div style={styles.motionWrap}>
      <Card variant="elevated" padding="lg" style={styles.card}>
        <div style={styles.topRow}>
          <p style={styles.title}>Claims</p>
          <span style={{ ...styles.badgeBase, ...badge }}>{tone === "under_review" ? "In Progress" : "Idle"}</span>
        </div>
        <p style={styles.count}>{count}</p>
        <p style={styles.subtitle}>Track current claim stages and approvals.</p>
        <p style={styles.meta}>{claimState}</p>
      </Card>
    </div>
  );
};

const styles = {
  motionWrap: {
    height: "100%",
  },
  card: {
    minHeight: "170px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderLeft: "3px solid var(--accent-primary)",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  title: {
    fontSize: "11px",
    color: "var(--text-secondary)",
    margin: 0,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  count: {
    margin: 0,
    fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
    lineHeight: 1,
    fontWeight: 700,
    color: "var(--text-primary)",
    fontFamily: '"Playfair Display", serif',
  },
  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  meta: {
    margin: 0,
    marginTop: "auto",
    color: "var(--accent-primary)",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  badgeBase: {
    borderRadius: "999px",
    padding: "4px 9px",
    fontSize: "11px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  badgeNeutral: {
    backgroundColor: "rgba(77, 85, 92, 0.16)",
    color: "#3f464c",
  },
  badgeReview: {
    backgroundColor: "rgba(196, 138, 58, 0.18)",
    color: "#8a5c1f",
  },
};

export default ClaimCard;
