// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
// // import {useUserStore} from "../stores/useUserStore"

// // const LoginPage = () => {
// //   const [email, setEmail] = useState("");
// // 	const [password, setPassword] = useState("");
// //   const {login , loading} = useUserStore()


// // 	const handleSubmit = (e) => {
// // 		e.preventDefault();
// // 		console.log(email, password);
// //     login(email,password)

// // 	};
// //   return (
// //     <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
// //     <motion.div
// //       className='sm:mx-auto sm:w-full sm:max-w-md'
// //       initial={{ opacity: 0, y: -20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.8 }}
// //     >
// //       <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Login your account</h2>
// //     </motion.div>

// //     <motion.div
// //       className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.8, delay: 0.2 }}
// //     >
// //       <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
// //         <form onSubmit={handleSubmit} className='space-y-6'>
// //           <div>
// //             <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
// //               Email address
// //             </label>
// //             <div className='mt-1 relative rounded-md shadow-sm'>
// //               <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// //                 <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
// //               </div>
// //               <input
// //                 id='email'
// //                 type='email'
// //                 required
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
// //                 rounded-md shadow-sm
// //                  placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
// //                  focus:border-emerald-500 sm:text-sm'
// //                 placeholder='you@example.com'
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
// //               Password
// //             </label>
// //             <div className='mt-1 relative rounded-md shadow-sm'>
// //               <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
// //                 <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
// //               </div>
// //               <input
// //                 id='password'
// //                 type='password'
// //                 required
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
// //                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
// //                 placeholder='••••••••'
// //               />
// //             </div>
// //           </div>

// //           <button
// //             type='submit'
// //             className='w-full flex justify-center py-2 px-4 border border-transparent 
// //             rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
// //              hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
// //               focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
// //             disabled={loading}
// //           >
// //             {loading ? (
// //               <>
// //                 <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
// //                 Loading...
// //               </>
// //             ) : (
// //               <>
// //                 <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
// //                 Login
// //               </>
// //             )}
// //           </button>
// //         </form>

// //         <p className='mt-8 text-center text-sm text-gray-400'>
// //           Not a member?{" "}
// //           <Link to='/signup' className='font-medium text-emerald-400 hover:text-emerald-300'>
// //             Sign up now <ArrowRight className='inline h-4 w-4' />
// //           </Link>
// //         </p>
// //       </div>
// //     </motion.div>
// //   </div>
// //   )
// // }

// // export default LoginPage


// import { useState } from "react";
// import { useUserStore } from "../stores/useUserStore";

// const LoginPage = () => {
//   const { login, loading } = useUserStore();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[70vh]">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md space-y-4 border border-pink-400/40 rounded-xl p-6 bg-slate-900/60"
//       >
//         <h1 className="text-xl font-semibold text-pink-300">Login</h1>
//         <input
//           className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           disabled={loading}
//           className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-sm font-medium"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;




// export default LoginPage;
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const { login, loading } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please enter both email and password.");
    }

    try {
      await login(email, password);
      // redirect is handled in store or router if you set it up
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
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
                Welcome back
              </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300/70">
                Sign in to continue managing your inventory with StockMaster.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 text-xs rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-red-200">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-200">Email</label>
                <input
                  className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-200">Password</label>
                <input
                  className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-pink-300 hover:text-pink-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-sm font-semibold text-white shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-[11px] text-slate-400">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-pink-300 hover:text-pink-200 font-medium"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
