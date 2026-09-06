import React from "react";
import {
    Users,
    Store,
    Star,
    TrendingUp,
    UserPlus,
    Plus,
    Clock,
    MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DUMMY DATA                                                          */
/* ------------------------------------------------------------------ */
const STATS = {
    totalUsers: 48,
    totalStores: 17,
    totalRatings: 312,
};

const TRENDS = {
    totalUsers: { value: "+12%", positive: true },
    totalStores: { value: "+3", positive: true },
    totalRatings: { value: "+28%", positive: true },
};

const RECENT_STORES = [
    { id: 1, name: "GreenLeaf Organics", owner: "Aarav Sharma", location: "Mumbai", added: "3h ago", rating: 4.6 },
    { id: 2, name: "TechHub Electronics", owner: "Vikram Singh", location: "Bengaluru", added: "8h ago", rating: 4.2 },
    { id: 3, name: "Spice Route Kitchen", owner: "Neha Reddy", location: "Hyderabad", added: "1d ago", rating: 4.8 },
    { id: 4, name: "Urban Threads", owner: "Karan Joshi", location: "Delhi", added: "2d ago", rating: 4.1 },
];

const RECENT_RATINGS = [
    { id: 1, user: "Priya Patel", store: "GreenLeaf Organics", rating: 5, comment: "Fresh produce and friendly staff!", time: "1h ago" },
    { id: 2, user: "Rohan Mehta", store: "TechHub Electronics", rating: 4, comment: "Good prices, quick service.", time: "4h ago" },
    { id: 3, user: "Sneha Gupta", store: "Spice Route Kitchen", rating: 5, comment: "Best biryani in the city!", time: "9h ago" },
    { id: 4, user: "Aarav Sharma", store: "Urban Threads", rating: 3, comment: "Decent quality, limited sizes.", time: "1d ago" },
];

export function Dashboard() {
    const cards = [
        {
            label: "Total Users",
            value: STATS.totalUsers,
            icon: Users,
            hint: "Admins + Normal users + Store owners",
            trend: TRENDS.totalUsers,
        },
        {
            label: "Total Stores",
            value: STATS.totalStores,
            icon: Store,
            hint: "All registered stores",
            trend: TRENDS.totalStores,
        },
        {
            label: "Total Ratings",
            value: STATS.totalRatings,
            icon: Star,
            hint: "Submitted by users",
            trend: TRENDS.totalRatings,
        },
    ];

    return (
        <div style={{ padding: "32px 36px", maxWidth: 1200 }}>
            {/* Header + Quick Actions */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: 32,
                    gap: 20,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h1
                        className="font-display"
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            margin: 0,
                            color: "rgb(var(--color-ink))",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Dashboard
                    </h1>
                    <p
                        style={{
                            margin: "8px 0 0",
                            fontSize: 14,
                            opacity: 0.5,
                        }}
                    >
                        System overview · Last updated just now
                    </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            borderRadius: 10,
                            border: "1px solid rgb(var(--color-ink) / 0.12)",
                            background: "rgb(var(--color-bg))",
                            color: "rgb(var(--color-ink))",
                            fontSize: 13.5,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        <UserPlus size={16} strokeWidth={2} />
                        Add User
                    </button>
                    <button
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            borderRadius: 10,
                            border: "none",
                            background: "rgb(var(--color-ink))",
                            color: "rgb(var(--color-bg))",
                            fontSize: 13.5,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        <Plus size={16} strokeWidth={2.2} />
                        Add Store
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 18,
                    marginBottom: 32,
                }}
            >
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            style={{
                                background: "rgb(var(--color-bg))",
                                border: "1px solid rgb(var(--color-ink) / 0.08)",
                                borderRadius: 16,
                                padding: "22px 20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                boxShadow: "0 1px 2px rgb(var(--color-ink) / 0.03)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 11,
                                        background: "rgb(var(--color-ink) / 0.06)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Icon
                                        size={19}
                                        strokeWidth={1.8}
                                        style={{ color: "rgb(var(--color-ink))" }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        padding: "3px 8px",
                                        borderRadius: 20,
                                        background: card.trend.positive
                                            ? "rgb(34 197 94 / 0.1)"
                                            : "rgb(239 68 68 / 0.1)",
                                        color: card.trend.positive
                                            ? "rgb(22 163 74)"
                                            : "rgb(220 38 38)",
                                    }}
                                >
                                    <TrendingUp size={12} strokeWidth={2.2} />
                                    {card.trend.value}
                                </div>
                            </div>
                            <div>
                                <div
                                    className="font-display"
                                    style={{
                                        fontSize: 32,
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.03em",
                                        color: "rgb(var(--color-ink))",
                                    }}
                                >
                                    {card.value.toLocaleString()}
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        opacity: 0.55,
                                        marginTop: 5,
                                    }}
                                >
                                    {card.label}
                                </div>
                                <div style={{ fontSize: 12, opacity: 0.4, marginTop: 3 }}>
                                    {card.hint}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Analytics Sections */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 0.9fr",
                    gap: 20,
                }}
            >
                {/* Recently Added Stores – visual cards */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 14,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Store size={16} strokeWidth={2} style={{ opacity: 0.65 }} />
                            <span
                                style={{
                                    fontSize: 15,
                                    fontWeight: 650,
                                    color: "rgb(var(--color-ink))",
                                }}
                            >
                                Recently Added Stores
                            </span>
                        </div>
                        <span style={{ fontSize: 12.5, opacity: 0.4 }}>Last 4</span>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 14,
                        }}
                    >
                        {RECENT_STORES.map((store) => (
                            <div
                                key={store.id}
                                style={{
                                    background: "rgb(var(--color-bg))",
                                    border: "1px solid rgb(var(--color-ink) / 0.08)",
                                    borderRadius: 14,
                                    padding: "18px 16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    boxShadow: "0 1px 2px rgb(var(--color-ink) / 0.03)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        gap: 8,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 10,
                                            background: "rgb(var(--color-ink) / 0.06)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Store size={17} strokeWidth={1.8} style={{ opacity: 0.75 }} />
                                    </div>
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontSize: 13,
                                            fontWeight: 700,
                                            background: "rgb(var(--color-ink) / 0.06)",
                                            padding: "3px 8px",
                                            borderRadius: 8,
                                        }}
                                    >
                                        <Star
                                            size={12}
                                            fill="currentColor"
                                            strokeWidth={0}
                                            style={{ opacity: 0.85 }}
                                        />
                                        {store.rating}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: 14.5,
                                            fontWeight: 650,
                                            color: "rgb(var(--color-ink))",
                                            lineHeight: 1.25,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {store.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            opacity: 0.45,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <MapPin size={11} />
                                        {store.location}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginTop: "auto",
                                        paddingTop: 4,
                                    }}
                                >
                                    <span style={{ fontSize: 12, opacity: 0.5 }}>
                                        {store.owner}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 11.5,
                                            opacity: 0.35,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                        }}
                                    >
                                        <Clock size={10} />
                                        {store.added}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Ratings – visual review cards */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 14,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Star size={16} strokeWidth={2} style={{ opacity: 0.65 }} />
                            <span
                                style={{
                                    fontSize: 15,
                                    fontWeight: 650,
                                    color: "rgb(var(--color-ink))",
                                }}
                            >
                                Recent Ratings
                            </span>
                        </div>
                        <span style={{ fontSize: 12.5, opacity: 0.4 }}>Last 4</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {RECENT_RATINGS.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    background: "rgb(var(--color-bg))",
                                    border: "1px solid rgb(var(--color-ink) / 0.08)",
                                    borderRadius: 14,
                                    padding: "16px 18px",
                                    boxShadow: "0 1px 2px rgb(var(--color-ink) / 0.03)",
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
                                    <span
                                        style={{
                                            fontSize: 13.5,
                                            fontWeight: 650,
                                            color: "rgb(var(--color-ink))",
                                        }}
                                    >
                                        {item.user}
                                    </span>
                                    <div style={{ display: "flex", gap: 2 }}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={13}
                                                fill={i < item.rating ? "currentColor" : "none"}
                                                strokeWidth={i < item.rating ? 0 : 1.5}
                                                style={{
                                                    color: "rgb(var(--color-ink))",
                                                    opacity: i < item.rating ? 0.9 : 0.2,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        fontSize: 12.5,
                                        opacity: 0.5,
                                        marginBottom: 6,
                                    }}
                                >
                                    {item.store}
                                </div>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 13,
                                        lineHeight: 1.4,
                                        opacity: 0.7,
                                        fontStyle: "italic",
                                    }}
                                >
                                    “{item.comment}”
                                </p>

                                <div
                                    style={{
                                        marginTop: 10,
                                        fontSize: 11.5,
                                        opacity: 0.35,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <Clock size={11} />
                                    {item.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}