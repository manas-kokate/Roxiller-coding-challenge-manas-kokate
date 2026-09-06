import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/Admin/AdminDashboard";
import { Stores } from "../components/Admin/Stores";
import { Users } from "../components/Admin/Users";
import { Profile } from "../components/Profile";
import { OwnerDashboard } from "../components/Owner/OwnerDashboard";
import { UserDashboard } from "../components/User/UserDashboard";
import { ChangePassword } from "../components/ChangePassword";

const AdminLayout = () => {
    const [role, setRole] = useState("owner");
    const [activeNav, setActiveNav] = useState("dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);

    const ratings = [
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
            comment: "",
            submittedAt: "2026-08-22",
        },
    ];

    const stores = [
        {
            id: "store-1",
            name: "Whitfield Hardware",
            email: "contact@whitfieldhardware.com",
            ownerName: "Dana Whitfield",
            image: "",
            address: "214 Birchwood Lane, Austin, TX",
            lat: 30.2672,
            lng: -97.7431,
            overallRating: 4.3,
            ratingsCount: 4,
            userRating: null,
        },
        {
            id: "store-2",
            name: "Kalra Grocers",
            email: "hello@kalragrocers.com",
            ownerName: "Priya Kalra",
            image: "",
            address: "88 Elm Street, Portland, OR",
            lat: 45.5152,
            lng: -122.6784,
            overallRating: 4.7,
            ratingsCount: 12,
            userRating: 5,
        },
        {
            id: "store-3",
            name: "Ihejirika Electronics",
            email: "support@ihejirikaelectronics.com",
            ownerName: "Marcus Ihejirika",
            image: "",
            address: "5 Market Row, Chicago, IL",
            lat: 41.8781,
            lng: -87.6298,
            overallRating: 3.6,
            ratingsCount: 7,
            userRating: null,
        },
        {
            id: "store-4",
            name: "Farrell's Bakery",
            email: "orders@farrellsbakery.com",
            ownerName: "Owen Farrell",
            image: "",
            address: "40 Willow Ave, Denver, CO",
            lat: 39.7392,
            lng: -104.9903,
            overallRating: 4.9,
            ratingsCount: 21,
            userRating: 4,
        },
    ];

    const handleLogout = () => {
        console.log("Logout clicked – replace with real auth later");
    };

    const renderContent = () => {
        if (role === "admin") {
            switch (activeNav) {
                case "dashboard":
                    return <Dashboard />;
                case "stores":
                    return <Stores stores={stores} />;
                case "users":
                    return <Users />;
                default:
                    return <Dashboard />;
            }
        }

        if (role === "user") {
            switch (activeNav) {
                case "dashboard":
                    return <UserDashboard onChange={(stores) => console.log("stores updated", stores)} />;
                case "profile":
                    return <Profile onSave={(updated) => console.log("save", updated)} />;
                case "change-password":
                    return <ChangePassword />;
                default:
                    return <UserDashboard />;
            }
        }

        if (role === "owner") {
            switch (activeNav) {
                case "dashboard":
                    return <OwnerDashboard storeName="Whitfield Hardware" ratings={ratings} />;
                case "change-password":
                    return <ChangePassword />;
                default:
                    return <OwnerDashboard storeName="Whitfield Hardware" ratings={ratings} />;
            }
        }

        return (
            <div className="p-10 text-[#1a1408]/60">
                Content for role: <strong className="text-[#1a1408]">{role}</strong> / nav:{" "}
                <strong className="text-[#1a1408]">{activeNav}</strong>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#f7f5f0] text-[#1a1408]">
            <Sidebar
                role={role}
                setRole={setRole}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                onLogout={handleLogout}
                isAdmin={true}
            />

            <main className="min-h-screen flex-1 overflow-auto bg-[#f7f5f0]">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminLayout;