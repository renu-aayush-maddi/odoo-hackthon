// src/pages/DashboardPage.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";

const LOW_STOCK_THRESHOLD = 5;

const DashboardPage = () => {
  const { user } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  const [stockRows, setStockRows] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    category: "all",
  });

  // --- initial load ---
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [whRes, receiptRes, deliveryRes] = await Promise.all([
          axios.get("/warehouses"),
          axios.get("/operations", { params: { type: "receipt" } }),
          axios.get("/operations", { params: { type: "delivery" } }),
        ]);

        const whs = whRes.data || [];
        setWarehouses(whs);

        const rec = receiptRes.data || [];
        const del = deliveryRes.data || [];
        setReceipts(rec);
        setDeliveries(del);

        // default warehouse = first one (if any)
        if (whs.length > 0) {
          const firstId = whs[0]._id;
          setSelectedWarehouse(firstId);
          const stockRes = await axios.get(`/stock/warehouse/${firstId}`);
          setStockRows(stockRes.data || []);
        } else {
          setStockRows([]);
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // --- when warehouse changes, reload stock for that warehouse ---
  const handleWarehouseChange = async (e) => {
    const whId = e.target.value;
    setSelectedWarehouse(whId);
    if (whId === "all") {
      setStockRows([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`/stock/warehouse/${whId}`);
      setStockRows(res.data || []);
    } catch (err) {
      console.error("Error loading stock:", err);
    } finally {
      setLoading(false);
    }
  };

  const allOperations = useMemo(
    () => [
      ...receipts.map((op) => ({ ...op, type: "receipt" })),
      ...deliveries.map((op) => ({ ...op, type: "delivery" })),
    ],
    [receipts, deliveries]
  );

  // --- KPI calculations ---
  const now = new Date();

  const {
    totalOnHand,
    lowStockCount,
    outOfStockCount,
    pendingReceiptsCount,
    pendingDeliveriesCount,
    lateReceiptsCount,
    lateDeliveriesCount,
    internalTransfersScheduled,
  } = useMemo(() => {
    const totalOnHand = stockRows.reduce(
      (sum, row) => sum + (row.onHand || 0),
      0
    );

    const lowStockCount = stockRows.filter((row) => {
      const free =
        row.freeToUse ??
        (row.onHand || 0) - (row.reserved || row.reservedQty || 0);
      return free > 0 && free < LOW_STOCK_THRESHOLD;
    }).length;

    const outOfStockCount = stockRows.filter((row) => {
      const free =
        row.freeToUse ??
        (row.onHand || 0) - (row.reserved || row.reservedQty || 0);
      return free <= 0;
    }).length;

    const norm = (s = "") => s.toLowerCase();
    const isPending = (s) =>
      !["done", "canceled", "cancelled"].includes(norm(s));

    const pendingReceiptsCount = receipts.filter((op) =>
      isPending(op.status)
    ).length;
    const pendingDeliveriesCount = deliveries.filter((op) =>
      isPending(op.status)
    ).length;

    const isLate = (op) => {
      if (!op.scheduleDate) return false;
      const d = new Date(op.scheduleDate);
      return d < now && isPending(op.status);
    };

    const lateReceiptsCount = receipts.filter(isLate).length;
    const lateDeliveriesCount = deliveries.filter(isLate).length;

    // we don’t have internal transfers yet, keep as 0 but wired
    const internalTransfersScheduled = allOperations.filter(
      (op) =>
        op.type === "internal" &&
        !["done", "canceled", "cancelled"].includes(norm(op.status))
    ).length;

    return {
      totalOnHand,
      lowStockCount,
      outOfStockCount,
      pendingReceiptsCount,
      pendingDeliveriesCount,
      lateReceiptsCount,
      lateDeliveriesCount,
      internalTransfersScheduled,
    };
  }, [stockRows, receipts, deliveries, allOperations, now]);

  // --- Dynamic filter options & filtered operations table ---
  const categoryOptions = useMemo(() => {
    const set = new Set();
    allOperations.forEach((op) => {
      (op.products || []).forEach((line) => {
        const cat =
          line.product?.category ||
          line.product?.categoryName ||
          "Uncategorized";
        set.add(cat);
      });
    });
    return Array.from(set);
  }, [allOperations]);

  const filteredOperations = useMemo(() => {
    return allOperations.filter((op) => {
      if (
        filters.type !== "all" &&
        op.type.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.status !== "all" &&
        op.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      if (
        selectedWarehouse !== "all" &&
        op.warehouse &&
        op.warehouse._id &&
        op.warehouse._id.toString() !== selectedWarehouse.toString()
      ) {
        return false;
      }

      if (filters.category !== "all") {
        const hasCat = (op.products || []).some((line) => {
          const cat =
            line.product?.category ||
            line.product?.categoryName ||
            "Uncategorized";
          return cat === filters.category;
        });
        if (!hasCat) return false;
      }

      return true;
    });
  }, [allOperations, filters, selectedWarehouse]);

  const snapshotWarehouse =
    warehouses.find((w) => w._id === selectedWarehouse)?.name ||
    "All Warehouses";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-pink-200">
            Inventory Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Welcome back, {user?.name || "User"}
          </p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <div>
            Snapshot as of{" "}
            {new Date().toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>
            Warehouse: <span className="text-pink-300">{snapshotWarehouse}</span>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          label="Total products in stock"
          value={totalOnHand}
          subtitle="Sum of on-hand quantities"
        />
        <KpiCard
          label="Low stock items"
          value={lowStockCount}
          subtitle={`Below ${LOW_STOCK_THRESHOLD} free-to-use`}
        />
        <KpiCard
          label="Out of stock items"
          value={outOfStockCount}
          subtitle="Zero free-to-use quantity"
        />
        <KpiCard
          label="Pending receipts"
          value={pendingReceiptsCount}
          subtitle="Not done / canceled"
        />
        <KpiCard
          label="Pending deliveries"
          value={pendingDeliveriesCount}
          subtitle="Not done / canceled"
        />
        <KpiCard
          label="Late operations"
          value={lateReceiptsCount + lateDeliveriesCount}
          subtitle={`${lateReceiptsCount} receipts, ${lateDeliveriesCount} deliveries`}
        />
      </div>

      {/* Second row: internal transfers (placeholder but wired) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          label="Internal transfers scheduled"
          value={internalTransfersScheduled}
          subtitle="Status not done / canceled"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <select
          className="bg-slate-900/80 border border-pink-500/40 rounded-full px-3 py-1 outline-none"
          value={filters.type}
          onChange={(e) =>
            setFilters((f) => ({ ...f, type: e.target.value }))
          }
        >
          <option value="all">All types</option>
          <option value="receipt">Receipts</option>
          <option value="delivery">Deliveries</option>
          <option value="internal">Internal</option>
          <option value="adjustment">Adjustments</option>
        </select>

        <select
          className="bg-slate-900/80 border border-pink-500/40 rounded-full px-3 py-1 outline-none"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="all">All status</option>
          <option value="draft">Draft</option>
          <option value="waiting">Waiting</option>
          <option value="ready">Ready</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>

        <select
          className="bg-slate-900/80 border border-pink-500/40 rounded-full px-3 py-1 outline-none"
          value={selectedWarehouse}
          onChange={handleWarehouseChange}
        >
          <option value="all">All warehouses</option>
          {warehouses.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          className="bg-slate-900/80 border border-pink-500/40 rounded-full px-3 py-1 outline-none"
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="all">All categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Operations table */}
      <div className="mt-3 border border-pink-500/40 rounded-xl overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 border-b border-pink-500/40 text-xs text-slate-400">
          <span>Live operations snapshot</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            Live
          </span>
        </div>

        <table className="w-full text-xs">
          <thead className="bg-slate-900/90">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Reference</th>
              <th className="px-4 py-2 text-left">From</th>
              <th className="px-4 py-2 text-left">To</th>
              <th className="px-4 py-2 text-left">Warehouse</th>
              <th className="px-4 py-2 text-left">Schedule</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  Loading snapshot...
                </td>
              </tr>
            )}

            {!loading && filteredOperations.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-500 italic"
                >
                  No operations match current filters.
                </td>
              </tr>
            )}

            {!loading &&
              filteredOperations.map((op) => (
                <tr
                  key={op._id}
                  className="border-t border-slate-800 hover:bg-slate-900/80 transition-all"
                >
                  <td className="px-4 py-2 capitalize text-pink-300">
                    {op.type}
                  </td>
                  <td className="px-4 py-2">{op.reference}</td>
                  <td className="px-4 py-2">{op.fromParty}</td>
                  <td className="px-4 py-2">{op.toParty}</td>
                  <td className="px-4 py-2">
                    {op.warehouse?.name || op.warehouse?.code || "-"}
                  </td>
                  <td className="px-4 py-2">
                    {op.scheduleDate
                      ? new Date(op.scheduleDate).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 capitalize">{op.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value, subtitle }) => (
  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-pink-400/40 shadow-[0_0_25px_rgba(236,72,153,0.3)] px-4 py-3 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]">
    <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
      {label}
    </div>
    <div className="text-3xl font-semibold text-pink-200">{value}</div>
    <div className="text-[10px] text-slate-500 mt-1">{subtitle}</div>
  </div>
);

export default DashboardPage;
