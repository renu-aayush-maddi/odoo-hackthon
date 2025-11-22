import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const SettingsPage = () => {
  const { user, updateProfile, logout, loading } = useUserStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({
      name,
      email,
      password: password.trim() === "" ? undefined : password,
    });
    setPassword("");
  };

  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold text-pink-200">My Profile</h1>

      <form
        onSubmit={handleSave}
        className="space-y-6 border border-pink-500/40 bg-slate-900/40 rounded-2xl p-6"
      >
        {/* NAME */}
        <div>
          <label className="text-sm text-slate-300">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950/60 border border-pink-500/40 rounded-lg px-3 py-2 text-sm mt-1"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950/60 border border-pink-500/40 rounded-lg px-3 py-2 text-sm mt-1"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-slate-300">New Password</label>
          <input
            type="password"
            value={password}
            placeholder="Leave blank to keep existing"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950/60 border border-pink-500/40 rounded-lg px-3 py-2 text-sm mt-1"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="px-6 py-2 rounded-full bg-pink-500 text-black text-sm font-medium hover:bg-pink-400 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Logout */}
      {/* <button
        onClick={logout}
        className="px-6 py-2 mt-4 rounded-full bg-red-500 text-black text-sm font-semibold hover:bg-red-400"
      >
        Logout
      </button> */}
    </div>
  );
};

export default SettingsPage;
