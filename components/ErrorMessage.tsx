import React from 'react';

interface ErrorMessageProps {
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, onClose }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-md my-4" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button onClick={onClose} aria-label="Close error message" className="-mx-1.5 -my-1.5 bg-red-50 dark:bg-transparent text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 inline-flex h-8 w-8 transition-colors">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
