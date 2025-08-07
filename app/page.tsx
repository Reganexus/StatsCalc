'use client';
import React, { useState } from 'react';
import Navbar from '@components/Navigation/navbar';
import Calculator from '@components/Calculator/calculator';

export default function Home() {
  const [mode, setMode] = useState<'quantitative' | 'qualitative' | 'ungrouped' | null>(null);

  return (
    <div className="h-dvh w-full flex">
      <Navbar mode={mode} setMode={setMode} />
      <Calculator mode={mode} />
    </div>
  );
}
