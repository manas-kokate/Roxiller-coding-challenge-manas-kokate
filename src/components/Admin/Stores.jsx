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
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    size={size}
                    fill={n <= Math.round(value) ? "#e8a33d" : "none"}
                    className="text-[#e8a33d]"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[420px] rounded-2xl border border-[#1a1408]/10 bg-white p-7 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[13px] bg-[#1a1408]/5 text-base font-bold text-[#1a1408]">
                            {store.image ? (
                                <img
                                    src={store.image}
                                    alt=""
                                    className="h-full w-full rounded-[13px] object-cover"
                                />
                            ) : (
                                initials
                            )}
                        </div>
                        <div>
                            <div className="font-display text-lg font-bold text-[#1a1408]">
                                {store.name}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-[13px] text-[#1a1408]/55">
                                <MapPin size={13} />
                                {store.address}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-[#1a1408]/5 text-[#1a1408]"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="mb-5 flex items-center justify-between rounded-[10px] bg-[#1a1408]/5 px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                        <StaticStars value={Number(store.overallRating ?? store.rating ?? 0)} size={16} />
                        <span className="text-base font-bold text-[#1a1408]">
                            {Number(store.overallRating ?? store.rating ?? 0).toFixed(1)}
                        </span>
                    </div>
                    <span className="text-[13px] text-[#1a1408]/55">
                        {store.ratingsCount ?? "No"} {store.ratingsCount === 1 ? "rating" : "ratings"}
                    </span>
                </div>

                <div className="flex flex-col gap-3.5">
                    <div className="flex items-center gap-2.5 text-sm text-[#1a1408]">
                        <User size={15} className="shrink-0 text-[#1a1408]/45" />
                        <span className="min-w-[60px] text-[#1a1408]/50">Owner</span>
                        <span className="font-semibold">{store.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[#1a1408]">
                        <Mail size={15} className="shrink-0 text-[#1a1408]/45" />
                        <span className="min-w-[60px] text-[#1a1408]/50">Email</span>
                        <span className="font-semibold">{store.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[#1a1408]">
                        <MapPin size={15} className="shrink-0 text-[#1a1408]/45" />
                        <span className="min-w-[60px] text-[#1a1408]/50">Address</span>
                        <span className="font-semibold">{store.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */
function AddStoreModal({ open, onClose, onCreate }) {
    const [form, setForm] = useState({ name: "", email: "", address: "", owner_id: "" });
    const [error, setError] = useState("");
    if (!open) return null;
    const submit = async (event) => {
        event.preventDefault(); setError("");
        if (!form.name.trim() || !form.email.trim()) { setError("Store name and email are required."); return; }
        const saved = await onCreate({ name: form.name.trim(), email: form.email.trim(), address: form.address.trim(), owner_id: form.owner_id ? Number(form.owner_id) : undefined });
        if (saved) { setForm({ name: "", email: "", address: "", owner_id: "" }); onClose(); }
    };
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onMouseDown={onClose}>
        <form className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-7" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between gap-3"><div><h2 className="font-display text-xl font-bold">Add store</h2><p className="mt-1 text-sm text-[#1a1408]/55">Owner ID is optional and must refer to an owner account.</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-[#1a1408]/5" aria-label="Close"><X size={18} /></button></div>
            <div className="space-y-4">{[["name", "Store name", "GreenLeaf Organics", "text"], ["email", "Store email", "hello@example.com", "email"], ["address", "Address", "Mumbai", "text"], ["owner_id", "Owner user ID (optional)", "e.g. 12", "number"]].map(([key, label, placeholder, type]) => <label key={key} className="block text-sm font-semibold text-[#1a1408]/70">{label}<input required={key === "name" || key === "email"} type={type} min={key === "owner_id" ? 1 : undefined} value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} className="mt-1.5 box-border w-full rounded-lg border border-[#1a1408]/15 bg-[#1a1408]/[0.02] px-3 py-2.5 font-normal outline-none focus:border-[#a56813]" /></label>)}</div>
            {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-[#1a1408]/5">Cancel</button><button type="submit" className="rounded-lg bg-[#e8a33d] px-4 py-2.5 text-sm font-bold text-[#1a1408]">Create store</button></div>
        </form>
    </div>;
}

const PAGE_SIZE = 6;

export function Stores({ stores = [], onCreate = async () => false }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

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
        <div className="font-body box-border min-h-screen w-full bg-[#f7f5f0] px-6 py-9 text-[#1a1408] sm:px-10">
            {/* Title */}
            <div className="font-display mb-5 text-[26px] font-bold text-[#1a1408]">Stores</div>

            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="whitespace-nowrap text-[13.5px] text-[#1a1408]/55">
                    {filtered.length} of {stores.length} registered{" "}
                    {stores.length === 1 ? "store" : "stores"}
                </div>

                <div className="flex w-full min-w-0 flex-1 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-end">
                    <div className="flex w-full max-w-[280px] items-center gap-2 rounded-[9px] border border-[#1a1408]/10 bg-white px-3 py-2">
                        <Search size={15} className="shrink-0 text-[#1a1408]/45" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search name, email or address"
                            className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-[#1a1408] outline-none placeholder:text-[#1a1408]/40"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="flex cursor-pointer border-none bg-transparent p-0 text-[#1a1408]/45"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <button onClick={() => setShowAdd(true)} className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[9px] border-none bg-[#e8a33d] px-4 py-2.5 text-[13.5px] font-semibold text-[#1a1408] transition-opacity hover:opacity-90">
                        <Plus size={15} strokeWidth={2.2} />
                        Add Store
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-[14px] border border-[#1a1408]/10 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[13.5px]">
                        <thead>
                            <tr className="border-b border-[#1a1408]/10 bg-[#1a1408]/5">
                                {["Name", "Email", "Address", "Rating", "Actions"].map((col) => (
                                    <th
                                        key={col}
                                        className="whitespace-nowrap px-[18px] py-3 text-left text-[12.5px] font-semibold tracking-wide text-[#1a1408]/60"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-0">
                                        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                                            <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1408]/5">
                                                <StoreIcon size={20} className="text-[#1a1408]/40" />
                                            </div>
                                            <div className="font-display text-[15px] font-bold text-[#1a1408]">
                                                {query.trim()
                                                    ? "No stores match your search"
                                                    : "No stores registered yet"}
                                            </div>
                                            <div className="mt-1.5 max-w-[280px] text-[13px] text-[#1a1408]/50">
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
                                        className={
                                            idx < paginated.length - 1
                                                ? "border-b border-[#1a1408]/5"
                                                : ""
                                        }
                                    >
                                        <td className="px-[18px] py-3.5 font-semibold text-[#1a1408]">
                                            {store.name}
                                        </td>
                                        <td className="px-[18px] py-3.5 text-[#1a1408]/75">
                                            {store.email}
                                        </td>
                                        <td className="px-[18px] py-3.5">
                                            <div className="inline-flex items-center gap-1.5 text-[#1a1408]/75">
                                                <MapPin size={13} className="text-[#1a1408]/50" />
                                                {store.address}
                                            </div>
                                        </td>
                                        <td className="px-[18px] py-3.5">
                                            <div className="inline-flex items-center gap-2">
                                                <StaticStars value={Number(store.overallRating ?? store.rating ?? 0)} size={13} />
                                                <span className="font-semibold text-[#1a1408]">
                                                {Number(store.overallRating ?? store.rating ?? 0).toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-[18px] py-3.5">
                                            <button
                                                onClick={() => setSelectedStore(store)}
                                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#1a1408]/10 bg-transparent px-3 py-1.5 text-[12.5px] font-semibold text-[#1a1408] transition-colors hover:bg-[#1a1408]/5"
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
                    <div className="flex items-center justify-between border-t border-[#1a1408]/10 bg-[#1a1408]/5 px-[18px] py-3">
                        <span className="text-[13px] text-[#1a1408]/50">
                            Page {currentPage} of {totalPages} · {filtered.length} total
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage <= 1}
                                className={`inline-flex items-center gap-1 rounded-lg border border-[#1a1408]/10 bg-transparent px-3 py-1.5 text-[13px] font-semibold text-[#1a1408] ${currentPage <= 1
                                        ? "cursor-not-allowed opacity-35"
                                        : "cursor-pointer hover:bg-[#1a1408]/5"
                                    }`}
                            >
                                <ChevronLeft size={15} />
                                Prev
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage >= totalPages}
                                className={`inline-flex items-center gap-1 rounded-lg border border-[#1a1408]/10 bg-transparent px-3 py-1.5 text-[13px] font-semibold text-[#1a1408] ${currentPage >= totalPages
                                        ? "cursor-not-allowed opacity-35"
                                        : "cursor-pointer hover:bg-[#1a1408]/5"
                                    }`}
                            >
                                Next
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <StoreDetailsModal store={selectedStore} onClose={() => setSelectedStore(null)} />
            <AddStoreModal open={showAdd} onClose={() => setShowAdd(false)} onCreate={onCreate} />
        </div>
    );
}
