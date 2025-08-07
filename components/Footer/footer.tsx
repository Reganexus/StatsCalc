import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto flex w-full items-center h-16 text-white">
      <p className="text-sm">
        © {new Date().getFullYear()} Renzo Viñas
      </p>
    </footer>
  );
}