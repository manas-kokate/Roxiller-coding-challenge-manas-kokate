import React, { useMemo, useState } from "react";
import {
    Search,
    MapPin,
    Mail,
    User,
    Star,
    X,
    Plus,
    ChevronLeft,
    ChevronRight,
    Store as StoreIcon,
    Eye,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DUMMY DATA                                                          */
/* ------------------------------------------------------------------ */
const defaultStores = [
    {
        id: 1,
        name: "GreenLeaf Organics",
        email: "hello@greenleaf.in",
        address: "Pune",
        overallRating: 4.6,
        ratingsCount: 42,
        ownerName: "Aarav Sharma",
        image: null,
    },
    {
        id: 2,
        name: "TechHub Electronics",
        email: "support@techhub.co",
        address: "Bengaluru",
        overallRating: 4.2,
        ratingsCount: 28,
        ownerName: "Vikram Singh",
        image: null,
    },
    {
        id: 3,
        name: "Spice Route Kitchen",
        email: "orders@spiceroute.com",
        address: "Hyderabad",
        overallRating: 4.8,
        ratingsCount: 67,
        ownerName: "Neha Reddy",
        image: null,
    },
    {
        id: 4,
        name: "Urban Threads",
        email: "hello@urbanthreads.in",
        address: "Mumbai",
        overallRating: 4.1,
        ratingsCount: 19,
        ownerName: "Karan Joshi",
        image: null,
    },
    {
        id: 5,
        name: "FreshBasket Mart",
        email: "care@freshbasket.com",
        address: "Delhi",
        overallRating: 4.4,
        ratingsCount: 35,
        ownerName: "Priya Patel",
        image: null,
    },
    {
        id: 6,
        name: "ByteCafe",
        email: "hi@bytecafe.io",
        address: "Pune",
        overallRating: 4.0,
        ratingsCount: 14,
        ownerName: "Rohan Mehta",
        image: null,
    },
    {
        id: 7,
        name: "Lumina Decor",
        email: "studio@luminadecor.com",
        address: "Chennai",
        overallRating: 4.7,
        ratingsCount: 51,
        ownerName: "Sneha Gupta",
        image: null,
    },
    {
        id: 8,
        name: "PetPals Store",
        email: "hello@petpals.in",
        address: "Mumbai",
        overallRating: 4.3,
        ratingsCount: 22,
        ownerName: "Ananya Desai",
        image: null,
    },
    {
        id: 9,
        name: "BookNook",
        email: "read@booknook.co",
        address: "Kolkata",
        overallRating: 4.9,
        ratingsCount: 88,
        ownerName: "Arjun Nair",
        image: null,
    },
    {
        id: 10,
        name: "FitFuel Nutrition",
        email: "team@fitfuel.com",
        address: "Bengaluru",
        overallRating: 4.5,
        ratingsCount: 31,
        ownerName: "Meera Iyer",
        image: null,
    },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
function StaticStars({ value, size = 14 }) {
    return (
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
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

/* ------------------------------------------------------------------ */
/* VIEW DETAILS MODAL                                                  */
/* ------------------------------------------------------------------ */
function StoreDetailsModal({ store, onClose }) {
    if (!store) return null;

    const initials = store.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgb(0 0 0 / 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: 24,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "rgb(var(--color-bg))",
                    borderRadius: 16,
                    border: "1px solid rgb(var(--color-ink) / 0.1)",
                    width: "100%",
                    maxWidth: 420,
                    padding: "28px 26px",
                    boxShadow: "0 20px 40px rgb(0 0 0 / 0.15)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: 22,
                    }}
                >
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <div
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: 13,
                                background: "rgb(var(--color-ink) / 0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {store.image ? (
                                <img
                                    src={store.image}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 13,
                                    }}
                                />
                            ) : (
                                initials
                            )}
                        </div>
                        <div>
                            <div className="font-display" style={{ fontSize: 18, fontWeight: 700 }}>
                                {store.name}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    fontSize: 13,
                                    opacity: 0.55,
                                    marginTop: 3,
                                }}
                            >
                                <MapPin size={13} />
                                {store.address}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "rgb(var(--color-ink) / 0.06)",
                            borderRadius: 8,
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "rgb(var(--color-ink))",
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "rgb(var(--color-ink) / 0.04)",
                        marginBottom: 20,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <StaticStars value={store.overallRating} size={16} />
                        <span style={{ fontSize: 16, fontWeight: 700 }}>
                            {store.overallRating.toFixed(1)}
                        </span>
                    </div>
                    <span style={{ fontSize: 13, opacity: 0.55 }}>
                        {store.ratingsCount} {store.ratingsCount === 1 ? "rating" : "ratings"}
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                        <User size={15} style={{ opacity: 0.45, flexShrink: 0 }} />
                        <span style={{ opacity: 0.5, minWidth: 60 }}>Owner</span>
                        <span style={{ fontWeight: 600 }}>{store.ownerName}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                        <Mail size={15} style={{ opacity: 0.45, flexShrink: 0 }} />
                        <span style={{ opacity: 0.5, minWidth: 60 }}>Email</span>
                        <span style={{ fontWeight: 600 }}>{store.email}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                        <MapPin size={15} style={{ opacity: 0.45, flexShrink: 0 }} />
                        <span style={{ opacity: 0.5, minWidth: 60 }}>Address</span>
                        <span style={{ fontWeight: 600 }}>{store.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */
const PAGE_SIZE = 6;

export function Stores({ stores = defaultStores }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedStore, setSelectedStore] = useState(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return stores;
        return stores.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q) ||
                s.address.toLowerCase().includes(q)
        );
    }, [stores, query]);

    React.useEffect(() => {
        setPage(1);
    }, [query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
            {/* Title */}
            <div className="font-display" style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
                Stores
            </div>

            {/* Single-line toolbar: count + search + button */}
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
                <div style={{ fontSize: 13.5, opacity: 0.55, whiteSpace: "nowrap" }}>
                    {filtered.length} of {stores.length} registered{" "}
                    {stores.length === 1 ? "store" : "stores"}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flex: 1,
                        justifyContent: "flex-end",
                        minWidth: 280,
                    }}
                >
                    {/* Compact single search */}
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
                            maxWidth: 280,
                        }}
                    >
                        <Search size={15} style={{ opacity: 0.45, flexShrink: 0 }} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search name, email or address"
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

                    {/* Add Store button */}
                    <button
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 7,
                            padding: "9px 16px",
                            borderRadius: 9,
                            border: "none",
                            background: "rgb(var(--color-ink))",
                            color: "rgb(var(--color-bg))",
                            fontSize: 13.5,
                            fontWeight: 600,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                        }}
                    >
                        <Plus size={15} strokeWidth={2.2} />
                        Add Store
                    </button>
                </div>
            </div>

            {/* Table */}
            <div
                style={{
                    border: "1px solid rgb(var(--color-ink) / 0.1)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "rgb(var(--color-bg))",
                }}
            >
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: 13.5,
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    background: "rgb(var(--color-ink) / 0.04)",
                                    borderBottom: "1px solid rgb(var(--color-ink) / 0.08)",
                                }}
                            >
                                {["Name", "Email", "Address", "Rating", "Actions"].map((col) => (
                                    <th
                                        key={col}
                                        style={{
                                            textAlign: "left",
                                            padding: "13px 18px",
                                            fontWeight: 650,
                                            fontSize: 12.5,
                                            opacity: 0.6,
                                            letterSpacing: "0.02em",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: 0 }}>
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
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 12,
                                                    background: "rgb(var(--color-ink) / 0.06)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginBottom: 14,
                                                }}
                                            >
                                                <StoreIcon size={20} style={{ opacity: 0.4 }} />
                                            </div>
                                            <div
                                                className="font-display"
                                                style={{ fontSize: 15, fontWeight: 700 }}
                                            >
                                                {query.trim()
                                                    ? "No stores match your search"
                                                    : "No stores registered yet"}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    opacity: 0.5,
                                                    marginTop: 5,
                                                    maxWidth: 280,
                                                }}
                                            >
                                                {query.trim()
                                                    ? "Try a different name, email or address."
                                                    : "Stores added to the platform will appear here."}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((store, idx) => (
                                    <tr
                                        key={store.id}
                                        style={{
                                            borderBottom:
                                                idx < paginated.length - 1
                                                    ? "1px solid rgb(var(--color-ink) / 0.06)"
                                                    : "none",
                                        }}
                                    >
                                        <td style={{ padding: "14px 18px", fontWeight: 600 }}>
                                            {store.name}
                                        </td>
                                        <td style={{ padding: "14px 18px", opacity: 0.75 }}>
                                            {store.email}
                                        </td>
                                        <td style={{ padding: "14px 18px" }}>
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    opacity: 0.75,
                                                }}
                                            >
                                                <MapPin size={13} style={{ opacity: 0.6 }} />
                                                {store.address}
                                            </div>
                                        </td>
                                        <td style={{ padding: "14px 18px" }}>
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                }}
                                            >
                                                <StaticStars value={store.overallRating} size={13} />
                                                <span style={{ fontWeight: 650 }}>
                                                    {store.overallRating.toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "14px 18px" }}>
                                            <button
                                                onClick={() => setSelectedStore(store)}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    padding: "6px 12px",
                                                    borderRadius: 8,
                                                    border: "1px solid rgb(var(--color-ink) / 0.12)",
                                                    background: "transparent",
                                                    color: "rgb(var(--color-ink))",
                                                    fontSize: 12.5,
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Eye size={13} strokeWidth={2} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filtered.length > PAGE_SIZE && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 18px",
                            borderTop: "1px solid rgb(var(--color-ink) / 0.08)",
                            background: "rgb(var(--color-ink) / 0.02)",
                        }}
                    >
                        <span style={{ fontSize: 13, opacity: 0.5 }}>
                            Page {currentPage} of {totalPages} · {filtered.length} total
                        </span>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage <= 1}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    border: "1px solid rgb(var(--color-ink) / 0.12)",
                                    background: "transparent",
                                    color: "rgb(var(--color-ink))",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                                    opacity: currentPage <= 1 ? 0.35 : 1,
                                }}
                            >
                                <ChevronLeft size={15} />
                                Prev
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage >= totalPages}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    border: "1px solid rgb(var(--color-ink) / 0.12)",
                                    background: "transparent",
                                    color: "rgb(var(--color-ink))",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                                    opacity: currentPage >= totalPages ? 0.35 : 1,
                                }}
                            >
                                Next
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <StoreDetailsModal store={selectedStore} onClose={() => setSelectedStore(null)} />
        </div>
    );
}