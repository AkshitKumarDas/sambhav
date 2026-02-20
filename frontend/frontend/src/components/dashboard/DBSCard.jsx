import Card from "../common/Card";

const getScoreState = (score) => {
  if (score >= 80) {
    return {
      label: "Strong",
      tone: "#15563f",
      bg: "rgba(21, 86, 63, 0.14)",
    };
  }

  if (score >= 60) {
    return {
      label: "Stable",
      tone: "var(--accent-primary)",
      bg: "rgba(31, 77, 58, 0.14)",
    };
  }

  return {
    label: "At Risk",
    tone: "#8f5a12",
    bg: "rgba(196, 138, 58, 0.18)",
  };
};

const DBSCard = ({ score = 70 }) => {
  const scoreState = getScoreState(score);

  return (
    <div style={styles.motionWrap}>
      <Card variant="elevated" padding="lg" style={styles.card}>
        <p style={styles.label}>DBS Health</p>
        <p style={styles.score}>{score}</p>
        <span
          style={{
            ...styles.badge,
            color: scoreState.tone,
            backgroundColor: scoreState.bg,
          }}
        >
          {scoreState.label}
        </span>
        <p style={styles.desc}>Based on your latest behavioral assessment.</p>
      </Card>
    </div>
  );
};

const styles = {
  motionWrap: {
    height: "100%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderLeft: "3px solid var(--accent-primary)",
  },
  label: {
    color: "var(--text-secondary)",
    fontSize: "11px",
    fontWeight: 700,
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  score: {
    margin: 0,
    fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
    lineHeight: 1,
    fontWeight: 700,
    color: "var(--text-primary)",
    fontFamily: '"Playfair Display", serif',
  },
  badge: {
    width: "fit-content",
    fontSize: "12px",
    fontWeight: 700,
    borderRadius: "999px",
    padding: "6px 10px",
  },
  desc: {
    color: "var(--text-secondary)",
    fontSize: "12px",
    margin: 0,
    marginTop: "2px",
    lineHeight: 1.45,
  },
};

export default DBSCard;
