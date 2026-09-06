import React, { useState } from "react";
import {
    Mail,
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* MOCK DATA (replace with real API later)                             */
/* ------------------------------------------------------------------ */
const REGISTERED_EMAILS = [
    "aarav.s@example.com",
    "priya.p@example.com",
    "rohan.m@example.com",
    "admin@platform.com",
];

// Demo OTP – in real app this would come from email
const VALID_OTP = "123456";

export function ChangePassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const next = {};

        if (!email.trim()) {
            next.email = "Email is required";
        } else if (!REGISTERED_EMAILS.includes(email.trim().toLowerCase())) {
            next.email = "This email is not registered with us";
        }

        if (!otp.trim()) {
            next.otp = "OTP is required";
        } else if (otp.trim() !== VALID_OTP) {
            next.otp = "Invalid OTP. Please check your email";
        }

        if (!newPassword) {
            next.newPassword = "New password is required";
        } else if (newPassword.length < 8) {
            next.newPassword = "Password must be at least 8 characters";
        }

        if (!confirmPassword) {
            next.confirmPassword = "Please confirm your password";
        } else if (newPassword !== confirmPassword) {
            next.confirmPassword = "Passwords do not match";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 900);
    };

    if (success) {
        return (
            <div
                className="font-body"
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    boxSizing: "border-box",
                    color: "rgb(var(--color-ink))",
                    background: "rgb(var(--color-bg))",
                    padding: "48px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 420,
                        textAlign: "center",
                        padding: "40px 32px",
                        borderRadius: 16,
                        border: "1px solid rgb(var(--color-ink) / 0.1)",
                        background: "rgb(var(--color-bg))",
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: "rgb(34 197 94 / 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                        }}
                    >
                        <CheckCircle2 size={28} style={{ color: "rgb(22 163 74)" }} />
                    </div>
                    <div className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                        Password updated
                    </div>
                    <p style={{ fontSize: 14, opacity: 0.55, margin: 0, lineHeight: 1.5 }}>
                        Your password has been changed successfully. You can now log in with your new password.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="font-body"
            style={{
                width: "100%",
                minHeight: "100vh",
                boxSizing: "border-box",
                color: "rgb(var(--color-ink))",
                background: "rgb(var(--color-bg))",
                padding: "48px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100%", maxWidth: 440 }}>
                {/* Header */}
                <div style={{ marginBottom: 28, textAlign: "center" }}>
                    <div className="font-display" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
                        Change Password
                    </div>
                    <p style={{ fontSize: 14, opacity: 0.5, margin: 0 }}>
                        Enter your registered email and the OTP sent to it
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "rgb(var(--color-bg))",
                        border: "1px solid rgb(var(--color-ink) / 0.1)",
                        borderRadius: 16,
                        padding: "28px 26px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                    }}
                >
                    {/* Email */}
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12.5,
                                fontWeight: 600,
                                opacity: 0.65,
                                marginBottom: 7,
                            }}
                        >
                            Registered Email <span style={{ color: "rgb(220 38 38)" }}>*</span>
                        </label>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "11px 14px",
                                borderRadius: 10,
                                border: `1px solid ${errors.email
                                    ? "rgb(220 38 38 / 0.5)"
                                    : "rgb(var(--color-ink) / 0.14)"
                                    }`,
                                background: "rgb(var(--color-ink) / 0.025)",
                            }}
                        >
                            <Mail size={16} style={{ opacity: 0.45, flexShrink: 0 }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                                }}
                                placeholder="you@example.com"
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: 14,
                                    color: "rgb(var(--color-ink))",
                                }}
                            />
                        </div>
                        {errors.email && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginTop: 7,
                                    fontSize: 12.5,
                                    color: "rgb(220 38 38)",
                                }}
                            >
                                <AlertCircle size={13} />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* OTP */}
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12.5,
                                fontWeight: 600,
                                opacity: 0.65,
                                marginBottom: 7,
                            }}
                        >
                            OTP from Email <span style={{ color: "rgb(220 38 38)" }}>*</span>
                        </label>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "11px 14px",
                                borderRadius: 10,
                                border: `1px solid ${errors.otp
                                    ? "rgb(220 38 38 / 0.5)"
                                    : "rgb(var(--color-ink) / 0.14)"
                                    }`,
                                background: "rgb(var(--color-ink) / 0.025)",
                            }}
                        >
                            <KeyRound size={16} style={{ opacity: 0.45, flexShrink: 0 }} />
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                                    if (errors.otp) setErrors((p) => ({ ...p, otp: undefined }));
                                }}
                                placeholder="Enter 6-digit OTP"
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: 14,
                                    color: "rgb(var(--color-ink))",
                                    letterSpacing: "0.08em",
                                }}
                            />
                        </div>
                        {errors.otp && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginTop: 7,
                                    fontSize: 12.5,
                                    color: "rgb(220 38 38)",
                                }}
                            >
                                <AlertCircle size={13} />
                                {errors.otp}
                            </div>
                        )}
                        <div style={{ fontSize: 12, opacity: 0.4, marginTop: 6 }}>
                            Demo OTP: <strong>123456</strong>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12.5,
                                fontWeight: 600,
                                opacity: 0.65,
                                marginBottom: 7,
                            }}
                        >
                            New Password <span style={{ color: "rgb(220 38 38)" }}>*</span>
                        </label>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "11px 14px",
                                borderRadius: 10,
                                border: `1px solid ${errors.newPassword
                                    ? "rgb(220 38 38 / 0.5)"
                                    : "rgb(var(--color-ink) / 0.14)"
                                    }`,
                                background: "rgb(var(--color-ink) / 0.025)",
                            }}
                        >
                            <Lock size={16} style={{ opacity: 0.45, flexShrink: 0 }} />
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    if (errors.newPassword)
                                        setErrors((p) => ({ ...p, newPassword: undefined }));
                                }}
                                placeholder="At least 8 characters"
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: 14,
                                    color: "rgb(var(--color-ink))",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew((v) => !v)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    color: "rgb(var(--color-ink) / 0.45)",
                                    display: "flex",
                                    padding: 0,
                                }}
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginTop: 7,
                                    fontSize: 12.5,
                                    color: "rgb(220 38 38)",
                                }}
                            >
                                <AlertCircle size={13} />
                                {errors.newPassword}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12.5,
                                fontWeight: 600,
                                opacity: 0.65,
                                marginBottom: 7,
                            }}
                        >
                            Confirm New Password <span style={{ color: "rgb(220 38 38)" }}>*</span>
                        </label>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "11px 14px",
                                borderRadius: 10,
                                border: `1px solid ${errors.confirmPassword
                                    ? "rgb(220 38 38 / 0.5)"
                                    : "rgb(var(--color-ink) / 0.14)"
                                    }`,
                                background: "rgb(var(--color-ink) / 0.025)",
                            }}
                        >
                            <Lock size={16} style={{ opacity: 0.45, flexShrink: 0 }} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword)
                                        setErrors((p) => ({ ...p, confirmPassword: undefined }));
                                }}
                                placeholder="Re-enter new password"
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: 14,
                                    color: "rgb(var(--color-ink))",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    color: "rgb(var(--color-ink) / 0.45)",
                                    display: "flex",
                                    padding: 0,
                                }}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginTop: 7,
                                    fontSize: 12.5,
                                    color: "rgb(220 38 38)",
                                }}
                            >
                                <AlertCircle size={13} />
                                {errors.confirmPassword}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            width: "100%",
                            padding: "13px 18px",
                            borderRadius: 10,
                            border: "none",
                            background: "rgb(var(--color-ink))",
                            color: "rgb(var(--color-bg))",
                            fontSize: 14.5,
                            fontWeight: 650,
                            cursor: loading ? "default" : "pointer",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? "Updating..." : "Update Password"}
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </form>
            </div>
        </div>
    );
}