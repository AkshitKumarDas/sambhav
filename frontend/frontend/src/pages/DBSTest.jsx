import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

const QUESTIONS = [
  {
    id: 1,
    text: "Do you regularly verify UPI recipient names before sending money?",
    options: [
      { label: "Always", score: 10 },
      { label: "Sometimes", score: 6 },
      { label: "Rarely", score: 3 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: 2,
    text: "Do you use two-factor authentication for banking apps?",
    options: [
      { label: "Enabled everywhere", score: 10 },
      { label: "Enabled in some apps", score: 6 },
      { label: "Not sure", score: 3 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 3,
    text: "How often do you update your passwords?",
    options: [
      { label: "Every 3-6 months", score: 10 },
      { label: "Yearly", score: 6 },
      { label: "Rarely", score: 3 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: 4,
    text: "Do you click links in unknown SMS or emails?",
    options: [
      { label: "Never", score: 10 },
      { label: "Only if trusted source", score: 6 },
      { label: "Sometimes", score: 3 },
      { label: "Often", score: 0 },
    ],
  },
  {
    id: 5,
    text: "Do you check app permissions before installing?",
    options: [
      { label: "Always", score: 10 },
      { label: "Sometimes", score: 6 },
      { label: "Rarely", score: 3 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: 6,
    text: "Do you use public WiFi for financial transactions?",
    options: [
      { label: "Never", score: 10 },
      { label: "Only with VPN", score: 6 },
      { label: "Sometimes", score: 3 },
      { label: "Frequently", score: 0 },
    ],
  },
  {
    id: 7,
    text: "Do you verify suspicious calls claiming to be bank officials?",
    options: [
      { label: "Always verify independently", score: 10 },
      { label: "Sometimes verify", score: 6 },
      { label: "Rarely verify", score: 3 },
      { label: "Never verify", score: 0 },
    ],
  },
  {
    id: 8,
    text: "Do you regularly review your bank statements?",
    options: [
      { label: "Monthly", score: 10 },
      { label: "Quarterly", score: 6 },
      { label: "Rarely", score: 3 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: 9,
    text: "Do you use biometric lock on your device?",
    options: [
      { label: "Yes, always", score: 10 },
      { label: "Sometimes", score: 6 },
      { label: "Not sure", score: 3 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 10,
    text: "Would you report a fraud immediately?",
    options: [
      { label: "Immediately", score: 10 },
      { label: "Within a day", score: 6 },
      { label: "After thinking", score: 3 },
      { label: "Not sure", score: 0 },
    ],
  },
];

const DBSTest = () => {
  const navigate = useNavigate();
  const [latest, setLatest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const answeredCount = useMemo(
    () => QUESTIONS.filter((item) => answers[item.id] !== undefined).length,
    [answers],
  );
  const allAnswered = answeredCount === QUESTIONS.length;

  useEffect(() => {
    let mounted = true;

    const fetchLatest = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/dbs/latest");

        if (res?.data?.success === false) {
          throw new Error(res?.data?.message || "Failed to load latest DBS.");
        }

        if (mounted) setLatest(res?.data?.data || null);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load latest DBS.";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLatest();
    return () => {
      mounted = false;
    };
  }, []);

  const setAnswer = (questionId, score) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number(score),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");

    if (!allAnswered) {
      setError("Please answer all 10 questions before submitting.");
      return;
    }

    const selectedAnswers = QUESTIONS.map((item) => ({
      score: Number(answers[item.id]),
    }));

    const totalScore = selectedAnswers.reduce((sum, ans) => sum + ans.score, 0);

    try {
      setSubmitting(true);

      const res = await api.post("/dbs/submit", {
        answers: selectedAnswers.map((a) => ({ score: a.score })),
      });

      if (res?.data?.success === false) {
        throw new Error(res?.data?.message || "Failed to submit DBS test.");
      }

      const returnedScore = Number(res?.data?.score);
      const finalScore = Number.isFinite(returnedScore) ? returnedScore : totalScore;
      setSuccess(`DBS submitted successfully. Score: ${finalScore}`);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to submit DBS test.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer maxWidth="980px">
        <SectionHeader title="DBS Test" subtitle="Loading your latest score and assessment form." />
        <p style={styles.message}>Loading DBS test...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="980px">
      <SectionHeader
        title="DBS Test"
        subtitle="Behavioral Digital Score helps assess your current digital safety habits."
      />

      <Card variant="subtle" padding="md" style={styles.introCard}>
        <p style={styles.introTitle}>How DBS scoring works</p>
        <p style={styles.introText}>
          Answer all 10 questions. Higher scores indicate stronger behavioral safety habits.
        </p>
        <p style={styles.introText}>80-100 Strong | 60-79 Stable | Below 60 At Risk</p>
      </Card>

      {latest ? (
        <Card variant="subtle" padding="md">
          <p style={styles.latest}>
            Latest Score: {latest.score} {latest.status ? `(${latest.status})` : ""}
          </p>
        </Card>
      ) : null}

      {error ? <p style={styles.error}>{error}</p> : null}
      {success ? <p style={styles.success}>{success}</p> : null}

      <Card variant="elevated" padding="lg">
        <form style={styles.form} onSubmit={handleSubmit}>
          <p style={styles.progress}>
            Question Progress: {answeredCount} of {QUESTIONS.length}
          </p>

          {QUESTIONS.map((item) => (
            <Card key={item.id} variant="subtle" padding="md" style={styles.questionBlock}>
              <p style={styles.question}>
                {item.id}. {item.text}
              </p>
              <div style={styles.options}>
                {item.options.map((option) => (
                  <label key={option.label} style={styles.option}>
                    <input
                      type="radio"
                      name={`question-${item.id}`}
                      value={option.score}
                      checked={answers[item.id] === option.score}
                      onChange={(e) => setAnswer(item.id, e.target.value)}
                      disabled={submitting}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </Card>
          ))}

          <div style={styles.submitRow}>
            <Button type="submit" loading={submitting} disabled={submitting || !allAnswered}>
              Submit DBS
            </Button>
          </div>
        </form>
      </Card>
    </PageContainer>
  );
};

const styles = {
  message: {
    color: "var(--text-secondary)",
  },
  introCard: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  introTitle: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  introText: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "13px",
    lineHeight: 1.45,
  },
  latest: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    margin: 0,
  },
  error: {
    color: "#a12727",
    fontSize: "14px",
  },
  success: {
    color: "#2f6e3f",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  progress: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "13px",
    fontWeight: 700,
  },
  questionBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  question: {
    color: "var(--text-primary)",
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.45,
  },
  options: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
  submitRow: {
    marginTop: "4px",
    display: "flex",
    justifyContent: "center",
  },
};

export default DBSTest;
