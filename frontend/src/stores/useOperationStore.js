import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useOperationStore = create((set) => ({
  operations: [],
  current: null,
  loading: false,

  fetchOperations: async (type) => {
    set({ loading: true });
    try {
      const res = await axios.get("/operations", {
        params: type ? { type } : {},
      });
      set({ operations: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load operations");
    }
  },

  fetchOperationById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/operations/${id}`);
      set({ current: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load operation");
    }
  },

  createOperation: async (payload) => {
    try {
      const res = await axios.post("/operations", payload);
      set((state) => ({ operations: [res.data, ...state.operations] }));
      toast.success("Operation created");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create operation");
      throw error;
    }
  },

  moveToReady: async (id) => {
    try {
      const res = await axios.post(`/operations/${id}/ready`);
      set((state) => ({
        operations: state.operations.map((op) =>
          op._id === id ? res.data : op
        ),
      }));
      toast.success("Moved to Ready");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  },

  moveToDone: async (id) => {
    try {
      const res = await axios.post(`/operations/${id}/done`);
      set((state) => ({
        operations: state.operations.map((op) =>
          op._id === id ? res.data : op
        ),
      }));
      toast.success("Marked Done");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  },
}));
