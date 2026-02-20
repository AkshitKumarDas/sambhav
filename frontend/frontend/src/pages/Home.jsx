/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

const CRISIS_POINTS = [
  {
    title: "Digital Expansion",
    text: "More families and businesses are becoming digitally active every month.",
  },
  {
    title: "Fraud Acceleration",
    text: "Fraud methods evolve faster than most users can realistically track.",
  },
  {
    title: "Protection Gap",
    text: "Most people still discover cyber support only after damage has happened.",
  },
];

const BROKEN_JOURNEY = [
  "Digital Activity",
  "Fraud Event",
  "Panic",
  "Claims Friction",
  "Distrust",
];

const SAMBHAV_SHIFT = [
  {
    title: "Prevention (DBS)",
    text: "Behavioral risk awareness before financial loss.",
  },
  {
    title: "Modular Protection",
    text: "Choose protection layers relevant to your real usage.",
  },
  {
    title: "FIR-Light Claims",
    text: "Low-friction claims for most routine digital incidents.",
  },
  {
    title: "Embedded Trust",
    text: "Clear system states, transparent timelines, and accountable support.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePrimaryAction = () => {
    navigate(isAuthenticated ? "/dbs-test" : "/login");
  };

  const handleSecondaryAction = () => {
    navigate("/the-system");
  };

  return (
    <>
      <section style={styles.hero}>
        <div style={styles.meshWrap} aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={styles.meshOne}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            style={styles.meshTwo}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            style={styles.meshThree}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
              marginBottom: "18px",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            India&apos;s Digital Safety Net
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: "var(--text-secondary)",
              marginBottom: "30px",
              lineHeight: "1.75",
            }}
          >
            Cyber protection that starts before loss.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              marginBottom: "34px",
            }}
          >
            Protection built on awareness, not fear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            style={styles.ctaGroup}
          >
            <Button variant="primary" onClick={handlePrimaryAction} style={styles.ctaButton}>
              Check Your Cyber Score
            </Button>
            <Button variant="secondary" onClick={handleSecondaryAction} style={styles.ctaButton}>
              Explore the System
            </Button>
          </motion.div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.p
            style={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            THE CRISIS
          </motion.p>

          <motion.h2
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            India&apos;s digital growth is outpacing household cyber preparedness.
          </motion.h2>

          <div style={styles.crisisGrid}>
            {CRISIS_POINTS.map((item, index) => (
              <motion.article
                key={item.title}
                style={styles.infoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.sectionInner}>
          <motion.p
            style={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            BROKEN JOURNEY
          </motion.p>

          <motion.h2
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            Today&apos;s fraud response journey pushes users into confusion and delay.
          </motion.h2>

          <div style={styles.journeyGrid}>
            {BROKEN_JOURNEY.map((step, index) => (
              <motion.div
                key={step}
                style={styles.journeyStep}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span style={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 style={styles.stepTitle}>{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.p
            style={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            THE SAMBHAV SHIFT
          </motion.p>

          <motion.h2
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            A prevention-first system designed for everyday digital life.
          </motion.h2>

          <div style={styles.shiftGrid}>
            {SAMBHAV_SHIFT.map((layer, index) => (
              <motion.article
                key={layer.title}
                style={styles.layerCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 style={styles.layerTitle}>{layer.title}</h3>
                <p style={styles.layerText}>{layer.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.visionSection}>
        <motion.div
          style={styles.visionCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p style={styles.visionEyebrow}>CLOSING VISION</p>
          <h2 style={styles.visionTitle}>The Seatbelt of the Digital Age</h2>
          <p style={styles.visionText}>
            Sambhav is built to make digital confidence a default public utility, not a privilege.
          </p>
        </motion.div>
      </section>
    </>
  );
};

const styles = {
  hero: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "grid",
    alignItems: "center",
    padding: "80px 0 40px",
    background: "linear-gradient(180deg, rgba(247,244,239,1) 0%, rgba(240,236,230,0.9) 100%)",
  },
  meshWrap: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  meshOne: {
    position: "absolute",
    width: "580px",
    height: "580px",
    borderRadius: "50%",
    filter: "blur(70px)",
    top: "8%",
    left: "5%",
    background: "radial-gradient(circle, rgba(31,77,58,0.2) 0%, rgba(31,77,58,0) 72%)",
  },
  meshTwo: {
    position: "absolute",
    width: "620px",
    height: "620px",
    borderRadius: "50%",
    filter: "blur(80px)",
    bottom: "4%",
    right: "7%",
    background: "radial-gradient(circle, rgba(196,138,58,0.24) 0%, rgba(196,138,58,0) 70%)",
  },
  meshThree: {
    position: "absolute",
    width: "460px",
    height: "460px",
    borderRadius: "50%",
    filter: "blur(62px)",
    top: "28%",
    right: "24%",
    background: "radial-gradient(circle, rgba(31,77,58,0.14) 0%, rgba(31,77,58,0) 72%)",
  },
  ctaGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  ctaButton: {
    minWidth: "210px",
    fontSize: "15px",
  },
  section: {
    padding: "80px 20px",
  },
  sectionAlt: {
    padding: "80px 20px",
    backgroundColor: "var(--surface-alt)",
  },
  sectionInner: {
    width: "100%",
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  eyebrow: {
    color: "var(--accent-primary)",
    fontSize: "0.82rem",
    letterSpacing: "0.12em",
    fontWeight: 700,
  },
  sectionTitle: {
    fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
    letterSpacing: "-0.01em",
    maxWidth: "760px",
  },
  crisisGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  infoCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "var(--shadow-soft)",
    minHeight: "150px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "0.95rem",
    lineHeight: "1.65",
  },
  journeyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  journeyStep: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "16px",
    minHeight: "110px",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "8px",
  },
  stepIndex: {
    color: "var(--accent-secondary)",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
  },
  stepTitle: {
    fontSize: "1rem",
  },
  shiftGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  layerCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "var(--shadow-soft)",
    minHeight: "160px",
  },
  layerTitle: {
    fontSize: "1.08rem",
    marginBottom: "10px",
  },
  layerText: {
    fontSize: "0.95rem",
    lineHeight: "1.65",
  },
  visionSection: {
    padding: "80px 20px 96px",
  },
  visionCard: {
    width: "100%",
    maxWidth: "920px",
    margin: "0 auto",
    borderRadius: "18px",
    padding: "36px 28px",
    border: "1px solid var(--border)",
    background:
      "linear-gradient(145deg, rgba(31,77,58,0.95) 0%, rgba(31,77,58,0.84) 100%)",
    boxShadow: "var(--shadow-soft)",
    textAlign: "center",
  },
  visionEyebrow: {
    color: "rgba(255,255,255,0.82)",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    marginBottom: "8px",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  visionTitle: {
    color: "#fff",
    fontSize: "clamp(1.8rem, 3.2vw, 2.7rem)",
    marginBottom: "12px",
  },
  visionText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "1rem",
    lineHeight: "1.7",
    maxWidth: "620px",
    margin: "0 auto",
  },
};

export default Home;
