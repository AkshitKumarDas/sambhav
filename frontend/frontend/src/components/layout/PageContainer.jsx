const PageContainer = ({ children, maxWidth = "1240px", style = {} }) => {
  return (
    <section style={{ ...styles.outer, ...style }}>
      <div style={{ ...styles.inner, maxWidth }}>{children}</div>
    </section>
  );
};

const styles = {
  outer: {
    padding: "clamp(56px, 6.4vw, 80px) clamp(18px, 2.6vw, 30px)",
  },
  inner: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
};

export default PageContainer;
