import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sprout,
  CircleUser,
  LogIn,
  LogOut,
  User,
  History,
} from "lucide-react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();

  // Sementara untuk simulasi.
  // Nanti bisa diganti dengan authentication dari Context/API.
  const isLoggedIn = true;

  const navItems = [
    {
      name: "Beranda",
      path: "/",
    },
    {
      name: "Deteksi Penyakit",
      path: "/deteksi-penyakit",
    },
    {
      name: "Riwayat Deteksi",
      path: "/riwayat-deteksi",
    },
    {
      name: "Tentang Penyakit",
      path: "/tentang-penyakit",
    },
  ];

  const handleLogout = () => {
    // Nanti:
    // localStorage.removeItem("token");

    setProfileMenu(false);
    setMobileMenu(false);

    console.log("User logout");

    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-green-900/10 bg-green-700/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ========================= */}
          {/* LEFT SECTION */}
          {/* ========================= */}

          <div className="flex items-center gap-10">

            {/* LOGO */}
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3"
            >
              {/* Logo Icon */}
              <div className="rounded-xl bg-white/15 p-2 transition hover:bg-white/25">
                <Sprout className="h-6 w-6 text-lime-200" />
              </div>

              {/* Logo Text */}
              <div>
                <h1 className="text-lg font-bold leading-tight text-white">
                  CocoaScan
                </h1>

                <p className="text-[10px] text-green-100">
                  Smart Cocoa Disease Detection
                </p>
              </div>
            </NavLink>

            {/* ========================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ========================= */}

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-lime-300 text-green-900 shadow-sm"
                        : "text-white hover:bg-white/10 hover:text-lime-200"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ========================= */}
          {/* RIGHT SECTION */}
          {/* ========================= */}

          <div className="flex items-center gap-3">

            {/* ========================= */}
            {/* PROFILE */}
            {/* ========================= */}

            <div className="relative">

              <button
                type="button"
                onClick={() => setProfileMenu(!profileMenu)}
                className="hidden items-center rounded-full p-1.5 text-white transition hover:bg-white/10 hover:text-lime-200 sm:flex"
                aria-label="Menu profil"
                aria-expanded={profileMenu}
              >
                <CircleUser className="h-8 w-8" />
              </button>

              {/* ========================= */}
              {/* PROFILE DROPDOWN */}
              {/* ========================= */}

              {profileMenu && (
                <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl backdrop-blur-xl">

                  {isLoggedIn ? (
                    <>
                      {/* Profile Header */}
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-sm font-semibold text-white">
                          Akun Pengguna
                        </p>

                        <p className="text-xs text-gray-400">
                          Cocoa Plant Diseases
                        </p>
                      </div>

                      <div className="p-2">

                        {/* Profil */}
                        <NavLink
                          to="/profil"
                          onClick={() => setProfileMenu(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                        >
                          <User className="h-4 w-4" />
                          Profil
                        </NavLink>

                        {/* Riwayat */}
                        <NavLink
                          to="/riwayat-deteksi"
                          onClick={() => setProfileMenu(false)}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                        >
                          <History className="h-4 w-4" />
                          Riwayat Deteksi
                        </NavLink>

                        <hr className="my-2 border-white/10" />

                        {/* Logout */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>

                      </div>
                    </>
                  ) : (
                    <div className="p-2">

                      {/* Login */}
                      <NavLink
                        to="/login"
                        onClick={() => setProfileMenu(false)}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-400 transition hover:bg-green-500/10"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </NavLink>

                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ========================= */}
            {/* MOBILE BUTTON */}
            {/* ========================= */}

            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-xl p-2 text-green-50 transition hover:bg-white/10 hover:text-white md:hidden"
              aria-label={
                mobileMenu ? "Tutup menu" : "Buka menu"
              }
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MOBILE MENU */}
      {/* ========================= */}

      {mobileMenu && (
        <div className="border-t border-white/10 bg-green-950/95 shadow-xl backdrop-blur-xl md:hidden">

          <div className="space-y-2 px-4 py-4">

            {/* Navigation */}
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-lime-300 text-green-900"
                      : "text-green-50 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <hr className="my-2 border-white/10" />

            {/* Profile */}
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profil"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-50 transition hover:bg-white/10 hover:text-white"
                >
                  <User className="h-5 w-5" />
                  Profil
                </NavLink>

                <NavLink
                  to="/riwayat-deteksi"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-50 transition hover:bg-white/10 hover:text-white"
                >
                  <History className="h-5 w-5" />
                  Riwayat Deteksi
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-400 transition hover:bg-green-500/10"
              >
                <LogIn className="h-5 w-5" />
                Login
              </NavLink>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;