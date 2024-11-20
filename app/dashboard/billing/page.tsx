"use client";
import { createCustomerPortal } from "@/lib/actions";

const BillingPage = () => {
    const handleClick = async () => {
        const res = await createCustomerPortal();
        
        if (res?.url) {
            window.location.href = res.url;
        }
    };
    return (
        <div className="p-10 h-screen my-5 mx-5 mb-5 flex flex-col rounded-lg dark:bg-gray-900 shadow-lg">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center text-emerald-500 mb-4">
                    Billing
                </h1>
                <p className="text-center text-lg text-gray-400">Your Billing history</p>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <button
                    onClick={handleClick}
                    className="mt-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                    Access Stripe Customer Portal
                </button>
            </div>
        </div>
    );
};

export default BillingPage;