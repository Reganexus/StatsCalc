'use client';
import React, { useState } from 'react';
import DescriptiveStats from '../Result/result';

type Props = {
  lower: number;
  upper: number;
  range: number;
};

export default function QuantitativeTable({ lower, upper, range }: Props) {
  const numRows = Math.ceil((upper - lower + 1) / range);
  const [frequencies, setFrequencies] = useState<number[]>(Array(numRows).fill(0));
  const [showResult, setShowResult] = useState(false);

  const handleFrequencyChange = (index: number, value: number) => {
    const updated = [...frequencies];
    updated[index] = value;
    setFrequencies(updated);
    setShowResult(false); 
  };

  const data: number[] = [];
  for (let i = 0; i < numRows; i++) {
    const lb = lower + i * range;
    const ub = i === numRows - 1 ? upper : lb + range - 1;
    const midpoint = (lb + ub) / 2;
    for (let j = 0; j < frequencies[i]; j++) {
      data.push(midpoint);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="p-4 bg-neutral-900/50 rounded-md shadow-xl">
        <table className="table-auto w-max text-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Lower Boundary</th>
              <th className="px-4 py-2">Upper Boundary</th>
              <th className="px-4 py-2">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRows }).map((_, i) => {
              const lb = lower + i * range;
              const ub = i === numRows - 1 ? upper : lb + range - 1;
              return (
                <tr key={i}>
                  <td className="px-4 py-2 text-center">{lb}</td>
                  <td className="px-4 py-2 text-center">{ub}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      required
                      type="number"
                      min={0}
                      className="text-center w-[8vw] py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={frequencies[i]}
                      onChange={(e) =>
                        handleFrequencyChange(i, parseInt(e.target.value || '0'))
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          onClick={() => setShowResult(true)}
          className="border-2 text-green-500 border-green-500/50 transition-all ease-in-out hover:transition-all hover:ease-in-out hover:text-white hover:border-green-500 hover:bg-green-500 mt-4 py-2 px-4 rounded"
        >
          Calculate Result
        </button>
      </div>

      {showResult && data.length > 0 && (
        <DescriptiveStats data={data} title="Quantitative Data Results" />
      )}
    </div>
  );
}
