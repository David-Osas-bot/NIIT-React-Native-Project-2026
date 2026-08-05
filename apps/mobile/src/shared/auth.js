import { apiRequest } from "./api";
import { setToken, clearToken } from "./authToken";

export async function login(email, password) {
    const data = await apiRequest("/auth/login", {
        method: "POST",
        data: {
            email,
            password,
        },
    });

    if (data.token) {
        await setToken(data.token);
    }

    return data;
}

export async function register(name, email, password, role) {
    const data = await apiRequest("/auth/register", {
        method: "POST",
        data: {
            name,
            email,
            password,
            role,
        },
    });

    if (data.token) {
        await setToken(data.token);
    }

    return data;
}

export async function logout() {
    await clearToken();
}

export async function forgotPassword(email) {
    return apiRequest("/auth/forgot-password", {
        method: "POST",
        data: { email },
    });
}

export async function verifyOtp(email, otp) {
    return apiRequest("/auth/verify-otp", {
        method: "POST",
        data: {
            email,
            otp,
        },
    });
}


export async function resetPassword(email, otp, password) {
    return apiRequest("/auth/reset-password", {
        method: "POST",
        data: {
            email,
            otp,
            password,
        },
    });
}
/**
 * Get the currently authenticated user's profile.
 */
export async function getCurrentUser() {
    return apiRequest("/auth/me");
}