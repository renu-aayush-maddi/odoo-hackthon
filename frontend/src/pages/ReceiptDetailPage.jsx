import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const ReceiptDetailPage = () => {
  const { id } = useParams();
  const { fetchOperationById, current, loading, moveToReady, moveToDone } =
    useOperationStore();

  useEffect(() => {
    fetchOperationById(id);
  }, [id, fetchOperationById]);

  if (loading || !current)
    return <p className="text-sm text-slate-400">Loading receipt...</p>;

  const isDraft = current.status === "draft";
  const isReady = current.status === "ready";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-pink-300">
          Receipt {current.reference}
        </h1>
        <div className="flex gap-2">
          {isDraft && (
            <button
              onClick={() => moveToReady(current._id)}
              className="px-3 py-1 rounded bg-amber-500 text-xs hover:bg-amber-600"
            >
              Validate → Ready
            </button>
          )}
          {isReady && (
            <button
              onClick={() => moveToDone(current._id)}
              className="px-3 py-1 rounded bg-emerald-500 text-xs hover:bg-emerald-600"
            >
              Done
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p>
            <span className="text-slate-400">Receive From:</span>{" "}
            {current.fromParty}
          </p>
          <p>
            <span className="text-slate-400">Responsible:</span>{" "}
            {current.responsible?.name || "-"}
          </p>
          <p>
            <span className="text-slate-400">Schedule date:</span>{" "}
            {current.scheduleDate
              ? new Date(current.scheduleDate).toLocaleString()
              : "-"}
          </p>
        </div>
        <div className="space-y-1">
          <p>
            <span className="text-slate-400">Warehouse:</span>{" "}
            {current.warehouse?.code} - {current.warehouse?.name}
          </p>
          <p>
            <span className="text-slate-400">Status:</span>{" "}
            <span className="capitalize">{current.status}</span>
          </p>
        </div>
      </div>

      <div className="border border-pink-400/40 rounded-xl overflow-hidden mt-4">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-pink-400/40">
            <tr>
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {current.products.map((line) => (
              <tr
                key={line._id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-3 py-2">
                  {line.product?.name} ({line.product?.code})
                </td>
                <td className="px-3 py-2">{line.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptDetailPage;
