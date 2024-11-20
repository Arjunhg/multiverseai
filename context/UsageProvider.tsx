"use client";

import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { checkSubscriptionStatus, countUsage } from "@/lib/actions";

// make context type safe
interface Count{
    count: number;
    getUsage: () => Promise<void>; //to get complete count without whitespaces
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    subStatus: string;
}

export const CountContext = createContext<Count | null>(null); // Create a context>

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {

    const [count, setCount] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [subStatus, setSubStatus] = useState("");


    useEffect(() => {
        getUsage();
        getSubStatus();
    }, []);

    useEffect(() => {
        if(count>10000){
            setOpenModal(true);
        }
    }, [count]);

    const getUsage = async () => {

        const words = await countUsage();
        let totalWords = 0;
        if (words.data) {
            totalWords = words.data.reduce((sum, record) => {
                const wordsCount = record.contents?.trim().split(/\s+/).length;
                return sum + wordsCount!;
            }, 0);
        }
        setCount(totalWords);
    };

    const getSubStatus = async() => {
        const res = await checkSubscriptionStatus();
        if(res?.status==="active"){
            setSubStatus("active");
        }else{
            setSubStatus("inactive");
        }
    }

    return (
        <CountContext.Provider value={{ count, getUsage, openModal, setOpenModal, subStatus }}>
            {children}
        </CountContext.Provider>
    );
}