import React from "react";
import {
    LayoutDashboard,
    Store,
    Users,
    UserPlus,
    UserCircle,
    LogOut,
    X,
    LockOpen
} from "lucide-react";

const NAV = {
    admin: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "stores", label: "Stores", icon: Store },
        { id: "users", label: "Users", icon: Users },
    ],
    user: [
        { id: "dashboard", label: "dashboard", icon: LayoutDashboard },
        { id: "profile", label: "Profile", icon: UserCircle },
        { id: "change-password", label: "Change Password", icon: LockOpen }
    ],
    owner: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "change-password", label: "Change Password", icon: LockOpen },
    ]
};

const ROLE_META = {
    admin: { name: "Marcus Ihejirika", label: "Admin" },
    user: { name: "Dana Whitfield", label: "Normal user" },
    owner: { name: "Priya Kalra", label: "Store owner" },
};

export function Sidebar({
    role = "admin",
    setRole = () => { },
    activeNav = "dashboard",
    setActiveNav = () => { },
    mobileOpen = false,
    setMobileOpen = () => { },
    onLogout = () => console.log("logout"),
    isAdmin = true,
}) {
    const person = ROLE_META[role];

    return (
        <>
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="vg-scrim"
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgb(var(--color-ink) / 0.35)",
                        zIndex: 39,
                    }}
                />
            )}

            <aside
                className="vg-sidebar font-body"
                style={{
                    width: 260,
                    minWidth: 260,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px 14px",
                    boxSizing: "border-box",
                    position: "sticky",
                    top: 0,
                    background: "rgb(var(--color-bg))",
                    borderRight: "1px solid rgb(var(--color-ink) / 0.12)",
                    color: "rgb(var(--color-ink))",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 20px" }}>
                    <div
                        className="font-display"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: 9,
                            background: "rgb(var(--color-ink))",
                            color: "rgb(var(--color-bg))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 17,
                            flexShrink: 0,
                        }}
                    >
                        V
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <div className="font-display" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.1 }}>
                            Vantage
                        </div>
                        <div style={{ fontSize: 11, opacity: 0.55, marginTop: 1, whiteSpace: "nowrap" }}>
                            Store ratings platform
                        </div>
                    </div>
                    <button
                        className="vg-mobile-only"
                        onClick={() => setMobileOpen(false)}
                        style={{
                            marginLeft: "auto",
                            background: "none",
                            border: "none",
                            color: "rgb(var(--color-ink))",
                            cursor: "pointer",
                            opacity: 0.7,
                        }}
                    >
                    </button>
                </div>

                {/* Preview role toggle */}

                {/* Nav */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {NAV[role].map((item) => {
                        const Icon = item.icon;
                        const active = activeNav === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveNav(item.id);
                                    setMobileOpen(false);
                                }}
                                className="vg-nav-item"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 11,
                                    padding: "10px 12px",
                                    borderRadius: 8,
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "'Manrope', sans-serif",
                                    background: active ? "rgb(var(--color-ink))" : "transparent",
                                    color: active ? "rgb(var(--color-bg))" : "rgb(var(--color-ink) / 0.7)",
                                    transition: "background .12s ease, color .12s ease",
                                }}
                            >
                                <Icon size={17} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ flexGrow: 1 }} />

                {/* User card + logout */}
                <div style={{ borderTop: "1px solid rgb(var(--color-ink) / 0.12)", paddingTop: 14 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "0 8px",
                            marginBottom: 10,
                        }}
                    >
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "rgb(var(--color-ink) / 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 13,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <div
                                style={{
                                    fontSize: 13.5,
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {person.name}
                            </div>
                            <div style={{ fontSize: 12, opacity: 0.55 }}>{person.label}</div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="vg-logout"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: 8,
                            border: "none",
                            background: "transparent",
                            color: "rgb(var(--color-ink) / 0.6)",
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "'Manrope', sans-serif",
                            cursor: "pointer",
                        }}
                    >
                        <LogOut size={17} /> Log out
                    </button>
                </div>
            </aside>
        </>
    );
}