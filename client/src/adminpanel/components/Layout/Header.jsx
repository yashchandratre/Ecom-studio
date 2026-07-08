
import React from "react";
import { Menu, Search, Bell, ChevronLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "../comon/TheameToggleButton";
import Logo from "./Logo";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function Header({
    setSidebarOpen,
    sidebarOpen,
    collapsed,
    setCollapsed,
}) {
    const navigate = useNavigate();
    const { adminUser: user, signOut } = useAdminAuth();

    const logout = () => {
        // Context logout clears localStorage and React auth state together.
        signOut();
        navigate("/admin/login", { replace: true });
    };

  
    return (
        <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b md:h-16 transition-all duration-300 ease-in-out ">
            {/* Left */}
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div className="flex items-center justify-between w-full gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-2 ">

                    {/* Mobile menu */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden cursor-pointer"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Desktop collapse */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:flex cursor-pointer items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
                    >
                        <ChevronLeft
                            className={`transition-transform ${collapsed ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    <div className="md:hidden flex">
                        <Logo />
                    </div>
                    <div className="md:hidden flex">
                        
                    </div>
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 ">
                        <Search size={18} className="text-gray-400 absolute ml-2 " />
                        <input
                            placeholder="Search or type command..."
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                        />
                        <span className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border">Ctrl</span>
                    </div>
                </div>
                
                {/* Right */}
                <div
                    className={`hidden md:flex
                         items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
                >
                    <div className="flex items-center gap-2 2xsm:gap-3">
                      
                        <ThemeToggleButton />
                        <div className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer">
                        <Bell size={18} className="cursor-pointer" />
                        </div>
                    {/* Admin identity comes from AdminAuthContext after login. */}
                    <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.fname || "Admin"}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                    </div>
                  
                </div>
            </div>
        </header>
    );
}
