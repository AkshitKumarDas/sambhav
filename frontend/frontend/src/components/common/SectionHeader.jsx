const SectionHeader = ({ title, subtitle, action = null }) => {
  return (
    <div style={styles.wrap}>
      <div style={styles.copy}>
        <h1 style={styles.title}>{title}</h1>
        {subtitle ? <p style={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {action ? <div style={styles.action}>{action}</div> : null}
    </div>
  );
};

const styles = {
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "2px",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "780px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
    color: "var(--text-primary)",
    letterSpacing: "-0.01em",
    lineHeight: 1.15,
  },
  subtitle: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "0.96rem",
    lineHeight: 1.6,
  },
  action: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default SectionHeader;
