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
        <div className="flex gap-0.5">
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

function StarPicker({ initialValue, onSubmit, onCancel }) {
    const [value, setValue] = useState(initialValue || 0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => {
                    const filled = n <= (hover || value);
                    return (
                        <button
                            key={n}
                            onClick={() => setValue(n)}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            className="cursor-pointer border-none bg-transparent p-0.5 leading-none"
                        >
                            <Star
                                size={19}
                                fill={filled ? "#e8a33d" : "none"}
                                className="text-[#e8a33d]"
                            />
                        </button>
                    );
                })}
            </div>
            <button
                onClick={() => value > 0 && onSubmit(value)}
                disabled={value === 0}
                title="Save rating"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-none bg-[#e8a33d] text-[#1a1408] ${value === 0 ? "cursor-default opacity-40" : "cursor-pointer"
                    }`}
            >
                <Check size={14} />
            </button>
            <button
                onClick={onCancel}
                title="Cancel"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#1a1408]/15 bg-transparent text-[#1a1408]"
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
        <div className="grid grid-cols-1 items-center gap-5 border-b border-[#1a1408]/10 px-5 py-[18px] md:grid-cols-[minmax(220px,2fr)_minmax(140px,1fr)_minmax(180px,1.2fr)]">
            {/* Store Name + Address */}
            <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] bg-[#1a1408]/10 text-[13.5px] font-bold text-[#1a1408]">
                    {initials}
                </div>
                <div className="min-w-0">
                    <div className="truncate text-[14.5px] font-bold text-[#1a1408]">
                        {store.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-[#1a1408]/50">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{store.address}</span>
                    </div>
                </div>
            </div>

            {/* Overall Rating */}
            <div>
                <div className="mb-1 text-[11px] font-medium text-[#1a1408]/45">
                    Overall rating
                </div>
                <div className="flex items-center gap-1.5">
                    <StaticStars value={store.overallRating} size={14} />
                    <span className="text-[13.5px] font-bold text-[#1a1408]">
                        {store.overallRating.toFixed(1)}
                    </span>
                </div>
                <div className="mt-0.5 text-[11.5px] text-[#1a1408]/45">
                    {store.ratingsCount} {store.ratingsCount === 1 ? "rating" : "ratings"}
                </div>
            </div>

            {/* User's Rating / Actions */}
            <div>
                <div className="mb-1 text-[11px] font-medium text-[#1a1408]/45">
                    Your rating
                </div>

                {picking ? (
                    <StarPicker
                        initialValue={store.userRating || 0}
                        onSubmit={handleSubmit}
                        onCancel={() => setPicking(false)}
                    />
                ) : store.userRating ? (
                    <div className="flex items-center gap-3">
                        <StaticStars value={store.userRating} size={14} />
                        <button
                            onClick={() => setPicking(true)}
                            className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[12.5px] font-semibold text-[#1a1408]/60 hover:text-[#1a1408]"
                        >
                            <Pencil size={12.5} />
                            Modify
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setPicking(true)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#1a1408]/15 bg-transparent px-3 py-1.5 text-[12.5px] font-semibold text-[#1a1408] transition-colors hover:bg-[#1a1408]/5"
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
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#1a1408]/5">
                <StoreIcon size={22} className="text-[#1a1408]/40" />
            </div>
            <div className="font-display text-[15.5px] font-bold text-[#1a1408]">
                {hasQuery ? "No stores match your search" : "No stores registered yet"}
            </div>
            <div className="mt-1.5 max-w-[280px] text-[13px] text-[#1a1408]/50">
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
        <div className="font-body box-border min-h-screen w-full bg-[#f7f5f0] px-6 py-9 text-[#1a1408] sm:px-10">
            {/* Header */}
            <div className="mb-2">
                <div className="font-display text-[26px] font-bold text-[#1a1408]">Stores</div>
            </div>

            {/* Toolbar: count + search */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[13.5px] text-[#1a1408]/55">
                    {filtered.length} of {stores.length} registered{" "}
                    {stores.length === 1 ? "store" : "stores"}
                </div>

                <div className="flex w-full max-w-[300px] items-center gap-2 rounded-[9px] border border-[#1a1408]/10 bg-white px-3 py-2">
                    <Search size={15} className="shrink-0 text-[#1a1408]/45" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or address"
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
            </div>

            {/* Stores List */}
            <div className="overflow-hidden rounded-[14px] border border-[#1a1408]/10 bg-white">
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