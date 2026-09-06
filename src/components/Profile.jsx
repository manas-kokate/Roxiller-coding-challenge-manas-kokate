import React, { useState } from "react";
import { UserCircle, Mail, MapPin, Pencil, Check, X } from "lucide-react";

// Swap this for real session/user data once auth is wired up.
const CURRENT_USER = {
    name: "Dana Whitfield",
    email: "dana.whitfield@example.com",
    address: "214 Birchwood Lane, Austin, TX",
    role: "Normal user",
};

function Field({ icon: Icon, label, value, editing, draft, onChange }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 4px",
                borderBottom: "1px solid rgb(var(--color-ink) / 0.1)",
            }}
        >
            <div
                style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: "rgb(var(--color-ink) / 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                }}
            >
                <Icon size={16} style={{ opacity: 0.65 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, opacity: 0.5, marginBottom: 4 }}>{label}</div>
                {editing ? (
                    <input
                        value={draft}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            width: "100%",
                            fontSize: 14.5,
                            fontWeight: 600,
                            fontFamily: "'Manrope', sans-serif",
                            color: "rgb(var(--color-ink))",
                            background: "rgb(var(--color-ink) / 0.04)",
                            border: "1px solid rgb(var(--color-ink) / 0.15)",
                            borderRadius: 7,
                            padding: "7px 9px",
                            boxSizing: "border-box",
                            outline: "none",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            fontSize: 14.5,
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
}

export function Profile({ user = CURRENT_USER, onSave = () => { } }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({ name: user.name, email: user.email, address: user.address });

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    const startEdit = () => {
        setDraft({ name: user.name, email: user.email, address: user.address });
        setEditing(true);
    };

    const cancelEdit = () => setEditing(false);

    const confirmEdit = () => {
        onSave(draft);
        setEditing(false);
    };

    return (
        <div
            className="font-body"
            style={{
                width: "100%",
                minHeight: "100vh",
                boxSizing: "border-box",
                color: "rgb(var(--color-ink))",
                background: "rgb(var(--color-bg))",
                padding: "40px 48px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Page header */}
            <div style={{ marginBottom: 28 }}>
                <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>
                    Profile
                </div>
                <div style={{ fontSize: 13.5, opacity: 0.55, marginTop: 4 }}>
                    Your account details
                </div>
            </div>

            {/* Content area fills remaining space */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* Left: identity summary card */}
                <div
                    style={{
                        flex: "1 1 260px",
                        maxWidth: 300,
                        background: "rgb(var(--color-ink) / 0.03)",
                        border: "1px solid rgb(var(--color-ink) / 0.12)",
                        borderRadius: 14,
                        padding: "28px 22px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            width: 76,
                            height: 76,
                            borderRadius: "50%",
                            background: "rgb(var(--color-ink) / 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 26,
                            fontWeight: 700,
                            flexShrink: 0,
                            marginBottom: 14,
                        }}
                    >
                        {initials}
                    </div>
                    <div className="font-display" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25 }}>
                        {user.name}
                    </div>
                    <div
                        style={{
                            fontSize: 12.5,
                            opacity: 0.6,
                            marginTop: 6,
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "rgb(var(--color-ink) / 0.06)",
                        }}
                    >
                        {user.role}
                    </div>
                </div>

                {/* Right: editable fields card, fills remaining width */}
                <div
                    style={{
                        flex: "3 1 420px",
                        background: "rgb(var(--color-bg))",
                        border: "1px solid rgb(var(--color-ink) / 0.12)",
                        borderRadius: 14,
                        padding: "24px 26px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8,
                        }}
                    >
                        <div style={{ fontSize: 15, fontWeight: 700 }}>Account details</div>

                        {!editing ? (
                            <button
                                onClick={startEdit}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7,
                                    padding: "8px 14px",
                                    borderRadius: 8,
                                    border: "1px solid rgb(var(--color-ink) / 0.15)",
                                    background: "transparent",
                                    color: "rgb(var(--color-ink))",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    fontFamily: "'Manrope', sans-serif",
                                    cursor: "pointer",
                                }}
                            >
                                <Pencil size={14} /> Edit
                            </button>
                        ) : (
                            <div style={{ display: "flex", gap: 6 }}>
                                <button
                                    onClick={confirmEdit}
                                    title="Save changes"
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        border: "none",
                                        background: "rgb(var(--color-ink))",
                                        color: "rgb(var(--color-bg))",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Check size={15} />
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    title="Cancel"
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        border: "1px solid rgb(var(--color-ink) / 0.15)",
                                        background: "transparent",
                                        color: "rgb(var(--color-ink))",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Fields */}
                    <Field
                        icon={UserCircle}
                        label="Full name"
                        value={user.name}
                        editing={editing}
                        draft={draft.name}
                        onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
                    />
                    <Field
                        icon={Mail}
                        label="Email"
                        value={user.email}
                        editing={editing}
                        draft={draft.email}
                        onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                    />
                    <Field
                        icon={MapPin}
                        label="Address"
                        value={user.address}
                        editing={editing}
                        draft={draft.address}
                        onChange={(v) => setDraft((d) => ({ ...d, address: v }))}
                    />
                </div>
            </div>
        </div>
    );
}