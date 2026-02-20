import Navbar from "../components/common/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div style={styles.wrapper}>
      <Navbar />
      <main style={isAuthPage ? styles.mainAuth : styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "var(--bg)",
    color: "var(--text-primary)",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  mainAuth: {
    width: "100%",
    margin: 0,
    padding: "0",
  },
};

export default PublicLayout;
