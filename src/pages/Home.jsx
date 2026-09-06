import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Home() {
    const [isDark, setIsDark] = useState(true);

    const theme = {
        bg: isDark ? "#121213" : "#f7f5f0",
        text: isDark ? "#f5f3ef" : "#1a1408",
        muted: isDark ? "rgba(245,243,239,0.6)" : "rgba(26,20,8,0.55)",
        faint: isDark ? "rgba(245,243,239,0.4)" : "rgba(26,20,8,0.4)",
        border: isDark ? "rgba(245,243,239,0.1)" : "rgba(26,20,8,0.1)",
        card: isDark ? "#1a1a1c" : "#ffffff",
        trackStrokeSoft: isDark ? "rgba(245,243,239,0.05)" : "rgba(26,20,8,0.05)",
        trackStroke: isDark ? "rgba(245,243,239,0.14)" : "rgba(26,20,8,0.14)",
        avatarBorder: isDark ? "#121213" : "#f7f5f0",
        bubbleBg: isDark ? "#f5f3ef" : "#1a1408",
        bubbleText: isDark ? "#1a1408" : "#f5f3ef",
    };

    const avatars = [
        { delay: "0s", img: "/pfp1.png", rating: "4.9" },
        { delay: "-2.44s", img: "/pfp2.png", rating: "5.0" },
        { delay: "-4.89s", img: "/pfp3.png", rating: "4.7" },
        { delay: "-7.33s", img: "/pfp4.png", rating: "4.8" },
        { delay: "-9.78s", img: "/pfp5.png", rating: "5.0" },
        { delay: "-12.22s", img: "/pfp1.png", rating: "4.6" },
        { delay: "-14.67s", img: "/pfp2.png", rating: "4.9" },
        { delay: "-17.11s", img: "/pfp3.png", rating: "5.0" },
        { delay: "-19.56s", img: "/pfp4.png", rating: "4.8" },
    ];

    return (
        <div
            className="antialiased transition-colors duration-300 w-full min-h-screen overflow-x-hidden"
            style={{ background: theme.bg, color: theme.text }}
        >
            <style>{`
                .vg-avatar-node {
                    offset-path: path("M 210,20 L 570,20 A 170,170 0 0 1 570,360 L 210,360 A 170,170 0 0 1 210,20 Z");
                    offset-anchor: 50% 50%;
                    offset-rotate: 0deg;
                    animation: vg-travel-clockwise 22s linear infinite;
                }
                @keyframes vg-travel-clockwise {
                    from { offset-distance: 0%; }
                    to { offset-distance: 100%; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .vg-avatar-node { animation: none; }
                }
            `}</style>

            {/* NAV */}
            <div className="max-w-screen sm:px-6 md:px-10 lg:px-14">
                <nav
                    className="flex items-center justify-between py-4 sm:py-5 md:py-6 border-b"
                    style={{ borderColor: theme.border }}
                >
                    <div className="flex items-center gap-2 sm:gap-2.5 text-[15px] sm:text-[17px] font-bold font-body">
                        <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-[9px] bg-[#e8a33d] text-[#1a1408] flex items-center justify-center font-display font-semibold text-[14px] sm:text-[15px] flex-shrink-0">
                            V
                        </div>
                        Vantage
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-4 font-body">
                        <button
                            onClick={() => setIsDark((v) => !v)}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[9px] flex items-center justify-center transition-colors"
                            style={{
                                background: isDark ? "rgba(245,243,239,0.08)" : "rgba(26,20,8,0.06)",
                                color: theme.text,
                            }}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <a
                            href="#"
                            className="hidden md:inline font-semibold text-sm transition-colors"
                            style={{ color: theme.muted }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
                        >
                            Log in
                        </a>
                        <a
                            href="#"
                            className="hidden md:inline text-sm font-bold px-5 py-2.5 rounded-[9px] bg-[#e8a33d] text-[#1a1408]"
                        >
                            Get started
                        </a>
                    </div>
                </nav>
            </div>

            {/* HERO */}
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center py-10 sm:py-14 md:py-24">
                    <div>
                        <h1 className="font-display font-medium text-[28px] sm:text-[36px] md:text-[48px] lg:text-[52px] leading-[1.1] mb-4 sm:mb-5 max-w-[480px] tracking-tight">
                            Every store has a reputation. Vantage makes it honest.
                        </h1>
                        <p
                            className="font-body text-[14.5px] sm:text-[16px] md:text-[16.5px] leading-relaxed max-w-[420px] mb-6 sm:mb-8"
                            style={{ color: theme.muted }}
                        >
                            Shoppers rate the stores they visit, owners see exactly how they're perceived, and
                            everyone gets a clearer picture before they walk through the door.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 sm:mb-12 font-body">
                            <a
                                href="#"
                                className="text-sm font-bold px-4 sm:px-5 py-2.5 rounded-[9px] bg-[#e8a33d] text-[#1a1408]"
                            >
                                Get started
                            </a>

                            <a
                                href="#"
                                className="md:hidden font-semibold text-sm px-4 py-2.5 rounded-[9px] border transition-colors"
                                style={{
                                    color: theme.text,
                                    borderColor: theme.border,
                                }}
                            >
                                Log in
                            </a>
                            <a
                                href="#visual"
                                className="hidden md:inline font-semibold text-sm transition-colors"
                                style={{ color: theme.muted }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
                            >
                                See how ratings work
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3.5 font-body max-w-md">
                            {[
                                { value: "12.4k", label: "Ratings submitted" },
                                { value: "4.6", label: "Average store rating" },
                                { value: "830+", label: "Stores listed" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl px-2.5 sm:px-[18px] py-3 sm:py-4 border"
                                    style={{
                                        background: theme.card,
                                        borderColor: theme.border,
                                    }}
                                >
                                    <div className="font-display font-medium text-base sm:text-2xl">
                                        {stat.value}
                                    </div>
                                    <div
                                        className="text-[10px] sm:text-xs mt-1 leading-tight"
                                        style={{ color: theme.faint }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Avatar track — hidden on mobile */}
                    <div
                        className="relative w-full h-[420px] overflow-visible hidden md:block"
                        id="visual"
                    >
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-[740px] h-[380px] scale-100 origin-left"
                            style={{ left: "22%" }}
                        >
                            <svg className="absolute inset-0 overflow-visible" viewBox="0 0 740 380">
                                <rect
                                    x="40"
                                    y="20"
                                    width="700"
                                    height="340"
                                    rx="170"
                                    ry="170"
                                    fill="none"
                                    stroke={theme.trackStrokeSoft}
                                    strokeWidth="84"
                                />
                                <rect
                                    x="40"
                                    y="20"
                                    width="700"
                                    height="340"
                                    rx="170"
                                    ry="170"
                                    fill="none"
                                    stroke={theme.trackStroke}
                                    strokeWidth="1.5"
                                />
                            </svg>

                            <div
                                className="absolute left-[210px] top-1/2 -translate-y-1/2 w-[300px] text-center text-[13.5px] leading-relaxed font-body"
                                style={{ color: theme.faint }}
                            >
                                Real customers, rating real stores — one at a time.
                            </div>

                            {avatars.map((n, i) => (
                                <div
                                    key={i}
                                    className="vg-avatar-node absolute top-0 left-0 w-[60px] h-[60px]"
                                    style={{ animationDelay: n.delay }}
                                >
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-[9px] flex items-center gap-1 text-xs font-bold whitespace-nowrap font-body"
                                        style={{
                                            bottom: "calc(100% + 13px)",
                                            background: theme.bubbleBg,
                                            color: theme.bubbleText,
                                        }}
                                    >
                                        ★ {n.rating}
                                        <span
                                            className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent"
                                            style={{ borderTopColor: theme.bubbleBg }}
                                        />
                                    </div>
                                    <img
                                        src={n.img}
                                        alt=""
                                        className="block w-full h-full rounded-full object-cover border-[3px]"
                                        style={{
                                            borderColor: theme.avatarBorder,
                                            boxShadow: `0 0 0 1px ${theme.border}`,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* FOOTER */}
            <footer className="w-full border-t pt-10 sm:pt-14 pb-6 sm:pb-7" style={{ borderColor: theme.border }}>
                <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pb-8 sm:pb-11 font-body">
                        <div>
                            <div className="flex items-center gap-2.5 text-[16px] sm:text-[17px] font-bold">
                                <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-[9px] bg-[#e8a33d] text-[#1a1408] flex items-center justify-center font-display font-semibold text-[14px] sm:text-[15px] flex-shrink-0">
                                    V
                                </div>
                                Vantage
                            </div>
                            <p
                                className="text-[13px] sm:text-[13.5px] leading-relaxed max-w-[280px] mt-3.5"
                                style={{ color: theme.muted }}
                            >
                                A store ratings platform connecting honest customer feedback with the people
                                running the shop.
                            </p>
                        </div>

                        <div className="sm:text-right">
                            <h4
                                className="text-[12.5px] mb-3 sm:mb-4 font-semibold"
                                style={{ color: theme.faint }}
                            >
                                Get in touch
                            </h4>
                            <a
                                href="mailto:hello@vantage.app"
                                className="block text-[13px] sm:text-[13.5px] mb-2.5 transition-colors"
                                style={{ color: theme.muted }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
                            >
                                hello@vantage.app
                            </a>
                            <a
                                href="#"
                                className="block text-[13px] sm:text-[13.5px] mb-2.5 transition-colors"
                                style={{ color: theme.muted }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
                            >
                                +1 (000) 000-0000
                            </a>
                            <a
                                href="#"
                                className="block text-[13px] sm:text-[13.5px] mb-2.5 transition-colors"
                                style={{ color: theme.muted }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
                            >
                                123 Market Street, Your City
                            </a>
                        </div>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 sm:pt-6 border-t text-[12px] sm:text-[12.5px] font-body"
                        style={{ borderColor: theme.border, color: theme.faint }}
                    >
                        <div>© 2026 Vantage. All rights reserved.</div>
                        <div className="flex gap-4">
                            {["Twitter", "LinkedIn", "Instagram"].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="transition-colors"
                                    style={{ color: theme.faint }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = theme.muted)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = theme.faint)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}