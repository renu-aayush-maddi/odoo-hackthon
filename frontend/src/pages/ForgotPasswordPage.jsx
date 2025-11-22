import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const ForgotPasswordPage = () => {
  const { requestPasswordOTP, resetPasswordWithOTP, loading } = useUserStore();

  const [step, setStep] = useState("email"); // "email" | "reset"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      return setError("Please enter your email.");
    }

    try {
      await requestPasswordOTP(email);
      setStep("reset");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || !newPassword || !confirmPassword) {
      return setError("Please fill all fields.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await resetPasswordWithOTP({ email, otp, newPassword });
      // You can redirect to login after success:
      // navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password.");
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
                Reset your password
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300/70">
                {step === "email"
                  ? "Enter your email and we'll send you an OTP."
                  : `Enter the OTP sent to ${email} and choose a new password.`}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 text-xs rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-red-200">
                {error}
              </div>
            )}

            {/* STEP 1: enter email */}
            {step === "email" && (
              <form onSubmit={handleSendOTP} className="space-y-4">
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

                <button
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-sm font-semibold text-white shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* STEP 2: OTP + new password */}
            {step === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-200">
                    OTP sent to your email
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
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-200">New password</label>
                  <input
                    type="password"
                    className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-200">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2.5 rounded-lg bg-slate-900/70 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm outline-none transition"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 text-sm font-semibold text-white shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Resetting..." : "Reset password"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full text-[11px] text-slate-400 hover:text-pink-300 mt-1"
                >
                  ← Change email
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Remembered your password?{" "}
              <a
                href="/login"
                className="text-pink-300 hover:text-pink-200 font-medium"
              >
                Back to login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
