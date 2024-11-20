'use client'
import Card from "@/components/Card";
import templates from "@/lib/constant";
import { useState } from "react";

export default function Dashboard() {

    const [search, setSearch] = useState("");
    const filteredTemplates = templates.filter((template) => template.name.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <>
            <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out border border-gray-100 dark:border-gray-800 shadow-lg dark:shadow-gray-900/30 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-500">
                    What would you like to create today?
                </h1>

                <div className="w-full flex justify-center">
                    <div className="flex gap-2 items-center p-3 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-gray-900/20 rounded-lg bg-gray-50 dark:bg-gray-800 my-5 w-[50%] transition-all duration-500 ease-in-out hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
                        <svg 
                            className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredTemplates.map((template) => (
                        <Card template={template} key={template.slug}/>
                    ))
                }
            </div>
        </>
    )
}

