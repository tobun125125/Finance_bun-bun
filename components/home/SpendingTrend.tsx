import React from 'react';

export function SpendingTrend() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Spending Trend</h3>
        <select className="text-xs font-medium bg-transparent border-none text-primary focus:ring-0 cursor-pointer outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <div className="h-32 w-full">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <defs>
            <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#306ee8" stopOpacity="0.2"></stop>
              <stop offset="100%" stopColor="#306ee8" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path d="M0,80 Q50,75 100,40 T200,50 T300,20 T400,30 L400,100 L0,100 Z" fill="url(#chartGradient)"></path>
          <path d="M0,80 Q50,75 100,40 T200,50 T300,20 T400,30" fill="none" stroke="#306ee8" strokeLinecap="round" strokeWidth="3"></path>
        </svg>
      </div>
    </section>
  );
}
