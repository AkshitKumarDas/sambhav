import { useCallback, useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import api from "../../services/api";

const FINAL_STATUSES = new Set(["approved", "rejected"]);

const STATUS_STYLES = {
  submitted: {
    backgroundColor: "rgba(83, 91, 99, 0.16)",
    color: "#3f464c",
  },
  under_review: {
    backgroundColor: "rgba(196, 138, 58, 0.18)",
    color: "#8a5c1f",
  },
  approved: {
    backgroundColor: "rgba(31, 77, 58, 0.16)",
    color: "#14563f",
  },
  rejected: {
    backgroundColor: "rgba(161, 39, 39, 0.14)",
    color: "#8c2222",
  },
};

const STATUS_ACTIONS = {
  submitted: [{ label: "Move to Review", status: "under_review", variant: "secondary" }],
  under_review: [
    { label: "Approve", status: "approved", variant: "primary" },
    { label: "Reject", status: "rejected", variant: "danger" },
  ],
};

const getStatusStyle = (status) => STATUS_STYLES[status] || STATUS_STYLES.submitted;
const getStatusLabel = (status) =>
  String(status || "submitted")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const formatCurrency = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "INR -";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numeric);
};

const AdminClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionLoadingById, setActionLoadingById] = useState({});
  const [adminNoteById, setAdminNoteById] = useState({});
  const [historyModal, setHistoryModal] = useState({
    open: false,
    claim: null,
    loading: false,
    error: "",
    rows: [],
  });

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/claims");
      if (res?.data?.success === false) {
        throw new Error(res?.data?.message || "Failed to load claims.");
      }

      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      setClaims(rows);

      setAdminNoteById((prev) => {
        const next = { ...prev };
        rows.forEach((claim) => {
          if (next[claim.id] === undefined) {
            next[claim.id] = claim.admin_note || "";
          }
        });
        return next;
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to load claims.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const handleNoteChange = (claimId, value) => {
    setAdminNoteById((prev) => ({
      ...prev,
      [claimId]: value,
    }));
  };

  const setActionLoading = (claimId, loadingState) => {
    setActionLoadingById((prev) => ({
      ...prev,
      [claimId]: loadingState,
    }));
  };

  const handleStatusUpdate = async (claim, nextStatus) => {
    if (FINAL_STATUSES.has(claim.status)) return;
    if (actionLoadingById[claim.id]) return;

    try {
      setActionError("");
      setActionLoading(claim.id, true);

      const adminNote = (adminNoteById[claim.id] || "").trim();
      const res = await api.patch(`/admin/claims/${claim.id}/status`, {
        status: nextStatus,
        adminNote: adminNote || null,
      });

      if (res?.data?.success === false) {
        throw new Error(res?.data?.message || "Failed to update claim status.");
      }

      await fetchClaims();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update claim status.";
      setActionError(message);
    } finally {
      setActionLoading(claim.id, false);
    }
  };

  const openHistory = async (claim) => {
    setHistoryModal({
      open: true,
      claim,
      loading: true,
      error: "",
      rows: [],
    });

    try {
      const res = await api.get(`/admin/claims/${claim.id}/history`);
      if (res?.data?.success === false) {
        throw new Error(res?.data?.message || "Failed to load claim history.");
      }

      const rows = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
          ? res.data
          : [];

      setHistoryModal((prev) => ({
        ...prev,
        loading: false,
        rows,
      }));
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to load claim history.";
      setHistoryModal((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }));
    }
  };

  const closeHistory = () => {
    setHistoryModal({
      open: false,
      claim: null,
      loading: false,
      error: "",
      rows: [],
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="All Claims"
        subtitle="Administrative list of all user claims and statuses."
      />

      {loading ? <p style={styles.message}>Loading claims...</p> : null}
      {error ? <p style={styles.error}>{error}</p> : null}
      {actionError ? <p style={styles.error}>{actionError}</p> : null}

      {!loading && !error ? (
        claims.length ? (
          <div style={styles.list}>
            {claims.map((claim) => {
              const isFinal = FINAL_STATUSES.has(claim.status);
              const isActionLoading = Boolean(actionLoadingById[claim.id]);
              const availableActions = STATUS_ACTIONS[claim.status] || [];

              return (
                <Card key={claim.id} variant="elevated" padding="lg" style={styles.card}>
                  <div style={styles.topRow}>
                    <p style={styles.claimId}>Claim #{claim.id}</p>
                    <span style={{ ...styles.statusBadge, ...getStatusStyle(claim.status) }}>
                      {getStatusLabel(claim.status)}
                    </span>
                  </div>

                  <div style={styles.middle}>
                    <p style={styles.amount}>{formatCurrency(claim.amount)}</p>
                    <p style={styles.incident}>{claim.incident_type}</p>
                  </div>

                  <div style={styles.controls}>
                    <label htmlFor={`admin-note-${claim.id}`} style={styles.noteLabel}>
                      Admin Note
                    </label>
                    <textarea
                      id={`admin-note-${claim.id}`}
                      value={adminNoteById[claim.id] ?? claim.admin_note ?? ""}
                      onChange={(e) => handleNoteChange(claim.id, e.target.value)}
                      style={styles.noteInput}
                      placeholder="Optional review note"
                      disabled={isFinal || isActionLoading}
                    />
                    <p style={styles.noteHint}>Note is saved with the next status update.</p>

                    <div style={styles.actionRow}>
                      {availableActions.map((action) => (
                        <Button
                          key={action.status}
                          type="button"
                          variant={action.variant}
                          onClick={() => handleStatusUpdate(claim, action.status)}
                          loading={isActionLoading}
                          disabled={isActionLoading || isFinal}
                        >
                          {action.label}
                        </Button>
                      ))}

                      {!availableActions.length ? (
                        <Button type="button" variant="ghost" disabled>
                          Finalized
                        </Button>
                      ) : null}

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => openHistory(claim)}
                        disabled={isActionLoading}
                      >
                        View History
                      </Button>
                    </div>
                  </div>

                  <div style={styles.bottom}>
                    <p style={styles.meta}>Policy ID: {claim.policy_id}</p>
                    <p style={styles.meta}>User ID: {claim.user_id}</p>
                    <p style={styles.meta}>Created: {formatDate(claim.created_at)}</p>
                    <p style={styles.meta}>Reviewed By: {claim.reviewed_by || "-"}</p>
                    <p style={styles.meta}>Reviewed At: {formatDate(claim.reviewed_at)}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card variant="subtle" padding="lg">
            <p style={styles.message}>No claims found.</p>
          </Card>
        )
      ) : null}

      {historyModal.open ? (
        <div style={styles.modalOverlay} onClick={closeHistory}>
          <Card
            variant="elevated"
            padding="lg"
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Claim #{historyModal.claim?.id} History</h2>
              <Button type="button" variant="ghost" onClick={closeHistory}>
                Close
              </Button>
            </div>

            {historyModal.loading ? <p style={styles.message}>Loading history...</p> : null}
            {historyModal.error ? <p style={styles.error}>{historyModal.error}</p> : null}

            {!historyModal.loading && !historyModal.error ? (
              historyModal.rows.length ? (
                <div style={styles.timeline}>
                  {historyModal.rows.map((entry, index) => (
                    <div key={entry.id} style={styles.timelineRow}>
                      <div style={styles.timelineRail}>
                        <span style={styles.timelineDot} />
                        {index < historyModal.rows.length - 1 ? (
                          <span style={styles.timelineLine} />
                        ) : null}
                      </div>
                      <div style={styles.timelineCopy}>
                        <p style={styles.timelineStatus}>
                          {getStatusLabel(entry.previous_status)} to {getStatusLabel(entry.new_status)}
                        </p>
                        <p style={styles.timelineMeta}>
                          Changed by Admin #{entry.changed_by || "-"} on {formatDate(entry.changed_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={styles.message}>No status transitions recorded yet.</p>
              )
            ) : null}
          </Card>
        </div>
      ) : null}
    </PageContainer>
  );
};

const styles = {
  message: {
    color: "var(--text-secondary)",
  },
  error: {
    color: "#a12727",
    fontSize: "14px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "14px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "280px",
  },
  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
  },
  claimId: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "15px",
    fontWeight: 700,
  },
  statusBadge: {
    textTransform: "capitalize",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "11px",
    fontWeight: 700,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  middle: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  amount: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "1.8rem",
    fontWeight: 700,
    lineHeight: 1.1,
    fontFamily: '"Playfair Display", serif',
  },
  incident: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  noteLabel: {
    color: "var(--text-secondary)",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  noteInput: {
    minHeight: "70px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    padding: "10px",
    resize: "vertical",
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
  },
  noteHint: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "11px",
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  bottom: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  meta: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "12px",
    lineHeight: 1.45,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(10, 24, 19, 0.46)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    zIndex: 120,
  },
  modalCard: {
    width: "min(760px, 100%)",
    maxHeight: "80vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.32rem",
    color: "var(--text-primary)",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  timelineRow: {
    display: "grid",
    gridTemplateColumns: "20px 1fr",
    columnGap: "10px",
  },
  timelineRail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timelineDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    backgroundColor: "var(--accent-primary)",
  },
  timelineLine: {
    width: "2px",
    flex: 1,
    minHeight: "22px",
    backgroundColor: "rgba(31, 77, 58, 0.22)",
    marginTop: "4px",
  },
  timelineCopy: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    paddingBottom: "6px",
  },
  timelineStatus: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: 600,
  },
  timelineMeta: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "12px",
    lineHeight: 1.45,
  },
};

export default AdminClaims;
