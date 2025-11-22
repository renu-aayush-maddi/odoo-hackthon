// src/pages/DeliveriesListPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const DeliveriesListPage = () => {
  const navigate = useNavigate();

  // Your actual store fields:
  const { operations, fetchOperations, loading } = useOperationStore();

  useEffect(() => {
    // request delivery-type operations
    fetchOperations("delivery");
  }, [fetchOperations]);

  return (
    <div className="p-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pink-200">Deliveries</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/operations/receipts")}
            className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
          >
            Go to Receipts
          </button>

          <button
            onClick={() => navigate("/operations/deliveries/new")}
            className="px-4 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
          >
            New Delivery
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-pink-500/40 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-pink-400/40 text-pink-200">
            <tr>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Schedule date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-400">
                  Loading deliveries…
                </td>
              </tr>
            )}

            {!loading &&
              operations.map((op) => (
                <tr
                  key={op._id}
                  className="border-b border-slate-800 hover:bg-slate-900/60 cursor-pointer"
                  onClick={() => navigate(`/operations/deliveries/${op._id}`)}
                >
                  <td className="px-4 py-2 text-pink-300">{op.reference}</td>
                  <td className="px-4 py-2">{op.fromParty}</td>
                  <td className="px-4 py-2">{op.toParty}</td>
                  <td className="px-4 py-2">
                    {op.scheduleDate
                      ? new Date(op.scheduleDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 capitalize">{op.status}</td>
                </tr>
              ))}

            {!loading && operations.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-400 italic"
                >
                  No deliveries yet. Click “New Delivery”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesListPage;
