import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useStockStore = create((set) => ({
  rows: [],
  loading: false,

  fetchWarehouseStock: async (warehouseId) => {
    if (!warehouseId) return;

    set({ loading: true });

    try {
      const res = await axios.get(`/stock/warehouse/${warehouseId}`);
      set({ rows: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to load stock items"
      );
    }
  },
}));
