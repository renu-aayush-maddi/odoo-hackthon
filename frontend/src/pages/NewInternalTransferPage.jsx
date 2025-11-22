import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useProductStore } from "../stores/useProductStore";
import { useOperationStore } from "../stores/useOperationStore";

const NewInternalTransferPage = () => {
  const navigate = useNavigate();

  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { products, fetchProducts } = useProductStore();
  const { createOperation } = useOperationStore();

  const [fromWarehouse, setFromWarehouse] = useState("");
  const [toWarehouse, setToWarehouse] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [fromLocation, setFromLocation] = useState("Main Location");
  const [toLocation, setToLocation] = useState("Secondary Location");
  const [lines, setLines] = useState([
    { product: "", quantity: 1 },
  ]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
  }, [fetchWarehouses, fetchProducts]);

  const handleLineChange = (index, field, value) => {
    setLines((prev) =>
      prev.map((line, i) =>
        i === index ? { ...line, [field]: value } : line
      )
    );
  };

  const addLine = () => {
    setLines((prev) => [...prev, { product: "", quantity: 1 }]);
  };

  const removeLine = (index) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromWarehouse || !toWarehouse) {
      return alert("Select both from and to warehouse");
    }

    const validLines = lines.filter(
      (l) => l.product && Number(l.quantity) > 0
    );

    if (!validLines.length) {
      return alert("Add at least one product line with quantity > 0");
    }

    try {
      setSubmitting(true);

      const payload = {
        type: "internal",
        fromWarehouse,
        toWarehouse,
        fromParty: fromLocation,
        toParty: toLocation,
        scheduleDate: scheduleDate || new Date().toISOString(),
        products: validLines.map((l) => ({
          product: l.product,
          quantity: Number(l.quantity),
        })),
      };

      const op = await createOperation(payload);
      navigate(`/operations/internal/${op._id}`);
    } catch (err) {
      // toast already handled in store
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pink-200">
          New Internal Transfer
        </h1>

        <button
          type="button"
          onClick={() => navigate("/operations/internal")}
          className="px-4 py-2 rounded-full border border-pink-500/70 text-xs font-medium text-pink-200 hover:bg-pink-500/10"
        >
          Back to list
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-pink-500/40 rounded-2xl p-6 bg-slate-900/40"
      >
        {/* Warehouses / schedule */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              From warehouse
            </label>
            <select
              value={fromWarehouse}
              onChange={(e) => setFromWarehouse(e.target.value)}
              className="w-full rounded-lg bg-slate-950/60 border border-pink-500/40 px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              To warehouse
            </label>
            <select
              value={toWarehouse}
              onChange={(e) => setToWarehouse(e.target.value)}
              className="w-full rounded-lg bg-slate-950/60 border border-pink-500/40 px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Schedule date
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full rounded-lg bg-slate-950/60 border border-pink-500/40 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* locations */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              From location
            </label>
            <input
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full rounded-lg bg-slate-950/60 border border-pink-500/40 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              To location
            </label>
            <input
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full rounded-lg bg-slate-950/60 border border-pink-500/40 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Lines */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-pink-200">
              Products to move
            </h2>
            <button
              type="button"
              onClick={addLine}
              className="px-3 py-1 rounded-full bg-pink-500 text-xs font-semibold text-black hover:bg-pink-400"
            >
              + Add line
            </button>
          </div>

          <div className="space-y-2">
            {lines.map((line, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-3 items-center bg-slate-950/50 border border-pink-500/30 rounded-xl px-3 py-2"
              >
                <select
                  value={line.product}
                  onChange={(e) =>
                    handleLineChange(index, "product", e.target.value)
                  }
                  className="rounded-lg bg-slate-900/70 border border-pink-500/40 px-2 py-1 text-xs md:text-sm"
                >
                  <option value="">Select product...</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.code} - {p.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={1}
                  value={line.quantity}
                  onChange={(e) =>
                    handleLineChange(index, "quantity", e.target.value)
                  }
                  className="rounded-lg bg-slate-900/70 border border-pink-500/40 px-2 py-1 text-xs md:text-sm"
                />

                <div className="flex justify-end">
                  {lines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLine(index)}
                      className="text-xs text-red-300 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-full bg-pink-500 text-sm font-semibold text-black hover:bg-pink-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create Transfer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInternalTransferPage;
