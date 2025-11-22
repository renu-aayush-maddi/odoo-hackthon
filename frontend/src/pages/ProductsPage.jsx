// import { useEffect, useState } from "react";
// import { useProductStore } from "../stores/useProductStore";
// import { useUserStore } from "../stores/useUserStore";

// const ProductsPage = () => {
//   const { user } = useUserStore();
//   const { products, loading, fetchProducts, createProduct } = useProductStore();

//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     unitCost: "",
//     uom: "Units",
//   });

//   const canEdit =
//     user?.role === "admin" || user?.role === "inventory_manager";

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.code || !formData.name || !formData.unitCost) return;

//     createProduct({
//       ...formData,
//       unitCost: Number(formData.unitCost),
//     });

//     setFormData({
//       code: "",
//       name: "",
//       unitCost: "",
//       uom: "Units",
//     });
//   };

//   return (
//     <div className="px-6 py-4 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-rose-200">Products</h1>
//         <span className="text-sm text-gray-400">
//           Role: <span className="font-medium">{user?.role}</span>
//         </span>
//       </div>

//       {canEdit && (
//         <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl p-4">
//           <h2 className="text-lg mb-3 text-rose-200">New Product</h2>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-4 gap-3"
//           >
//             <input
//               name="code"
//               placeholder="Code (e.g. DESK001)"
//               value={formData.code}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <input
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <input
//               name="unitCost"
//               type="number"
//               placeholder="Unit cost"
//               value={formData.unitCost}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <div className="flex gap-2">
//               <input
//                 name="uom"
//                 placeholder="UoM"
//                 value={formData.uom}
//                 onChange={handleChange}
//                 className="flex-1 bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 text-sm rounded-lg bg-rose-500 hover:bg-rose-400 disabled:opacity-50"
//               >
//                 {loading ? "Saving..." : "Add"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl">
//         <div className="border-b border-rose-500/40 px-4 py-2 flex text-sm font-medium text-rose-200">
//           <div className="w-2/12">Code</div>
//           <div className="w-4/12">Product</div>
//           <div className="w-3/12">Per unit cost</div>
//           <div className="w-3/12">UoM</div>
//         </div>

//         {loading && products.length === 0 && (
//           <div className="px-4 py-4 text-sm text-gray-400">Loading...</div>
//         )}

//         {products.length === 0 && !loading && (
//           <div className="px-4 py-4 text-sm text-gray-400">
//             No products yet. {canEdit && "Create your first product above."}
//           </div>
//         )}

//         {products.map((p) => (
//           <div
//             key={p._id}
//             className="px-4 py-2 text-sm text-gray-200 border-t border-dashed border-rose-500/40 flex"
//           >
//             <div className="w-2/12">{p.code}</div>
//             <div className="w-4/12">{p.name}</div>
//             <div className="w-3/12">{p.unitCost} Rs</div>
//             <div className="w-3/12">{p.uom}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;





// import { useEffect, useState } from "react";
// import { useProductStore } from "../stores/useProductStore";
// import { useUserStore } from "../stores/useUserStore";

// const ProductsPage = () => {
//   const { user } = useUserStore();
//   const {
//     products,
//     loading,
//     fetchProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//   } = useProductStore();

//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     unitCost: "",
//     uom: "Units",
//   });

//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     code: "",
//     name: "",
//     unitCost: "",
//     uom: "Units",
//   });

//   const canEdit =
//     user?.role === "admin" || user?.role === "inventory_manager";
//   const canDelete = user?.role === "admin";

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.code || !formData.name || !formData.unitCost) return;

//     createProduct({
//       ...formData,
//       unitCost: Number(formData.unitCost),
//     });

//     setFormData({
//       code: "",
//       name: "",
//       unitCost: "",
//       uom: "Units",
//     });
//   };

//   const startEdit = (p) => {
//     setEditingId(p._id);
//     setEditFormData({
//       code: p.code,
//       name: p.name,
//       unitCost: p.unitCost,
//       uom: p.uom || "Units",
//     });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditFormData({
//       code: "",
//       name: "",
//       unitCost: "",
//       uom: "Units",
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editingId) return;
//     if (!editFormData.code || !editFormData.name || !editFormData.unitCost)
//       return;

//     await updateProduct(editingId, {
//       ...editFormData,
//       unitCost: Number(editFormData.unitCost),
//     });

//     cancelEdit();
//   };

//   const handleDelete = async (id) => {
//     const ok = window.confirm("Are you sure you want to delete this product?");
//     if (!ok) return;
//     await deleteProduct(id);
//   };

//   return (
//     <div className="px-6 py-4 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-rose-200">Products</h1>
//         <span className="text-sm text-gray-400">
//           Role: <span className="font-medium">{user?.role}</span>
//         </span>
//       </div>

//       {canEdit && (
//         <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl p-4">
//           <h2 className="text-lg mb-3 text-rose-200">New Product</h2>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-4 gap-3"
//           >
//             <input
//               name="code"
//               placeholder="Code (e.g. DESK001)"
//               value={formData.code}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <input
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <input
//               name="unitCost"
//               type="number"
//               placeholder="Unit cost"
//               value={formData.unitCost}
//               onChange={handleChange}
//               className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//             />
//             <div className="flex gap-2">
//               <input
//                 name="uom"
//                 placeholder="UoM"
//                 value={formData.uom}
//                 onChange={handleChange}
//                 className="flex-1 bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 text-sm rounded-lg bg-rose-500 hover:bg-rose-400 disabled:opacity-50"
//               >
//                 {loading ? "Saving..." : "Add"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Edit form (only visible when editingId is set) */}
//       {canEdit && editingId && (
//         <div className="bg-gray-900/60 border border-amber-400/40 rounded-xl p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-lg text-amber-200">
//               Update Product ({editFormData.code})
//             </h2>
//             <button
//               onClick={cancelEdit}
//               className="text-xs px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
//             >
//               Cancel
//             </button>
//           </div>

//           <form
//             onSubmit={handleEditSubmit}
//             className="grid grid-cols-1 md:grid-cols-4 gap-3"
//           >
//             <input
//               name="code"
//               placeholder="Code"
//               value={editFormData.code}
//               onChange={handleEditChange}
//               className="bg-black/40 border border-amber-400/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-300"
//             />
//             <input
//               name="name"
//               placeholder="Name"
//               value={editFormData.name}
//               onChange={handleEditChange}
//               className="bg-black/40 border border-amber-400/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-300"
//             />
//             <input
//               name="unitCost"
//               type="number"
//               placeholder="Unit cost"
//               value={editFormData.unitCost}
//               onChange={handleEditChange}
//               className="bg-black/40 border border-amber-400/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-300"
//             />
//             <div className="flex gap-2">
//               <input
//                 name="uom"
//                 placeholder="UoM"
//                 value={editFormData.uom}
//                 onChange={handleEditChange}
//                 className="flex-1 bg-black/40 border border-amber-400/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-300"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 text-sm rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold disabled:opacity-50"
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl">
//         <div className="border-b border-rose-500/40 px-4 py-2 flex text-sm font-medium text-rose-200">
//           <div className="w-2/12">Code</div>
//           <div className="w-3/12">Product</div>
//           <div className="w-2/12">Per unit cost</div>
//           <div className="w-2/12">UoM</div>
//           {canEdit && <div className="w-3/12 text-right">Actions</div>}
//         </div>

//         {loading && products.length === 0 && (
//           <div className="px-4 py-4 text-sm text-gray-400">Loading...</div>
//         )}

//         {products.length === 0 && !loading && (
//           <div className="px-4 py-4 text-sm text-gray-400">
//             No products yet. {canEdit && "Create your first product above."}
//           </div>
//         )}

//         {products.map((p) => (
//           <div
//             key={p._id}
//             className="px-4 py-2 text-sm text-gray-200 border-t border-dashed border-rose-500/40 flex items-center"
//           >
//             <div className="w-2/12 truncate">{p.code}</div>
//             <div className="w-3/12 truncate">{p.name}</div>
//             <div className="w-2/12">{p.unitCost} Rs</div>
//             <div className="w-2/12">{p.uom}</div>

//             {canEdit && (
//               <div className="w-3/12 flex justify-end gap-2">
//                 <button
//                   onClick={() => startEdit(p)}
//                   className="px-3 py-1 rounded-lg text-xs bg-amber-500/90 hover:bg-amber-400 text-black font-medium"
//                 >
//                   Update
//                 </button>
//                 {canDelete && (
//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="px-3 py-1 rounded-lg text-xs bg-red-600/90 hover:bg-red-500 text-white font-medium"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;




import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";

const ProductsPage = () => {
  const { user } = useUserStore();
  const {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    unitCost: "",
    uom: "Units",
  });

  const [editingId, setEditingId] = useState(null);

  const canEdit =
    user?.role === "admin" || user?.role === "inventory_manager";
  const canDelete = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      unitCost: "",
      uom: "Units",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.unitCost) return;

    const payload = {
      ...formData,
      unitCost: Number(formData.unitCost),
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      createProduct(payload);
    }

    resetForm();
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      code: product.code || "",
      name: product.name || "",
      unitCost: product.unitCost?.toString() || "",
      uom: product.uom || "Units",
    });
  };

  const handleDeleteClick = (id) => {
    if (!window.confirm("Delete this product?")) return;
    deleteProduct(id);
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-rose-200">
              {editingId ? "Edit Product" : "New Product"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-5 gap-3"
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
            <input
              name="uom"
              placeholder="UoM"
              value={formData.uom}
              onChange={handleChange}
              className="bg-black/40 border border-rose-500/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
            <div className="flex gap-2 items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm rounded-lg bg-rose-500 hover:bg-rose-400 disabled:opacity-50"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Saving..."
                  : editingId
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-900/60 border border-rose-500/40 rounded-xl">
        <div className="border-b border-rose-500/40 px-4 py-2 flex text-sm font-medium text-rose-200">
          <div className="w-2/12">Code</div>
          <div className="w-4/12">Product</div>
          <div className="w-2/12">Per unit cost</div>
          <div className="w-2/12">UoM</div>
          {canEdit && <div className="w-2/12 text-right">Actions</div>}
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
            className="px-4 py-2 text-sm text-gray-200 border-t border-dashed border-rose-500/40 flex items-center"
          >
            <div className="w-2/12">{p.code}</div>
            <div className="w-4/12">{p.name}</div>
            <div className="w-2/12">{p.unitCost} Rs</div>
            <div className="w-2/12">{p.uom}</div>
            {canEdit && (
              <div className="w-2/12 flex justify-end gap-2">
                <button
                  onClick={() => handleEditClick(p)}
                  className="px-2 py-1 rounded-md text-xs bg-blue-600 hover:bg-blue-500"
                >
                  Update
                </button>
                {canDelete && (
                  <button
                    onClick={() => handleDeleteClick(p._id)}
                    className="px-2 py-1 rounded-md text-xs bg-red-600 hover:bg-red-500"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
