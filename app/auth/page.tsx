"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const router = useRouter();

  // Email Validation Regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleAuth = async (action: "signin" | "signup") => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, action }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setLoading(false); 

    if (data.user) {
      setUser(data.user);
      setSuccessMessage(`${action === "signup" ? "Sign up" : "Sign in"} successful! Redirecting...`);
      setTimeout(() => router.push("/"), 2000);
    } else {
      setErrorMessage(`Please, Sign up first.`);
    }
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth", { method: "DELETE" });
    const data = await response.json();
    if (data.message === "User logged out") {
      setUser(null);
      router.push("/auth");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {successMessage && (
          <div className="popup success bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="popup error bg-red-500 text-white p-4 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {!user ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Sign In / Sign Up</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleAuth("signup")}
              disabled={loading}
              className={`w-full p-3 mb-4 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => handleAuth("signin")}
              disabled={loading}
              className={`w-full p-3 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Sign In
            </button>
              <div className={`w-full p-3 text-green-600 rounded-md`}>
              {loading && "Processing..."}
              </div>
            
          </>
        ) : (
          <>
            <p className="text-center text-lg mb-4">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
