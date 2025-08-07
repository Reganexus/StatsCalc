'use client';
import React, { useMemo } from 'react';

type Props = {
  data: number[];
  title?: string;
};

export default function DescriptiveStats({ data, title = 'Results' }: Props) {
  const sortedData = useMemo(() => [...data].sort((a, b) => a - b), [data]);

  const mean = useMemo(() => {
    const sum = sortedData.reduce((acc, val) => acc + val, 0);
    return sum / sortedData.length;
  }, [sortedData]);

  const median = useMemo(() => {
    const len = sortedData.length;
    return len % 2 === 0
      ? (sortedData[len / 2 - 1] + sortedData[len / 2]) / 2
      : sortedData[Math.floor(len / 2)];
  }, [sortedData]);

  const mode = useMemo(() => {
    const freq: Record<number, number> = {};
    sortedData.forEach((val) => {
      freq[val] = (freq[val] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq)
      .filter((key) => freq[parseFloat(key)] === maxFreq)
      .map((k) => parseFloat(k));
    return modes.length === sortedData.length ? ['No mode'] : modes;
  }, [sortedData]);

  const quartiles = useMemo(() => {
    const Q = (p: number) => {
      const pos = (p * (sortedData.length + 1)) / 4;
      const lower = Math.floor(pos) - 1;
      const upper = Math.ceil(pos) - 1;
      const decimal = pos % 1;
      return sortedData[lower] + decimal * (sortedData[upper] - sortedData[lower]);
    };
    const Q1 = Q(1);
    const Q2 = Q(2);
    const Q3 = Q(3);
    return { Q1, Q2, Q3, IQR: Q3 - Q1 };
  }, [sortedData]);

  const variance = useMemo(() => {
    const diffs = sortedData.map((val) => Math.pow(val - mean, 2));
    return diffs.reduce((acc, val) => acc + val, 0) / (sortedData.length - 1);
  }, [sortedData, mean]);

  const standardDeviation = Math.sqrt(variance);

  return (
    <div className="p-4 bg-neutral-900/50 rounded-md shadow-xl w-max">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <table className="table-auto w-max text-white text-sm">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-medium">Mean</td>
            <td className="px-4 py-2">{mean.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Median</td>
            <td className="px-4 py-2">{median.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Mode</td>
            <td className="px-4 py-2">{Array.isArray(mode) ? mode.join(', ') : mode}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Q1</td>
            <td className="px-4 py-2">{quartiles.Q1.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Q2 (Median)</td>
            <td className="px-4 py-2">{quartiles.Q2.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Q3</td>
            <td className="px-4 py-2">{quartiles.Q3.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">IQR</td>
            <td className="px-4 py-2">{quartiles.IQR.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Variance</td>
            <td className="px-4 py-2">{variance.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Standard Deviation</td>
            <td className="px-4 py-2">{standardDeviation.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
