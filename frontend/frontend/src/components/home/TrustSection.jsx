/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section
      style={{
        padding: "120px 20px",
        background: "#F6F1EA",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
        }}
      >
        <TrustCard
          title="Behavioral Digital Score"
          text="Your protection adapts to how responsibly you interact online. Awareness becomes an advantage."
        />

        <TrustCard
          title="Modular Protection"
          text="Choose only what you need. Digital fraud, account safety, and transaction protection — built in modules."
        />

        <TrustCard
          title="Transparent Claims"
          text="Know exactly where your claim stands. No uncertainty, no hidden processes."
        />
      </div>
    </section>
  );
};

const TrustCard = ({ title, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        background: "#EFE3D5",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          marginBottom: "12px",
          color: "#3E2F25",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          lineHeight: "1.7",
          color: "#5A4A42",
        }}
      >
        {text}
      </p>
    </motion.div>
  );
};

export default TrustSection;
