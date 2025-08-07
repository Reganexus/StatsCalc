'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  onNext: (data: { maxRating: number; numItems: number }) => void;
  onReset: () => void;
  defaultValues?: { maxRating: number; numItems: number } | null;
};

export default function QualitativeInput({ onNext, onReset, defaultValues }: Props) {
  const [maxRating, setMaxRating] = useState('');
  const [numItems, setNumItems] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setMaxRating(defaultValues.maxRating.toString());
      setNumItems(defaultValues.numItems.toString());
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      maxRating: parseInt(maxRating),
      numItems: parseInt(numItems),
    });
  };

  const handleClear = () => {
    setMaxRating('');
    setNumItems('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/50 p-4 rounded-md text-sm shadow-md flex flex-col gap-4 w-[20vw]">
      <input type="number" className='px-4 py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder="Maximum Rating" value={maxRating} onChange={(e) => setMaxRating(e.target.value)} required />
      <input type="number" className='px-4 py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder="Number of Items" value={numItems} onChange={(e) => setNumItems(e.target.value)} required />
      <div className="flex gap-2">
        <button type="submit" className="border-2 text-blue-500 border-blue-500/50 transition-all ease-in-out hover:transition-all hover:ease-in-out hover:text-white hover:border-blue-500 hover:bg-blue-500 w-full py-2 px-4 rounded">Generate Table</button>
        <button type="button" className="border-2 text-red-500 border-red-500/50 transition-all ease-in-out hover:transition-all hover:ease-in-out hover:text-white hover:border-red-500 hover:bg-red-500 w-full py-2 px-4 rounded" onClick={handleClear}>Reset Table</button>
      </div>
    </form>
  );
}
