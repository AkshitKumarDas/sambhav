const PADDING_MAP = {
  none: "0",
  sm: "14px",
  md: "clamp(18px, 2.4vw, 20px)",
  lg: "clamp(20px, 2.8vw, 24px)",
};

const Card = ({
  children,
  variant = "subtle",
  padding = "md",
  className = "",
  style = {},
  ...rest
}) => {
  const resolvedPadding = PADDING_MAP[padding] || PADDING_MAP.md;
  const isElevated = variant === "elevated";

  const cardStyle = {
    backgroundColor: "var(--surface)",
    border: isElevated ? "1px solid transparent" : "1px solid rgba(46, 42, 38, 0.06)",
    borderRadius: "14px",
    padding: resolvedPadding,
    boxShadow: isElevated ? "0 14px 34px rgba(10, 24, 19, 0.08)" : "0 6px 18px rgba(10, 24, 19, 0.04)",
    transition: "all 260ms ease",
    ...style,
  };

  return (
    <div className={className} style={cardStyle} {...rest}>
      {children}
    </div>
  );
};

export default Card;
