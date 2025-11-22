// src/pages/NewAdjustmentPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";
import { useOperationStore } from "../stores/useOperationStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const NewAdjustmentPage = () => {
  const navigate = useNavigate();

  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { products, fetchProducts } = useProductStore();
  const { createOperation } = useOperationStore();

  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [systemQty, setSystemQty] = useState(null);
  const [countedQty, setCountedQty] = useState("");
  const [loadingStock, setLoadingStock] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, [fetchWarehouses, fetchProducts]);

  // Load current stock from backend when warehouse + product selected
  useEffect(() => {
    const loadSystemQty = async () => {
      if (!warehouseId || !productId) {
        setSystemQty(null);
        return;
      }
      try {
        setLoadingStock(true);
        const res = await axios.get(`/stock/warehouse/${warehouseId}`);
        const rows = res.data || [];
        const row = rows.find(
          (r) =>
            r.product?._id === productId ||
            r.product === productId
        );
        setSystemQty(row ? row.onHand : 0);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to load stock for selection"
        );
        setSystemQty(null);
      } finally {
        setLoadingStock(false);
      }
    };

    loadSystemQty();
  }, [warehouseId, productId]);

  const difference =
    countedQty === "" || systemQty === null
      ? null
      : Number(countedQty) - Number(systemQty);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!warehouseId || !productId || countedQty === "") {
      return toast.error("Select warehouse, product and counted quantity");
    }

    try {
      setSubmitting(true);

      const payload = {
        type: "adjustment",
        warehouse: warehouseId,
        scheduleDate: new Date().toISOString(),
        fromParty: "Physical Count",
        products: [
          {
            product: productId,
            countedQty: Number(countedQty),
          },
        ],
      };

      const op = await createOperation(payload);
      toast.success("Adjustment created in Draft");
      navigate(`/operations/${op._id}`);
    } catch (error) {
      console.error(error);
      // toast already shown in store
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-pink-200">
          New Inventory Adjustment
        </h1>

        <button
          onClick={() => navigate("/operations/adjustments")}
          className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
        >
          Back to list
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Warehouse */}
        <div className="space-y-1">
          <label className="block text-sm text-slate-300 mb-1">
            Warehouse
          </label>
          <select
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            className="w-full bg-slate-900/70 border border-pink-500/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select warehouse</option>
            {warehouses.map((wh) => (
              <option key={wh._id} value={wh._id}>
                {wh.code} – {wh.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product */}
        <div className="space-y-1">
          <label className="block text-sm text-slate-300 mb-1">
            Product
          </label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full bg-slate-900/70 border border-pink-500/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.code} – {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock info */}
        <div className="grid grid-cols-3 gap-4 bg-slate-900/60 border border-pink-500/20 rounded-xl p-4 text-sm">
          <div>
            <div className="text-xs text-slate-400 mb-1">System quantity</div>
            <div className="text-lg font-semibold text-pink-200">
              {loadingStock
                ? "Loading..."
                : systemQty === null
                ? "-"
                : systemQty}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-1">Counted quantity</div>
            <input
              type="number"
              min="0"
              value={countedQty}
              onChange={(e) => setCountedQty(e.target.value)}
              className="w-full bg-slate-950/70 border border-pink-500/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter physical count"
            />
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-1">Difference</div>
            <div
              className={`text-lg font-semibold ${
                difference == null
                  ? "text-slate-300"
                  : difference > 0
                  ? "text-green-300"
                  : difference < 0
                  ? "text-red-300"
                  : "text-slate-300"
              }`}
            >
              {difference == null
                ? "-"
                : difference > 0
                ? `+${difference}`
                : difference}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/operations/adjustments")}
            className="px-4 py-2 rounded-full text-xs border border-slate-600 hover:bg-slate-800/60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-full text-xs font-semibold bg-pink-500 hover:bg-pink-400 text-black disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAdjustmentPage;
