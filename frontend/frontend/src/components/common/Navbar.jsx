import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MOBILE_BREAKPOINT = 900;

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
};

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(getIsMobile);

  const navLinks = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "The System", to: "/the-system" },
      { label: "For India", to: "/for-india" },
      { label: "Why Sambhav", to: "/why-sambhav" },
      { label: "Plans", to: isAuthenticated ? "/plans" : "/login" },
    ],
    [isAuthenticated],
  );

  const cta = isAuthenticated
    ? { label: "Go to Dashboard", to: "/dashboard" }
    : { label: "Login", to: "/login" };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    const onResize = () => {
      const nextMobile = getIsMobile();
      setIsMobile(nextMobile);
      if (!nextMobile) setMenuOpen(false);
    };

    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          ...styles.nav,
          height: scrolled ? "66px" : "76px",
          backgroundColor: scrolled ? "rgba(247, 244, 239, 0.92)" : "rgba(247, 244, 239, 0.72)",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
          boxShadow: scrolled ? "0 8px 20px rgba(0, 0, 0, 0.06)" : "none",
        }}
      >
        <div style={styles.inner}>
          <Link to="/" style={styles.logo}>
            SAMBHAV
          </Link>

          {!isMobile ? (
            <div style={styles.desktopArea}>
              <div style={styles.links}>
                {navLinks.map((item) => (
                  <Link key={item.label} to={item.to} style={styles.link}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link to={cta.to} style={styles.cta}>
                {cta.label}
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              style={styles.menuButton}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span style={{ ...styles.menuBar, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
              <span style={{ ...styles.menuBar, opacity: menuOpen ? 0 : 1 }} />
              <span style={{ ...styles.menuBar, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {isMobile ? (
        <div
          style={{
            ...styles.drawerOverlay,
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          onClick={() => setMenuOpen(false)}
        >
          <aside
            style={{
              ...styles.drawer,
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.drawerHeader}>
              <span style={styles.drawerTitle}>Menu</span>
              <button type="button" style={styles.closeButton} onClick={() => setMenuOpen(false)}>
                Close
              </button>
            </div>

            <div style={styles.drawerLinks}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  style={styles.drawerLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link to={cta.to} style={styles.drawerCta} onClick={() => setMenuOpen(false)}>
              {cta.label}
            </Link>
          </aside>
        </div>
      ) : null}
    </>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    width: "100%",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid",
    transition: "all 260ms ease",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100%",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
  },
  logo: {
    color: "var(--text-primary)",
    textDecoration: "none",
    fontFamily: '"Playfair Display", serif',
    fontSize: "1.2rem",
    letterSpacing: "0.08em",
    fontWeight: 600,
  },
  desktopArea: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  link: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.89rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  cta: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "var(--accent-primary)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  },
  menuButton: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
    width: "42px",
    height: "42px",
    borderRadius: "9px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--surface)",
    cursor: "pointer",
    padding: "0 10px",
  },
  menuBar: {
    display: "block",
    width: "100%",
    height: "2px",
    backgroundColor: "var(--text-primary)",
    transition: "all 220ms ease",
  },
  drawerOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    transition: "opacity 240ms ease",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(86vw, 340px)",
    backgroundColor: "var(--surface)",
    borderLeft: "1px solid var(--border)",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "transform 280ms ease",
    boxShadow: "-12px 0 32px rgba(0,0,0,0.14)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerTitle: {
    color: "var(--text-primary)",
    fontWeight: 600,
  },
  closeButton: {
    border: "1px solid var(--border)",
    backgroundColor: "var(--surface-alt)",
    borderRadius: "8px",
    padding: "8px 10px",
    color: "var(--text-secondary)",
    cursor: "pointer",
  },
  drawerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  drawerLink: {
    textDecoration: "none",
    color: "var(--text-primary)",
    backgroundColor: "var(--surface-alt)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "12px 10px",
    fontWeight: 500,
  },
  drawerCta: {
    marginTop: "auto",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "var(--accent-primary)",
    borderRadius: "10px",
    padding: "12px 10px",
    textAlign: "center",
    fontWeight: 600,
  },
};

export default Navbar;
