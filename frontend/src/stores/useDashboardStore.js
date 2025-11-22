import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useDashboardStore = create((set) => ({
	loading: false,
	summary: null,   // { stock: {...}, operations: {...} }

	fetchSummary: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("/dashboard/summary");
			set({ summary: res.data, loading: false });
		} catch (error) {
			console.error("Dashboard error:", error);
			toast.error(
				error.response?.data?.message || "Failed to load dashboard"
			);
			set({ loading: false });
		}
	},
}));
