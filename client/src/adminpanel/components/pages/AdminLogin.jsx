import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import API from "../../../components/API/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, signIn } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If an admin is already signed in, do not show the login form again.
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Reuse the existing backend login endpoint. It returns token + user.
      const res = await API.post("/auth/login", form);

      // Normal users can successfully log in to the store, but this panel
      // only accepts accounts where user.isAdmin is true in MongoDB.
      if (!res.data.user?.isAdmin) {
        setError("This account does not have admin access.");
        return;
      }

      signIn(res.data.token, res.data.user);
      // If the user originally tried /admin/products, send them back there.
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-md bg-[#0B2545] text-white flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Admin sign in</h1>
            <p className="text-sm text-slate-500">Restricted dashboard access</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0B2545]"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0B2545]"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#0B2545] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
