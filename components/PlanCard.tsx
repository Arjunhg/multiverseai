'use client'

import { createCheckoutSession } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/20/solid";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const tiers = [
  {
    name: "Monthly Membership",
    id: "tier-personal",
    href: "#",
    priceMonthly: "$2",
    description: "Enjoy unlimited AI generated content forever for just $2/month",
    features: [
      "Unlimited word generation",
      "Advanced AI features",
      "Faster processing times",
      "Priority customer support",
    ],
    featured: true,
  },
  {
    name: "Free",
    id: "tier-team",
    href: "#",
    priceMonthly: "$0",
    description: "Limited AI generated content forever for just $0.00/months.",
    features: [
      "Limited word generation",
      "Advanced AI features",
      "Faster processing times",
      "Customer support",
    ],
    featured: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PlanCard( {user}: { user: User } ) {


    const router = useRouter();

    const handleCheckout = async ( name: string ) => {

        if(name==="Free"){
            router.push("/dashboard");
        }else{
            toast("This feature is under development. Stay tuned!", {
              icon: "⚙️",
            });
        }
    }

  return (
    <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-800 shadow-lg dark:shadow-gray-900/30">
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-500">
          Upgrade with monthly membership
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 transition-colors duration-500">
          Choose the perfect plan for your needs
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              "rounded-xl transition-all duration-500 ease-in-out",
              tier.featured
                ? "relative bg-white dark:bg-gray-800 shadow-xl ring-2 ring-emerald-500 dark:ring-emerald-400"
                : "bg-gray-50 dark:bg-gray-800/50 ring-1 ring-gray-200 dark:ring-gray-700",
              "p-8 lg:p-10"
            )}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/50 px-4 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20 transition-colors duration-500">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">
                {tier.name}
              </h3>
              
              <div className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-500">
                  {tier.priceMonthly}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  /month
                </span>
              </div>
              
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500">
                {tier.description}
              </p>
              
              <ul className="mt-8 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon
                      className="h-5 w-5 flex-shrink-0 text-emerald-500 dark:text-emerald-400 transition-colors duration-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-500">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                    className={
                        classNames(
                        "mt-8 w-full rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        tier.featured
                            ? "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 focus:ring-emerald-500"
                            : "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-gray-500"
                        )}
                        disabled = {!user?.email}
                        title={!user?.email ? 'Sign in to get started' : ""}
                        onClick={() => handleCheckout(tier.name)}
                >
                {
                    user?.email ? "Get Started" : "Sign in to get started"
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
