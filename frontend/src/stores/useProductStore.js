// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useProductStore = create((set) => ({
//   products: [],
//   loading: false,

//   fetchProducts: async () => {
//     set({ loading: true });
//     try {
//       const res = await axios.get("/products");
//       set({ products: res.data, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Failed to load products");
//     }
//   },

//   createProduct: async (payload) => {
//     try {
//       const res = await axios.post("/products", payload);
//       set((state) => ({ products: [...state.products, res.data] }));
//       toast.success("Product created");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create product");
//     }
//   },
//   updateProduct: async (id, product) => {
//     try {
//       set({ loading: true, error: null });
//       const { data } = await axios.put(`/api/products/${id}`, product);
//       set((state) => ({
//         products: state.products.map((p) => (p._id === id ? data : p)),
//         loading: false,
//       }));
//     } catch (error) {
//       set({ loading: false, error: error.response?.data?.message || error.message });
//       throw error;
//     }
//   },

//   deleteProduct: async (id) => {
//     try {
//       set({ loading: true, error: null });
//       await axios.delete(`/api/products/${id}`);
//       set((state) => ({
//         products: state.products.filter((p) => p._id !== id),
//         loading: false,
//       }));
//     } catch (error) {
//       set({ loading: false, error: error.response?.data?.message || error.message });
//       throw error;
//     }
//   },
// }));


// stores/useProductStore.js
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get("/api/products");
      set({ products: data, loading: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
      set({ loading: false });
    }
  },

  createProduct: async (product) => {
    try {
      set({ loading: true });
      const { data } = await axios.post("/api/products", product);
      set((state) => ({
        products: [data, ...state.products],
        loading: false,
      }));
      toast.success("Product created");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create product");
      set({ loading: false });
    }
  },

  updateProduct: async (id, updates) => {
    try {
      set({ loading: true });
      const { data } = await axios.put(`/api/products/${id}`, updates);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data : p)),
        loading: false,
      }));
      toast.success("Product updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product");
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ loading: true });
      await axios.delete(`/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      toast.success("Product deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete product");
      set({ loading: false });
    }
  },
}));
