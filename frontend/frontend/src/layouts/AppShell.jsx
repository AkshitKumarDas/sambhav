import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/app/Sidebar";

const MOBILE_BREAKPOINT = 980;

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
};

const AppShell = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenPath, setMobileOpenPath] = useState("");

  useEffect(() => {
    const onResize = () => {
      const nextMobile = getIsMobile();
      setIsMobile(nextMobile);
      if (!nextMobile) setMobileOpen(false);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : collapsed ? 88 : 252;
  const resolvedMobileOpen = mobileOpen && location.pathname === mobileOpenPath;

  return (
    <div style={styles.shell}>
      <Sidebar
        isMobile={isMobile}
        collapsed={collapsed}
        mobileOpen={resolvedMobileOpen}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        onOpenMobile={() => {
          setMobileOpenPath(location.pathname);
          setMobileOpen(true);
        }}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main
        style={{
          ...styles.main,
          marginLeft: `${sidebarWidth}px`,
          paddingTop: isMobile ? "76px" : "0",
        }}
      >
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  shell: {
    minHeight: "100vh",
    backgroundColor: "var(--bg)",
  },
  main: {
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    transition: "margin-left 250ms ease",
  },
  content: {
    width: "100%",
  },
};

export default AppShell;
