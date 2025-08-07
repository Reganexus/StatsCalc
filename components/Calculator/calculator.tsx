'use client';
import React, { useState } from 'react';
import QuantitativeInput from '@components/Quantitative/quantitative-input';
import QuantitativeTable from '@components/Quantitative/quantitative-table';
import QualitativeInput from '@components/Qualitative/qualitative-input';
import QualitativeTable from '@components/Qualitative/qualitative-table';
import Ungrouped from '@components/Ungrouped/ungrouped';
import MainContent from '@components/Main/main';

type Mode = 'quantitative' | 'qualitative' | 'ungrouped' | null;

function capitalizeFirstLetter(str: string) {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1) + ' Treatment';
}

export default function Calculator({ mode }: { mode: Mode }) {
  const [quantData, setQuantData] = useState<null | { lower: number; upper: number; range: number }>(null);
  const [qualData, setQualData] = useState<null | { maxRating: number; numItems: number }>(null);
  const [ungroupedData, setUngroupedData] = useState<number[] | null>(null);

  const handleReset = () => {
    setQuantData(null);
    setQualData(null);
    setUngroupedData(null);
  };

  return (
    <div className="w-full h-full bg-neutral-800 text-white overflow-y-auto px-6 py-12">
      <div className="max-w w-full mx-auto flex flex-col gap-10">
        {/* Main Content (Landing page) */}
        {!mode && <MainContent />}

        {/* Grouped: Quantitative */}
        {mode === 'quantitative' && (
          <>
            <h3 className="text-3xl font-bold">{capitalizeFirstLetter(mode)}</h3>
            <QuantitativeInput
              onNext={setQuantData}
              onReset={handleReset}
              defaultValues={quantData}
            />
            {quantData && <QuantitativeTable {...quantData} />}
          </>
        )}

        {/* Grouped: Qualitative */}
        {mode === 'qualitative' && (
          <>
            <h3 className="text-3xl font-bold">{capitalizeFirstLetter(mode)}</h3>
            <QualitativeInput
              onNext={setQualData}
              onReset={handleReset}
              defaultValues={qualData}
            />
            {qualData && <QualitativeTable {...qualData} />}
          </>
        )}

        {/* Ungrouped */}
        {mode === 'ungrouped' && (
          <>
            <h3 className="text-3xl font-bold">{capitalizeFirstLetter(mode)}</h3>
            <Ungrouped
              onNext={setUngroupedData}
              onReset={handleReset}
              defaultValues={ungroupedData}
            />
          </>
        )}
      </div>
    </div>
  );
}
