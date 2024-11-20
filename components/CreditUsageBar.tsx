import React from 'react';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CountContext } from "@/context/UsageProvider";
import { CreditCard, Zap } from 'lucide-react';

const CreditsUsageBar = () => {
  const ctx = useContext(CountContext);
  const credits = 10000;
  const router = useRouter();
  const percentage = ctx?.subStatus === "active" ? 100 : (ctx?.count! / credits) * 100;
  const isUnlimited = ctx?.subStatus === "active";

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <CreditCard className="text-white w-6 h-6" />
          <p className="font-bold text-white text-lg">Credits Usage</p>
        </div>
        {!isUnlimited && (
          <span className="text-white/70 text-sm font-medium">
            {ctx?.count?.toLocaleString()} / {credits.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mb-4" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-white/20">
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-out ${
              isUnlimited 
                ? 'bg-emerald-400' 
                : 'bg-indigo-400'
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white font-semibold flex items-center space-x-2">
          {isUnlimited ? (
            <>
              <Zap className="w-5 h-5 text-yellow-300" />
              <span>Unlimited Credits</span>
            </>
          ) : (
            <span>{((ctx?.count! / credits) * 100).toFixed(1)}% Used</span>
          )}
        </div>

        {!isUnlimited && (
          <button
            onClick={() => router.push("/membership")}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>Upgrade</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditsUsageBar;