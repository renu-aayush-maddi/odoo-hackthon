// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useUserStore = create((set, get) => ({
// 	user: null,
// 	loading: false,
// 	checkingAuth: true,

// 	signup: async ({ name, email, password, confirmPassword }) => {
// 		set({ loading: true });

// 		if (password !== confirmPassword) {
// 			set({ loading: false });
// 			return toast.error("Passwords do not match");
// 		}

// 		try {
// 			const res = await axios.post("/auth/signup", { name, email, password });
// 			set({ user: res.data, loading: false });
// 		} catch (error) {
// 			set({ loading: false });
// 			toast.error(error.response.data.message || "An error occurred");
// 		}
// 	},
// 	login: async (email, password) => {
// 		set({ loading: true });

// 		try {
// 			const res = await axios.post("/auth/login", 
// 				{ email, password });

// 			set({ user: res.data, loading: false });
// 		} catch (error) {
// 			set({ loading: false });
// 			toast.error(error.response.data.message || "An error occurred");
// 		}
// 	},
// 	logout: async () => {
// 		try {
// 			await axios.post("/auth/logout");
// 			set({ user: null });
// 		} catch (error) {
// 			toast.error(error.response?.data?.message || "An error occurred during logout");
// 		}
// 	},

// 	checkAuth: async () => {
// 		set({ checkingAuth: true });
// 		try {
// 			const response = await axios.get("/auth/profile");
// 			set({ user: response.data, checkingAuth: false });
// 		} catch (error) {
// 			console.log(error.message);
// 			set({ checkingAuth: false, user: null });
// 		}
// 	},

// 	refreshToken: async () => {
// 		// Prevent multiple simultaneous refresh attempts
// 		if (get().checkingAuth) return;

// 		set({ checkingAuth: true });
// 		try {
// 			const response = await axios.post("/auth/refresh-token");
// 			set({ checkingAuth: false });
// 			return response.data;
// 		} catch (error) {
// 			set({ user: null, checkingAuth: false });
// 			throw error;
// 		}
// 	},
	  
// }));




// // Axios interceptor for token refresh
// let refreshPromise = null;

// axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				// If a refresh is already in progress, wait for it to complete
// 				if (refreshPromise) {
// 					await refreshPromise;
// 					return axios(originalRequest);
// 				}

// 				// Start a new refresh process
// 				refreshPromise = useUserStore.getState().refreshToken();
// 				await refreshPromise;
// 				refreshPromise = null;

// 				return axios(originalRequest);
// 			} catch (refreshError) {
// 				// If refresh fails, redirect to login or handle as needed
// 				useUserStore.getState().logout();
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );




// import { create } from "zustand";
// import axios from "../lib/axios";
// import { toast } from "react-hot-toast";

// export const useUserStore = create((set, get) => ({
//   user: null,
//   loading: false,
//   checkingAuth: true,

//   signup: async ({ name, email, password, confirmPassword, role }) => {
//     set({ loading: true });

//     if (password !== confirmPassword) {
//       set({ loading: false });
//       return toast.error("Passwords do not match");
//     }

//     try {
//       const res = await axios.post("/auth/signup", {
//         name,
//         email,
//         password,
//         role, // "admin" | "inventory_manager" | "warehouse_staff"
//       });

//       // backend returns { user: {...}, message: "..." }
//       set({ user: res.data.user, loading: false });
//       toast.success(res.data.message || "Signup successful");
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   },

//   login: async (email, password) => {
//     set({ loading: true });

//     try {
//       // backend returns user object directly
//       const res = await axios.post("/auth/login", { email, password });
//       set({ user: res.data, loading: false });
//       toast.success("Logged in");
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("/auth/logout");
//       set({ user: null });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   },

//   checkAuth: async () => {
//     set({ checkingAuth: true });
//     try {
//       const res = await axios.get("/auth/profile");
//       set({ user: res.data, checkingAuth: false });
//     } catch (error) {
//       console.log(error.message);
//       set({ checkingAuth: false, user: null });
//     }
//   },

//   refreshToken: async () => {
//     if (get().checkingAuth) return;
//     set({ checkingAuth: true });
//     try {
//       const res = await axios.post("/auth/refresh-token");
//       set({ checkingAuth: false });
//       return res.data;
//     } catch (error) {
//       set({ user: null, checkingAuth: false });
//       throw error;
//     }
//   },
//   updateProfile: async (payload) => {
//   set({ loading: true });
//   try {
//     const res = await axios.put("/auth/profile", payload);
//     set({ user: res.data.user, loading: false });
//     toast.success("Profile updated!");
//   } catch (error) {
//     set({ loading: false });
//     toast.error(error.response?.data?.message || "Update failed");
//   }
// },

//  verifyEmail: async ({ email, otp }) => {
//     set({ loading: true });

//     try {
//       const res = await axios.post("/auth/verify-email", { email, otp });
//       set({ user: res.data.user, loading: false });
//       toast.success(res.data.message || "Email verified");
//     } catch (error) {
//       set({ loading: false });
//       toast.error(error.response?.data?.message || "Invalid OTP");
//       throw error;
//     }
//   },

//   // -------------------- FORGOT PASSWORD: REQUEST OTP --------------------
//     requestPasswordOTP: async (email) => {
//       set({ loading: true });
  
//       try {
//         await axios.post("/auth/request-otp", { email });
//         set({ loading: false });
//         toast.success("Password reset OTP sent to your email");
//       } catch (error) {
//         set({ loading: false });
//         toast.error(
//           error.response?.data?.message || "Failed to send reset OTP"
//         );
//         throw error;
//       }
//     },
  
//     // -------------------- FORGOT PASSWORD: RESET WITH OTP --------------------
//     resetPasswordWithOTP: async ({ email, otp, newPassword }) => {
//       set({ loading: true });
  
//       try {
//         const res = await axios.post("/auth/reset-password", {
//           email,
//           otp,
//           newPassword,
//         });
  
//         set({ loading: false });
//         toast.success(
//           res.data?.message || "Password reset successful. Please log in."
//         );
//       } catch (error) {
//         set({ loading: false });
//         toast.error(error.response?.data?.message || "Failed to reset password");
//         throw error;
//       }
//     },

// }));

// // ===== Axios interceptor (same file or separate, your choice) =====
// let refreshPromise = null;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (refreshPromise) {
//           await refreshPromise;
//           return axios(originalRequest);
//         }

//         refreshPromise = useUserStore.getState().refreshToken();
//         await refreshPromise;
//         refreshPromise = null;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         useUserStore.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );





import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, role }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      toast.success(res.data.message || "Verification OTP sent");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    }
  },

  verifyEmail: async ({ email, otp }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/verify-email", { email, otp });
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message || "Email verified");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Invalid OTP");
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Logged in");
    } catch (error) {
      set({ loading: false });

      const msg =
        error.response?.data?.message || "Invalid credentials";

      toast.error(msg);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  // -------------------- FORGOT PASSWORD: REQUEST OTP --------------------
  requestPasswordOTP: async (email) => {
    set({ loading: true });

    try {
      await axios.post("/auth/request-otp", { email });
      set({ loading: false });
      toast.success("Password reset OTP sent to your email");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to send reset OTP"
      );
      throw error;
    }
  },

  // -------------------- FORGOT PASSWORD: RESET WITH OTP --------------------
  resetPasswordWithOTP: async ({ email, otp, newPassword }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      set({ loading: false });
      toast.success(
        res.data?.message || "Password reset successful. Please log in."
      );
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to reset password");
      throw error;
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (_) {
      set({ checkingAuth: false, user: null });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });

    try {
      const res = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return res.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
  updateProfile: async (payload) => {
  set({ loading: true });
  try {
    const res = await axios.put("/auth/profile", payload);
    set({ user: res.data.user, loading: false });
    toast.success("Profile updated!");
  } catch (error) {
    set({ loading: false });
    toast.error(error.response?.data?.message || "Update failed");
  }
},

}));

// ==== INTERCEPTOR ====

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



