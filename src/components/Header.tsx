import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <img src="https://cdn-sdotid.adg.id/images/a0aa0a98-9617-424c-ba67-4648418d1706_512x512.webp.png" alt="Logo Sekolah" className="mx-auto mb-4 h-24 w-24 object-contain"/>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
        Formulir Pilihan Mata Pelajaran TKA
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
        SMK Negeri 1 Lubuk Sikaping
      </p>
    </header>
  );
};

export default Header;
