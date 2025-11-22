// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
// import { motion } from "framer-motion";
// import { useUserStore } from "../stores/useUserStore.js";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
// 		name: "",
// 		email: "",
// 		password: "",
// 		confirmPassword: "",
// 	});


//   const {signup,loading} = useUserStore()

//   const handleSubmit = (e) => {
// 		e.preventDefault();
// 		signup(formData);
// 	};
//   return (
//     <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
// 			<motion.div
// 				className='sm:mx-auto sm:w-full sm:max-w-md'
// 				initial={{ opacity: 0, y: -20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.8 }}
// 			>
// 				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
// 			</motion.div>



// 			<motion.div
// 				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.8, delay: 0.2 }}
// 			>
// 				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>

//       <form onSubmit={handleSubmit} className='space-y-6'>
// 						<div>
// 							<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
// 								Full name
// 							</label>
// 							<div className='mt-1 relative rounded-md shadow-sm'>
// 								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// 									<User className='h-5 w-5 text-gray-400' aria-hidden='true' />
// 								</div>
// 								<input
// 									id='name'
// 									type='text'
// 									required
// 									value={formData.name}
// 									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// 									className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
// 									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
// 									placeholder='John Doe'
// 								/>
// 							</div>
// 						</div>

// 						<div>
// 							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
// 								Email address
// 							</label>
// 							<div className='mt-1 relative rounded-md shadow-sm'>
// 								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// 									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
// 								</div>
// 								<input
// 									id='email'
// 									type='email'
// 									required
// 									value={formData.email}
// 									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// 									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
// 									rounded-md shadow-sm
// 									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
// 									 focus:border-emerald-500 sm:text-sm'
// 									placeholder='you@example.com'
// 								/>
// 							</div>
// 						</div>

// 						<div>
// 							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
// 								Password
// 							</label>
// 							<div className='mt-1 relative rounded-md shadow-sm'>
// 								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// 									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
// 								</div>
// 								<input
// 									id='password'
// 									type='password'
// 									required
// 									value={formData.password}
// 									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// 									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
// 									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
// 									placeholder='••••••••'
// 								/>
// 							</div>
// 						</div>

// 						<div>
// 							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
// 								Confirm Password
// 							</label>
// 							<div className='mt-1 relative rounded-md shadow-sm'>
// 								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// 									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
// 								</div>
// 								<input
// 									id='confirmPassword'
// 									type='password'
// 									required
// 									value={formData.confirmPassword}
// 									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
// 									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
// 									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
// 									placeholder='••••••••'
// 								/>
// 							</div>
// 						</div>

// 						<button
// 							type='submit'
// 							className='w-full flex justify-center py-2 px-4 border border-transparent 
// 							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
// 							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
// 							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
// 							disabled={loading}
// 						>
// 							{loading ? (
// 								<>
// 									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
// 									Loading...
// 								</>
// 							) : (
// 								<>
// 									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
// 									Sign up
// 								</>
// 							)}
// 						</button>
// 					</form>
//           <p className='mt-8 text-center text-sm text-gray-400'>
// 						Already have an account?{" "}
// 						<Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
// 							Login here <ArrowRight className='inline h-4 w-4' />
// 						</Link>
// 					</p>

//           </div>
//           </motion.div>
//       </div>
//   )
// }

// export default SignupPage



// import { useState } from "react";
// import { useUserStore } from "../stores/useUserStore";

// const SignupPage = () => {
//   const { signup, loading } = useUserStore();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "inventory_manager",
//   });

//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(form);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[70vh]">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-3 border border-pink-400/40 rounded-xl p-6 bg-slate-900/60"
//       >
//         <h1 className="text-xl font-semibold text-pink-300">Signup</h1>
//         <input
//           name="name"
//           className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//         />
//         <input
//           name="email"
//           className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//           placeholder="Email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <div className="flex gap-2">
//           <input
//             name="password"
//             className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//             placeholder="Password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           <input
//             name="confirmPassword"
//             className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//             placeholder="Confirm"
//             type="password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//           />
//         </div>
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//         >
//           <option value="admin">Admin</option>
//           <option value="inventory_manager">Inventory Manager</option>
//           <option value="warehouse_staff">Warehouse Staff</option>
//         </select>

//         <button
//           disabled={loading}
//           className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-sm font-medium"
//         >
//           {loading ? "Creating..." : "Create account"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;




// export default SignupPage;
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const SignupPage = () => {
  const { signup, verifyEmail, loading } = useUserStore(); // make sure verifyEmail exists in the store

  const [step, setStep] = useState("form"); // <-- fixed (no TS generic)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "inventory_manager",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError("Please fill all fields.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setStep("otp"); // go to OTP step if signup success
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      return setError("Please enter the OTP sent to your email.");
    }

    try {
      await verifyEmail({
        email: form.email,
        otp,
      });

      // after success, you can redirect (example)
      // navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <div className="w-full max-w-md">
        <div className="relative rounded-2xl border border-pink-400/30 bg-slate-900/70 shadow-xl shadow-pink-500/20 backdrop-blur-xl p-6 sm:p-8">
          {/* Glow accent */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-pink-500/20 via-fuchsia-500/10 to-transparent blur-2xl" />

          <div className="relative">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-pink-400 via-fuchsia-300 to-rose-400 bg-clip-text text-transparent">
                Create your account
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300/70">
                {step === "form"
                  ? "Enter your details to get started with StockMaster."
                  : `We’ve sent an OTP to ${form.email}. Enter it below to verify.`}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex mb-5 text-xs">
              <div className="flex-1 flex items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded-full ${
                    step === "form"
                      ? "bg-gradient-to-r from-pink-400 to-fuchsia-400"
                      : "bg-slate-700"
                  }`}
                />
                <span className="text-[10px] uppercase tracking-wide text-slate-300">
                  Details
                </span>
              </div>
              <div className="flex-1 flex items-center gap-2 justify-end">
                <span className="text-[10px] uppercase tracking-wide text-slate-300">
                  Verify
                </span>
                <div
                  className={`h-2 flex-1 rounded-full ${
                    step === "otp"
                      ? "bg-gradient-to-r from-fuchsia-400 to-pink-400"
                      : "bg-slate-700"
                  }`}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 text-xs rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-red-200">
                {error}
              </div>
            )}

            {/* STEP 1: Signup form */}
            {step === "form" && (
              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs text-slate-200">Full name</label>
                  <input
                    name="name"
                    className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-200">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-slate-200">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-slate-200">
                      Confirm password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-200">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                  >
                    <option value="admin">Admin</option>
                    <option value="inventory_manager">Inventory Manager</option>
                    <option value="warehouse_staff">Warehouse Staff</option>
                  </select>
                </div>

                <button
                  disabled={loading}
                  className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-sm font-semibold text-white shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </form>
            )}

            {/* STEP 2: OTP verify */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-200">
                    Enter verification code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full tracking-[0.5em] text-center p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    We sent a 6-digit code to{" "}
                    <span className="text-pink-300 font-medium">
                      {form.email}
                    </span>
                    .
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-sm font-semibold text-white shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Verifying..." : "Verify & Create account"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full text-[11px] text-slate-400 hover:text-pink-300 mt-1"
                >
                  ← Change email / details
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-pink-300 hover:text-pink-200 font-medium"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
