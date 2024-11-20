"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  // { name: "Templates", href: "/templates", current: false },
  // { name: "History", href: "/history", current: false },
  { name: "Pricing", href: "/membership", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign Out", action: () => signOut({ redirectTo: '/' }) },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: { user: User }) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Disclosure 
      as="header" 
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 transition-all duration-500 ease-in-out"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  MultiVerse AI
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="hidden lg:flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatePresence mode="wait">
                    {resolvedTheme === "dark" ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* User Menu or Sign In */}
                {user ? (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <img
                        className="h-9 w-9 rounded-full object-cover"
                        src={user?.image!}
                        alt="User profile"
                      />
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={item.action}
                                className={classNames(
                                  active 
                                    ? "bg-gray-100 dark:bg-gray-700" 
                                    : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => signIn("github")}
                    className="rounded-lg bg-emerald-600 dark:bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Sign In
                  </button>
                )}

                {/* Mobile Menu Toggle */}
                <DisclosureButton className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="lg:hidden bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/50">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-300"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}