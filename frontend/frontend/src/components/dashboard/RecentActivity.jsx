import Card from "../common/Card";

const RecentActivity = ({ activities = [] }) => {
  return (
    <Card variant="elevated" padding="lg" style={styles.container}>
      <h3 style={styles.title}>Recent Activity</h3>

      {activities.length === 0 ? (
        <p style={styles.empty}>No recent activity. Your system is stable.</p>
      ) : (
        <div style={styles.list}>
          {activities.map((item) => (
            <div key={item.id} style={styles.item}>
              <p style={styles.text}>{item.text}</p>
              <span style={styles.time}>{item.time}</span>
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
    gap: "10px",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "var(--text-primary)",
    lineHeight: 1.45,
  },
  time: {
    fontSize: "12px",
    color: "var(--text-secondary)",
  },
  item: {
    paddingBottom: "10px",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};

export default RecentActivity;
