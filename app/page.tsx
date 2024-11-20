/* import { genContent } from "@/lib/actions";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

export default function Home() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await genContent("What is nextjs?");
        if (data?.content) {
          setContent(data.content);
        } else {
          setError("No content available");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        console.error('Error Fetching content:', error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content)
      }}
    />
  );
}
  */
'use client'
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const aiTextVariants = {
    initial: { scale: 1, color: "rgb(5, 150, 105)" },
    animate: {
      scale: [1, 1.05, 1],
      textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 8px rgba(16,185,129,0.5)"],
      color: ["rgb(5, 150, 105)", "rgb(16, 185, 129)", "rgb(5, 150, 105)"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-1 min-h-screen w-full flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 ease-in-out"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 text-gray-600 dark:text-gray-400 text-sm mb-6 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Forget about spending hundreds
        </motion.button>

        <motion.h1 
          variants={itemVariants}
          className="max-w-4xl font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-500"
        >
          <span className="block mb-4">Revolutionize Your Content</span>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative whitespace-nowrap text-emerald-600 dark:text-emerald-400"
          >
            Generation
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-emerald-500 dark:fill-emerald-500/60 transition-colors duration-500"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <motion.span 
              variants={aiTextVariants}
              initial="initial"
              animate="animate"
              className="relative ml-2 inline-block"
            >
              with AI
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.h2 
          variants={itemVariants}
          className="max-w-xl mt-6 sm:mt-8 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-500"
        >
          Experience the future of content generation with our cutting-edge AI
          tool. From blog writing to code writing, unleash your creativity.
        </motion.h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/dashboard"
            className="mt-8 sm:mt-12 inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white dark:text-white bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Join Free Membership
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}