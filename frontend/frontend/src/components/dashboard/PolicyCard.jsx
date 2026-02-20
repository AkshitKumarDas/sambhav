import Card from "../common/Card";

const PolicyCard = ({ count = 0 }) => {
  const coverageState = count > 0 ? "Active" : "Not Activated";

  return (
    <div style={styles.motionWrap}>
      <Card variant="elevated" padding="lg" style={styles.card}>
        <p style={styles.title}>Active Policies</p>
        <p style={styles.count}>{count}</p>
        <p style={styles.subtitle}>Protection modules currently active under Sambhav.</p>
        <p style={styles.meta}>Coverage: {coverageState}</p>
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
    gap: "8px",
  },
  title: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: 0,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  count: {
    margin: 0,
    fontSize: "clamp(2rem, 2.8vw, 2.5rem)",
    lineHeight: 1.1,
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
    fontSize: "12px",
    fontWeight: 700,
  },
};

export default PolicyCard;
