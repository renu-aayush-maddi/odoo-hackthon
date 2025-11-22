import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useWarehouseStore = create((set) => ({
  warehouses: [],
  loading: false,

  fetchWarehouses: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/warehouses");
      set({ warehouses: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load warehouses");
    }
  },

  createWarehouse: async (payload) => {
    try {
      const res = await axios.post("/warehouses", payload);
      set((state) => ({ warehouses: [...state.warehouses, res.data] }));
      toast.success("Warehouse created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create warehouse");
    }
  },
}));
