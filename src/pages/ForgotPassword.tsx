import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import { resetPassword } from "../redux/slices/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const result = await dispatch(resetPassword(email));
      if (resetPassword.fulfilled.match(result)) {
        setMessage("Şifre sıfırlama e-postası gönderildi!");
        setEmail("");
      }
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Şifre Sıfırla
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {message}
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="E-posta adresinizi girin"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? "Gönderiliyor..." : "Şifre Sıfırlama E-postası Gönder"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
