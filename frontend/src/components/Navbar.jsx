// import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Home as HomeIcon, Mail as ContactIcon } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";
// import {useCartStore} from "../stores/useCartStore"
// const Navbar = () => {
//   const {user,logout} = useUserStore();
//   const isAdmin = user?.role === "admin";

//   const {cart} = useCartStore(); 

//   return (
//     <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
//     <div className='container mx-auto px-4 py-3'>
//       <div className='flex flex-wrap justify-between items-center'>
// 	  <Link to='/' className='text-3xl font-bold text-yellow-400 hover:text-yellow-300 items-center space-x-2 flex transition-all duration-300'>
//     Bharat Coin Bazaar
// </Link>


//         <nav className='flex flex-wrap items-center gap-4'>
//           <Link to={"/"} className='text-gray-300 hover:text-yellow-400 transition duration-300 ease-in-out'>
//             Home
//           </Link>
//           {user && (
// 							<Link
// 								to={"/cart"}
// 								className='relative group text-gray-300 hover:text-yellow-400 transition duration-300 
// 							ease-in-out'
// 							>
// 								<ShoppingCart className='inline-block mr-1 group-hover:text-yellow-400' size={20} />
// 								<span className='hidden sm:inline'>Cart</span>
								
// 									{cart.length >0 &&<span
// 										className='absolute -top-2 -left-2 bg-blue-500 text-white rounded-full px-2 py-0.5 
// 									text-xs group-hover:text-yellow-400 transition duration-300 ease-in-out'
// 									>
// 										{cart.length}
                    
										
// 									</span>}
								
// 							</Link>
// 						)}

//             {isAdmin && (
// 							<Link
// 								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
// 								 transition duration-300 ease-in-out flex items-center'
// 								to={"/secret-dashboard"}
// 							>
// 								<Lock className='inline-block mr-1' size={18} />
// 								<span className='hidden sm:inline'>Dashboard</span>
// 							</Link>
// 						)}

//             {user ? (
// 							<button
// 								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
// 						rounded-md flex items-center transition duration-300 ease-in-out'
								
// 						onClick={logout}	>


// 								<LogOut size={18} />
// 								<span className='hidden sm:inline ml-2'>Log Out</span>
// 							</button>
// 						) : (
// 							<>
// 								<Link
// 									to={"/signup"}
// 									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
// 									rounded-md flex items-center transition duration-300 ease-in-out'
// 								>
                  
// 									<UserPlus className='mr-2' size={18} />
// 									Sign Up
// 								</Link>
// 								<Link
// 									to={"/login"}
// 									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
// 									rounded-md flex items-center transition duration-300 ease-in-out'
// 								>
// 									<LogIn className='mr-2' size={18} />
// 									Login
// 								</Link>
// 							</>
// 						)}


//           </nav>
// 				</div>
// 			</div>
// 		</header>
    
//   )
// }

// export default Navbar




// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const navLinkClass =
  "px-3 py-2 text-sm hover:text-pink-300 transition border-b-2 border-transparent";
const activeClass = "border-pink-400 text-pink-300";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 border-b border-pink-500/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-xl font-semibold text-pink-300 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          StockMaster
        </div>

        {/* Main nav */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>

          {/* Operations dropdown */}
          <div className="relative group">
            <button className={`${navLinkClass} flex items-center gap-1`}>
              Operations
              <span className="text-xs">▼</span>
            </button>

            <div className="absolute left-0 mt-1 hidden min-w-[160px] rounded-lg border border-pink-500/40 bg-slate-900/95 shadow-lg group-hover:block">
              <NavLink
                to="/operations/receipts"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm hover:bg-slate-800 ${
                    isActive ? "text-pink-300" : "text-gray-200"
                  }`
                }
              >
                Receipts
              </NavLink>
              <NavLink
                to="/operations/deliveries"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm hover:bg-slate-800 ${
                    isActive ? "text-pink-300" : "text-gray-200"
                  }`
                }
              >
                Deliveries
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/stock"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Stock
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/move-history"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Move History
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Settings
          </NavLink>
        </nav>

        {/* User info */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="text-xs text-right">
              <div className="text-gray-200">{user.name}</div>
              <div className="text-[10px] text-emerald-300 uppercase tracking-wide">
                {user.role}
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="rounded-full bg-pink-500 px-4 py-1.5 text-xs font-semibold text-black hover:bg-pink-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;





