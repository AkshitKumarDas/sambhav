const PLAN_MODULES = {
  basic: {
    summary: "Basic digital protection covering fraud and unauthorized access.",
    modules: ["upi_fraud", "account_takeover"],
  },

  advanced: {
    summary: "Extended protection including scams and phishing attacks.",
    modules: ["upi_fraud", "account_takeover", "phishing"],
  },
};

module.exports = PLAN_MODULES;
