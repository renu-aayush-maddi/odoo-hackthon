import { useEffect, useState } from "react";
import { useWarehouseStore } from "../stores/useWarehouseStore";
import { useStockStore } from "../stores/useStockStore";

const StockPage = () => {
  const { warehouses, fetchWarehouses } = useWarehouseStore();
  const { rows, fetchWarehouseStock, loading } = useStockStore();
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  useEffect(() => {
    if (selectedWarehouse) fetchWarehouseStock(selectedWarehouse);
  }, [selectedWarehouse, fetchWarehouseStock]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-pink-300">Stock</h1>

        <select
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className="px-3 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
        >
          <option value="">Select warehouse</option>
          {warehouses.map((w) => (
            <option key={w._id} value={w._id}>
              {w.code} - {w.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm text-slate-400">Loading stock...</p>}

      {!selectedWarehouse && (
        <p className="text-sm text-slate-400">
          Choose a warehouse to see stock table.
        </p>
      )}

      {selectedWarehouse && (
        <div className="border border-pink-400/40 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/80 border-b border-pink-400/40">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Per unit cost</th>
                <th className="px-4 py-2 text-left">On hand</th>
                <th className="px-4 py-2 text-left">Free to use</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row._id}
                  className="border-b border-slate-800 last:border-none"
                >
                  <td className="px-4 py-2">
                    {row.product?.name} ({row.product?.code})
                  </td>
                  <td className="px-4 py-2">{row.product?.unitCost} Rs</td>
                  <td className="px-4 py-2">{row.onHand}</td>
                  <td className="px-4 py-2">
                    {row.freeToUse ?? row.onHand - (row.reserved || 0)}
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-slate-500"
                  >
                    No stock entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-500">
        User must be able to update the stock from here → this will connect to
        Receipt / Delivery operations (we can add inline adjust later if you
        want).
      </p>
    </div>
  );
};

export default StockPage;
