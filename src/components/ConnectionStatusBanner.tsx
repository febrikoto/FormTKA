import React from 'react';
import TroubleshootingGuide from './TroubleshootingGuide';

type Status = 'checking' | 'ok' | 'error';

interface ConnectionStatusBannerProps {
  status: Status;
  onRecheck: () => void;
  isRechecking: boolean;
}

const ConnectionStatusBanner: React.FC<ConnectionStatusBannerProps> = ({ status, onRecheck, isRechecking }) => {
  if (status === 'ok') {
    return null;
  }

  if (status === 'checking' && !isRechecking) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg shadow-md my-4 flex items-center">
        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Memeriksa koneksi ke backend...</span>
      </div>
    );
  }

  // status === 'error' or isRechecking
  return <TroubleshootingGuide onRecheck={onRecheck} isChecking={isRechecking} />;
};

export default ConnectionStatusBanner;