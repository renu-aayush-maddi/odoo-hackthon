// src/pages/AdjustmentsListPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const AdjustmentsListPage = () => {
  const navigate = useNavigate();
  const { operations, fetchOperations, loading } = useOperationStore();

  useEffect(() => {
    // load only adjustments
    fetchOperations("adjustment");
  }, [fetchOperations]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pink-200">
          Inventory Adjustments
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
            onClick={() => navigate("/operations/adjustments/new")}
            className="px-4 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
          >
            New Adjustment
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left border border-pink-500/40 rounded-xl overflow-hidden">
        <thead className="bg-slate-900/80 border-b border-pink-500/40 text-pink-200">
          <tr>
            <th className="px-4 py-2">Reference</th>
            <th className="px-4 py-2">Warehouse</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">System qty</th>
            <th className="px-4 py-2">Counted qty</th>
            <th className="px-4 py-2">Difference</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="px-4 py-4 text-center text-slate-400">
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            operations.map((op) =>
              op.products.map((p) => (
                <tr
                  key={`${op._id}-${p._id}`}
                  className="border-b border-pink-500/20 hover:bg-slate-900/60 cursor-pointer"
                  onClick={() => navigate(`/operations/${op._id}`)}
                >
                  <td className="px-4 py-2 text-pink-300">{op.reference}</td>
                  <td className="px-4 py-2">
                    {op.warehouse?.code} – {op.warehouse?.name}
                  </td>
                  <td className="px-4 py-2">
                    {p.product?.code} – {p.product?.name}
                  </td>
                  <td className="px-4 py-2">{p.systemQty ?? "-"}</td>
                  <td className="px-4 py-2">{p.countedQty ?? "-"}</td>
                  <td className="px-4 py-2">
                    {p.difference > 0 && (
                      <span className="text-green-300">+{p.difference}</span>
                    )}
                    {p.difference < 0 && (
                      <span className="text-red-300">{p.difference}</span>
                    )}
                    {p.difference === 0 && <span className="text-slate-300">0</span>}
                    {p.difference == null && "-"}
                  </td>
                  <td className="px-4 py-2 capitalize">{op.status}</td>
                </tr>
              ))
            )}

          {!loading && operations.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-6 text-center text-gray-400 italic"
              >
                No adjustments yet. Click “New Adjustment” to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdjustmentsListPage;
