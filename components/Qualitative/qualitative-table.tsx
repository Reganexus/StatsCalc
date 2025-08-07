'use client';
import React, { useState, useEffect } from 'react';
import DescriptiveStats from '../Result/result';

type Props = {
  maxRating: number;
  numItems: number;
};

export default function QualitativeTable({ maxRating, numItems }: Props) {
  const [scores, setScores] = useState<number[][]>(
    Array.from({ length: numItems }, () => Array(maxRating).fill(0))
  );
  const [means, setMeans] = useState<number[]>([]);
  const [totalMean, setTotalMean] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const newMeans: number[] = [];
    let sumOfMeans = 0;

    for (let i = 0; i < numItems; i++) {
      const row = scores[i];
      let totalWeight = 0;
      let totalScore = 0;

      for (let j = 0; j < maxRating; j++) {
        const rating = maxRating - j;
        totalWeight += row[j] * rating;
        totalScore += row[j];
      }

      const mean = totalScore ? totalWeight / totalScore : 0;
      newMeans[i] = parseFloat(mean.toFixed(2));
      sumOfMeans += mean;
    }

    setMeans(newMeans);
    setTotalMean(parseFloat((sumOfMeans / numItems).toFixed(2)));
  }, [scores]);

  const updateScore = (row: number, col: number, value: number) => {
    const newScores = [...scores];
    newScores[row][col] = value;
    setScores(newScores);
    setShowResult(false);
  };

  const rankings = [...means]
    .map((mean, index) => ({ index, mean }))
    .sort((a, b) => b.mean - a.mean)
    .map((entry, i) => ({ ...entry, rank: i + 1 }));

  return (
    <div className="flex flex-col gap-4 w-max">
      <div className="p-4 bg-neutral-900/50 rounded-md shadow-xl">
        <table className="table-auto w-max text-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Item</th>
              {[...Array(maxRating)].map((_, i) => (
                <React.Fragment key={i}>
                  <th className="px-2 py-2">{maxRating - i}</th>
                  <th className="px-2 py-2">Weight</th>
                </React.Fragment>
              ))}
              <th className="px-4 py-2">Total Weight</th>
              <th className="px-4 py-2">Mean</th>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Total Mean</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row, i) => {
              let totalW = 0;
              let totalScore = 0;

              return (
                <tr key={i}>
                  <td className="px-4 py-2 text-center font-bold">{i + 1}</td>
                  {row.map((val, j) => {
                    const rating = maxRating - j;
                    const weight = val * rating;
                    totalW += weight;
                    totalScore += val;
                    return (
                      <React.Fragment key={j}>
                        <td className="px-2 py-2 text-center">
                          <input
                            required
                            type="number"
                            min={0}
                            className="text-center w-[8vw] py-2 border-2 border-neutral-800 rounded-md appearance-none focus:outline-0 focus:border-neutral-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={val}
                            onChange={(e) =>
                              updateScore(i, j, parseInt(e.target.value || '0'))
                            }
                          />
                        </td>
                        <td className="px-2 py-2 text-center">{weight}</td>
                      </React.Fragment>
                    );
                  })}
                  <td className="px-4 py-2 text-center">{totalW}</td>
                  <td className="px-4 py-2 text-center">{means[i]}</td>
                  <td className="px-4 py-2 text-center">{rankings.find(r => r.index === i)?.rank}</td>
                  <td className="px-4 py-2 text-center font-medium">{i == 0 ? totalMean : ''}</td>
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

      {showResult && <DescriptiveStats data={means} title="Qualitative Data Results" />}
    </div>
  );
}
