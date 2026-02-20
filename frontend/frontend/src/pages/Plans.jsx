import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";

const PLANS = [
  {
    planName: "basic",
    title: "Basic Plan",
    description:
      "Core digital protection with coverage for UPI fraud and account takeover incidents.",
    coverage: ["UPI fraud incidents", "Account takeover events"],
  },
  {
    planName: "advanced",
    title: "Advanced Plan",
    description:
      "Extended coverage for high-risk scenarios including phishing and advanced fraud vectors.",
    coverage: ["Everything in Basic", "Phishing support", "Expanded fraud coverage"],
  },
];

const addMonths = (months) => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
};

const Plans = () => {
  const navigate = useNavigate();
  const [durationMonths, setDurationMonths] = useState(12);

  const handlePurchase = (planName) => {
    const endDate = addMonths(Number(durationMonths));
    navigate("/plans/confirm", {
      state: {
        planName,
        duration: Number(durationMonths),
        endDate,
      },
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Plans"
        subtitle="Choose a protection module and duration, then review details before activation."
      />

      <div style={styles.controls}>
        <label htmlFor="duration" style={styles.durationLabel}>
          Policy Duration
        </label>
        <select
          id="duration"
          style={styles.select}
          value={durationMonths}
          onChange={(e) => setDurationMonths(Number(e.target.value))}
        >
          <option value={3}>3 months</option>
          <option value={6}>6 months</option>
          <option value={12}>12 months</option>
        </select>
      </div>

      <div style={styles.grid}>
        {PLANS.map((item) => (
          <Card key={item.planName} variant="elevated" padding="lg" style={styles.card}>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardText}>{item.description}</p>
            <ul style={styles.coverageList}>
              {item.coverage.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Button onClick={() => handlePurchase(item.planName)} type="button">
              Continue to Confirm
            </Button>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

const styles = {
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  durationLabel: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontWeight: 600,
  },
  select: {
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "10px 12px",
    minHeight: "44px",
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
  },
  grid: {
    marginTop: "6px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "14px",
  },
  card: {
    minHeight: "230px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardTitle: {
    color: "var(--text-primary)",
    fontSize: "20px",
  },
  cardText: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  coverageList: {
    margin: 0,
    paddingLeft: "18px",
    color: "var(--text-secondary)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "13px",
    lineHeight: "1.45",
    flex: 1,
  },
};

export default Plans;
