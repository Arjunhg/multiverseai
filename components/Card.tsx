'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  template: {
    name: string;
    desc: string;
    category: string;
    icon: string;
    aiPrompt: string;
    slug: string;
    form: {
      label: string;
      field: string;
      name: string;
      required: boolean;
    }[];
  };
}

const Card = ({ template }: Props) => {
  return (
    <Link href={`/dashboard/template/${template.slug}`} className="block">
      <div className="group relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-500 ease-out hover:-translate-y-2">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-shine" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out" />

        <div className="p-6 dark:bg-black space-y-4 relative">
          <div className="flex items-start justify-between">
            {/* Icon container with hover effects */}
            <div className="relative p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 group-hover:scale-105">
              <div className="relative z-10 transition-transform duration-300 group-hover:rotate-3">
                <Image
                  src={template.icon}
                  alt={template.name}
                  width={32}
                  height={32}
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Animated badge */}
            <Badge 
              variant="outline" 
              className="bg-blue-50/50 dark:bg-blue-900/20 transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 group-hover:scale-105"
            >
              {template.category}
            </Badge>
          </div>

          <div className="space-y-2 transition-all duration-300 group-hover:translate-x-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {template.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-300">
              {template.desc}
            </p>
          </div>

          <div className="pt-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-1">
                {template.form.slice(0, 3).map((field, index) => (
                  <div
                    key={field.name}
                    className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-900 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 group-hover:scale-110"
                    style={{ 
                      zIndex: 3 - index,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    {field.name.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              {template.form.length > 3 && (
                <span className="ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:text-gray-900 dark:group-hover:text-gray-300">
                  +{template.form.length - 3} more fields
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;