import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import API from "../../../components/API/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", isActive: true });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadCategories = async () => {
    // This hits GET /api/admin/categories through the shared axios helper.
    const res = await API.get("/admin/categories");
    setCategories(res.data.categories || []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submitCategory = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      // editingId decides whether this form creates a new category or updates one.
      if (editingId) {
        await API.put(`/admin/categories/${editingId}`, form);
        setMessage("Category updated.");
      } else {
        await API.post("/admin/categories", form);
        setMessage("Category created.");
      }

      setForm({ name: "", isActive: true });
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      setMessage(err.response?.data?.error || err.response?.data?.msg || "Category save failed.");
    }
  };

  const editCategory = (category) => {
    // Reuse the top form for editing by filling it with the selected row.
    setEditingId(category._id);
    setForm({ name: category.name, isActive: Boolean(category.isActive) });
  };

  const deleteCategory = async (id) => {
    // Keep deletes intentional because products may depend on categories.
    if (!window.confirm("Delete this category?")) return;
    await API.delete(`/admin/categories/${id}`);
    await loadCategories();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <p className="text-sm text-slate-500">Manage product categories</p>
      </div>

      <form onSubmit={submitCategory} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-sm md:w-80"
          placeholder="Category name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
          />
          Active
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0B2545] px-4 py-2 text-sm font-semibold text-white">
          <Plus size={16} /> {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", isActive: true }); }} className="rounded-md border border-slate-300 px-4 py-2 text-sm">
            Cancel
          </button>
        )}
        {message && <span className="text-sm text-slate-600">{message}</span>}
      </form>

      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{category.name}</td>
                <td className="px-4 py-3">{category.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => editCategory(category)} className="rounded-md border border-slate-300 p-2" title="Edit category"><Pencil size={16} /></button>
                    <button onClick={() => deleteCategory(category._id)} className="rounded-md border border-red-200 p-2 text-red-600" title="Delete category"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
