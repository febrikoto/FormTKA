import React from 'react';

interface TroubleshootingGuideProps {
  onRecheck: () => void;
  isChecking: boolean;
}

const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({ onRecheck, isChecking }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-6 rounded-lg shadow-md my-4" role="alert">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-red-500 mr-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Panduan Mengatasi Masalah Koneksi</h3>
        </div>
        <button
          onClick={onRecheck}
          disabled={isChecking}
          className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isChecking ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengecek...
            </>
          ) : 'Coba Cek Koneksi Lagi'}
        </button>
      </div>
      <div className="space-y-4 text-sm text-red-800 dark:text-red-200">
        <p>Aplikasi ini tidak dapat terhubung ke backend Google Apps Script. Masalah ini hampir selalu disebabkan oleh kesalahan konfigurasi pada saat deployment skrip. Silakan ikuti langkah-langkah di bawah ini di proyek Google Apps Script Anda.</p>
        
        <div className="border-t border-red-300 dark:border-red-700 pt-4">
          <h4 className="font-bold mb-2">Langkah 1: Buka Pengaturan Deployment Anda</h4>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Buka proyek Google Apps Script Anda.</li>
            <li>Klik tombol <strong className="font-semibold">"Deploy"</strong> di pojok kanan atas, lalu pilih <strong className="font-semibold">"Manage deployments"</strong>.</li>
            <li>Cari deployment aktif Anda, lalu klik ikon pensil (Edit <span aria-hidden="true">✏️</span>) di sebelahnya.</li>
          </ol>
        </div>

        <div className="border-t border-red-300 dark:border-red-700 pt-4">
          <h4 className="font-bold mb-2">Langkah 2: Periksa dan Ubah Konfigurasi</h4>
          <p className="mb-2">Di jendela konfigurasi, pastikan dua pengaturan berikut sudah benar:</p>
          <div className="space-y-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-md">
            <div>
              <p className="font-semibold">1. Jalankan sebagai (Execute as):</p>
              <p>Harus diatur ke <strong className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded">Saya (Me)</strong>. Ini memastikan skrip berjalan dengan izin Anda untuk menulis ke Google Sheet.</p>
              <p className="text-xs mt-1">Pengaturan saat ini kemungkinan <span className="font-mono bg-red-200 dark:bg-red-800 px-1 rounded">"User accessing the web app"</span>, ini <span className="font-bold">SALAH</span>.</p>
            </div>
            <div>
              <p className="font-semibold">2. Yang memiliki akses (Who has access):</p>
              <p>Harus diatur ke <strong className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded">Siapa saja (Anyone)</strong>. Ini memungkinkan aplikasi untuk mengakses skrip tanpa memerlukan login Google.</p>
               <p className="text-xs mt-1">Pengaturan saat ini kemungkinan <span className="font-mono bg-red-200 dark:bg-red-800 px-1 rounded">"Anyone with a Google Account"</span>, ini <span className="font-bold">SALAH</span>.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-red-300 dark:border-red-700 pt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-bold mb-2 text-yellow-800 dark:text-yellow-200">Langkah 3: <span className="underline">SANGAT PENTING</span> - Buat Versi Baru</h4>
          <p className="text-yellow-900 dark:text-yellow-300">Setelah mengubah pengaturan di atas, Anda <strong className="font-semibold">HARUS</strong> membuat "versi" deployment baru agar perubahan diterapkan.</p>
          <ol className="list-decimal list-inside space-y-1 pl-2 mt-2">
              <li>Di jendela yang sama, cari dropdown <strong className="font-semibold">"Version"</strong>.</li>
              <li>Pilih <strong className="font-semibold bg-blue-100 dark:bg-blue-800 px-1 rounded">"New version"</strong> dari daftar.</li>
              <li>Setelah itu, baru klik tombol <strong className="font-semibold">"Deploy"</strong> untuk menyimpan semuanya.</li>
          </ol>
        </div>

        <div className="border-t border-red-300 dark:border-red-700 pt-4">
          <h4 className="font-bold mb-2">Langkah 4: Verifikasi Perubahan</h4>
          <p>Setelah Anda men-deploy versi baru di Google Apps Script, kembali ke aplikasi ini dan klik tombol <strong className="font-semibold">"Coba Cek Koneksi Lagi"</strong> di atas. Jika berhasil, panduan ini akan hilang dan formulir akan aktif.</p>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;