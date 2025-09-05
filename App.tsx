import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { COMPULSORY_SUBJECTS, ELECTIVE_SUBJECTS, MAX_ELECTIVE_SELECTIONS, MAJORS_AND_CLASSES, SCRIPT_URL } from './constants';
import type { Subject, Submission } from './types';
import Header from './components/Header';
import SubjectCheckbox from './components/SubjectCheckbox';
import InfoField from './components/InfoField';
import SelectField from './components/SelectField';
import Dashboard from './components/Dashboard';
import ErrorMessage from './components/ErrorMessage';
import ConnectionStatusBanner from './components/ConnectionStatusBanner';
import SelectionGuide from './components/SelectionGuide';

const App: React.FC = () => {
  const [studentName, setStudentName] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('');
  const [selectedElectives, setSelectedElectives] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [isRechecking, setIsRechecking] = useState<boolean>(false);
  const [highlightedSubjects, setHighlightedSubjects] = useState<string[]>([]);

  const checkConnection = useCallback(async () => {
    if (SCRIPT_URL === 'PASTE_YOUR_APPS_SCRIPT_URL_HERE' || !SCRIPT_URL) {
      setConnectionStatus('error');
      return;
    }
    try {
      // A GET request is a more reliable way to check Apps Script deployment
      // as it follows the necessary redirects and confirms the script can execute.
      const response = await fetch(SCRIPT_URL, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache',
      });
      if (!response.ok) {
        throw new Error(`Connection check failed with status: ${response.status}`);
      }
      setConnectionStatus('ok');
    } catch (error) {
      console.error("Backend connection check failed:", error);
      setConnectionStatus('error');
    }
  }, []);

  useEffect(() => {
    // Initial check on component mount
    checkConnection();
  }, [checkConnection]);

  const handleRecheckConnection = useCallback(async () => {
    setIsRechecking(true);
    try {
      // Use the same robust GET request for the re-check.
      const response = await fetch(SCRIPT_URL, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache',
      });
       if (!response.ok) {
        throw new Error(`Connection re-check failed with status: ${response.status}`);
      }
      setConnectionStatus('ok'); // Success!
    } catch (error) {
      console.error("Backend connection re-check failed:", error);
      // It failed again, keep status as 'error'
      setConnectionStatus('error');
    } finally {
      setIsRechecking(false);
    }
  }, []);

  const availableClasses = useMemo(() => major ? MAJORS_AND_CLASSES[major] : [], [major]);

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMajor(e.target.value);
    setStudentClass(''); // Reset class when major changes
  };

  const handleSelectionChange = useCallback((subjectId: string) => {
    setSelectedElectives(prevSelected => {
      if (prevSelected.includes(subjectId)) {
        return prevSelected.filter(id => id !== subjectId);
      }
      if (prevSelected.length < MAX_ELECTIVE_SELECTIONS) {
        return [...prevSelected, subjectId];
      }
      return prevSelected;
    });
  }, []);
  
  const isSelectionDisabled = useMemo(
    () => selectedElectives.length >= MAX_ELECTIVE_SELECTIONS,
    [selectedElectives]
  );

  const isFormValid = useMemo(
    () => studentName.trim() !== '' && major !== '' && studentClass !== '' && selectedElectives.length === MAX_ELECTIVE_SELECTIONS,
    [studentName, major, studentClass, selectedElectives]
  );
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting || connectionStatus === 'error') return;
    
    setSubmissionError(null);

    setIsSubmitting(true);
    
    const newSubmission: Submission = {
      studentName: studentName.trim(),
      major,
      class: studentClass,
      selectedElectives,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow', // Explicitly follow redirects from Google
        cache: 'no-cache', // Prevent caching issues
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Workaround for some GAS CORS issues
        },
        body: JSON.stringify(newSubmission),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Gagal mengirim data. Status: ${response.status}. Pesan dari server: ${responseText}`);
      }
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (error) {
        console.error("Gagal mem-parsing respons JSON:", responseText);
        throw new Error('Menerima respons yang tidak valid dari server.');
      }

      if (result.result === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'Gagal mengirim data.');
      }
    } catch (error) {
      console.error("Failed to submit to Google Sheet", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      let detailedMessage = `Silakan periksa koneksi internet Anda dan coba lagi.\n\nDetail: ${errorMessage}`;
      
      // The main ConnectionStatusBanner now handles the detailed troubleshooting guide for fetch errors.
      // This message can be simpler.
      if (errorMessage.includes('Failed to fetch')) {
        detailedMessage = 'Gagal menghubungi server. Masalah ini kemungkinan besar terkait dengan konfigurasi backend. Silakan lihat panduan di atas halaman.';
      }
      setSubmissionError(detailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStudentName('');
    setMajor('');
    setStudentClass('');
    setSelectedElectives([]);
    setIsSubmitted(false);
    setSubmissionError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <ConnectionStatusBanner 
            status={connectionStatus} 
            onRecheck={handleRecheckConnection} 
            isRechecking={isRechecking}
          />
          {showDashboard ? (
            <Dashboard connectionStatus={connectionStatus} />
          ) : isSubmitted ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center transition-all duration-500 ease-in-out transform scale-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Pendaftaran Berhasil!</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-2">Terima kasih, data Anda telah kami simpan di Google Sheet.</p>
              <div className="mt-6 flex justify-center gap-4">
                <button onClick={handleReset} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Isi Formulir Lagi
                </button>
                <button onClick={() => setShowDashboard(true)} className="px-6 py-2.5 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
                  Lihat Dasbor
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-600 pb-3 mb-6">
                  Informasi Siswa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoField id="studentName" label="Nama Lengkap" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Masukkan nama lengkap" />
                  <SelectField id="major" label="Jurusan" value={major} onChange={handleMajorChange} options={Object.keys(MAJORS_AND_CLASSES)} placeholder="Pilih jurusan" />
                  <SelectField id="studentClass" label="Kelas" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} options={availableClasses} placeholder="Pilih kelas" disabled={!major} />
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-600 pb-3 mb-6">
                  Mata Pelajaran Wajib
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {COMPULSORY_SUBJECTS.map(subject => (
                     <div key={subject.id} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-center font-medium text-slate-600 dark:text-slate-300">
                      {subject.name}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="border-b-2 border-slate-200 dark:border-slate-600 pb-3 mb-6 flex justify-between items-center">
                   <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Mata Pelajaran Pilihan
                  </h2>
                </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 my-4">
                  Pilih <span className="font-bold text-blue-600 dark:text-blue-400">{MAX_ELECTIVE_SELECTIONS}</span> mata pelajaran pilihan yang paling kamu minati.
                </p>
                
                <SelectionGuide onHighlightChange={setHighlightedSubjects} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {ELECTIVE_SUBJECTS.map(subject => (
                    <SubjectCheckbox
                      key={subject.id}
                      id={subject.id}
                      label={subject.name}
                      isChecked={selectedElectives.includes(subject.id)}
                      isDisabled={!selectedElectives.includes(subject.id) && isSelectionDisabled}
                      onChange={() => handleSelectionChange(subject.id)}
                      isHighlighted={highlightedSubjects.includes(subject.id)}
                    />
                  ))}
                </div>
              </section>

              {submissionError && (
                <ErrorMessage
                  title="Gagal Mengirim Data"
                  message={submissionError}
                  onClose={() => setSubmissionError(null)}
                />
              )}

              <div className="pt-6 border-t-2 border-slate-200 dark:border-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-sm text-slate-500 dark:text-slate-400">
                   Pastikan semua data yang Anda masukkan sudah benar sebelum mengirim.
                 </p>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting || connectionStatus === 'error'}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-600 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pilihan'
                  )}
                </button>
              </div>
            </form>
          )}
           <div className="text-center mt-8">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {showDashboard ? 'Kembali ke Formulir' : 'Lihat Dasbor Pilihan'}
              </button>
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
