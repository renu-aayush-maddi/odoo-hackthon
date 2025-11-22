// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useOperationStore = create((set) => ({
//   operations: [],
//   current: null,
//   loading: false,

//   fetchOperations: async (type) => {
//     set({ loading: true });
//     try {
//       const res = await axios.get("/operations", {
//         params: type ? { type } : {},
//       });
//       set({ operations: res.data, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Failed to load operations");
//     }
//   },

//   fetchOperationById: async (id) => {
//     set({ loading: true });
//     try {
//       const res = await axios.get(`/operations/${id}`);
//       set({ current: res.data, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Failed to load operation");
//     }
//   },

//   createOperation: async (payload) => {
//     try {
//       const res = await axios.post("/operations", payload);
//       set((state) => ({ operations: [res.data, ...state.operations] }));
//       toast.success("Operation created");
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create operation");
//       throw error;
//     }
//   },

//   moveToReady: async (id) => {
//     try {
//       const res = await axios.post(`/operations/${id}/ready`);
//       set((state) => ({
//         operations: state.operations.map((op) =>
//           op._id === id ? res.data : op
//         ),
//       }));
//       toast.success("Moved to Ready");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update");
//     }
//   },

//   moveToDone: async (id) => {
//     try {
//       const res = await axios.post(`/operations/${id}/done`);
//       set((state) => ({
//         operations: state.operations.map((op) =>
//           op._id === id ? res.data : op
//         ),
//       }));
//       toast.success("Marked Done");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update");
//     }
//   },
// }));




// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useOperationStore = create((set, get) => ({

//   // ========= STATE =========
//   operations: [],        // generic list (old)
//   receipts: [],          // new
//   deliveries: [],        // new
//   history: [],           // new
//   current: null,
//   loading: false,
//   historyLoading: false,

//   // ========= FETCH ALL (OLD) =========
//   fetchOperations: async (type) => {
//     set({ loading: true });
//     try {
//       const res = await axios.get("/operations", {
//         params: type ? { type } : {},
//       });
//       set({ operations: res.data, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Failed to load operations");
//     }
//   },

//   // ========= FETCH RECEIPTS ONLY =========
//   fetchReceipts: async () => {
//     set({ loading: true });
//     try {
//       const res = await axios.get("/operations", { params: { type: "receipt" } });
//       set({ receipts: res.data, loading: false });
//     } catch (err) {
//       set({ loading: false });
//       toast.error("Failed to load receipts");
//     }
//   },

//   // ========= FETCH DELIVERIES ONLY =========
//   fetchDeliveries: async () => {
//     set({ loading: true });
//     try {
//       const res = await axios.get("/operations", { params: { type: "delivery" } });
//       set({ deliveries: res.data, loading: false });
//     } catch (err) {
//       set({ loading: false });
//       toast.error("Failed to load deliveries");
//     }
//   },

//   // ========= FETCH HISTORY WITH FILTERS =========
//   fetchHistory: async (filters = {}) => {
//     set({ historyLoading: true });

//     const params = {};
//     if (filters.type && filters.type !== "all") params.type = filters.type;
//     if (filters.status && filters.status !== "all") params.status = filters.status;
//     if (filters.warehouse && filters.warehouse !== "all") params.warehouse = filters.warehouse;
//     if (filters.category && filters.category !== "all") params.category = filters.category;

//     try {
//       const res = await axios.get("/operations", { params });
//       set({ history: res.data, historyLoading: false });
//     } catch (err) {
//       console.error(err);
//       set({ history: [], historyLoading: false });
//       toast.error("Failed to load move history");
//     }
//   },

//   // ========= FETCH SINGLE OPERATION =========
//   fetchOperationById: async (id) => {
//     set({ loading: true });
//     try {
//       const res = await axios.get(`/operations/${id}`);
//       set({ current: res.data, loading: false });
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Failed to load operation");
//     }
//   },

//   // ========= CREATE NEW RECEIPT / DELIVERY =========
//   createOperation: async (payload) => {
//     try {
//       const res = await axios.post("/operations", payload);

//       // auto insert into correct list
//       if (payload.type === "receipt") {
//         set((s) => ({ receipts: [res.data, ...s.receipts] }));
//       } else if (payload.type === "delivery") {
//         set((s) => ({ deliveries: [res.data, ...s.deliveries] }));
//       }

//       toast.success("Operation created");
//       return res.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create operation");
//       throw error;
//     }
//   },

//   // ========= STATUS UPDATES =========
//   moveToReady: async (id) => {
//     try {
//       const res = await axios.post(`/operations/${id}/ready`);

//       const update = (ops) =>
//         ops.map((op) => (op._id === id ? res.data : op));

//       set((state) => ({
//         receipts: update(state.receipts),
//         deliveries: update(state.deliveries),
//         operations: update(state.operations),
//         history: update(state.history),
//       }));

//       toast.success("Moved to Ready");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update");
//     }
//   },

//   moveToDone: async (id) => {
//     try {
//       const res = await axios.post(`/operations/${id}/done`);

//       const update = (ops) =>
//         ops.map((op) => (op._id === id ? res.data : op));

//       set((state) => ({
//         receipts: update(state.receipts),
//         deliveries: update(state.deliveries),
//         operations: update(state.operations),
//         history: update(state.history),
//       }));

//       toast.success("Marked Done");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update");
//     }
//   },
// }));



// src/stores/useOperationStore.js
import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useOperationStore = create((set, get) => ({
  // generic list
  operations: [],
  current: null,
  loading: false,

  // type-specific lists (used by Receipts / Deliveries / Internal pages)
  receipts: [],
  deliveries: [],
  internalTransfers: [],
  adjustments: [],

  // ---------- CORE FETCH ---------- //
  fetchOperations: async (type) => {
    set({ loading: true });
    try {
      const res = await axios.get("/operations", {
        params: type ? { type } : {},
      });

      const ops = res.data || [];

      const update = { operations: ops, loading: false };

      if (type === "receipt") update.receipts = ops;
      if (type === "delivery") update.deliveries = ops;
      if (type === "internal") update.internalTransfers = ops;
      if (type === "adjustment") update.adjustments = ops;

      set(update);
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to load operations"
      );
    }
  },

  // convenience wrappers (used by pages)
  fetchReceipts: async () => {
    return get().fetchOperations("receipt");
  },

  fetchDeliveries: async () => {
    return get().fetchOperations("delivery");
  },

  fetchInternalTransfers: async () => {
    return get().fetchOperations("internal");
  },

  fetchAdjustments: async () => {
    return get().fetchOperations("adjustment");
  },

  // ---------- SINGLE OP ---------- //
  fetchOperationById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/operations/${id}`);
      set({ current: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to load operation"
      );
    }
  },

  // ---------- CREATE ---------- //
  createOperation: async (payload) => {
    try {
      const res = await axios.post("/operations", payload);

      const newOp = res.data;

      set((state) => ({
        operations: [newOp, ...state.operations],
        // also push into type-specific list if we know its type
        receipts:
          newOp.type === "receipt"
            ? [newOp, ...state.receipts]
            : state.receipts,
        deliveries:
          newOp.type === "delivery"
            ? [newOp, ...state.deliveries]
            : state.deliveries,
        internalTransfers:
          newOp.type === "internal"
            ? [newOp, ...state.internalTransfers]
            : state.internalTransfers,
        adjustments:
          newOp.type === "adjustment"
            ? [newOp, ...state.adjustments]
            : state.adjustments,
      }));

      toast.success("Operation created");
      return newOp;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create operation"
      );
      throw error;
    }
  },

  // ---------- STATUS CHANGES ---------- //
  moveToReady: async (id) => {
    try {
      const res = await axios.post(`/operations/${id}/ready`);
      const updated = res.data;

      set((state) => ({
        operations: state.operations.map((op) =>
          op._id === id ? updated : op
        ),
        receipts: state.receipts.map((op) =>
          op._id === id ? updated : op
        ),
        deliveries: state.deliveries.map((op) =>
          op._id === id ? updated : op
        ),
        internalTransfers: state.internalTransfers.map((op) =>
          op._id === id ? updated : op
        ),
        adjustments: state.adjustments.map((op) =>
          op._id === id ? updated : op
        ),
        current: state.current && state.current._id === id ? updated : state.current,
      }));

      toast.success("Moved to Ready");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  },

  moveToDone: async (id) => {
    try {
      const res = await axios.post(`/operations/${id}/done`);
      const updated = res.data;

      set((state) => ({
        operations: state.operations.map((op) =>
          op._id === id ? updated : op
        ),
        receipts: state.receipts.map((op) =>
          op._id === id ? updated : op
        ),
        deliveries: state.deliveries.map((op) =>
          op._id === id ? updated : op
        ),
        internalTransfers: state.internalTransfers.map((op) =>
          op._id === id ? updated : op
        ),
        adjustments: state.adjustments.map((op) =>
          op._id === id ? updated : op
        ),
        current: state.current && state.current._id === id ? updated : state.current,
      }));

      toast.success("Marked Done");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  },
}));
