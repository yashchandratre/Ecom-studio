import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import API from "../../../components/API/api";

const emptyProduct = {
  // This shape matches the Product mongoose model, but form values start as text.
  product_name: "",
  description: "",
  price: "",
  special_price: "",
  images: "",
  category: "",
  stock: "",
  isActive: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    // Products need categories for the dropdown, so both are loaded together.
    const [productRes, categoryRes] = await Promise.all([
      API.get("/admin/products"),
      API.get("/admin/categories"),
    ]);
    setProducts(productRes.data.products || []);
    setCategories(categoryRes.data.categories || []);
  };

  useEffect(() => {
    // Load existing products once when the page opens.
    loadData().finally(() => setLoading(false));
  }, []);

  // Reusable field updater keeps all inputs controlled by the same form state.
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const resetForm = () => {
    // After create/update/cancel, clear edit mode and return to blank form.
    setForm(emptyProduct);
    setEditingId(null);
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    setMessage("");
    // The form stores everything as strings. Before sending to MongoDB,
    // convert number fields and split comma-separated image URLs into an array.
    const payload = {
      ...form,
      price: Number(form.price),
      special_price: Number(form.special_price),
      stock: Number(form.stock),
      images: form.images.split(",").map((image) => image.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await API.put(`/admin/products/${editingId}`, payload);
        setMessage("Product updated.");
      } else {
        await API.post("/admin/products", payload);
        setMessage("Product created.");
      }
      resetForm();
      await loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || err.response?.data?.msg || "Product save failed.");
    }
  };

  const editProduct = (product) => {
    // Put the selected row back into the same form, then submit with PUT.
    setEditingId(product._id);
    setForm({
      product_name: product.product_name || "",
      description: product.description || "",
      price: product.price || "",
      special_price: product.special_price || "",
      images: (product.images || []).join(", "),
      category: product.category?._id || product.category || "",
      stock: product.stock || "",
      isActive: Boolean(product.isActive),
    });
  };

  const deleteProduct = async (id) => {
    // Delete is permanent, so ask first before calling the backend.
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/admin/products/${id}`);
    await loadData();
  };

  if (loading) return <div className="text-sm text-slate-500">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
        <p className="text-sm text-slate-500">Create, edit, and remove catalog products</p>
      </div>

      <form onSubmit={submitProduct} className="bg-white border border-slate-200 rounded-lg p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Product name" value={form.product_name} onChange={(e) => updateField("product_name", e.target.value)} required />
        <input className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Price" type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} required />
        <input className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Special price" type="number" value={form.special_price} onChange={(e) => updateField("special_price", e.target.value)} required />
        <input className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Stock" type="number" value={form.stock} onChange={(e) => updateField("stock", e.target.value)} required />
        <select className="rounded-md border border-slate-300 px-3 py-2 text-sm" value={form.category} onChange={(e) => updateField("category", e.target.value)} required>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
        </select>
        <input className="rounded-md border border-slate-300 px-3 py-2 text-sm xl:col-span-2" placeholder="Image URLs, comma separated" value={form.images} onChange={(e) => updateField("images", e.target.value)} required />
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={form.isActive} onChange={(e) => updateField("isActive", e.target.checked)} />
          Active
        </label>
        <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2 xl:col-span-4" placeholder="Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} required />
        <div className="flex gap-2 md:col-span-2 xl:col-span-4">
          <button className="inline-flex items-center gap-2 rounded-md bg-[#0B2545] px-4 py-2 text-sm font-semibold text-white">
            <Plus size={16} /> {editingId ? "Update product" : "Add product"}
          </button>
          {editingId && <button type="button" onClick={resetForm} className="rounded-md border border-slate-300 px-4 py-2 text-sm">Cancel</button>}
        </div>
        {message && <p className="text-sm text-slate-600 md:col-span-2 xl:col-span-4">{message}</p>}
      </form>

      <section className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{product.product_name}</td>
                <td className="px-4 py-3">{product.category?.name || "Uncategorized"}</td>
                <td className="px-4 py-3">INR {product.special_price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => editProduct(product)} className="rounded-md border border-slate-300 p-2" title="Edit product"><Pencil size={16} /></button>
                    <button onClick={() => deleteProduct(product._id)} className="rounded-md border border-red-200 p-2 text-red-600" title="Delete product"><Trash2 size={16} /></button>
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
