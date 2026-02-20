import Card from "../common/Card";

const STATUS_LABELS = {
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

const normalizeStatus = (status) => STATUS_LABELS[status] || "Submitted";

const ClaimTimeline = ({ claims = [] }) => {
  const rows = claims.slice(0, 5);

  return (
    <Card variant="elevated" padding="lg" style={styles.container}>
      <h3 style={styles.title}>Claim Timeline</h3>

      {rows.length === 0 ? (
        <p style={styles.empty}>No active claims in process.</p>
      ) : (
        <div style={styles.list}>
          {rows.map((claim, index) => (
            <div key={claim.id} style={styles.step}>
              <div style={styles.rail}>
                <span style={styles.dot} />
                {index !== rows.length - 1 ? <span style={styles.line} /> : null}
              </div>
              <div style={styles.copy}>
                <p style={styles.claimLabel}>Claim #{claim.id}</p>
                <p style={styles.statusLabel}>{normalizeStatus(claim.status)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "1.12rem",
  },
  empty: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  step: {
    display: "grid",
    gridTemplateColumns: "20px 1fr",
    columnGap: "10px",
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "var(--accent-primary)",
  },
  line: {
    width: "2px",
    flex: 1,
    minHeight: "24px",
    backgroundColor: "rgba(31, 77, 58, 0.24)",
    marginTop: "4px",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    paddingBottom: "6px",
  },
  claimLabel: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: 600,
  },
  statusLabel: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "13px",
  },
};

export default ClaimTimeline;
