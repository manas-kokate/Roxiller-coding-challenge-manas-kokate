import React, { useMemo, useState } from "react";
import { Search, MapPin, Star, Pencil, Check, X, Store as StoreIcon } from "lucide-react";

// Swap for a real API call once the backend is wired up.
const seedStores = () => [
    {
        id: "store-1",
        name: "Whitfield Hardware",
        address: "214 Birchwood Lane, Austin, TX",
        overallRating: 4.3,
        ratingsCount: 4,
        userRating: null,
    },
    {
        id: "store-2",
        name: "Kalra Grocers",
        address: "88 Elm Street, Portland, OR",
        overallRating: 4.7,
        ratingsCount: 12,
        userRating: 5,
    },
    {
        id: "store-3",
        name: "Ihejirika Electronics",
        address: "5 Market Row, Chicago, IL",
        overallRating: 3.6,
        ratingsCount: 7,
        userRating: null,
    },
    {
        id: "store-4",
        name: "Farrell's Bakery",
        address: "40 Willow Ave, Denver, CO",
        overallRating: 4.9,
        ratingsCount: 21,
        userRating: 4,
    },
];

function StaticStars({ value, size = 15 }) {
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

function StarPicker({ initialValue, onSubmit, onCancel }) {
    const [value, setValue] = useState(initialValue || 0);
    const [hover, setHover] = useState(0);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map((n) => {
                    const filled = n <= (hover || value);
                    return (
                        <button
                            key={n}
                            onClick={() => setValue(n)}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: 2,
                                lineHeight: 0,
                            }}
                        >
                            <Star
                                size={19}
                                fill={filled ? "#E8A33D" : "none"}
                                style={{ color: "#E8A33D" }}
                            />
                        </button>
                    );
                })}
            </div>
            <button
                onClick={() => value > 0 && onSubmit(value)}
                disabled={value === 0}
                title="Save rating"
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    border: "none",
                    background: "rgb(var(--color-ink))",
                    color: "rgb(var(--color-bg))",
                    cursor: value === 0 ? "default" : "pointer",
                    opacity: value === 0 ? 0.4 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Check size={14} />
            </button>
            <button
                onClick={onCancel}
                title="Cancel"
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    border: "1px solid rgb(var(--color-ink) / 0.15)",
                    background: "transparent",
                    color: "rgb(var(--color-ink))",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <X size={14} />
            </button>
        </div>
    );
}

function StoreRow({ store, onRate }) {
    const [picking, setPicking] = useState(false);

    const initials = store.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleSubmit = (value) => {
        onRate(store.id, value);
        setPicking(false);
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "minmax(220px, 2fr) minmax(140px, 1fr) minmax(180px, 1.2fr)",
                gap: 20,
                alignItems: "center",
                padding: "18px 20px",
                borderBottom: "1px solid rgb(var(--color-ink) / 0.08)",
            }}
        >
            {/* Store Name + Address */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                <div
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: 11,
                        background: "rgb(var(--color-ink) / 0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13.5,
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {store.name}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12.5,
                            opacity: 0.5,
                            marginTop: 3,
                        }}
                    >
                        <MapPin size={12} style={{ flexShrink: 0 }} />
                        <span
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {store.address}
                        </span>
                    </div>
                </div>
            </div>

            {/* Overall Rating */}
            <div>
                <div style={{ fontSize: 11, opacity: 0.45, marginBottom: 5, fontWeight: 500 }}>
                    Overall rating
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <StaticStars value={store.overallRating} size={14} />
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>
                        {store.overallRating.toFixed(1)}
                    </span>
                </div>
                <div style={{ fontSize: 11.5, opacity: 0.45, marginTop: 3 }}>
                    {store.ratingsCount} {store.ratingsCount === 1 ? "rating" : "ratings"}
                </div>
            </div>

            {/* User's Rating / Actions */}
            <div>
                <div style={{ fontSize: 11, opacity: 0.45, marginBottom: 5, fontWeight: 500 }}>
                    Your rating
                </div>

                {picking ? (
                    <StarPicker
                        initialValue={store.userRating || 0}
                        onSubmit={handleSubmit}
                        onCancel={() => setPicking(false)}
                    />
                ) : store.userRating ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <StaticStars value={store.userRating} size={14} />
                        <button
                            onClick={() => setPicking(true)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                border: "none",
                                background: "transparent",
                                color: "rgb(var(--color-ink) / 0.6)",
                                fontSize: 12.5,
                                fontWeight: 600,
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            <Pencil size={12.5} />
                            Modify
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setPicking(true)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 7,
                            padding: "7px 13px",
                            borderRadius: 8,
                            border: "1px solid rgb(var(--color-ink) / 0.14)",
                            background: "transparent",
                            color: "rgb(var(--color-ink))",
                            fontSize: 12.5,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        <Star size={13} />
                        Submit Rating
                    </button>
                )}
            </div>
        </div>
    );
}

function EmptyState({ hasQuery }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "64px 24px",
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
                <StoreIcon size={22} style={{ opacity: 0.4 }} />
            </div>
            <div className="font-display" style={{ fontSize: 15.5, fontWeight: 700 }}>
                {hasQuery ? "No stores match your search" : "No stores registered yet"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.5, marginTop: 5, maxWidth: 280 }}>
                {hasQuery
                    ? "Try a different name or address."
                    : "Once stores are added, they'll show up here for you to rate."}
            </div>
        </div>
    );
}

export function UserDashboard({ initialStores, onChange = () => { } }) {
    const [stores, setStores] = useState(initialStores || seedStores());
    const [query, setQuery] = useState("");

    const handleRate = (storeId, value) => {
        const next = stores.map((s) => {
            if (s.id !== storeId) return s;

            const hadRating = s.userRating != null;
            const prevTotal = s.overallRating * s.ratingsCount;
            const newCount = hadRating ? s.ratingsCount : s.ratingsCount + 1;
            const newTotal = hadRating ? prevTotal - s.userRating + value : prevTotal + value;
            const newAverage = newCount ? newTotal / newCount : value;

            return {
                ...s,
                userRating: value,
                ratingsCount: newCount,
                overallRating: newAverage,
            };
        });
        setStores(next);
        onChange(next);
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return stores;
        return stores.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                s.address.toLowerCase().includes(q)
        );
    }, [stores, query]);

    return (
        <div
            className="font-body"
            style={{
                width: "100%",
                minHeight: "100vh",
                boxSizing: "border-box",
                color: "rgb(var(--color-ink))",
                background: "rgb(var(--color-bg))",
                padding: "36px 40px",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: 8 }}>
                <div className="font-display" style={{ fontSize: 26, fontWeight: 700 }}>
                    Stores
                </div>
            </div>

            {/* Toolbar: count + search */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    marginBottom: 22,
                    flexWrap: "wrap",
                }}
            >
                <div style={{ fontSize: 13.5, opacity: 0.55 }}>
                    {filtered.length} of {stores.length} registered{" "}
                    {stores.length === 1 ? "store" : "stores"}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 9,
                        border: "1px solid rgb(var(--color-ink) / 0.12)",
                        background: "rgb(var(--color-ink) / 0.03)",
                        width: "100%",
                        maxWidth: 300,
                    }}
                >
                    <Search size={15} style={{ opacity: 0.45, flexShrink: 0 }} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or address"
                        style={{
                            flex: 1,
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            fontSize: 13,
                            color: "rgb(var(--color-ink))",
                            minWidth: 0,
                        }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "rgb(var(--color-ink) / 0.45)",
                                display: "flex",
                                padding: 0,
                            }}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Stores List */}
            <div
                style={{
                    background: "rgb(var(--color-bg))",
                    border: "1px solid rgb(var(--color-ink) / 0.1)",
                    borderRadius: 14,
                    overflow: "hidden",
                }}
            >
                {filtered.length === 0 ? (
                    <EmptyState hasQuery={query.trim().length > 0} />
                ) : (
                    filtered.map((store) => (
                        <StoreRow key={store.id} store={store} onRate={handleRate} />
                    ))
                )}
            </div>
        </div>
    );
}