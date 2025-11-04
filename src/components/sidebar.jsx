import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import { IoHardwareChipOutline } from "react-icons/io5";

const nav = [
  { to: "/admin-dashboard", label: "Home", icon: HomeIcon },
  { to: "/admin-alerts", label: "Alerts", icon: BellIcon },
  { to: "/analytics", label: "Analytics and Summary", icon: ActivityIcon },
  { to: "/device-health", label: "Device Health", icon: HeartbeatIcon },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      initial={{ x: -260, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: open ? 256 : 80 }} // 256 = w-64, 80 = w-20
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`fixed inset-y-0 left-0 z-50
                  group overflow-hidden border-r bg-yellow-400/95 backdrop-blur
                  shadow-sm`}
      style={{ willChange: "transform, width, opacity" }}
    >
      {/* Header / Brand */}
      <div className="relative flex items-center gap-3 h-16 px-4 border-b">
        {/* Logo stays visible at all times */}
        <div className="h-9 w-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-sm shrink-0">
          <img src={Logo} alt="FlameSense Logo" className="h-5 w-5" />
        </div>

        {/* Brand text fades in/out (but logo remains) */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.span
              key="brand"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="font-semibold tracking-wide text-black"
            >
              FlameSense
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapse button — pinned, never floats */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 -mx-1 rounded-md
                 hover:bg-white transition"
          aria-label="Toggle sidebar"
        >
          <motion.span
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            <ChevronIcon className="h-5 w-5 text-gray-700" />
          </motion.span>
        </button>
      </div>

      {/* Nav */}
      <nav className="p-3">
        <ul className="space-y-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                    "hover:bg-white/40",
                    isActive ? "bg-white text-orange-800 font-medium" : "text-gray-900",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5 shrink-0" />

                {/* Label animates in/out; hidden space reserved by container */}
                <div className="overflow-hidden">
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.span
                        key={label}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.16 }}
                        className="block truncate"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Subtle glow at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24
                   bg-gradient-to-t from-orange-50/50 to-transparent"
      />
    </motion.aside>
  );
};

export default Sidebar;

/* ---------------- Icons (inline SVG) ---------------- */

function ChevronIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function HomeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M3 10.5 12 4l9 6.5V20a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-9.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function BellIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M15 18H5l1.12-1.34A6 6 0 0 0 7 13.2V11a5 5 0 0 1 10 0v2.2c0 .95.33 1.87.88 2.46L19 18h-4Zm-3 4a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function ActivityIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M3 12h4l2-7 4 14 2-7h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function HeartbeatIcon({ className = "" }) {
  return (
    <IoHardwareChipOutline className={className} aria-hidden="true" />
  );
}
