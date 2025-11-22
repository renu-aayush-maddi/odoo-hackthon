import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load products");
    }
  },

  createProduct: async (payload) => {
    try {
      const res = await axios.post("/products", payload);
      set((state) => ({ products: [...state.products, res.data] }));
      toast.success("Product created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  },
}));
