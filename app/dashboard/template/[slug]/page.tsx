'use client';

import Templates from "@/lib/constant";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { genContent, saveQuery } from "@/lib/actions";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { CountContext } from "@/context/UsageProvider";

const TemplateDetail = ({ params: rawParams }: { params: Promise<{ slug: string }> }) => {
    const params = React.use(rawParams);
    const template = Templates.find((t) => t.slug === params.slug);
    const [query, setQuery] = useState("");
    const [aiContent, setAiContent] = useState("");
    const [loading, setLoading] = useState(false);
    const ctx = useContext(CountContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!query.trim()) {
            alert("Query cannot be empty.");
            return;
        }

        try {
            setLoading(true);

            const fullPrompt = `${template?.aiPrompt} ${query}`.trim();
            const response = await genContent(fullPrompt);

            if (response.status === "success") {
                setAiContent(response.content);
                await saveQuery({
                    content: response.content,
                    query,
                    template,
                });
                await ctx?.getUsage();
            } else {
                setAiContent("Failed to generate content. Please try again.");
            }
        } catch (error) {
            console.error("Error generating content:", error);
            setAiContent("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-8"
        >
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column - Form Section */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out"
                >
                    <div className="flex flex-col items-center space-y-4 mb-6">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-4 bg-blue-50 dark:bg-gray-700 rounded-xl"
                        >
                            <Image
                                src={template?.icon!}
                                alt={template?.name!}
                                width={80}
                                height={80}
                                className="rounded-lg transition-transform duration-500"
                            />
                        </motion.div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
                                {template?.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-500">
                                {template?.desc}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {template?.form.map((f, index) => (
                            <motion.div 
                                key={f.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="space-y-2"
                            >
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500">
                                    {f.label}
                                </label>
                                {f.field === "input" ? (
                                    <input
                                        type="text"
                                        placeholder={f.name}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-500 ease-in-out"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                ) : (
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-500 ease-in-out disabled:cursor-wait"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                )}
                            </motion.div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading || (ctx?.subStatus === "inactive" && ctx?.count! >= 10000)}
                        >
                            {loading && <span className="animate-pulse">Generating...</span>}
                            { ctx?.subStatus === "inactive" && ctx?.count! >= 10000 ? "Subscribe to generate content" : "Generate Content" }
                            
                        </motion.button>
                    </form>
                </motion.div>

                {/* Right Column - Content Display Section */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-full md:w-1/2 min-h-[500px]"
                >
                    {aiContent ? (
                        // <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out h-full">
                        //     <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">
                        //         Generated Content
                        //     </h2>
                        //     <div className="prose dark:prose-invert max-w-none">
                        //         {aiContent}
                        //     </div>
                        // </div>
                        <MarkdownEditor
                            value={aiContent}
                            height={"400px"}
                        />
                    ) : (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 h-full flex items-center justify-center transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 shadow-2xl">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-500">
                                    {template?.name} Template
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500 text-lg">
                                    Fill out the form to generate your content using AI
                                </p>
                            </div>
                        </div>
                    )}
                   
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TemplateDetail;