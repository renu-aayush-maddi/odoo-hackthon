import { useEffect } from "react";
import { useOperationStore } from "../stores/useOperationStore";

const DashboardPage = () => {
  const { fetchOperations, operations, loading } = useOperationStore();

  useEffect(() => {
    fetchOperations(); // all types
  }, [fetchOperations]);

  const receipts = operations.filter((op) => op.type === "receipt");
  const deliveries = operations.filter((op) => op.type === "delivery");

  const lateReceipts = receipts.filter(
    (r) => r.scheduleDate && new Date(r.scheduleDate) < new Date() && r.status !== "done"
  );
  const waitingReceipts = receipts.filter((r) => r.status === "ready");

  const lateDeliveries = deliveries.filter(
    (d) => d.scheduleDate && new Date(d.scheduleDate) < new Date() && d.status !== "done"
  );
  const waitingDeliveries = deliveries.filter((d) => d.status === "ready");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-pink-300">Dashboard</h1>

      {loading && <p className="text-sm text-slate-400">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Receipt card */}
        <div className="border border-pink-400/50 rounded-xl p-4 bg-slate-900/60">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg text-pink-200">Receipt</h2>
            <span className="text-xs text-slate-400">
              {receipts.length} operations
            </span>
          </div>
          <p className="text-sm text-slate-300">
            Late:{" "}
            <span className="font-semibold text-orange-300">
              {lateReceipts.length}
            </span>
          </p>
          <p className="text-sm text-slate-300">
            Waiting:{" "}
            <span className="font-semibold text-yellow-200">
              {waitingReceipts.length}
            </span>
          </p>
        </div>

        {/* Delivery card */}
        <div className="border border-pink-400/50 rounded-xl p-4 bg-slate-900/60">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg text-pink-200">Delivery</h2>
            <span className="text-xs text-slate-400">
              {deliveries.length} operations
            </span>
          </div>
          <p className="text-sm text-slate-300">
            Late:{" "}
            <span className="font-semibold text-orange-300">
              {lateDeliveries.length}
            </span>
          </p>
          <p className="text-sm text-slate-300">
            Waiting:{" "}
            <span className="font-semibold text-yellow-200">
              {waitingDeliveries.length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
