import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const InternalTransfersListPage = () => {
  const navigate = useNavigate();
  const {
    internalTransfers,
    fetchInternalTransfers,
    loading,
  } = useOperationStore();

  useEffect(() => {
    fetchInternalTransfers();
  }, [fetchInternalTransfers]);

  return (
    <div className="p-8 space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pink-200">
          Internal Transfers
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/operations/receipts")}
            className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
          >
            Go to Receipts
          </button>
          <button
            onClick={() => navigate("/operations/deliveries")}
            className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
          >
            Go to Deliveries
          </button>
          <button
            onClick={() => navigate("/operations/internal/new")}
            className="px-4 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
          >
            New Transfer
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left border border-pink-500/40 rounded-lg overflow-hidden">
        <thead className="bg-slate-900/80 border-b border-pink-500/40 text-pink-200">
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
              <td
                colSpan={5}
                className="px-4 py-4 text-center text-slate-400"
              >
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            internalTransfers.map((op) => (
              <tr
                key={op._id}
                className="border-b border-pink-500/20 hover:bg-slate-900/60 cursor-pointer transition-colors"
                onClick={() => navigate(`/operations/internal/${op._id}`)}
              >
                <td className="px-4 py-2 text-pink-300">{op.reference}</td>
                <td className="px-4 py-2">
                  {op.fromWarehouse?.name || op.fromParty}
                </td>
                <td className="px-4 py-2">
                  {op.toWarehouse?.name || op.toParty}
                </td>
                <td className="px-4 py-2">
                  {op.scheduleDate
                    ? new Date(op.scheduleDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 capitalize">{op.status}</td>
              </tr>
            ))}

          {!loading && internalTransfers.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-6 text-center text-gray-400 italic"
              >
                No internal transfers yet. Click “New Transfer” to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternalTransfersListPage;
