'use client';
import React, { useEffect, useState } from 'react';
import DescriptiveStats from '../Result/result';

type Props = {
  onNext: (data: number[]) => void;
  onReset: () => void;
  defaultValues: number[] | null;
};

export default function Ungrouped({ onNext, onReset, defaultValues }: Props) {
  const [rawInput, setRawInput] = useState('');
  const [data, setData] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setRawInput(defaultValues.join(', '));
      setData(defaultValues);
      setShowResult(true);
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = rawInput
      .split(/[\s,;]+/)
      .map((val) => parseFloat(val.trim()))
      .filter((val) => !isNaN(val));

    if (parsed.length === 0) {
      alert('Please enter valid numbers.');
      return;
    }

    setData(parsed);
    onNext(parsed);
    setShowResult(true);
  };

  const handleReset = () => {
    setRawInput('');
    setData([]);
    setShowResult(false);
    onReset();
  };

  return (
    <div className="flex flex-col gap-6 items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900/50 p-4 rounded-md text-sm shadow-md flex flex-col gap-4 w-[20vw]"
      >
        <label htmlFor="ungroupedInput" className="font-semibold text-white">
          Enter data (comma, semicolon, or space separated):
        </label>
        <textarea
          id="ungroupedInput"
          className="resize-none h-40 p-3 rounded bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:border-white"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="e.g. 1, 2, 3.5; 4 5 6"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="border-2 text-green-500 border-green-500/50 hover:text-white hover:border-green-500 hover:bg-green-500 w-full py-2 px-4 rounded"
          >
            Generate Result
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="border-2 text-red-500 border-red-500/50 hover:text-white hover:border-red-500 hover:bg-red-500 w-full py-2 px-4 rounded"
          >
            Reset Entry
          </button>
        </div>
      </form>

      {showResult && data.length > 0 && (
        <DescriptiveStats data={data} title="Ungrouped Data Results" />
      )}
    </div>
  );
}
