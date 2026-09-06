import {
    LayoutDashboard,
    Store,
    Users,
    UserCircle,
    LogOut,
    LockOpen,
} from "lucide-react";

const NAV = {
    admin: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "stores", label: "Stores", icon: Store },
        { id: "users", label: "Users", icon: Users },
    ],
    user: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "profile", label: "Profile", icon: UserCircle },
        { id: "change-password", label: "Change Password", icon: LockOpen },
    ],
    owner: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "change-password", label: "Change Password", icon: LockOpen },
    ],
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
    user,
}) {
    const person = user ? { name: user.name, label: role === "user" ? "Normal user" : role === "owner" ? "Store owner" : "Admin" } : ROLE_META[role];

    return (
        <>
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="vg-scrim fixed inset-0 z-[39] bg-black/40"
                />
            )}

            <aside className={`vg-sidebar font-body fixed inset-y-0 left-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/10 bg-[#121213] px-3.5 py-5 text-[#f5f3ef] transition-transform duration-200 md:sticky md:top-0 md:z-auto md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-2 pb-5 pt-1">
                    <div className="font-display flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#e8a33d] text-[17px] font-bold text-[#1a1408]">
                        V
                    </div>
                    <div className="overflow-hidden">
                        <div className="font-display text-[17px] font-bold leading-tight">
                            Vantage
                        </div>
                        <div className="mt-px whitespace-nowrap text-[11px] text-white/40">
                            Store ratings platform
                        </div>
                    </div>
                    <button
                        className="vg-mobile-only ml-auto cursor-pointer border-none bg-transparent text-[#f5f3ef] opacity-70"
                        onClick={() => setMobileOpen(false)}
                    />
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-0.5">
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
                                className={`vg-nav-item flex cursor-pointer items-center gap-2.5 rounded-lg border-none px-3 py-2.5 text-left font-['Manrope',sans-serif] text-sm font-semibold transition-colors duration-150 ${active
                                        ? "bg-[#f5f3ef] text-[#121213]"
                                        : "bg-transparent text-white/60 hover:bg-white/5 hover:text-[#f5f3ef]"
                                    }`}
                            >
                                <Icon size={17} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="flex-grow" />

                {/* User card + logout */}
                <div className="border-t border-white/10 pt-3.5">
                    <div className="mb-2.5 flex items-center gap-2.5 px-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold">
                            {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                        <div className="overflow-hidden">
                            <div className="truncate text-[13.5px] font-semibold">
                                {person.name}
                            </div>
                            <div className="text-xs text-white/40">{person.label}</div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="vg-logout flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-none bg-transparent px-3 py-2.5 font-['Manrope',sans-serif] text-sm font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-[#f5f3ef]"
                    >
                        <LogOut size={17} /> Log out
                    </button>
                </div>
            </aside>
        </>
    );
}
