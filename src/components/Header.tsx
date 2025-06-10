import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import AuthButton from "./AuthButton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.warn("Logout error (proceeding anyway):", error);
      // Still navigate away even if there's an error
      navigate("/");
      setIsMobileMenuOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - TodoApp title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/")}
              >
                TodoApp
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {(user.displayName || user.email)
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    Merhaba, {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                <AuthButton
                  variant="danger"
                  onClick={handleLogout}
                  className="text-sm"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
                </AuthButton>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <AuthButton
                  variant="secondary"
                  onClick={handleLogin}
                  className="text-sm"
                >
                  Giriş Yap
                </AuthButton>
                <AuthButton
                  variant="primary"
                  onClick={handleRegister}
                  className="text-sm"
                >
                  Kayıt Ol
                </AuthButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg rounded-b-lg">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {(user.displayName || user.email)
                          ?.charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {user.displayName || user.email?.split("@")[0]}
                      </p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="px-3">
                    <AuthButton
                      variant="danger"
                      onClick={handleLogout}
                      className="w-full justify-center"
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
                    </AuthButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <AuthButton
                    variant="secondary"
                    onClick={handleLogin}
                    className="w-full justify-center"
                  >
                    Giriş Yap
                  </AuthButton>
                  <AuthButton
                    variant="primary"
                    onClick={handleRegister}
                    className="w-full justify-center"
                  >
                    Kayıt Ol
                  </AuthButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
