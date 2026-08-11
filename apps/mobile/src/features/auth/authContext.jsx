import React, { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  forgotPassword as forgotPasswordService,
  verifyOtp as verifyOtpService,
  resetPassword as resetPasswordService,
  getCurrentUser as getCurrentUserService,
} from "../../shared/auth";

import { getToken } from "../../shared/authToken";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const token = await getToken();

      if (token) {
        setUser({
          token,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await loginService(email, password);

    setUser(data.user);

    return data;
  }

  async function register(name, email, password, role) {
    const data = await registerService(name, email, password, role);

    setUser(data.user ?? { token: data.token });

    return data;
  }

  async function logout() {
    await logoutService();

    setUser(null);
  }

  async function forgot(email) {
    return forgotPasswordService(email);
  }

  async function verify(email, otp) {
    return verifyOtpService(email, otp);
  }

  async function reset(email, otp, password) {
    return resetPasswordService(email, otp, password);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgot,
        verify,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
