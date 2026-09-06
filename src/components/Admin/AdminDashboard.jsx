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
        <div className="max-w-screen bg-[#f7f5f0] px-6 py-8 text-[#1a1408] sm:px-9">
            {/* Header + Quick Actions */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <h1 className="font-display m-0 text-[28px] font-bold tracking-tight text-[#1a1408]">
                        Dashboard
                    </h1>
                    <p className="mt-2 mb-0 text-sm text-[#1a1408]/55">
                        System overview · Last updated just now
                    </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[#1a1408]/10 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-[#1a1408] transition-colors hover:bg-[#1a1408]/5">
                        <UserPlus size={16} strokeWidth={2} />
                        Add User
                    </button>
                    <button className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border-none bg-[#e8a33d] px-4 py-2.5 text-[13.5px] font-semibold text-[#1a1408] transition-opacity hover:opacity-90">
                        <Plus size={16} strokeWidth={2.2} />
                        Add Store
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="flex flex-col gap-4 rounded-2xl border border-[#1a1408]/10 bg-white px-5 py-[22px]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#1a1408]/5">
                                    <Icon size={19} strokeWidth={1.8} className="text-[#1a1408]" />
                                </div>
                                <div
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${card.trend.positive
                                        ? "bg-emerald-500/10 text-emerald-700"
                                        : "bg-red-500/10 text-red-600"
                                        }`}
                                >
                                    <TrendingUp size={12} strokeWidth={2.2} />
                                    {card.trend.value}
                                </div>
                            </div>
                            <div>
                                <div className="font-display text-[32px] font-bold leading-tight tracking-tight text-[#1a1408]">
                                    {card.value.toLocaleString()}
                                </div>
                                <div className="mt-1.5 text-[13px] font-semibold text-[#1a1408]/55">
                                    {card.label}
                                </div>
                                <div className="mt-1 text-xs text-[#1a1408]/40">{card.hint}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Analytics Sections */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Recently Added Stores */}
                <div>
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Store size={16} strokeWidth={2} className="text-[#1a1408]/55" />
                            <span className="text-[15px] font-semibold text-[#1a1408]">
                                Recently Added Stores
                            </span>
                        </div>
                        <span className="text-[12.5px] text-[#1a1408]/40">Last 4</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {RECENT_STORES.map((store) => (
                            <div
                                key={store.id}
                                className="flex flex-col gap-3 rounded-[14px] border border-[#1a1408]/10 bg-white px-4 py-[18px]"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#1a1408]/5">
                                        <Store size={17} strokeWidth={1.8} className="text-[#1a1408]/70" />
                                    </div>
                                    <div className="inline-flex items-center gap-1 rounded-lg bg-[#1a1408]/5 px-2 py-0.5 text-[13px] font-bold text-[#1a1408]">
                                        <Star size={12} fill="currentColor" strokeWidth={0} className="text-[#e8a33d]" />
                                        {store.rating}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 text-[14.5px] font-semibold leading-snug text-[#1a1408]">
                                        {store.name}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-[#1a1408]/45">
                                        <MapPin size={11} />
                                        {store.location}
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-1">
                                    <span className="text-xs text-[#1a1408]/50">{store.owner}</span>
                                    <span className="flex items-center gap-1 text-[11.5px] text-[#1a1408]/35">
                                        <Clock size={10} />
                                        {store.added}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Ratings */}
                <div>
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star size={16} strokeWidth={2} className="text-[#1a1408]/55" />
                            <span className="text-[15px] font-semibold text-[#1a1408]">
                                Recent Ratings
                            </span>
                        </div>
                        <span className="text-[12.5px] text-[#1a1408]/40">Last 4</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {RECENT_RATINGS.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-[14px] border border-[#1a1408]/10 bg-white px-[18px] py-4"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-[13.5px] font-semibold text-[#1a1408]">
                                        {item.user}
                                    </span>
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={13}
                                                fill={i < item.rating ? "currentColor" : "none"}
                                                strokeWidth={i < item.rating ? 0 : 1.5}
                                                className={
                                                    i < item.rating
                                                        ? "text-[#e8a33d]"
                                                        : "text-[#1a1408]/20"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-1.5 text-[12.5px] text-[#1a1408]/50">{item.store}</div>

                                <p className="m-0 text-[13px] italic leading-snug text-[#1a1408]/70">
                                    “{item.comment}”
                                </p>

                                <div className="mt-2.5 flex items-center gap-1 text-[11.5px] text-[#1a1408]/35">
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