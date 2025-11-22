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



import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const SignupPage = () => {
  const { signup, loading } = useUserStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "inventory_manager",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 border border-pink-400/40 rounded-xl p-6 bg-slate-900/60"
      >
        <h1 className="text-xl font-semibold text-pink-300">Signup</h1>
        <input
          name="name"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <input
            name="password"
            className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 text-sm"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 text-sm"
            placeholder="Confirm"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-sm"
        >
          <option value="admin">Admin</option>
          <option value="inventory_manager">Inventory Manager</option>
          <option value="warehouse_staff">Warehouse Staff</option>
        </select>

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-sm font-medium"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
