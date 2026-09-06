const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export async function api(path, { method = "GET", body, token } = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new ApiError(data.message || "Request failed", response.status);
    return data;
}

export const authApi = {
    login: (body) => api("/auth/login", { method: "POST", body }),
    signup: (body) => api("/auth/signup", { method: "POST", body }),
    sendOtp: (body) => api("/auth/send-otp", { method: "POST", body }),
    resetPassword: (body) => api("/auth/reset-password", { method: "POST", body }),
    logout: () => api("/auth/logout", { method: "POST" }),
};
