import { useEffect, useState } from "react";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";
import { useOperationStore } from "../stores/useOperationStore";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const ReceiptCreatePage = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { products, fetchProducts } = useProductStore();
  const { createOperation, loading } = useOperationStore();

  // form fields
  const [warehouse, setWarehouse] = useState("");
  const [fromParty, setFromParty] = useState("");
  const [toParty, setToParty] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [lines, setLines] = useState([
    { product: "", quantity: "" },
  ]);

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, []);

  const addLine = () => {
    setLines([...lines, { product: "", quantity: "" }]);
  };

  const updateLine = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = value;
    setLines(updated);
  };

  const removeLine = (i) => {
    if (lines.length === 1) return;
    setLines(lines.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async () => {
    if (!warehouse || !fromParty || !scheduleDate)
      return alert("Please fill all required fields");

    const payload = {
      type: "receipt",
      warehouse,
      fromParty,
      toParty: toParty || warehouse, // default WH/Stock
      scheduleDate,
      products: lines
        .filter((l) => l.product && l.quantity)
        .map((l) => ({
          product: l.product,
          quantity: Number(l.quantity),
        })),
      responsible: user?._id,
    };

    const op = await createOperation(payload);
    navigate(`/operations/receipts/${op._id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-pink-300">
        New Receipt
      </h1>

      {/* Form Section */}
      <div className="bg-slate-900/60 border border-pink-400/40 p-6 rounded-xl space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Warehouse *</label>
            <select
              className="w-full bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
            >
              <option value="">Select warehouse</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Receive From *</label>
            <input
              className="w-full bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
              value={fromParty}
              onChange={(e) => setFromParty(e.target.value)}
              placeholder="Vendor name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Schedule Date *</label>
            <input
              type="datetime-local"
              className="w-full bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">To</label>
            <input
              className="w-full bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
              value={toParty}
              onChange={(e) => setToParty(e.target.value)}
              placeholder="Default: WH/Stock1"
            />
          </div>
        </div>

        {/* Product Lines */}
        <div className="space-y-4">
          <h2 className="text-lg text-pink-300">Products</h2>

          {lines.map((line, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              <select
                className="bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
                value={line.product}
                onChange={(e) =>
                  updateLine(idx, "product", e.target.value)
                }
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
                className="bg-black/40 border border-pink-400/40 rounded-lg px-3 py-2"
                value={line.quantity}
                onChange={(e) =>
                  updateLine(idx, "quantity", e.target.value)
                }
                placeholder="Qty"
              />

              <button
                className="text-sm px-3 py-2 rounded-lg bg-red-500/30 hover:bg-red-500/50"
                onClick={() => removeLine(idx)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className="px-3 py-2 text-sm rounded-lg bg-green-500/20 border border-green-500/40 hover:bg-green-500/30"
            onClick={addLine}
          >
            + Add Line
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-pink-500/60 hover:bg-pink-500 text-sm disabled:opacity-50"
        >
          {loading ? "Creating..." : "Save Receipt (Draft)"}
        </button>
      </div>
    </div>
  );
};

export default ReceiptCreatePage;
