import React, { useState, useMemo } from 'react';
import { PROGRAM_STUDI_GUIDE, ELECTIVE_SUBJECTS } from '../constants';

interface SelectionGuideProps {
  onHighlightChange: (subjects: string[]) => void;
}

type TabKey = keyof typeof PROGRAM_STUDI_GUIDE;

const SelectionGuide: React.FC<SelectionGuideProps> = ({ onHighlightChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('saintek');

  const subjectNameMap = useMemo(() => {
    const map = new Map<string, string>();
    ELECTIVE_SUBJECTS.forEach(subject => map.set(subject.id, subject.name));
    return map;
  }, []);

  const handleMouseEnter = (subjectId: string) => {
    onHighlightChange([subjectId]);
  };

  const handleMouseLeave = () => {
    onHighlightChange([]);
  };

  const renderTabContent = () => {
    const cluster = PROGRAM_STUDI_GUIDE[activeTab];
    if (!cluster) return null;

    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-sm">
        {cluster.subjects.map(subjectId => (
          <li
            key={subjectId}
            onMouseEnter={() => handleMouseEnter(subjectId)}
            onMouseLeave={handleMouseLeave}
            className="p-2 rounded-md bg-slate-200/50 dark:bg-slate-700/50 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors cursor-pointer text-center text-slate-700 dark:text-slate-300"
          >
            {subjectNameMap.get(subjectId) || subjectId}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <details className="bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 open:ring-2 open:ring-blue-500 open:shadow-lg transition-all">
      <summary className="p-4 font-semibold text-slate-800 dark:text-slate-100 cursor-pointer list-none flex justify-between items-center">
        <span>Panduan Pemilihan Mata Pelajaran Pilihan</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 transition-transform transform details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <style>{`
          details[open] .details-arrow {
            transform: rotate(180deg);
          }
        `}</style>
      </summary>
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Arahkan kursor ke mata pelajaran di bawah untuk melihatnya di daftar pilihan. Ini adalah rekomendasi berdasarkan program studi di perguruan tinggi.
        </p>
        <div className="flex border-b border-slate-300 dark:border-slate-600">
          {(Object.keys(PROGRAM_STUDI_GUIDE) as TabKey[]).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px border-b-2
                ${activeTab === key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
            >
              {PROGRAM_STUDI_GUIDE[key].name}
            </button>
          ))}
        </div>
        {renderTabContent()}

        <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-600 flex flex-wrap justify-center gap-4">
          <a
            href="https://pusmendik.kemendikdasmen.go.id/pdf/file-179"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lihat Dokumen (PDF)
          </a>
           <a
            href="https://pusmendik.kemdikbud.go.id/tka/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Kunjungi Website Resmi
          </a>
           <a
            href="https://pusmendik.kemdikbud.go.id/tka/simulasi_tka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-offset-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ayo Coba TKA
          </a>
          <a
            href="https://chat.whatsapp.com/DPUgM60qt4y1alDftnRrq8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors dark:bg-teal-700 dark:hover:bg-teal-600 dark:focus:ring-offset-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Gabung Grup WA
          </a>
        </div>

      </div>
    </details>
  );
};

export default SelectionGuide;
