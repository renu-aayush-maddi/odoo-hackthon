import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";

const NewReceiptPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { products, fetchProducts } = useProductStore();

  const [warehouseId, setWarehouseId] = useState("");
  const [fromParty, setFromParty] = useState("Vendor A");
  const [toParty, setToParty] = useState("");
  const [contact, setContact] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [lines, setLines] = useState([
    { productId: "", quantity: 1 },
  ]);

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, [fetchWarehouses, fetchProducts]);

  // role guard (just in case someone hits URL directly)
  if (!user) return null;
  const canCreate =
    user.role === "admin" || user.role === "inventory_manager";

  if (!canCreate) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">
          New Receipt
        </h1>
        <p className="text-red-400">
          You don&apos;t have permission to create receipts.
        </p>
      </div>
    );
  }

  const handleLineChange = (index, field, value) => {
    setLines(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addLine = () => {
    setLines(prev => [...prev, { productId: "", quantity: 1 }]);
  };

  const removeLine = (index) => {
    setLines(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (mode = "draft") => {
    if (!warehouseId) {
      return toast.error("Please select a warehouse");
    }
    if (!scheduleDate) {
      return toast.error("Please select schedule date/time");
    }

    const validLines = lines.filter(
      l => l.productId && Number(l.quantity) > 0
    );

    if (validLines.length === 0) {
      return toast.error("Add at least one product with quantity > 0");
    }

    try {
      setSubmitting(true);

      const payload = {
        type: "receipt",
        warehouse: warehouseId,
        fromParty,
        toParty: toParty || "WH1/Stock1",
        contact,
        scheduleDate: new Date(scheduleDate).toISOString(),
        products: validLines.map(l => ({
          product: l.productId,
          quantity: Number(l.quantity),
        })),
      };

      const res = await axios.post("/operations", payload);
      const op = res.data;

      // if user clicked "Validate", immediately move to Ready
      if (mode === "validate") {
        await axios.post(`/operations/${op._id}/ready`);
        toast.success("Receipt created and moved to Ready");
      } else {
        toast.success("Receipt created as Draft");
      }

      navigate(`/operations/receipts/${op._id}`);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create receipt"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New Receipt</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={submitting}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSubmit("validate")}
            disabled={submitting}
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60"
          >
            {submitting ? "Processing..." : "Validate"}
          </button>
        </div>
      </div>

      {/* Header info card */}
      <div className="grid md:grid-cols-3 gap-4 bg-gray-900/60 border border-gray-700 rounded-xl p-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Warehouse</label>
          <select
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          >
            <option value="">Select warehouse</option>
            {warehouses.map(w => (
              <option key={w._id} value={w._id}>
                {w.code} - {w.name}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-300 mt-3">Schedule Date</label>
          <input
            type="datetime-local"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">From</label>
          <input
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            value={fromParty}
            onChange={(e) => setFromParty(e.target.value)}
            placeholder="Vendor / Supplier"
          />

          <label className="text-sm text-gray-300 mt-3">To</label>
          <input
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            value={toParty}
            onChange={(e) => setToParty(e.target.value)}
            placeholder="WH1/Stock1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Contact</label>
          <input
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Vendor contact"
          />

          <div className="text-xs text-gray-400 mt-4">
            Status will start as <span className="text-amber-300">Draft</span>.
            If you click <span className="text-emerald-300">Validate</span>,
            it will move to <span className="text-emerald-300">Ready</span>.
          </div>
        </div>
      </div>

      {/* Lines table */}
      <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium">Products</h2>
          <button
            onClick={addLine}
            className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-sm"
          >
            + Add line
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300">
                <th className="text-left py-2 px-2">Product</th>
                <th className="text-left py-2 px-2 w-28">Qty</th>
                <th className="text-left py-2 px-2 w-36">UOM</th>
                <th className="py-2 px-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => {
                const prod = products.find(p => p._id === line.productId);
                return (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-2 px-2">
                      <select
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full"
                        value={line.productId}
                        onChange={(e) =>
                          handleLineChange(index, "productId", e.target.value)
                        }
                      >
                        <option value="">Select product</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>
                            {p.code} - {p.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min="1"
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 w-full"
                        value={line.quantity}
                        onChange={(e) =>
                          handleLineChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-2 px-2 text-gray-300">
                      {prod?.uom || "-"}
                    </td>
                    <td className="py-2 px-2 text-right">
                      {lines.length > 1 && (
                        <button
                          onClick={() => removeLine(index)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Stock impact happens only when operation is marked{" "}
          <span className="text-emerald-300">Done</span> on the Receipt detail
          page.
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/operations/receipts")}
          className="px-4 py-2 rounded border border-gray-700 bg-gray-900 hover:bg-gray-800 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit("draft")}
          disabled={submitting}
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-60 text-sm"
        >
          {submitting ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={() => handleSubmit("validate")}
          disabled={submitting}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-sm"
        >
          {submitting ? "Processing..." : "Validate"}
        </button>
      </div>
    </div>
  );
};

export default NewReceiptPage;
