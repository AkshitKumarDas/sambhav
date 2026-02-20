/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const SYSTEM_LAYERS = [
  {
    title: "Behavioral Risk Awareness",
    text: "Sambhav measures digital behavior patterns so users can prevent predictable fraud exposure early.",
  },
  {
    title: "Modular Protection",
    text: "Users choose practical coverage layers based on daily usage instead of a one-size-fits-all policy.",
  },
  {
    title: "FIR-Light Claim Flow",
    text: "Most incidents move through low-friction claims so users can recover faster with less process fatigue.",
  },
  {
    title: "Trust by Design",
    text: "Every status, action, and claim stage is visible to reduce uncertainty and rebuild confidence.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const TheSystem = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <motion.section style={styles.hero} {...reveal}>
        <p style={styles.eyebrow}>THE SYSTEM</p>
        <h1 style={styles.title}>A prevention-first digital protection infrastructure.</h1>
        <p style={styles.subtitle}>
          Sambhav is structured as a safety system where awareness, protection, and recovery work as one connected loop.
        </p>
        <div style={styles.actions}>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Start with Login
          </Button>
          <Button variant="secondary" onClick={() => navigate("/plans")}>
            See Plans
          </Button>
        </div>
      </motion.section>

      <section style={styles.section}>
        <motion.h2 style={styles.sectionTitle} {...reveal}>
          Four layers that keep users stable before and after incidents.
        </motion.h2>
        <div style={styles.grid}>
          {SYSTEM_LAYERS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            >
              <Card variant="elevated" padding="lg" style={styles.layerCard}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "56px",
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
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "8px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
    maxWidth: "780px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "14px",
  },
  layerCard: {
    minHeight: "180px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "0.95rem",
    lineHeight: "1.7",
  },
};

export default TheSystem;
