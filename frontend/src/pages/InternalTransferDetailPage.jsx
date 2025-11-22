import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const InternalTransferDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    current,
    fetchOperationById,
    moveToReady,
    moveToDone,
    loading,
  } = useOperationStore();

  useEffect(() => {
    fetchOperationById(id);
  }, [id, fetchOperationById]);

  if (loading && !current) {
    return <div className="p-8 text-slate-400">Loading...</div>;
  }

  if (!current) {
    return (
      <div className="p-8 text-slate-400">
        Internal transfer not found.
      </div>
    );
  }

  const canMoveToReady = current.status === "draft";
  const canMoveToDone = current.status === "ready";

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-pink-300/80">
            Internal Transfer
          </p>
          <h1 className="text-2xl font-semibold text-pink-100">
            {current.reference}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Status:{" "}
            <span className="capitalize text-pink-200">
              {current.status}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/operations/internal")}
            className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
          >
            Back to list
          </button>

          {canMoveToReady && (
            <button
              onClick={() => moveToReady(current._id)}
              className="px-4 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
            >
              Mark Ready
            </button>
          )}

          {canMoveToDone && (
            <button
              onClick={() => moveToDone(current._id)}
              className="px-4 py-2 rounded-full bg-emerald-500 text-xs font-semibold text-black hover:bg-emerald-400"
            >
              Mark Done
            </button>
          )}
        </div>
      </div>

      {/* From / To block */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-pink-500/30 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-pink-200 mb-2">
            From
          </h2>
          <p className="text-sm text-slate-200">
            {current.fromWarehouse?.name || current.fromParty}
          </p>
          {current.fromWarehouse && (
            <p className="text-xs text-slate-400 mt-1">
              {current.fromWarehouse.code}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-pink-500/30 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-pink-200 mb-2">
            To
          </h2>
          <p className="text-sm text-slate-200">
            {current.toWarehouse?.name || current.toParty}
          </p>
          {current.toWarehouse && (
            <p className="text-xs text-slate-400 mt-1">
              {current.toWarehouse.code}
            </p>
          )}
        </div>
      </div>

      {/* Schedule */}
      <div className="rounded-2xl border border-pink-500/30 bg-slate-900/40 p-4">
        <h2 className="text-sm font-semibold text-pink-200 mb-2">
          Schedule
        </h2>
        <p className="text-sm text-slate-200">
          {current.scheduleDate
            ? new Date(current.scheduleDate).toLocaleString()
            : "-"}
        </p>
      </div>

      {/* Lines */}
      <div className="rounded-2xl border border-pink-500/30 bg-slate-900/40 overflow-hidden">
        <div className="px-4 py-2 border-b border-pink-500/30 text-sm font-semibold text-pink-200">
          Products
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-950/60 text-pink-200 border-b border-pink-500/30">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-right">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {current.products?.map((line) => (
              <tr
                key={line._id}
                className="border-b border-pink-500/10 last:border-none"
              >
                <td className="px-4 py-2">
                  {line.product?.name || "-"}
                </td>
                <td className="px-4 py-2">
                  {line.product?.code || "-"}
                </td>
                <td className="px-4 py-2 text-right">
                  {line.quantity}
                </td>
              </tr>
            ))}

            {(!current.products || current.products.length === 0) && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-slate-400"
                >
                  No lines.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternalTransferDetailPage;
