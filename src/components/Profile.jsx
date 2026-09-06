import React, { useState } from "react";
import { UserCircle, Mail, MapPin, Pencil, Check, X } from "lucide-react";

// Swap this for real session/user data once auth is wired up.
const CURRENT_USER = {
    name: "Dana Whitfield",
    email: "dana.whitfield@example.com",
    address: "214 Birchwood Lane, Austin, TX",
    role: "Normal user",
};

function Field({ icon: Icon, label, value, editing, draft, onChange }) {
    return (
        <div className="flex items-start gap-3 border-b border-[#1a1408]/10 px-1 py-3.5">
            <div className="mt-0.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#e8a33d]/15">
                <Icon size={16} className="text-[#e8a33d]" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="mb-1 text-[11.5px] text-[#1a1408]/50">{label}</div>
                {editing ? (
                    <input
                        value={draft}
                        onChange={(e) => onChange(e.target.value)}
                        className="box-border w-full rounded-md border border-[#1a1408]/15 bg-[#1a1408]/5 px-2.5 py-1.5 font-['Manrope',sans-serif] text-[14.5px] font-semibold text-[#1a1408] outline-none focus:border-[#e8a33d]/60"
                    />
                ) : (
                    <div className="truncate text-[14.5px] font-semibold text-[#1a1408]">
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
}

export function Profile({ user = { name: "", email: "", address: "", role: "" }, onSave = () => { } }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
    });

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    const startEdit = () => {
        setDraft({ name: user.name, email: user.email, address: user.address });
        setEditing(true);
    };

    const cancelEdit = () => setEditing(false);

    const confirmEdit = () => {
        onSave(draft);
        setEditing(false);
    };

    return (
        <div className="font-body box-border flex min-h-screen w-full flex-col bg-[#f7f5f0] px-6 py-10 text-[#1a1408] sm:px-12">
            {/* Page header */}
            <div className="mb-7">
                <div className="font-display text-2xl font-bold text-[#1a1408]">Profile</div>
                <div className="mt-1 text-[13.5px] text-[#1a1408]/55">Your account details</div>
            </div>

            {/* Content area */}
            <div className="flex flex-1 flex-wrap items-start gap-6">
                {/* Left: identity summary card */}
                <div className="flex max-w-[300px] min-w-[260px] flex-1 flex-col items-center rounded-[14px] border border-[#1a1408]/10 bg-white px-[22px] py-7 text-center">
                    <div className="mb-3.5 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#1a1408]/10 text-[26px] font-bold text-[#1a1408]">
                        {initials}
                    </div>
                    <div className="font-display text-lg font-bold leading-snug text-[#1a1408]">
                        {user.name}
                    </div>
                    <div className="mt-1.5 rounded-md bg-[#1a1408]/5 px-2.5 py-1 text-[12.5px] text-[#1a1408]/60">
                        {user.role}
                    </div>
                </div>

                {/* Right: editable fields card */}
                <div className="min-w-[280px] flex-[3_1_420px] rounded-[14px] border border-[#1a1408]/10 bg-white px-[26px] py-6">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="text-[15px] font-bold text-[#1a1408]">Account details</div>

                        {!editing ? (
                            <button
                                onClick={startEdit}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg border-none bg-[#e8a33d] px-3.5 py-2 font-['Manrope',sans-serif] text-[13px] font-semibold text-[#1a1408] transition-opacity hover:opacity-90"
                            >
                                <Pencil size={14} /> Edit
                            </button>
                        ) : (
                            <div className="flex gap-1.5">
                                <button
                                    onClick={confirmEdit}
                                    title="Save changes"
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-[#e8a33d] text-[#1a1408]"
                                >
                                    <Check size={15} />
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    title="Cancel"
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#1a1408]/15 bg-transparent text-[#1a1408]"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        )}
                    </div>

                    <Field
                        icon={UserCircle}
                        label="Full name"
                        value={user.name}
                        editing={editing}
                        draft={draft.name}
                        onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
                    />
                    <Field
                        icon={Mail}
                        label="Email"
                        value={user.email}
                        editing={editing}
                        draft={draft.email}
                        onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                    />
                    <Field
                        icon={MapPin}
                        label="Address"
                        value={user.address}
                        editing={editing}
                        draft={draft.address}
                        onChange={(v) => setDraft((d) => ({ ...d, address: v }))}
                    />
                </div>
            </div>
        </div>
    );
}
