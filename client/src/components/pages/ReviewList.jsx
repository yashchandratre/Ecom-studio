import React, { useState } from 'react';

/*
Props:
 - reviews: array of { name, rating (1-5), text, date }
 - productId: optional (used if you want to POST review)
*/

export default function ReviewList({ reviews = [], productId }) {
  // local copy to allow adding
  const [list, setList] = useState(reviews);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });
  const [err, setErr] = useState('');

  function handleAdd(ev) {
    ev.preventDefault();
    if (!form.name || !form.text) {
      setErr('Please provide name and review text.');
      return;
    }
    const newReview = {
      name: form.name,
      rating: Number(form.rating),
      text: form.text,
      date: new Date().toISOString(),
    };
    // In real app: POST to API then refresh
    setList((s) => [newReview, ...s]);
    setForm({ name: '', rating: 5, text: '' });
    setErr('');
  }

  return (
    <div className="mt-4">
      <div className="mb-4">
        {/* {{
          if(){
          }
        }} */}
        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-2">
          <div className="flex gap-2">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="flex-1 px-3 py-2 border border-gray-200 rounded"
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded"
            >
              <option value={5}>5 ★</option>
              <option value={4}>4 ★</option>
              <option value={3}>3 ★</option>
              <option value={2}>2 ★</option>
              <option value={1}>1 ★</option>
            </select>
          </div>

          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Share your experience..."
            className="w-full px-3 py-2 border border-gray-200 rounded"
            rows={3}
          />

          {err && <div className="text-xs text-red-500">{err}</div>}

          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 rounded bg-[#FF6A00] text-white">Submit review</button>
            <button type="button" onClick={() => { setForm({ name: '', rating: 5, text: '' }); setErr(''); }} className="px-4 py-2 rounded border">Clear</button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {list.length === 0 && <div className="text-sm text-gray-500">No reviews yet.</div>}
        {list.map((r, i) => (
          <div key={i} className="p-4 rounded border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[#0B2545]">{r.name}</div>
              <div className="text-sm text-gray-500">{new Date(r.date).toLocaleDateString()}</div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            <div className="mt-2 text-sm text-gray-700">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
