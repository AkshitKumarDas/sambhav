import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PRIMARY_LINKS = [
  { to: "/dashboard", label: "Dashboard", short: "DB" },
  { to: "/plans", label: "Plans", short: "PL" },
  { to: "/policies", label: "Policies", short: "PO" },
  { to: "/claims/new", label: "New Claim", short: "CL" },
  { to: "/dbs-test", label: "DBS Test", short: "DS" },
];

const ADMIN_LINKS = [
  { to: "/admin", label: "Admin Dashboard", short: "AD" },
  { to: "/admin/policies", label: "All Policies", short: "AP" },
  { to: "/admin/claims", label: "All Claims", short: "AC" },
  { to: "/admin/users", label: "Users", short: "US" },
];

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "U";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "U";
  const first = parts[0][0] || "";
  const second = parts.length > 1 ? parts[1][0] : "";
  return `${first}${second}`.toUpperCase();
};

const Sidebar = ({
  isMobile,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onOpenMobile,
  onCloseMobile,
}) => {
  const navigate = useNavigate();
  const { user, role, isAdmin, logout } = useAuth();
  const [hovered, setHovered] = useState("");
  const iconOnly = !isMobile && collapsed;

  const handleLogout = () => {
    logout();
    onCloseMobile();
    navigate("/login", { replace: true });
  };

  const renderNavLink = (item, compact = false) => (
    <NavLink
      key={item.to}
      to={item.to}
      title={compact ? item.label : undefined}
      onClick={onCloseMobile}
      onMouseEnter={() => setHovered(item.to)}
      onMouseLeave={() => setHovered("")}
      style={({ isActive }) => ({
        ...styles.navLink,
        ...(isActive ? styles.navLinkActive : null),
        ...(hovered === item.to && !isActive ? styles.navLinkHover : null),
        color: isActive ? "#ffffff" : "rgba(245,247,246,0.78)",
        justifyContent: compact ? "center" : "flex-start",
      })}
    >
      <span style={styles.short}>{item.short}</span>
      {!compact ? <span style={styles.navLabel}>{item.label}</span> : null}
    </NavLink>
  );

  const renderContent = (compact = false) => (
    <>
      <div style={{ ...styles.profileBlock, alignItems: compact ? "center" : "flex-start" }}>
        <div style={styles.avatar}>{getInitials(user?.name)}</div>
        {!compact ? (
          <div style={styles.profileMeta}>
            <p style={styles.userName}>{user?.name || "User"}</p>
            <p style={styles.userRole}>{role || "user"}</p>
            <Link to="/profile" style={styles.profileLink} onClick={onCloseMobile}>
              View Profile
            </Link>
          </div>
        ) : null}
      </div>

      <nav style={styles.navGroup}>{PRIMARY_LINKS.map((item) => renderNavLink(item, compact))}</nav>

      {isAdmin ? (
        <div style={styles.adminBlock}>
          {!compact ? <p style={styles.sectionTitle}>Admin Controls</p> : null}
          <nav style={styles.navGroup}>{ADMIN_LINKS.map((item) => renderNavLink(item, compact))}</nav>
        </div>
      ) : null}

      <div style={styles.bottomBlock}>
        {renderNavLink({ to: "/profile", label: "Profile", short: "PR" }, compact)}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            ...styles.logoutButton,
            justifyContent: compact ? "center" : "flex-start",
          }}
          title={compact ? "Logout" : undefined}
        >
          <span style={styles.short}>LO</span>
          {!compact ? <span style={styles.navLabel}>Logout</span> : null}
        </button>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <button type="button" style={styles.mobileToggle} onClick={onOpenMobile} aria-label="Open sidebar menu">
          <span style={styles.mobileBar} />
          <span style={styles.mobileBar} />
          <span style={styles.mobileBar} />
        </button>
      ) : null}

      {!isMobile ? (
        <aside
          style={{
            ...styles.desktopSidebar,
            width: iconOnly ? "88px" : "252px",
          }}
        >
          <div style={styles.topRow}>
            <Link to="/dashboard" style={styles.brand} title="Sambhav">
              {iconOnly ? "S" : "SAMBHAV"}
            </Link>
            <button type="button" style={styles.collapseButton} onClick={onToggleCollapse}>
              {iconOnly ? ">" : "<"}
            </button>
          </div>
          <div style={styles.contentArea}>{renderContent(iconOnly)}</div>
        </aside>
      ) : null}

      {isMobile ? (
        <div
          style={{
            ...styles.mobileOverlay,
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
          onClick={onCloseMobile}
        >
          <aside
            style={{
              ...styles.mobileDrawer,
              transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.mobileHeader}>
              <Link to="/dashboard" style={styles.brand} onClick={onCloseMobile}>
                SAMBHAV
              </Link>
              <button type="button" style={styles.closeButton} onClick={onCloseMobile}>
                Close
              </button>
            </div>
            <div style={styles.contentArea}>{renderContent(false)}</div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

const styles = {
  desktopSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 45,
    backgroundColor: "#17392c",
    color: "#f5f7f6",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
    transition: "width 250ms ease",
  },
  topRow: {
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  brand: {
    color: "#f5f7f6",
    textDecoration: "none",
    fontFamily: '"Playfair Display", serif',
    letterSpacing: "0.08em",
    fontWeight: 600,
  },
  collapseButton: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#f5f7f6",
    cursor: "pointer",
  },
  contentArea: {
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minHeight: 0,
    height: "calc(100vh - 72px)",
  },
  profileBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#17392c",
    backgroundColor: "#d7e3dd",
  },
  profileMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  userName: {
    margin: 0,
    color: "#f5f7f6",
    fontSize: "14px",
    fontWeight: 600,
  },
  userRole: {
    margin: 0,
    color: "rgba(245,247,246,0.68)",
    textTransform: "capitalize",
    fontSize: "12px",
  },
  profileLink: {
    color: "rgba(245,247,246,0.82)",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: 500,
    marginTop: "2px",
  },
  navGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  adminBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: "14px",
    marginTop: "4px",
  },
  sectionTitle: {
    margin: 0,
    color: "rgba(245,247,246,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    fontSize: "10px",
    fontWeight: 600,
    paddingLeft: "2px",
  },
  navLink: {
    minHeight: "40px",
    borderRadius: "10px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    color: "rgba(245,247,246,0.78)",
    backgroundColor: "transparent",
    fontSize: "14px",
    fontWeight: 500,
    border: "1px solid transparent",
    transition: "background-color 180ms ease, color 180ms ease",
  },
  navLinkActive: {
    backgroundColor: "#215240",
    color: "#ffffff",
  },
  navLinkHover: {
    backgroundColor: "rgba(33, 82, 64, 0.42)",
  },
  short: {
    minWidth: "24px",
    height: "24px",
    borderRadius: "6px",
    backgroundColor: "rgba(255,255,255,0.14)",
    display: "grid",
    placeItems: "center",
    fontSize: "11px",
    fontWeight: 700,
    lineHeight: 1,
  },
  navLabel: {
    whiteSpace: "nowrap",
  },
  bottomBlock: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  logoutButton: {
    minHeight: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    backgroundColor: "transparent",
    color: "#f5f7f6",
    border: "1px solid transparent",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 180ms ease, color 180ms ease",
  },
  mobileToggle: {
    position: "fixed",
    top: "14px",
    left: "14px",
    zIndex: 65,
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--surface)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
    padding: "0 11px",
    cursor: "pointer",
    boxShadow: "0 8px 22px rgba(0, 0, 0, 0.12)",
  },
  mobileBar: {
    display: "block",
    height: "2px",
    width: "100%",
    backgroundColor: "var(--text-primary)",
  },
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 70,
    backgroundColor: "rgba(0,0,0,0.34)",
    transition: "opacity 220ms ease",
  },
  mobileDrawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "min(84vw, 300px)",
    backgroundColor: "#17392c",
    color: "#f5f7f6",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    transition: "transform 250ms ease",
  },
  mobileHeader: {
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  closeButton: {
    border: "1px solid rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#f5f7f6",
    borderRadius: "8px",
    padding: "7px 10px",
    cursor: "pointer",
  },
};

export default Sidebar;
