import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, Store, Star, ArrowRight, MapPin, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import { LoadingOverlay, Toast } from "./Feedback";

// Colors and fonts live in index.css (--color-bg / --color-ink / .theme-dark,
// .font-display / .font-body). Change the theme once there and it updates
// everywhere this pattern is used. Animations/keyframes stay local to this
// component below.

const ROLES = [
    { id: "user", label: "User", icon: User, idLabel: "Email or username", placeholder: "priyanka.deshmukh92@gmail.com" },
    { id: "admin", label: "Admin", icon: ShieldCheck, idLabel: "Admin ID", placeholder: "adm-2291" },
    { id: "owner", label: "Store owner", icon: Store, idLabel: "Store email", placeholder: "hello@fenwicktailors.com" },
];

const REVIEWS = [
    { shop: "Kite & Coil", user: "Priya M.", rating: 5, note: "Fast service, exactly as described." },
    { shop: "Mercer Bakehouse", user: "Daniel O.", rating: 4, note: "Great bread, a little pricey." },
    { shop: "Northline Hardware", user: "Ana R.", rating: 5, note: "Staff actually knew what they were talking about." },
    { shop: "Salt & Bloom", user: "Jae K.", rating: 4, note: "Lovely arrangements, delivery ran late." },
    { shop: "Fenwick Tailors", user: "Miguel S.", rating: 5, note: "Alterations done in two days flat." },
    { shop: "Corner Leaf Cafe", user: "Toni B.", rating: 3, note: "Good coffee, seating was cramped." },
];

// Builds a themed color string from the shared CSS variables.
// which: "bg" | "ink"   alpha: 0-1
function themeColor(which, alpha = 1) {
    return `rgb(var(--color-${which}) / ${alpha})`;
}

function useCountUp(value, duration = 1400) {
    const [display, setDisplay] = useState(0);
    const started = useRef(false);
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const start = performance.now();
        let frame;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setDisplay(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value, duration]);
    return display;
}

// --- Signup validation helpers -------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 8-16 chars, at least one uppercase letter and one special character
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,16}$/;

function validateSignupFields({ name, email, address, password }) {
    const errors = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
        errors.name = "Name is required.";
    } else if (trimmedName.length < 20) {
        errors.name = "Name must be at least 20 characters.";
    } else if (trimmedName.length > 60) {
        errors.name = "Name must be at most 60 characters.";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
        errors.email = "Enter a valid email address.";
    }

    const trimmedAddress = address.trim();
    if (trimmedAddress.length > 400) {
        errors.address = "Address must be at most 400 characters.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (!PASSWORD_REGEX.test(password)) {
        errors.password = "Password must be 8-16 characters and include at least one uppercase letter and one special character.";
    }

    return errors;
}

function FieldShell({ children, label, focused, error }) {
    return (
        <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: themeColor("ink", 0.6) }}>{label}</label>
            <div className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-shadow duration-200" style={{
                backgroundColor: themeColor("ink", 0.05),
                borderColor: error ? "#dc2626" : focused ? themeColor("ink", 1) : themeColor("ink", 0.18),
                boxShadow: focused ? `0 0 0 3px ${themeColor("ink", 0.14)}` : "none",
            }}>{children}</div>
            {error && <p className="mt-1 text-[11.5px] font-semibold text-red-600">{error}</p>}
        </div>
    );
}

export default function ShopRatingLogin() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(true);
    const [mode, setMode] = useState("login");
    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupAddress, setSignupAddress] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupRole, setSignupRole] = useState("user");
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [signupErrors, setSignupErrors] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState(() => {
        const stored = sessionStorage.getItem("flashNotice");
        sessionStorage.removeItem("flashNotice");
        return stored ? JSON.parse(stored) : null;
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await authApi.login({ email: loginId.trim(), password });
            if (result.user.role !== role) {
                throw new Error(`This account is registered as a ${result.user.role}.`);
            }
            localStorage.setItem("session", JSON.stringify({ token: result.token, user: result.user }));
            sessionStorage.setItem("flashNotice", JSON.stringify({ type: "success", message: "Welcome back — you’re signed in." }));
            window.location.assign("/dashboard");
        } catch (err) {
            setError(err.message || "Unable to log in");
            setNotice({ type: "error", message: err.message || "Unable to log in" });
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");

        const fieldErrors = validateSignupFields({
            name: signupName,
            email: signupEmail,
            address: signupAddress,
            password: signupPassword,
        });
        setSignupErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) {
            return;
        }

        setLoading(true);
        try {
            await authApi.signup({ name: signupName.trim(), email: signupEmail.trim(), address: signupAddress.trim(), password: signupPassword, role: signupRole });
            setMode("login");
            setLoginId(signupEmail.trim());
            setPassword("");
            setSignupErrors({});
            setNotice({ type: "success", message: "Account created. You can sign in now." });
        } catch (err) {
            setError(err.message || "Unable to create account");
            setNotice({ type: "error", message: err.message || "Unable to create account" });
        } finally {
            setLoading(false);
        }
    };

    const activeRole = ROLES.find((r) => r.id === role);
    const roleIndex = ROLES.findIndex((r) => r.id === role);

    // Ticker cards intentionally use the opposite pairing (ink as the
    // card background, bg as the card's text/ink color).
    const Stars = ({ count, size = 11, which = "ink" }) => (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={size} style={{ fill: themeColor(which, i < count ? 1 : 0.15), color: themeColor(which, i < count ? 1 : 0.15) }} />
            ))}
        </div>
    );

    const StatBlock = ({ label, value, decimals = 0, suffix = "" }) => {
        const count = useCountUp(value);
        return (
            <div>
                <p className="font-display text-2xl font-bold" style={{ color: themeColor("ink", 1) }}>
                    {decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString()}{suffix}
                </p>
                <p className="mt-0.5 text-[11px] font-medium" style={{ color: themeColor("ink", 0.55) }}>{label}</p>
            </div>
        );
    };

    const LegacyFieldShell = ({ children, label, focused }) => (
        <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: themeColor("ink", 0.6) }}>{label}</label>
            <div
                className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-shadow duration-200"
                style={{
                    backgroundColor: themeColor("ink", 0.05),
                    borderColor: focused ? themeColor("ink", 1) : themeColor("ink", 0.18),
                    boxShadow: focused ? `0 0 0 3px ${themeColor("ink", 0.14)}` : "none",
                }}
            >
                {children}
            </div>
        </div>
    );

    const ReviewTicker = () => {
        const looped = [...REVIEWS, ...REVIEWS];
        return (
            <div
                className="relative h-full overflow-hidden rounded-xl border"
                style={{
                    backgroundColor: themeColor("ink", 1),
                    borderColor: themeColor("ink", 1),
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
                    maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
                }}
            >
                <div className="animate-marquee">
                    {looped.map((r, i) => (
                        <div key={i} className="flex items-start gap-3 border-b px-4 py-3.5 last:border-b-0" style={{ borderColor: themeColor("bg", 0.12) }}>
                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: themeColor("bg", 0.15), color: themeColor("bg", 1) }}>
                                {r.user.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="truncate text-[12.5px] font-semibold" style={{ color: themeColor("bg", 0.92) }}>{r.shop}</p>
                                    <Stars count={r.rating} size={10} which="bg" />
                                </div>
                                <p className="mt-0.5 truncate text-[11.5px] font-medium" style={{ color: themeColor("bg", 0.6) }}>{r.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const inputStyle = { color: themeColor("ink", 1) };

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden font-body transition-colors duration-300"
            style={{ backgroundColor: themeColor("bg", 1), "--color-bg": dark ? "18 18 19" : "247 245 240", "--color-ink": dark ? "245 243 239" : "26 20 8" }}
        >
            <style>{`
        @keyframes marquee { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease-out both; }

        @keyframes shimmer { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(220%) skewX(-20deg); } }
        .btn-shimmer::after { content: ""; position: absolute; inset: 0; background: rgba(255,255,255,0.18); animation: shimmer 2.2s ease-in-out infinite; animation-delay: 1.4s; }

        .panel-swap { animation: fadeUp 0.3s ease-out both; }

        ::placeholder { font-weight: 500; opacity: 0.5; }
      `}</style>

            {/* soft static glow blobs, single ink tone */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full blur-3xl" style={{ backgroundColor: themeColor("ink", 0.06) }} />
            <div className="pointer-events-none absolute -bottom-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full blur-3xl" style={{ backgroundColor: themeColor("ink", 0.04) }} />

            {/* theme toggle */}
            <button
                type="button"
                onClick={() => setDark((d) => !d)}
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-transform active:scale-90"
                style={{ backgroundColor: themeColor("ink", 0.08), borderColor: themeColor("ink", 0.18), color: themeColor("ink", 1) }}
                aria-label="Toggle dark mode"
            >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl">
                {/* Left brand panel */}
                <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r px-12 py-10 md:flex" style={{ borderColor: themeColor("ink", 0.12) }}>
                    <div className="fade-up flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: themeColor("ink", 1) }}>
                            <Star size={16} style={{ fill: themeColor("bg", 1), color: themeColor("bg", 1) }} />
                        </div>
                        <span className="font-display text-lg font-semibold tracking-wide" style={{ color: themeColor("ink", 1) }}>Vendo</span>
                    </div>

                    <div className="fade-up flex min-h-0 flex-1 flex-col gap-5 py-8" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center gap-8">
                            <StatBlock label="average rating" value={4.8} decimals={1} />
                            <StatBlock label="shops rated" value={12400} suffix="+" />
                            <StatBlock label="reviews this week" value={860} suffix="+" />
                        </div>

                        <div className="min-h-0 flex-1">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: themeColor("ink", 0.45) }}>Happening right now</p>
                            <div className="h-full max-h-[19rem]">
                                <ReviewTicker />
                            </div>
                        </div>
                    </div>

                    <div className="fade-up max-w-sm" style={{ animationDelay: "0.2s" }}>
                        <h1 className="font-display text-2xl font-semibold leading-[1.2]" style={{ color: themeColor("ink", 1) }}>
                            See what real customers are saying, as it happens.
                        </h1>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:w-1/2">
                    <div className="w-full max-w-sm">
                        <div className="mb-7 flex items-center gap-2 md:hidden">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: themeColor("ink", 1) }}>
                                <Star size={14} style={{ fill: themeColor("bg", 1), color: themeColor("bg", 1) }} />
                            </div>
                            <span className="font-display text-base font-semibold" style={{ color: themeColor("ink", 1) }}>Vendo</span>
                        </div>

                        {mode === "login" ? (
                            <div key="login" className="panel-swap">
                                <h2 className="font-display text-2xl font-bold" style={{ color: themeColor("ink", 1) }}>Welcome back</h2>
                                <p className="mt-1.5 h-5 text-sm font-medium" style={{ color: themeColor("ink", 0.6) }}>Sign in as a {activeRole.label.toLowerCase()}</p>

                                {/* Role toggle */}
                                <div className="relative mt-6 flex rounded-full border p-1" style={{ borderColor: themeColor("ink", 0.18), backgroundColor: themeColor("ink", 0.05) }}>
                                    <div
                                        className="absolute inset-y-1 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `calc(${100 / ROLES.length}% - 4px)`, left: `calc(${(100 / ROLES.length) * roleIndex}% + 2px)`, backgroundColor: themeColor("ink", 1) }}
                                    />
                                    {ROLES.map((r) => {
                                        const Icon = r.icon;
                                        const active = r.id === role;
                                        return (
                                            <button key={r.id} type="button" onClick={() => setRole(r.id)} className="relative z-10 flex-1 rounded-full px-2 py-2 text-center">
                                                <span className="relative z-10 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold transition-colors" style={{ color: active ? themeColor("bg", 1) : themeColor("ink", 0.6) }}>
                                                    <Icon size={13} />
                                                    <span className="hidden sm:inline">{r.label}</span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Login form */}
                                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                                    <FieldShell label={activeRole.idLabel} focused={focusedField === "id"}>
                                        <Mail size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type="text"
                                            value={loginId}
                                            onChange={(e) => setLoginId(e.target.value)}
                                            onFocus={() => setFocusedField("id")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder={activeRole.placeholder}
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                    </FieldShell>

                                    <FieldShell label="Password" focused={focusedField === "password"}>
                                        <Lock size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setFocusedField("password")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••"
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                        <button type="button" onClick={() => setShowPassword((s) => !s)} className="active:scale-90 transition-transform" style={{ color: themeColor("ink", 0.5) }}>
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </FieldShell>

                                    <div className="flex justify-between gap-3">
                                        {error && <p className="text-sm font-semibold text-red-600" role="alert">{error}</p>}
                                        <button type="button" onClick={() => navigate("/reset-password")} className="ml-auto text-[12.5px] font-semibold hover:opacity-70" style={{ color: themeColor("ink", 1) }}>Forgot password?</button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-shimmer relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-3 text-sm font-bold transition-transform hover:scale-[1.015] active:scale-[0.98]"
                                        style={{ backgroundColor: themeColor("ink", 1), color: themeColor("bg", 1) }}
                                    >
                                        <span className="relative z-10">{loading ? "Logging in..." : "Log in"}</span>
                                        <ArrowRight size={15} className="relative z-10" />
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-px flex-1" style={{ backgroundColor: themeColor("ink", 0.18) }} />
                                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: themeColor("ink", 0.4) }}>or</span>
                                    <div className="h-px flex-1" style={{ backgroundColor: themeColor("ink", 0.18) }} />
                                </div>

                                <p className="mt-6 text-center text-sm font-medium" style={{ color: themeColor("ink", 0.6) }}>
                                    Don&apos;t have an account?{" "}
                                    <button type="button" onClick={() => setMode("signup")} className="font-bold hover:opacity-70 transition-opacity" style={{ color: themeColor("ink", 1) }}>
                                        Sign up and create one
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div key="signup" className="panel-swap">
                                <h2 className="font-display text-2xl font-bold" style={{ color: themeColor("ink", 1) }}>Create your account</h2>
                                <p className="mt-1.5 text-sm font-medium" style={{ color: themeColor("ink", 0.6) }}>Choose how you’ll use Vantage</p>

                                <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border p-1" style={{ borderColor: themeColor("ink", 0.18), backgroundColor: themeColor("ink", 0.05) }}>
                                    {[{ id: "user", label: "Customer" }, { id: "owner", label: "Store owner" }].map((option) => <button key={option.id} type="button" onClick={() => setSignupRole(option.id)} className="rounded-lg px-3 py-2 text-sm font-bold transition-colors" style={{ backgroundColor: signupRole === option.id ? themeColor("ink", 1) : "transparent", color: signupRole === option.id ? themeColor("bg", 1) : themeColor("ink", 0.65) }}>{option.label}</button>)}
                                </div>

                                <form className="mt-6 space-y-4" onSubmit={handleSignup} noValidate>
                                    <FieldShell label="Name" focused={focusedField === "name"} error={signupErrors.name}>
                                        <User size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type="text"
                                            value={signupName}
                                            onChange={(e) => setSignupName(e.target.value)}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Rohan Kulkarni"
                                            maxLength={60}
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                    </FieldShell>

                                    <FieldShell label="Email" focused={focusedField === "signupEmail"} error={signupErrors.email}>
                                        <Mail size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type="email"
                                            value={signupEmail}
                                            onChange={(e) => setSignupEmail(e.target.value)}
                                            onFocus={() => setFocusedField("signupEmail")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="rohan.kulkarni88@gmail.com"
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                    </FieldShell>

                                    <FieldShell label="Address" focused={focusedField === "address"} error={signupErrors.address}>
                                        <MapPin size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type="text"
                                            value={signupAddress}
                                            onChange={(e) => setSignupAddress(e.target.value)}
                                            onFocus={() => setFocusedField("address")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="14 Hazelwood Lane, Pune"
                                            maxLength={400}
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                    </FieldShell>

                                    <FieldShell label="Password" focused={focusedField === "signupPassword"} error={signupErrors.password}>
                                        <Lock size={16} style={{ color: themeColor("ink", 0.5) }} />
                                        <input
                                            type={showSignupPassword ? "text" : "password"}
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            onFocus={() => setFocusedField("signupPassword")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="••••••••"
                                            maxLength={16}
                                            style={inputStyle}
                                            className="w-full bg-transparent text-sm font-medium focus:outline-none"
                                        />
                                        <button type="button" onClick={() => setShowSignupPassword((s) => !s)} className="active:scale-90 transition-transform" style={{ color: themeColor("ink", 0.5) }}>
                                            {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </FieldShell>

                                    <button
                                        type="submit"
                                        className="btn-shimmer relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-3 text-sm font-bold transition-transform hover:scale-[1.015] active:scale-[0.98]"
                                        style={{ backgroundColor: themeColor("ink", 1), color: themeColor("bg", 1) }}
                                    >
                                        <span className="relative z-10">{loading ? "Creating account..." : "Create account"}</span>
                                        <ArrowRight size={15} className="relative z-10" />
                                    </button>
                                </form>

                                <p className="mt-6 text-center text-sm font-medium" style={{ color: themeColor("ink", 0.6) }}>
                                    Already have an account?{" "}
                                    <button type="button" onClick={() => setMode("login")} className="font-bold hover:opacity-70 transition-opacity" style={{ color: themeColor("ink", 1) }}>
                                        Log in
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <LoadingOverlay visible={loading} label={mode === "login" ? "Signing in…" : "Creating account…"} />
            <Toast notice={notice} onDismiss={() => setNotice(null)} />
        </div>
    );
}