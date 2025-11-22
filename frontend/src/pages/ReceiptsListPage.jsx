// src/pages/ReceiptsListPage.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const ReceiptsListPage = () => {
  const navigate = useNavigate();

  // from your existing store
  const { fetchOperations, operations, loading } = useOperationStore();

  useEffect(() => {
    // load all receipt-type operations
    fetchOperations("receipt");
  }, [fetchOperations]);

  return (
    <div className="p-8 space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-pink-200">Receipts</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/operations/deliveries")}
            className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
          >
            Go to Deliveries
          </button>

          <button
            onClick={() => navigate("/operations/receipts/new")}
            className="px-4 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
          >
            New Receipt
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-pink-400/40 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-pink-400/40">
            <tr>
              <th className="px-3 py-2 text-left">Reference</th>
              <th className="px-3 py-2 text-left">From</th>
              <th className="px-3 py-2 text-left">To</th>
              <th className="px-3 py-2 text-left">Schedule date</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr
                key={op._id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-3 py-2">
                  <Link
                    to={`/operations/receipts/${op._id}`}
                    className="text-pink-300 hover:underline"
                  >
                    {op.reference}
                  </Link>
                </td>
                <td className="px-3 py-2">{op.fromParty}</td>
                <td className="px-3 py-2">{op.toParty}</td>
                <td className="px-3 py-2">
                  {op.scheduleDate
                    ? new Date(op.scheduleDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2 capitalize">{op.status}</td>
              </tr>
            ))}

            {!operations.length && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-slate-500"
                >
                  No receipts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <p className="text-sm text-slate-400 mt-2">Loading receipts…</p>
      )}
    </div>
  );
};

export default ReceiptsListPage;
