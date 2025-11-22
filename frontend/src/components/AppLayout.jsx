// import { NavLink, Outlet } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";

// const AppLayout = () => {
//   const { user, logout } = useUserStore();

//   const tabs = [
//     { to: "/dashboard", label: "Dashboard" },
//     { to: "/operations/receipts", label: "Operations" },
//     { to: "/stock", label: "Stock" },
//     { to: "/products", label: "Products" },
//     { to: "/move-history", label: "Move History" },
//     { to: "/settings", label: "Settings" },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100">
//       {/* Top bar */}
//       <header className="flex items-center justify-between px-6 py-3 border-b border-pink-400/40 bg-slate-950/80 backdrop-blur">
//         <div className="text-xl font-semibold text-pink-300">StockMaster</div>
//         <div className="flex items-center gap-4">
//           {user && (
//             <>
//               <span className="text-sm">
//                 {user.name}{" "}
//                 <span className="px-2 py-0.5 rounded-full bg-emerald-700/60 text-xs uppercase ml-1">
//                   {user.role}
//                 </span>
//               </span>
//               <button
//                 onClick={logout}
//                 className="text-xs px-3 py-1 rounded border border-pink-400/60 hover:bg-pink-500/20"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </header>

//       {/* Navigation tabs */}
//       <nav className="flex gap-4 px-6 py-2 border-b border-pink-400/40 text-sm">
//         {tabs.map((tab) => (
//           <NavLink
//             key={tab.to}
//             to={tab.to}
//             className={({ isActive }) =>
//               `pb-1 border-b-2 ${
//                 isActive
//                   ? "border-pink-400 text-pink-300"
//                   : "border-transparent text-slate-400 hover:text-pink-200"
//               }`
//             }
//           >
//             {tab.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Page content */}
//       <main className="p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AppLayout;


import { NavLink, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const AppLayout = () => {
  const { user, logout } = useUserStore();

  const tabs = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/operations/receipts", label: "Operations" },
    { to: "/stock", label: "Stock" },
    { to: "/products", label: "Products" },
    { to: "/move-history", label: "Move History" },
    { to: "/settings", label: "Settings" },
    { to: "/operations/internal", label: "Internal Transfers" },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-pink-400/30 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_35px_rgba(244,114,182,0.15)]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-amber-400 shadow-[0_0_30px_rgba(244,114,182,0.8)]" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-wide">
              <span className="text-pink-300">Stock</span>
              <span className="text-slate-100">Master</span>
            </span>
            <span className="text-xs text-slate-400">
              Real-time inventory control at a glance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/60 px-3 py-1 text-xs shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">{user.name}</span>
                <span className="rounded-full bg-emerald-700/70 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-xs px-4 py-1.5 rounded-full border border-pink-400/70 bg-slate-900/70 hover:bg-pink-500 hover:text-slate-950 shadow-[0_0_18px_rgba(244,114,182,0.4)] transition-all duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="px-6 pt-3 pb-1">
        <nav className="inline-flex flex-wrap gap-2 rounded-full border border-pink-400/30 bg-slate-950/80 px-2 py-1 shadow-[0_0_30px_rgba(244,114,182,0.25)]">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                [
                  "relative px-4 py-1.5 text-sm rounded-full border transition-all duration-200",
                  "hover:-translate-y-[1px]",
                  isActive
                    ? "border-pink-400 bg-pink-500 text-slate-950 shadow-[0_0_20px_rgba(244,114,182,0.8)]"
                    : "border-transparent text-slate-300 hover:text-pink-100 hover:border-pink-400/60",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {tab.label}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-pink-500/40 blur-xl" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Page content – no width/height restrictions so your dashboard controls its own size */}
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
