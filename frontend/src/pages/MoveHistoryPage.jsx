import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useOperationStore } from "../stores/useOperationStore";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";

const typeOptions = [
  { value: "all", label: "All types" },
  { value: "receipt", label: "Receipts" },
  { value: "delivery", label: "Deliveries" },
  { value: "internal", label: "Internal Transfers" },
  { value: "adjustment", label: "Adjustments" },
];

const statusOptions = [
  { value: "all", label: "All status" },
  { value: "draft", label: "Draft" },
  { value: "waiting", label: "Waiting" },
  { value: "ready", label: "Ready" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
];

const MoveHistoryPage = () => {
  const { operations, loading, fetchOperations } = useOperationStore();
  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { categories, fetchCategories } = useProductStore();

  const safeOperations = operations || [];
  const safeWarehouses = warehouses || [];
  const safeCategories = categories || [];

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    warehouse: "all",
    category: "all",
  });

  useEffect(() => {
    fetchWarehouses?.();
    fetchCategories?.();
    fetchOperations?.(); // load all operations once
  }, [fetchWarehouses, fetchCategories, fetchOperations]);

  const filteredOps = useMemo(() => {
    let list = safeOperations;

    if (filters.type !== "all") {
      list = list.filter((op) => op.type === filters.type);
    }

    if (filters.status !== "all") {
      list = list.filter((op) => op.status === filters.status);
    }

    if (filters.warehouse !== "all") {
      list = list.filter(
        (op) => op.warehouse && op.warehouse._id === filters.warehouse
      );
    }

    if (filters.category !== "all") {
      list = list.filter((op) => {
        return (
          op.categoryId === filters.category ||
          op.category === filters.category ||
          op.product?.categoryId === filters.category
        );
      });
    }

    return list;
  }, [safeOperations, filters]);

  const filteredSummary = useMemo(() => {
    const total = filteredOps.length;
    const receipts = filteredOps.filter((h) => h.type === "receipt").length;
    const deliveries = filteredOps.filter((h) => h.type === "delivery").length;
    const internal = filteredOps.filter((h) => h.type === "internal").length;
    const adjustments = filteredOps.filter(
      (h) => h.type === "adjustment"
    ).length;
    return { total, receipts, deliveries, internal, adjustments };
  }, [filteredOps]);

  const handleChange = (field) => (e) =>
    setFilters((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-pink-200">
            Move History
          </h1>
          <p className="text-xs text-slate-400">
            Live snapshot of all receipts, deliveries, internals & adjustments.
          </p>
        </div>
        <span className="text-[11px] text-slate-500">
          Snapshot as of {new Date().toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total operations",
            value: filteredSummary.total,
            subtitle: "All matching filters",
          },
          {
            label: "Receipts",
            value: filteredSummary.receipts,
            subtitle: "Incoming stock",
          },
          {
            label: "Deliveries",
            value: filteredSummary.deliveries,
            subtitle: "Outgoing stock",
          },
          {
            label: "Internal / Adjustments",
            value: filteredSummary.internal + filteredSummary.adjustments,
            subtitle: "Transfers & corrections",
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-pink-500/40 bg-gradient-to-br from-slate-900/70 via-purple-900/40 to-slate-900/80 px-4 py-3 shadow-[0_0_25px_rgba(236,72,153,0.15)]"
          >
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              {card.label}
            </div>
            <div className="text-3xl font-semibold mt-1 text-pink-100">
              {card.value}
            </div>
            <div className="text-[11px] mt-1 text-slate-500">
              {card.subtitle}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 items-center bg-slate-900/70 border border-pink-500/30 rounded-2xl px-4 py-3"
      >
        <select
          value={filters.type}
          onChange={handleChange("type")}
          className="bg-slate-950/70 border border-pink-500/40 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          {typeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={handleChange("status")}
          className="bg-slate-950/70 border border-pink-500/40 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={filters.warehouse}
          onChange={handleChange("warehouse")}
          className="bg-slate-950/70 border border-pink-500/40 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="all">All warehouses</option>
          {safeWarehouses.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={handleChange("category")}
          className="bg-slate-950/70 border border-pink-500/40 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="all">All categories</option>
          {safeCategories.map((c) => (
            <option key={c._id || c} value={c._id || c}>
              {c.name || c}
            </option>
          ))}
        </select>

        <span className="ml-auto text-[11px] text-pink-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          Live operations snapshot
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-pink-500/40 rounded-2xl overflow-hidden bg-slate-950/60"
      >
        <div className="grid grid-cols-7 text-xs font-semibold text-pink-200 px-4 py-2 border-b border-pink-500/40 bg-slate-900/80">
          <span>Type</span>
          <span>Reference</span>
          <span>From</span>
          <span>To</span>
          <span>Warehouse</span>
          <span>Schedule</span>
          <span>Status</span>
        </div>

        {loading && (
          <div className="px-4 py-4 text-xs text-slate-400">
            Loading operations…
          </div>
        )}

        {!loading && filteredOps.length === 0 && (
          <div className="px-4 py-6 text-xs text-center text-slate-500 italic">
            No operations match current filters.
          </div>
        )}

        {!loading &&
          filteredOps.map((op) => (
            <div
              key={op._id}
              className="grid grid-cols-7 text-xs px-4 py-2 border-t border-slate-800 hover:bg-slate-900/80 transition-colors"
            >
              <span className="capitalize text-pink-200">{op.type}</span>
              <span className="text-pink-300">{op.reference}</span>
              <span>{op.fromParty}</span>
              <span>{op.toParty}</span>
              <span>{op.warehouse?.name || "-"}</span>
              <span>
                {op.scheduleDate
                  ? new Date(op.scheduleDate).toLocaleString()
                  : "-"}
              </span>
              <span className="capitalize">{op.status}</span>
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default MoveHistoryPage;
