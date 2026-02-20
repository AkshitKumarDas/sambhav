/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const AmbientBackground = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    zIndex: -1,
    overflow: "hidden",
  },

  glowOne: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(210,170,120,0.25), transparent 70%)",
    top: "10%",
    left: "20%",
    filter: "blur(80px)",
  },

  glowTwo: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(160,120,80,0.18), transparent 70%)",
    bottom: "10%",
    right: "15%",
    filter: "blur(90px)",
  },
};

export default AmbientBackground;
