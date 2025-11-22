// src/pages/NewDeliveryPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";

const NewDeliveryPage = () => {
  const navigate = useNavigate();
  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { products, fetchProducts } = useProductStore();

  const [form, setForm] = useState({
    warehouse: "",
    fromParty: "WH1/Stock1",
    toParty: "",
    contact: "",
    scheduleDate: "",
    lines: [{ product: "", quantity: 1 }],
  });

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, [fetchWarehouses, fetchProducts]);

  const updateLine = (index, field, value) => {
    setForm((prev) => {
      const lines = [...prev.lines];
      lines[index] = { ...lines[index], [field]: value };
      return { ...prev, lines };
    });
  };

  const addLine = () => {
    setForm((prev) => ({
      ...prev,
      lines: [...prev.lines, { product: "", quantity: 1 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        type: "delivery",
        warehouse: form.warehouse,
        fromParty: form.fromParty,
        toParty: form.toParty,
        contact: form.contact,
        scheduleDate: form.scheduleDate || undefined,
        products: form.lines
          .filter((l) => l.product && l.quantity > 0)
          .map((l) => ({
            product: l.product,
            quantity: Number(l.quantity),
          })),
      };

      await axios.post("/operations", payload);
      toast.success("Delivery created (Draft)");
      navigate("/operations/deliveries");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create delivery"
      );
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-pink-200">New Delivery</h1>
        <button
          onClick={() => navigate("/operations/deliveries")}
          className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
        >
          Back to Deliveries
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-pink-500/40 rounded-xl p-6 bg-slate-950/60"
      >
        {/* header fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-300">Warehouse</label>
            <select
              className="mt-1 w-full rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
              value={form.warehouse}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, warehouse: e.target.value }))
              }
              required
            >
              <option value="">Select warehouse</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-300">Schedule date</label>
            <input
              type="date"
              className="mt-1 w-full rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
              value={form.scheduleDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, scheduleDate: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">From</label>
            <input
              className="mt-1 w-full rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
              value={form.fromParty}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, fromParty: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">To</label>
            <input
              className="mt-1 w-full rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
              value={form.toParty}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, toParty: e.target.value }))
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-300">Contact</label>
            <input
              className="mt-1 w-full rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
              value={form.contact}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, contact: e.target.value }))
              }
            />
          </div>
        </div>

        {/* product lines */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-pink-200">Products</h2>
            <button
              type="button"
              onClick={addLine}
              className="px-3 py-1 rounded-full border border-pink-500/70 text-[11px] text-pink-200 hover:bg-pink-500/10"
            >
              + Add line
            </button>
          </div>

          <div className="space-y-3">
            {form.lines.map((line, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[2fr,1fr] gap-3 items-center"
              >
                <select
                  className="rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
                  value={line.product}
                  onChange={(e) =>
                    updateLine(idx, "product", e.target.value)
                  }
                  required
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.code} - {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  className="rounded-md bg-slate-900 border border-pink-500/40 px-3 py-2 text-sm"
                  value={line.quantity}
                  onChange={(e) =>
                    updateLine(idx, "quantity", e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/operations/deliveries")}
            className="px-4 py-2 rounded-full border border-pink-500/50 text-xs text-pink-200 hover:bg-pink-500/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
          >
            Create Delivery (Draft)
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDeliveryPage;
