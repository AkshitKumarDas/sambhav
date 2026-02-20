/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Card from "../components/common/Card";

const AUDIENCE_SEGMENTS = [
  {
    title: "Families",
    text: "Households need practical digital confidence, not complex legal workflow at the moment of panic.",
  },
  {
    title: "Students and Workers",
    text: "Young digital users are active across payments and commerce and need prevention-led protection early.",
  },
  {
    title: "Small Businesses",
    text: "SMEs depend on digital rails for growth and need reliable fraud response without operational disruption.",
  },
  {
    title: "Institutions",
    text: "A national safety net must scale with trust, transparency, and low-friction systems for public adoption.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const ForIndia = () => {
  return (
    <div style={styles.page}>
      <motion.section style={styles.hero} {...reveal}>
        <p style={styles.eyebrow}>FOR INDIA</p>
        <h1 style={styles.title}>Built for real digital behavior at national scale.</h1>
        <p style={styles.subtitle}>
          Sambhav is designed around India&apos;s lived digital reality where trust, speed, and clarity matter as much as coverage.
        </p>
      </motion.section>

      <section style={styles.section}>
        <motion.h2 style={styles.sectionTitle} {...reveal}>
          Protection design that works for people first.
        </motion.h2>
        <div style={styles.grid}>
          {AUDIENCE_SEGMENTS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            >
              <Card variant="subtle" padding="lg" style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section style={styles.closing} {...reveal}>
        <h2 style={styles.closingTitle}>Not another policy page. A public confidence layer.</h2>
        <p style={styles.closingText}>
          Sambhav exists to make digital protection understandable, accessible, and resilient for every user segment.
        </p>
      </motion.section>
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
  card: {
    minHeight: "170px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "0.95rem",
    lineHeight: "1.7",
  },
  closing: {
    backgroundColor: "var(--surface-alt)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "28px",
    maxWidth: "920px",
  },
  closingTitle: {
    fontSize: "clamp(1.45rem, 2.4vw, 2rem)",
    marginBottom: "10px",
  },
  closingText: {
    lineHeight: "1.8",
  },
};

export default ForIndia;
