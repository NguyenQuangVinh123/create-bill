"use client";
import React from 'react'
import { useState } from 'react';
import { formatDate } from "@/lib/utils";

export default function Collapse({ contactIncomes }: { contactIncomes: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-xl mb-2">
            <div
              className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white cursor-pointer flex justify-between items-center rounded-t-xl transition-all duration-300 hover:opacity-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-lg font-semibold">
                Bills each day in Month
              </span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-max opacity-100 p-4" : "max-h-0 opacity-0 p-0"
              } bg-white rounded-b-xl`}
            >
              {contactIncomes.map((i: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between py-3 border-b last:border-none text-gray-700"
                >
                  <div className="flex-1 font-medium">{formatDate(i.date)}</div>
                  <div className="flex-1 text-right font-semibold text-blue-600">
                    {i.totalContactIncome} bills
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}
