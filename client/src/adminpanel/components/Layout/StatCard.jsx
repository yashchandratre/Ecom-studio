
import React from "react";

export default function StatCard({ icon: Icon, title, value, change, positive }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h2>
        </div>
        {Icon && (
          <div className="h-10 w-10 rounded-md bg-slate-100 text-[#0B2545] flex items-center justify-center">
            <Icon size={20} />
          </div>
        )}
      </div>
      {change && (
        <span className={`mt-3 inline-block text-sm px-2 py-1 rounded-full ${positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
          {change}
        </span>
      )}
    </div>
  );
}
