import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.png"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      toast.success("Logged out successfully");
      console.log("User logged out");
    } catch {}
    setTimeout(() => {
      window.location.href = "/";
    }, 600);
  };

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);

  return (
    <header className="sticky top-0 z-50 w-full drop-shadow-sm bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2">
          
        </a>

        

        {/* Admin dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            disabled={isSubmitting}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60"
          >
           
            <svg
              className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              role="menu"
              aria-label="Admin menu"
              className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
            >
              <div className="px-4 py-2 text-xs text-gray-500">
                Signed in as
                <div className="truncate font-medium text-gray-800">
                  {username || "—"}
                </div>
              </div>
              
              <div className="my-1 h-px bg-gray-100" />
              <button
                role="menuitem"
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-500"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
