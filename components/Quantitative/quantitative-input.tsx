'use client';
import React, { useState, useEffect } from 'react';

type Props = {
  onNext: (data: { lower: number; upper: number; range: number }) => void;
  onReset: () => void;
  defaultValues?: { lower: number; upper: number; range: number } | null;
};

export default function QuantitativeInput({ onNext, onReset, defaultValues }: Props) {
  const [lower, setLower] = useState('');
  const [upper, setUpper] = useState('');
  const [range, setRange] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setLower(defaultValues.lower.toString());
      setUpper(defaultValues.upper.toString());
      setRange(defaultValues.range.toString());
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      lower: parseInt(lower),
      upper: parseInt(upper),
      range: parseInt(range),
    });
  };

  const handleClear = () => {
    setLower('');
    setUpper('');
    setRange('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/50 p-4 rounded-md text-sm shadow-md flex flex-col gap-4 w-[20vw]">
      <input min={0} className="px-4 py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" placeholder="Lower Boundary" value={lower} onChange={(e) => setLower(e.target.value)} required />
      <input min={0} className="px-4 py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" placeholder="Upper Boundary" value={upper} onChange={(e) => setUpper(e.target.value)} required />
      <input min={0} className="px-4 py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" placeholder="Range" value={range} onChange={(e) => setRange(e.target.value)} required />
      <div className="flex gap-2">
        <button type="submit" className="border-2 text-blue-500 border-blue-500/50 transition-all ease-in-out hover:transition-all hover:ease-in-out hover:text-white hover:border-blue-500 hover:bg-blue-500 w-full py-2 px-4 rounded">Generate Table</button>
        <button type="button" className="border-2 text-red-500 border-red-500/50 transition-all ease-in-out hover:transition-all hover:ease-in-out hover:text-white hover:border-red-500 hover:bg-red-500 w-full py-2 px-4 rounded" onClick={handleClear}>Reset Table</button>
      </div>
    </form>
  );
}
