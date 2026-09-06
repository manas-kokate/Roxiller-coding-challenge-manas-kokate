import React, { useMemo } from "react";
import { Star, Mail, Users as UsersIcon, MessageSquareText, Calendar } from "lucide-react";

// Swap for a real API call once the backend is wired up.
const seedRatings = () => [
    {
        id: "r1",
        userName: "Priya Kalra",
        userEmail: "priya.kalra@example.com",
        rating: 5,
        comment: "Great service, quick checkout.",
        submittedAt: "2026-08-28",
    },
    {
        id: "r2",
        userName: "Marcus Ihejirika",
        userEmail: "marcus.i@example.com",
        rating: 4,
        comment: "Good selection, a bit pricey.",
        submittedAt: "2026-08-22",
    },
    {
        id: "r3",
        userName: "Dana Whitfield",
        userEmail: "dana.whitfield@example.com",
        rating: 3,
        comment: "",
        submittedAt: "2026-08-15",
    },
    {
        id: "r4",
        userName: "Owen Farrell",
        userEmail: "owen.farrell@example.com",
        rating: 5,
        comment: "Staff were very helpful.",
        submittedAt: "2026-08-10",
    },
];

function StarRow({ value, size = 15 }) {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    size={size}
                    fill={n <= Math.round(value) ? "#E8A33D" : "none"}
                    style={{ color: "#E8A33D" }}
                />
            ))}
        </div>
    );
}

function DistributionBar({ star, count, total }) {
    const pct = total ? Math.round((count / total) * 100) : 0;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div style={{ fontSize: 12, width: 40, opacity: 0.6, flexShrink: 0 }}>{star} star</div>
            <div
                style={{
                    flex: 1,
                    height: 7,
                    borderRadius: 5,
                    background: "rgb(var(--color-ink) / 0.08)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "#E8A33D",
                        borderRadius: 5,
                        transition: "width .3s ease",
                    }}
                />
            </div>
            <div style={{ fontSize: 12, width: 26, textAlign: "right", opacity: 0.55, flexShrink: 0 }}>
                {count}
            </div>
        </div>
    );
}

function RatingRow({ entry }) {
    const initials = entry.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "16px 4px",
                borderBottom: "1px solid rgb(var(--color-ink) / 0.1)",
            }}
        >
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgb(var(--color-ink) / 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                }}
            >
                {initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ fontSize: 14.5, fontWeight: 700 }}>{entry.userName}</div>
                    <StarRow value={entry.rating} />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12.5,
                        opacity: 0.55,
                        marginTop: 4,
                    }}
                >
                    <Mail size={12.5} />
                    {entry.userEmail}
                    <span style={{ opacity: 0.4 }}>·</span>
                    <Calendar size={12.5} />
                    {entry.submittedAt}
                </div>

                {entry.comment && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 6,
                            fontSize: 13.5,
                            marginTop: 8,
                            opacity: 0.85,
                            lineHeight: 1.4,
                        }}
                    >
                        <MessageSquareText size={14} style={{ marginTop: 2, opacity: 0.5, flexShrink: 0 }} />
                        {entry.comment}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyRatings() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "56px 24px",
            }}
        >
            <div
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "rgb(var(--color-ink) / 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <Star size={22} style={{ opacity: 0.45 }} />
            </div>
            <div className="font-display" style={{ fontSize: 15.5, fontWeight: 700 }}>
                No ratings yet
            </div>
            <div style={{ fontSize: 13, opacity: 0.55, marginTop: 5, maxWidth: 280 }}>
                Once customers start rating your store, they'll show up here.
            </div>
        </div>
    );
}

export function OwnerDashboard({ storeName = "Your store", ratings = seedRatings() }) {
    const stats = useMemo(() => {
        const total = ratings.length;
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        const average = total ? sum / total : 0;
        const distribution = [5, 4, 3, 2, 1].map((star) => ({
            star,
            count: ratings.filter((r) => r.rating === star).length,
        }));
        return { total, average, distribution };
    }, [ratings]);

    const sortedRatings = useMemo(
        () => [...ratings].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
        [ratings]
    );

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
            }}
        >
            <div style={{ marginBottom: 28 }}>
                <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>
                    Dashboard
                </div>
                <div style={{ fontSize: 13.5, opacity: 0.55, marginTop: 4 }}>
                    Ratings overview for {storeName}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* Analytics card */}
                <div
                    style={{
                        flex: "1 1 280px",
                        maxWidth: 340,
                        background: "rgb(var(--color-bg))",
                        border: "1px solid rgb(var(--color-ink) / 0.12)",
                        borderRadius: 14,
                        padding: "24px 22px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12.5,
                            opacity: 0.55,
                            marginBottom: 14,
                        }}
                    >
                        <UsersIcon size={14} /> Average rating
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                        <div className="font-display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
                            {stats.average.toFixed(1)}
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.55 }}>/ 5</div>
                    </div>

                    <StarRow value={stats.average} size={17} />

                    <div style={{ fontSize: 12.5, opacity: 0.55, marginTop: 8 }}>
                        Based on {stats.total} {stats.total === 1 ? "rating" : "ratings"}
                    </div>

                    <div
                        style={{
                            marginTop: 20,
                            paddingTop: 18,
                            borderTop: "1px solid rgb(var(--color-ink) / 0.1)",
                        }}
                    >
                        {stats.distribution.map((d) => (
                            <DistributionBar key={d.star} star={d.star} count={d.count} total={stats.total} />
                        ))}
                    </div>
                </div>

                {/* Ratings list */}
                <div
                    style={{
                        flex: "2 1 400px",
                        background: "rgb(var(--color-bg))",
                        border: "1px solid rgb(var(--color-ink) / 0.12)",
                        borderRadius: 14,
                        padding: "22px 24px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 4,
                        }}
                    >
                        <div style={{ fontSize: 15, fontWeight: 700 }}>Customer ratings</div>
                        <div style={{ fontSize: 12.5, opacity: 0.55 }}>{stats.total} total</div>
                    </div>

                    {sortedRatings.length === 0 ? (
                        <EmptyRatings />
                    ) : (
                        <div>
                            {sortedRatings.map((entry) => (
                                <RatingRow key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}