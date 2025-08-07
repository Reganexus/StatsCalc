'use client';
import React from 'react';
import {
  CalculatorIcon,
  BarChartIcon,
  LineChartIcon,
  SigmaIcon,
} from 'lucide-react';

const featureData = [
  {
    icon: <BarChartIcon size={32} />,
    title: 'Quantitative Data',
    description: 'Analyze grouped numerical data using class intervals and frequencies.',
  },
  {
    icon: <LineChartIcon size={32} />,
    title: 'Qualitative Data',
    description: 'Rank categorical responses with weighted scores and frequency counts.',
  },
  {
    icon: <CalculatorIcon size={32} />,
    title: 'Ungrouped Data',
    description: 'Compute essential measures from raw, unclassified datasets.',
  },
];

const treatments = [
  'Mean (Average)',
  'Median (Middle Value)',
  'Mode (Most Frequent)',
  'Variance',
  'Standard Deviation',
  'Q1 (Lower Quartile)',
  'Q2 (Median)',
  'Q3 (Upper Quartile)',
  'IQR (Interquartile Range)',
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg hover:bg-neutral-800 transition-all duration-200">
      <div className="text-blue-400">{icon}</div>
      <h3 className="text-lg font-semibold mt-3">{title}</h3>
      <p className="text-sm text-neutral-400 mt-1">{description}</p>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="w-full h-full flex flex-col gap-14 items-center justify-center text-white px-6 py-20">
      {/* Hero */}
      <div className="text-center max-w-xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight text-white">
          StatsCalc
        </h1>
        <p className="text-base sm:text-lg text-neutral-400">
          A simple, elegant statistical calculator built to help you interpret your data quickly — no stress, just stats.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl w-full px-2">
        {featureData.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>

      {/* Statistical Treatments */}
      <div className="max-w-4xl w-full text-center mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 flex justify-center items-center gap-2">
          <SigmaIcon size={22} className="text-blue-400" />
          Statistical Treatments We Provide
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className="bg-neutral-900 px-4 py-2 rounded-lg text-sm text-neutral-300 border border-neutral-700 hover:bg-neutral-800 transition-all duration-150"
            >
              {treatment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
