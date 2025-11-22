import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";

const ProductsPage = () => {
  const { user } = useUserStore();
  const { products, loading, fetchProducts, createProduct } = useProductStore();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    unitCost: "",
    uom: "Units",
  });

  const canEdit =
    user?.role === "admin" || user?.role === "inventory_manager";

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.unitCost) return;

    createProduct({
      ...formData,
      unitCost: Number(formData.unitCost),
    });

    setFormData({
      code: "",
      name: "",
      unitCost: "",
      uom: "Units",
    });
  };

  return (
    <div className="px-6 py-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-rose-200">Products</h1>
        <span className="text-sm text-gray-400">
          Role: <span className="font-medium">{user?.role}</span>
        </span>
      </div>

      {canEdit && (
        <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl p-4">
          <h2 className="text-lg mb-3 text-rose-200">New Product</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              name="code"
              placeholder="Code (e.g. DESK001)"
              value={formData.code}
              onChange={handleChange}
              className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
            <input
              name="unitCost"
              type="number"
              placeholder="Unit cost"
              value={formData.unitCost}
              onChange={handleChange}
              className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
            <div className="flex gap-2">
              <input
                name="uom"
                placeholder="UoM"
                value={formData.uom}
                onChange={handleChange}
                className="flex-1 bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg bg-rose-500 hover:bg-rose-400 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl">
        <div className="border-b border-rose-500/40 px-4 py-2 flex text-sm font-medium text-rose-200">
          <div className="w-2/12">Code</div>
          <div className="w-4/12">Product</div>
          <div className="w-3/12">Per unit cost</div>
          <div className="w-3/12">UoM</div>
        </div>

        {loading && products.length === 0 && (
          <div className="px-4 py-4 text-sm text-gray-400">Loading...</div>
        )}

        {products.length === 0 && !loading && (
          <div className="px-4 py-4 text-sm text-gray-400">
            No products yet. {canEdit && "Create your first product above."}
          </div>
        )}

        {products.map((p) => (
          <div
            key={p._id}
            className="px-4 py-2 text-sm text-gray-200 border-t border-dashed border-rose-500/40 flex"
          >
            <div className="w-2/12">{p.code}</div>
            <div className="w-4/12">{p.name}</div>
            <div className="w-3/12">{p.unitCost} Rs</div>
            <div className="w-3/12">{p.uom}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
