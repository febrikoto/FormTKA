import React, { useState, useEffect, useMemo } from 'react';
import type { Submission } from '../types';
import { ELECTIVE_SUBJECTS, SCRIPT_URL } from '../constants';

interface SubjectCount {
  id: string;
  name: string;
  count: number;
}

interface DashboardProps {
  connectionStatus: 'checking' | 'ok' | 'error';
}

const Dashboard: React.FC<DashboardProps> = ({ connectionStatus }) => {
  const [subjectData, setSubjectData] = useState<SubjectCount[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${SCRIPT_URL}?action=read`, {
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          cache: 'no-cache',
        });
        
        const responseText = await response.text();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}. Pesan dari server: ${responseText}`);
        }

        let data: Submission[];
        try {
            data = JSON.parse(responseText);
        } catch (err) {
            console.error("Failed to parse JSON from Google Sheet", responseText);
            throw new Error("Menerima respons yang tidak valid dari server.");
        }
        
        setSubmissions(data);

        if (data.length > 0) {
          const counts = new Map<string, number>();
          
          data.forEach(submission => {
            submission.selectedElectives.forEach(electiveId => {
              counts.set(electiveId, (counts.get(electiveId) || 0) + 1);
            });
          });

          const calculatedData: SubjectCount[] = ELECTIVE_SUBJECTS.map(subject => ({
            id: subject.id,
            name: subject.name,
            count: counts.get(subject.id) || 0,
          })).sort((a, b) => b.count - a.count);

          setSubjectData(calculatedData);
        } else {
            setSubjectData([]);
        }

      } catch (err) {
        console.error("Failed to fetch from Google Sheet", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        // The detailed troubleshooting guide is shown in the main app.
        // This error handles other potential issues like script errors.
        setError(`Gagal memuat data dari Google Sheet. Silakan coba lagi nanti. Detail: ${errorMessage}`);
        setSubjectData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (connectionStatus === 'ok') {
      fetchData();
    } else if (connectionStatus === 'checking') {
      setIsLoading(true);
      setError(null);
    } else { // status is 'error'
      setIsLoading(false);
      // The main App component will display the detailed troubleshooting guide.
      // Here, we just display a simple message indicating why the dashboard is empty.
      setError("Tidak dapat memuat data dasbor karena masalah koneksi. Silakan lihat panduan di atas.");
    }

  }, [connectionStatus]);

  const totalSubmissions = submissions.length;

  const maxCount = useMemo(() => {
    if (subjectData.length === 0) return 0;
    return Math.max(...subjectData.map(s => s.count));
  }, [subjectData]);

  if (isLoading) {
    return (
        <div className="mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center">
            <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Memuat Data...</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Menghubungi Google Sheets untuk mendapatkan statistik terbaru.</p>
        </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center text-red-500">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Terjadi Kesalahan</h3>
        <p className="text-red-600 dark:text-red-400 mt-2 whitespace-pre-wrap">{error}</p>
      </div>
    );
  }

  if (subjectData.length === 0) {
    return (
      <div className="mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Dasbor Kosong</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Belum ada data pendaftaran yang masuk. Silakan isi formulir untuk melihat statistik.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 border-slate-200 dark:border-slate-600 pb-3 mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Popularitas Mata Pelajaran Pilihan
        </h2>
        <div className="mt-2 sm:mt-0 text-sm text-slate-600 dark:text-slate-300">
            Total Pendaftar: <span className="font-bold text-blue-600 dark:text-blue-400">{totalSubmissions}</span>
        </div>
      </div>
      <div className="space-y-4">
        {subjectData.map((subject) => (
          <div key={subject.id} className="w-full">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-200">{subject.name}</span>
              <span className="font-semibold text-slate-500 dark:text-slate-400">{subject.count} pilihan</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: maxCount > 0 ? `${(subject.count / maxCount) * 100}%` : '0%' }}
                role="progressbar"
                aria-valuenow={subject.count}
                aria-valuemin={0}
                aria-valuemax={maxCount}
                aria-label={subject.name}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;