"use client";
import { Fragment, useState } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {
    Bars3Icon,
    ClockIcon,
    HomeIcon,
    WalletIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CreditsUsageBar from "@/components/CreditUsageBar";
import Modal from "@/components/Modal";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "History", href: "/dashboard/history", icon: ClockIcon },
    { name: "Billing", href: "/dashboard/billing", icon: WalletIcon },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const renderSidebar = (mobile: boolean) => (
        <div className={classNames(
            mobile ? "lg:hidden" : "hidden lg:block",
            "fixed top-[64px] bottom-0 z-40 w-72 overflow-y-auto"
        )}>
            <div className="flex grow flex-col gap-y-5 bg-white dark:bg-gray-800 px-6 py-4 border-r border-gray-200 dark:border-gray-700 h-full">
                <nav className="flex flex-1 flex-col">
                    <ul className="space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        item.href === pathname
                                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                                        "group flex gap-x-3 rounded-md p-2 items-center text-sm font-medium transition-colors duration-300"
                                    )}
                                >
                                    <item.icon
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto space-y-4 pt-4">
                        <CreditsUsageBar />
                        <Modal />
                    </div>
                </nav>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            {/* Mobile Sidebar */}
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog 
                    as="div" 
                    className="relative z-50 lg:hidden" 
                    onClose={setSidebarOpen}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex">
                        <TransitionChild
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700">
                                        <Link 
                                            href="/" 
                                            className="text-xl font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300"
                                        >
                                            MultiVerse AI
                                        </Link>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul className="space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={classNames(
                                                            item.href === pathname
                                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm font-medium transition-colors duration-300"
                                                        )}
                                                    >
                                                        <item.icon
                                                            className="h-5 w-5 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto space-y-4 pt-4">
                                            <CreditsUsageBar />
                                            <Modal />
                                        </div>
                                    </nav>
                                </div>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <motion.button
                                        onClick={() => setSidebarOpen(false)}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-white bg-emerald-600 p-2 rounded-full"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </motion.button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            {/* Desktop Sidebar */}
            {renderSidebar(false)}

            {/* Mobile Top Bar */}
            <div className="sticky top-0 z-40 flex items-center bg-white dark:bg-gray-900 px-4 py-3 shadow-sm lg:hidden">
                <motion.button
                    onClick={() => setSidebarOpen(true)}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </motion.button>
                <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white ml-4">
                    Dashboard
                </div>
            </div>

            {/* Main Content Area */}
            <main className="lg:pl-72 pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}