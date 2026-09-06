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

function DistributionBar({ star, count, total }) {
    const pct = total ? Math.round((count / total) * 100) : 0;
    return (
        <div className="mb-1.5 flex items-center gap-2.5">
            <div className="w-10 shrink-0 text-xs text-[#1a1408]/60">{star} star</div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1a1408]/10">
                <div
                    className="h-full rounded-full bg-[#e8a33d] transition-all duration-300"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <div className="w-[26px] shrink-0 text-right text-xs text-[#1a1408]/55">
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
        <div className="flex items-start gap-3.5 border-b border-[#1a1408]/10 px-1 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1408]/10 text-[13px] font-bold text-[#1a1408]">
                {initials}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="text-[14.5px] font-bold text-[#1a1408]">{entry.userName}</div>
                    <StarRow value={entry.rating} />
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-[#1a1408]/55">
                    <Mail size={12.5} />
                    {entry.userEmail}
                    <span className="text-[#1a1408]/40">·</span>
                    <Calendar size={12.5} />
                    {entry.submittedAt}
                </div>

                {entry.comment && (
                    <div className="mt-2 flex items-start gap-1.5 text-[13.5px] leading-snug text-[#1a1408]/85">
                        <MessageSquareText
                            size={14}
                            className="mt-0.5 shrink-0 text-[#1a1408]/50"
                        />
                        {entry.comment}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyRatings() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#1a1408]/5">
                <Star size={22} className="text-[#1a1408]/45" />
            </div>
            <div className="font-display text-[15.5px] font-bold text-[#1a1408]">
                No ratings yet
            </div>
            <div className="mt-1.5 max-w-[280px] text-[13px] text-[#1a1408]/55">
                Once customers start rating your store, they'll show up here.
            </div>
        </div>
    );
}

export function OwnerDashboard({ storeName = "Your store", ratings = [] }) {
    const normalizedRatings = ratings.map((rating) => ({
        ...rating,
        id: rating.id || `${rating.storeId}-${rating.userId}`,
        userName: rating.userName || "Customer",
        userEmail: rating.userEmail || "",
        submittedAt: rating.submittedAt || new Date().toISOString(),
    }));
    const stats = useMemo(() => {
        const total = normalizedRatings.length;
        const sum = normalizedRatings.reduce((acc, r) => acc + r.rating, 0);
        const average = total ? sum / total : 0;
        const distribution = [5, 4, 3, 2, 1].map((star) => ({
            star,
            count: normalizedRatings.filter((r) => r.rating === star).length,
        }));
        return { total, average, distribution };
    }, [normalizedRatings]);

    const sortedRatings = useMemo(
        () => [...normalizedRatings].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
        [normalizedRatings]
    );

    return (
        <div className="font-body box-border min-h-screen w-full bg-[#f7f5f0] px-6 py-10 text-[#1a1408] sm:px-12">
            <div className="mb-7">
                <div className="font-display text-2xl font-bold text-[#1a1408]">Dashboard</div>
                <div className="mt-1 text-[13.5px] text-[#1a1408]/55">
                    Ratings overview for {storeName}
                </div>
            </div>

            <div className="flex flex-wrap items-start gap-5">
                {/* Analytics card */}
                <div className="max-w-[340px] min-w-[280px] flex-1 rounded-[14px] border border-[#1a1408]/10 bg-white px-[22px] py-6">
                    <div className="mb-3.5 flex items-center gap-2 text-[12.5px] text-[#1a1408]/55">
                        <UsersIcon size={14} /> Average rating
                    </div>

                    <div className="mb-2 flex items-baseline gap-2.5">
                        <div className="font-display text-[40px] font-bold leading-none text-[#1a1408]">
                            {stats.average.toFixed(1)}
                        </div>
                        <div className="text-[13px] text-[#1a1408]/55">/ 5</div>
                    </div>

                    <StarRow value={stats.average} size={17} />

                    <div className="mt-2 text-[12.5px] text-[#1a1408]/55">
                        Based on {stats.total} {stats.total === 1 ? "rating" : "ratings"}
                    </div>

                    <div className="mt-5 border-t border-[#1a1408]/10 pt-[18px]">
                        {stats.distribution.map((d) => (
                            <DistributionBar
                                key={d.star}
                                star={d.star}
                                count={d.count}
                                total={stats.total}
                            />
                        ))}
                    </div>
                </div>

                {/* Ratings list */}
                <div className="min-w-[280px] flex-[2_1_400px] rounded-[14px] border border-[#1a1408]/10 bg-white px-6 py-[22px]">
                    <div className="mb-1 flex items-center justify-between">
                        <div className="text-[15px] font-bold text-[#1a1408]">Customer ratings</div>
                        <div className="text-[12.5px] text-[#1a1408]/55">{stats.total} total</div>
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
