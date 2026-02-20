// Mirrors backend/utils/planModules.js
// If backend coverage changes, update this file accordingly.

export const PLAN_COVERAGE = {
  basic: ["upi_fraud", "account_takeover"],
  advanced: ["upi_fraud", "account_takeover", "phishing"],
};
