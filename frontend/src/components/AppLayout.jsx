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
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-pink-400/40 bg-slate-950/80 backdrop-blur">
        <div className="text-xl font-semibold text-pink-300">StockMaster</div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm">
                {user.name}{" "}
                <span className="px-2 py-0.5 rounded-full bg-emerald-700/60 text-xs uppercase ml-1">
                  {user.role}
                </span>
              </span>
              <button
                onClick={logout}
                className="text-xs px-3 py-1 rounded border border-pink-400/60 hover:bg-pink-500/20"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Navigation tabs */}
      <nav className="flex gap-4 px-6 py-2 border-b border-pink-400/40 text-sm">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-pink-400 text-pink-300"
                  : "border-transparent text-slate-400 hover:text-pink-200"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Page content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
