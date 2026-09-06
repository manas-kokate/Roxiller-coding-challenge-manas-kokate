import { useEffect } from "react";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";

export function LoadingOverlay({ visible, label = "Working…" }) {
    if (!visible) return null;
    return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#121213]/45 p-4" aria-live="polite" aria-busy="true">
        <div className="flex min-w-44 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#121213] px-7 py-6 text-sm font-semibold text-[#f5f3ef] shadow-2xl">
            <div className="relative grid h-12 w-12 place-items-center"><div className="absolute inset-0 animate-ping rounded-full bg-[#e8a33d]/25" /><div className="absolute inset-1 animate-spin rounded-full border-2 border-[#e8a33d]/25 border-t-[#e8a33d]" /><LoaderCircle size={17} className="text-[#e8a33d]" /></div>
            {label}
        </div>
    </div>;
}

export function Toast({ notice, onDismiss }) {
    useEffect(() => {
        if (!notice) return undefined;
        const timer = window.setTimeout(onDismiss, 4000);
        return () => window.clearTimeout(timer);
    }, [notice, onDismiss]);
    if (!notice) return null;
    const success = notice.type !== "error";
    return <div className="fixed right-4 top-4 z-[110] flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-xl border border-[#1a1408]/10 bg-white px-4 py-3 text-sm font-semibold text-[#1a1408] shadow-xl" role="status">
        {success ? <CheckCircle2 size={18} className="shrink-0 text-emerald-600" /> : <XCircle size={18} className="shrink-0 text-red-600" />}
        <span>{notice.message}</span>
        <button type="button" onClick={onDismiss} className="ml-2 text-[#1a1408]/50 hover:text-[#1a1408]" aria-label="Dismiss notification">×</button>
    </div>;
}
