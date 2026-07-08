import React, { useEffect, useState } from "react";
import API from "../../../components/API/api";

export default function UsersPage() {
  // Users are loaded without passwords because backend uses .select("-password").
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    // GET /admin/users is admin-only, so normal users cannot fetch this list.
    const res = await API.get("/admin/users");
    setUsers(res.data.users || []);
  };

  useEffect(() => {
    // Fetch users once when the page opens.
    loadUsers();
  }, []);

  const updateRole = async (id, isAdmin) => {
    // This toggles the same isAdmin flag that backend adminMiddleware checks.
    await API.patch(`/admin/users/${id}/role`, { isAdmin });
    await loadUsers();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
        <p className="text-sm text-slate-500">View users and manage admin access</p>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{user.fname}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.isAdmin ? "Admin" : "Customer"}</td>
                <td className="px-4 py-3">
                  <label className="inline-flex items-center gap-2">
                    {/* This checkbox controls user.isAdmin in MongoDB. */}
                    <input type="checkbox" checked={Boolean(user.isAdmin)} onChange={(event) => updateRole(user._id, event.target.checked)} />
                    <span className="text-slate-600">Access</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
