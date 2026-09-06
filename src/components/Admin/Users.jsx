import React, { useState, useMemo, useCallback } from "react";
import { Plus, Search, X, Eye, Mail, MapPin, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/* DUMMY DATA                                                          */
/* ------------------------------------------------------------------ */
const INITIAL_USERS = [
    {
        id: 1,
        name: "Marcus Ihejirika",
        email: "marcus@vantage.app",
        address: "12 Admin Way, New York, NY",
        role: "admin",
        rating: null,
    },
    {
        id: 2,
        name: "Dana Whitfield",
        email: "dana.w@email.com",
        address: "45 Oak Street, Chicago, IL",
        role: "user",
        rating: null,
    },
    {
        id: 3,
        name: "Priya Kalra",
        email: "priya@freshmart.com",
        address: "14 Green Avenue, Austin, TX",
        role: "owner",
        rating: 4.6,
    },
    {
        id: 4,
        name: "James Rivera",
        email: "j.rivera@mail.com",
        address: "9 Harbor Rd, Miami, FL",
        role: "user",
        rating: null,
    },
    {
        id: 5,
        name: "Sofia Mendes",
        email: "sofia@urbanbites.co",
        address: "88 Main Street, Seattle, WA",
        role: "owner",
        rating: 4.2,
    },
    {
        id: 6,
        name: "Elena Torres",
        email: "elena.admin@vantage.app",
        address: "3 Capitol Hill, Washington, DC",
        role: "admin",
        rating: null,
    },
];

/* ------------------------------------------------------------------ */
/* ROLE TOKENS — one palette entry drives the avatar, the badge and    */
/* the filter pill, so a role reads the same color everywhere.         */
/* ------------------------------------------------------------------ */
const ROLES = {
    admin: { label: "Admin", text: "#A23B2E", bg: "rgb(162 59 46 / 0.1)" },
    user: {
        label: "Normal user",
        text: "rgb(var(--color-ink) / 0.65)",
        bg: "rgb(var(--color-ink) / 0.07)",
    },
    owner: { label: "Store owner", text: "#2F6B45", bg: "rgb(47 107 69 / 0.1)" },
};

const ROLE_FILTERS = [["all", "All"], ...Object.entries(ROLES).map(([k, v]) => [k, v.label])];

function initials(name) {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

/* ------------------------------------------------------------------ */
/* AVATAR                                                               */
/* ------------------------------------------------------------------ */
function Avatar({ user, size = 38 }) {
    const role = ROLES[user.role] || ROLES.user;
    return (
        <div
            className="ud-avatar"
            style={{
                width: size,
                height: size,
                fontSize: size * 0.36,
                background: role.bg,
                color: role.text,
            }}
        >
            {initials(user.name)}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* ROLE BADGE                                                           */
/* ------------------------------------------------------------------ */
function RoleBadge({ role }) {
    const r = ROLES[role] || ROLES.user;
    return (
        <span className="ud-role-badge" style={{ background: r.bg, color: r.text }}>
            <span className="ud-role-dot" style={{ background: r.text }} />
            {r.label}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* USER ROW — isolated so filtering/searching only re-renders the      */
/* rows whose visibility actually changed.                             */
/* ------------------------------------------------------------------ */
const UserRow = React.memo(function UserRow({ user, onView }) {
    return (
        <div className="ud-row">
            <div className="ud-row-identity">
                <Avatar user={user} />
                <div className="ud-row-text">
                    <div className="ud-row-name">{user.name}</div>
                    <div className="ud-row-email">{user.email}</div>
                </div>
            </div>
            <div className="ud-row-address">{user.address}</div>
            <div className="ud-row-role">
                <RoleBadge role={user.role} />
            </div>
            <div className="ud-row-action">
                <button
                    onClick={() => onView(user)}
                    className="ud-icon-btn"
                    aria-label={`View ${user.name}`}
                    title="View details"
                >
                    <Eye size={17} />
                </button>
            </div>
        </div>
    );
});

/* ------------------------------------------------------------------ */
/* FIELD — shared text input, kept separate so typing never re-renders */
/* anything outside the form.                                          */
/* ------------------------------------------------------------------ */
function Field({ label, value, onChange, placeholder, type = "text" }) {
    return (
        <label className="ud-field">
            <span className="ud-field-label">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required
                className="ud-input"
            />
        </label>
    );
}

/* ------------------------------------------------------------------ */
/* ROLE PICKER — tactile pill selector used in the add-user form,      */
/* echoing the same segmented control used to filter the list.         */
/* ------------------------------------------------------------------ */
function RolePicker({ value, onChange }) {
    return (
        <div className="ud-field">
            <span className="ud-field-label">Role</span>
            <div className="ud-role-picker">
                {Object.entries(ROLES).map(([key, r]) => (
                    <button
                        type="button"
                        key={key}
                        onClick={() => onChange(key)}
                        className={`ud-role-pick ${value === key ? "ud-role-pick-active" : ""}`}
                        style={
                            value === key
                                ? { background: r.bg, color: r.text }
                                : undefined
                        }
                    >
                        {r.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* DRAWER — generic slide-over shell reused by add + view panels.      */
/* ------------------------------------------------------------------ */
function Drawer({ open, onClose, title, subtitle, children }) {
    return (
        <>
            <div
                className={`ud-backdrop ${open ? "ud-backdrop-open" : ""}`}
                onClick={onClose}
            />
            <aside className={`ud-drawer ${open ? "ud-drawer-open" : ""}`}>
                <div className="ud-drawer-header">
                    <h2 className="ud-drawer-title">{title}</h2>
                    <button onClick={onClose} className="ud-icon-btn" aria-label="Close">
                        <X size={20} />
                    </button>
                </div>
                {subtitle && <p className="ud-drawer-subtitle">{subtitle}</p>}
                {children}
            </aside>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* ADD-USER DRAWER                                                      */
/* ------------------------------------------------------------------ */
function AddUserDrawer({ open, onClose, onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user",
    });

    const update = useCallback(
        (key) => (val) => setForm((f) => ({ ...f, [key]: val })),
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.address) return;
        onSubmit(form);
        setForm({ name: "", email: "", password: "", address: "", role: "user" });
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title="New user"
            subtitle="Give them a name, login details and a role — you can change any of it later."
        >
            <form onSubmit={handleSubmit} className="ud-form">
                <Field
                    label="Full name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Morgan"
                />
                <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="alex@email.com"
                />
                <Field
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={update("password")}
                    placeholder="At least 8 characters"
                />
                <Field
                    label="Address"
                    value={form.address}
                    onChange={update("address")}
                    placeholder="Street, city, state"
                />
                <RolePicker value={form.role} onChange={update("role")} />

                <button type="submit" className="ud-submit-btn">
                    Create user
                </button>
            </form>
        </Drawer>
    );
}

/* ------------------------------------------------------------------ */
/* USER DETAIL DRAWER                                                   */
/* ------------------------------------------------------------------ */
function UserDetailDrawer({ user, onClose }) {
    return (
        <Drawer open={!!user} onClose={onClose} title="User details">
            {user && (
                <div className="ud-detail">
                    <div className="ud-detail-identity">
                        <Avatar user={user} size={56} />
                        <div>
                            <div className="ud-detail-name">{user.name}</div>
                            <RoleBadge role={user.role} />
                        </div>
                    </div>

                    <div className="ud-detail-list">
                        <div className="ud-detail-row">
                            <Mail size={15} className="ud-detail-icon" />
                            <div>
                                <div className="ud-detail-label">Email</div>
                                <div className="ud-detail-value">{user.email}</div>
                            </div>
                        </div>
                        <div className="ud-detail-row">
                            <MapPin size={15} className="ud-detail-icon" />
                            <div>
                                <div className="ud-detail-label">Address</div>
                                <div className="ud-detail-value">{user.address}</div>
                            </div>
                        </div>
                        {user.role === "owner" && (
                            <div className="ud-detail-row">
                                <Star size={15} className="ud-detail-icon" />
                                <div>
                                    <div className="ud-detail-label">Store rating</div>
                                    <div className="ud-detail-value">
                                        {user.rating > 0 ? user.rating.toFixed(1) : "No ratings yet"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Drawer>
    );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                       */
/* ------------------------------------------------------------------ */
export function Users() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showAdd, setShowAdd] = useState(false);
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return users.filter((u) => {
            const matchesSearch =
                !q ||
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.address.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q);
            const matchesRole = roleFilter === "all" || u.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const handleAdd = useCallback((form) => {
        const newUser = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            address: form.address,
            role: form.role,
            rating: form.role === "owner" ? 0 : null,
        };
        setUsers((prev) => [newUser, ...prev]);
        setShowAdd(false);
    }, []);

    return (
        <div className="ud-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');

                .ud-root {
                    padding: 32px 36px 60px;
                    max-width: 1140px;
                    font-family: 'Manrope', sans-serif;
                    color: rgb(var(--color-ink));
                }
                .ud-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 16px;
                    flex-wrap: wrap;
                    padding-bottom: 22px;
                    border-bottom: 1px solid rgb(var(--color-ink) / 0.12);
                    margin-bottom: 22px;
                }
                .ud-title {
                    font-family: 'Fraunces', serif;
                    font-size: 30px;
                    font-weight: 600;
                    margin: 0;
                    letter-spacing: -0.01em;
                }
                .ud-subtitle {
                    margin: 6px 0 0;
                    font-size: 14px;
                    color: rgb(var(--color-ink) / 0.55);
                }
                .ud-add-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 11px 18px;
                    border-radius: 10px;
                    border: none;
                    background: rgb(var(--color-ink));
                    color: rgb(var(--color-bg));
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'Manrope', sans-serif;
                    transition: opacity 0.15s ease;
                }
                .ud-add-btn:hover { opacity: 0.85; }

                .ud-toolbar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 24px;
                }
                .ud-search {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex: 1;
                    min-width: 220px;
                    padding: 4px 2px 12px;
                    border-bottom: 2px solid rgb(var(--color-ink) / 0.15);
                    transition: border-color 0.15s ease;
                }
                .ud-search:focus-within { border-color: rgb(var(--color-ink) / 0.6); }
                .ud-search input {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 15px;
                    font-family: 'Manrope', sans-serif;
                    color: rgb(var(--color-ink));
                }
                .ud-search input::placeholder { color: rgb(var(--color-ink) / 0.4); }
                .ud-search-icon { color: rgb(var(--color-ink) / 0.4); flex-shrink: 0; }
                .ud-clear-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: rgb(var(--color-ink) / 0.45);
                    padding: 0;
                    display: flex;
                }

                .ud-segmented {
                    display: flex;
                    gap: 4px;
                    padding: 4px;
                    border-radius: 10px;
                    background: rgb(var(--color-ink) / 0.05);
                    flex-wrap: wrap;
                }
                .ud-segment {
                    border: none;
                    background: transparent;
                    padding: 7px 13px;
                    border-radius: 7px;
                    font-size: 13px;
                    font-weight: 600;
                    color: rgb(var(--color-ink) / 0.6);
                    cursor: pointer;
                    font-family: 'Manrope', sans-serif;
                    transition: background 0.15s ease, color 0.15s ease;
                    white-space: nowrap;
                }
                .ud-segment:hover { color: rgb(var(--color-ink) / 0.85); }
                .ud-segment-active {
                    background: rgb(var(--color-bg));
                    color: rgb(var(--color-ink));
                    box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
                }

                .ud-list {
                    border: 1px solid rgb(var(--color-ink) / 0.1);
                    border-radius: 14px;
                    overflow: hidden;
                    background: rgb(var(--color-bg));
                }
                .ud-list-head {
                    display: grid;
                    grid-template-columns: 2.1fr 1.6fr 1.1fr 44px;
                    gap: 16px;
                    padding: 12px 20px;
                    background: rgb(var(--color-ink) / 0.035);
                    font-size: 12px;
                    font-weight: 600;
                    color: rgb(var(--color-ink) / 0.5);
                }
                .ud-row {
                    display: grid;
                    grid-template-columns: 2.1fr 1.6fr 1.1fr 44px;
                    gap: 16px;
                    align-items: center;
                    padding: 13px 20px;
                    border-top: 1px solid rgb(var(--color-ink) / 0.07);
                    transition: background 0.12s ease;
                }
                .ud-row:hover { background: rgb(var(--color-ink) / 0.025); }
                .ud-row-identity { display: flex; align-items: center; gap: 12px; min-width: 0; }
                .ud-avatar {
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    flex-shrink: 0;
                    font-family: 'Manrope', sans-serif;
                }
                .ud-row-text { min-width: 0; }
                .ud-row-name {
                    font-weight: 600;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ud-row-email {
                    font-size: 12.5px;
                    color: rgb(var(--color-ink) / 0.55);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ud-row-address {
                    font-size: 13.5px;
                    color: rgb(var(--color-ink) / 0.65);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ud-row-role { display: flex; }
                .ud-row-action { display: flex; justify-content: flex-end; }

                .ud-role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 11px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    white-space: nowrap;
                }
                .ud-role-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

                .ud-icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: rgb(var(--color-ink) / 0.5);
                    padding: 6px;
                    border-radius: 8px;
                    display: flex;
                    transition: background 0.12s ease, color 0.12s ease;
                }
                .ud-icon-btn:hover {
                    background: rgb(var(--color-ink) / 0.07);
                    color: rgb(var(--color-ink));
                }

                .ud-empty {
                    padding: 64px 16px;
                    text-align: center;
                    color: rgb(var(--color-ink) / 0.5);
                    font-size: 14px;
                }

                .ud-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgb(0 0 0 / 0.35);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                    z-index: 50;
                }
                .ud-backdrop-open { opacity: 1; pointer-events: auto; }

                .ud-drawer {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 400px;
                    max-width: 90vw;
                    background: rgb(var(--color-bg));
                    box-shadow: -8px 0 30px rgb(0 0 0 / 0.12);
                    transform: translateX(100%);
                    transition: transform 0.25s ease;
                    z-index: 51;
                    padding: 30px 30px 34px;
                    box-sizing: border-box;
                    overflow-y: auto;
                }
                .ud-drawer-open { transform: translateX(0); }

                .ud-drawer-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                .ud-drawer-title {
                    font-family: 'Fraunces', serif;
                    font-size: 22px;
                    font-weight: 600;
                    margin: 0;
                }
                .ud-drawer-subtitle {
                    font-size: 13.5px;
                    color: rgb(var(--color-ink) / 0.6);
                    line-height: 1.5;
                    margin: 0 0 26px;
                }

                .ud-form { display: flex; flex-direction: column; gap: 16px; }
                .ud-field { display: flex; flex-direction: column; gap: 6px; }
                .ud-field-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: rgb(var(--color-ink) / 0.75);
                }
                .ud-input {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid rgb(var(--color-ink) / 0.15);
                    background: rgb(var(--color-ink) / 0.03);
                    font-size: 14px;
                    font-family: 'Manrope', sans-serif;
                    outline: none;
                    color: rgb(var(--color-ink));
                    box-sizing: border-box;
                    transition: border-color 0.15s ease;
                }
                .ud-input:focus { border-color: rgb(var(--color-ink) / 0.5); }

                .ud-role-picker { display: flex; gap: 6px; flex-wrap: wrap; }
                .ud-role-pick {
                    padding: 8px 13px;
                    border-radius: 8px;
                    border: 1px solid rgb(var(--color-ink) / 0.15);
                    background: transparent;
                    font-size: 13px;
                    font-weight: 600;
                    color: rgb(var(--color-ink) / 0.65);
                    cursor: pointer;
                    font-family: 'Manrope', sans-serif;
                    transition: border-color 0.15s ease;
                }
                .ud-role-pick-active { border-color: transparent; }

                .ud-submit-btn {
                    margin-top: 8px;
                    padding: 12px 0;
                    border-radius: 9px;
                    border: none;
                    background: rgb(var(--color-ink));
                    color: rgb(var(--color-bg));
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'Manrope', sans-serif;
                    transition: opacity 0.15s ease;
                }
                .ud-submit-btn:hover { opacity: 0.85; }

                .ud-detail-identity {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 26px;
                }
                .ud-detail-name {
                    font-family: 'Fraunces', serif;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 6px;
                }
                .ud-detail-list {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    padding-top: 18px;
                    border-top: 1px solid rgb(var(--color-ink) / 0.1);
                }
                .ud-detail-row { display: flex; gap: 10px; align-items: flex-start; }
                .ud-detail-icon { margin-top: 3px; color: rgb(var(--color-ink) / 0.45); flex-shrink: 0; }
                .ud-detail-label {
                    font-size: 11.5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    color: rgb(var(--color-ink) / 0.45);
                    margin-bottom: 2px;
                }
                .ud-detail-value { font-size: 14.5px; font-weight: 500; }

                @media (max-width: 720px) {
                    .ud-list-head { display: none; }
                    .ud-row {
                        grid-template-columns: 1fr auto;
                        grid-template-areas: "identity action" "role role";
                        row-gap: 10px;
                    }
                    .ud-row-identity { grid-area: identity; }
                    .ud-row-action { grid-area: action; }
                    .ud-row-role { grid-area: role; }
                    .ud-row-address { display: none; }
                }
            `}</style>

            <div className="ud-header">
                <div>
                    <h1 className="ud-title">Users</h1>
                    <p className="ud-subtitle">
                        {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button onClick={() => setShowAdd(true)} className="ud-add-btn">
                    <Plus size={17} /> Add user
                </button>
            </div>

            <div className="ud-toolbar">
                <div className="ud-search">
                    <Search size={17} className="ud-search-icon" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, address or role"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="ud-clear-btn"
                            aria-label="Clear search"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="ud-segmented" role="tablist" aria-label="Filter by role">
                    {ROLE_FILTERS.map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setRoleFilter(key)}
                            className={`ud-segment ${roleFilter === key ? "ud-segment-active" : ""}`}
                            role="tab"
                            aria-selected={roleFilter === key}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="ud-list">
                <div className="ud-list-head">
                    <span>Name</span>
                    <span>Address</span>
                    <span>Role</span>
                    <span />
                </div>

                {filtered.length === 0 ? (
                    <div className="ud-empty">
                        No users match your filters. Try a different search, or clear the
                        role filter to see everyone.
                    </div>
                ) : (
                    filtered.map((user) => (
                        <UserRow key={user.id} user={user} onView={setSelected} />
                    ))
                )}
            </div>

            <AddUserDrawer
                open={showAdd}
                onClose={() => setShowAdd(false)}
                onSubmit={handleAdd}
            />
            <UserDetailDrawer user={selected} onClose={() => setSelected(null)} />
        </div>
    );
}

export default Users;