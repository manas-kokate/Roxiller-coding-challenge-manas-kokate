import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { api, authApi } from "../api";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/Admin/AdminDashboard";
import { Stores } from "../components/Admin/Stores";
import { Users } from "../components/Admin/Users";
import { Profile } from "../components/Profile";
import { OwnerDashboard } from "../components/Owner/OwnerDashboard";
import { UserDashboard } from "../components/User/UserDashboard";
import { ChangePassword } from "../components/ChangePassword";
import { LoadingOverlay, Toast } from "../components/Feedback";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const session = useMemo(() => JSON.parse(localStorage.getItem("session") || "null"), []);
    const [activeNav, setActiveNav] = useState("dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [data, setData] = useState({ stats: null, stores: [], users: [], owner: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState(() => {
        const stored = sessionStorage.getItem("flashNotice");
        sessionStorage.removeItem("flashNotice");
        return stored ? JSON.parse(stored) : null;
    });
    const request = useCallback((path, options = {}) => api(path, { ...options, token: session?.token }), [session?.token]);

    const load = useCallback(async () => {
        if (!session) return;
        setLoading(true); setError("");
        try {
            if (session.user.role === "admin") {
                const [stats, stores, users] = await Promise.all([request("/admin/dashboard"), request("/admin/stores"), request("/admin/users")]);
                setData({ stats, stores, users, owner: null });
            } else if (session.user.role === "user") {
                setData({ stats: null, users: [], owner: null, stores: await request("/user/stores") });
            } else {
                setData({ stats: null, users: [], stores: [], owner: await request("/owner/dashboard") });
            }
        } catch (err) {
            if (err.status === 401 || err.status === 403) { localStorage.removeItem("session"); window.location.assign("/login"); return; }
            setError(err.message || "Could not load dashboard data.");
        } finally { setLoading(false); }
    }, [navigate, request, session]);

    useEffect(() => { queueMicrotask(load); }, [load]);
    if (!session) return null;
    const runAction = async (action, successMessage) => {
        setBusy(true);
        try { await action(); setNotice({ type: "success", message: successMessage }); return true; }
        catch (err) { setNotice({ type: "error", message: err.message || "Request failed" }); return false; }
        finally { setBusy(false); }
    };
    const logout = async () => { try { await authApi.logout(); } catch { /* local cleanup is sufficient */ } sessionStorage.setItem("flashNotice", JSON.stringify({ type: "success", message: "You’ve been logged out." })); localStorage.removeItem("session"); window.location.assign("/login"); };
    const submitRating = (storeId, rating) => runAction(async () => { await request(`/user/stores/${storeId}/ratings`, { method: "POST", body: { rating } }); await load(); }, "Rating saved.");
    const addUser = (user) => runAction(async () => { await request("/admin/users", { method: "POST", body: user }); await load(); }, "User created.");
    const addStore = (store) => runAction(async () => { await request("/admin/stores", { method: "POST", body: store }); await load(); }, "Store created.");

    let content;
    if (loading) content = <div className="p-10 text-[#1a1408]/60">Loading…</div>;
    else if (error) content = <div className="p-10 text-red-700">{error}</div>;
    else if (session.user.role === "admin") content = activeNav === "stores" ? <Stores stores={data.stores} onCreate={addStore} /> : activeNav === "users" ? <Users initialUsers={data.users} onAdd={addUser} /> : <Dashboard stats={data.stats} />;
    else if (session.user.role === "user") content = activeNav === "profile" ? <Profile user={session.user} /> : activeNav === "change-password" ? <ChangePassword initialEmail={session.user.email} /> : <UserDashboard stores={data.stores} onRate={submitRating} />;
    else content = activeNav === "change-password" ? <ChangePassword initialEmail={session.user.email} /> : <OwnerDashboard storeName="Your stores" ratings={data.owner?.users || []} />;

    return <div className="flex min-h-screen bg-[#f7f5f0] text-[#1a1408]">
        <Sidebar role={session.user.role} activeNav={activeNav} setActiveNav={setActiveNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={logout} user={session.user} />
        <main className="min-h-screen min-w-0 flex-1 overflow-auto bg-[#f7f5f0]"><button type="button" onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-30 rounded-lg bg-[#121213] p-2 text-white shadow-lg md:hidden" aria-label="Open navigation"><Menu size={20} /></button>{content}</main>
        <LoadingOverlay visible={busy} /><Toast notice={notice} onDismiss={() => setNotice(null)} />
    </div>;
}
