/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const DIFFERENTIATORS = [
  {
    title: "Prevention Before Loss",
    legacy: "Most systems activate only after an incident is reported.",
    sambhav: "DBS-driven awareness starts reducing avoidable risk before fraud occurs.",
  },
  {
    title: "Modular, Not Monolithic",
    legacy: "Users are forced into fixed policy bundles that may not match their behavior.",
    sambhav: "Protection modules align to real digital usage patterns and risk exposure.",
  },
  {
    title: "FIR-Light by Default",
    legacy: "Claims often begin with documentation friction and delayed confidence.",
    sambhav: "Routine cases are designed for low-friction claim handling with transparent states.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const WhySambhav = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <motion.section style={styles.hero} {...reveal}>
        <p style={styles.eyebrow}>WHY SAMBHAV</p>
        <h1 style={styles.title}>A calmer, clearer model for digital protection.</h1>
        <p style={styles.subtitle}>
          Sambhav is engineered to reduce uncertainty, shorten response loops, and keep users digitally confident.
        </p>
      </motion.section>

      <section style={styles.section}>
        {DIFFERENTIATORS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          >
            <Card variant="elevated" padding="lg" style={styles.compareCard}>
              <h2 style={styles.compareTitle}>{item.title}</h2>
              <div style={styles.compareGrid}>
                <div style={styles.compareCol}>
                  <p style={styles.compareLabel}>Conventional flow</p>
                  <p style={styles.compareText}>{item.legacy}</p>
                </div>
                <div style={styles.compareCol}>
                  <p style={styles.compareLabelAccent}>Sambhav flow</p>
                  <p style={styles.compareText}>{item.sambhav}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <motion.section style={styles.footerCta} {...reveal}>
        <h2 style={styles.footerTitle}>Choose a system that protects confidence, not just incidents.</h2>
        <div style={styles.actions}>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Start with Sambhav
          </Button>
          <Button variant="secondary" onClick={() => navigate("/the-system")}>
            View The System
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "42px",
    paddingTop: "32px",
    paddingBottom: "64px",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "780px",
  },
  eyebrow: {
    color: "var(--accent-primary)",
    letterSpacing: "0.12em",
    fontSize: "0.82rem",
    fontWeight: 700,
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1rem",
    lineHeight: "1.8",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  compareCard: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  compareTitle: {
    fontSize: "1.25rem",
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "12px",
  },
  compareCol: {
    backgroundColor: "var(--surface-alt)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "12px",
  },
  compareLabel: {
    color: "var(--text-secondary)",
    fontWeight: 700,
    marginBottom: "6px",
  },
  compareLabelAccent: {
    color: "var(--accent-primary)",
    fontWeight: 700,
    marginBottom: "6px",
  },
  compareText: {
    lineHeight: "1.7",
    fontSize: "0.95rem",
  },
  footerCta: {
    borderRadius: "16px",
    border: "1px solid var(--border)",
    background:
      "linear-gradient(150deg, rgba(31,77,58,0.95) 0%, rgba(31,77,58,0.84) 100%)",
    padding: "28px",
  },
  footerTitle: {
    color: "#ffffff",
    marginBottom: "14px",
    fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
};

export default WhySambhav;
