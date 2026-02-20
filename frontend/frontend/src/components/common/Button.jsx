import { useState } from "react";

const VARIANT_STYLES = {
  primary: {
    backgroundColor: "var(--accent-primary)",
    color: "#ffffff",
    border: "1px solid transparent",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--accent-primary)",
    border: "1px solid var(--accent-primary)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--text-primary)",
    border: "1px solid transparent",
  },
  danger: {
    backgroundColor: "#a12727",
    color: "#ffffff",
    border: "1px solid transparent",
  },
};

const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
  style = {},
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  const isDisabled = disabled || loading;
  const selectedVariant = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  const buttonStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: fullWidth ? "100%" : "auto",
    minHeight: "42px",
    padding: "10px 16px",
    borderRadius: "10px",
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.65 : 1,
    transform: hovered && !isDisabled ? "translateY(-1px)" : "translateY(0)",
    boxShadow:
      hovered && !isDisabled ? "0 8px 18px rgba(0, 0, 0, 0.12)" : "0 4px 10px rgba(0, 0, 0, 0.06)",
    transition: "all 260ms ease",
    ...selectedVariant,
    ...style,
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={className}
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
