'use client';
import React from 'react';
import Footer from '../Footer/footer';

type Props = {
  mode: string | null;
  setMode: (mode: 'quantitative' | 'qualitative' | 'ungrouped' | null) => void;
};

export default function Navbar({ mode, setMode }: Props) {
  const buttonClasses =
    'cursor-pointer px-2 py-2 rounded-md w-full text-start transition-colors';

  const fadedButton = `${buttonClasses} text-white/50 hover:text-white hover:bg-neutral-800`;
  const solidButton = `${buttonClasses} font-medium bg-neutral-800 hover:bg-neutral-800`;

  return (
    <aside className="text-white bg-neutral-900 w-[15vw] px-4 py-4 h-full flex flex-col items-start shadow-lg">
      <button
        onClick={() => setMode(null)}
        className="font-bold px-2 text-2xl text-white hover:text-blue-400 transition"
      >
        StatsCalc
      </button>

      <nav className="mt-16 text-md flex flex-col gap-1 items-start w-full">
        <p className="font-medium mb-1 px-2">Grouped Data</p>
        <button
          className={mode === 'qualitative' ? solidButton : fadedButton}
          onClick={() => setMode('qualitative')}
        >
          Qualitative
        </button>
        <button
          className={mode === 'quantitative' ? solidButton : fadedButton}
          onClick={() => setMode('quantitative')}
        >
          Quantitative
        </button>

        <hr className="w-full border-neutral-500/50 my-2" />

        <button
          className={mode === 'ungrouped' ? solidButton : fadedButton}
          onClick={() => setMode('ungrouped')}
        >
          Ungrouped Data
        </button>
      </nav>

      <Footer />
    </aside>
  );
}
