import React from 'react';

interface SubjectCheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: () => void;
  isHighlighted?: boolean;
}

const SubjectCheckbox: React.FC<SubjectCheckboxProps> = ({ id, label, isChecked, isDisabled, onChange, isHighlighted }) => {
  const baseClasses = "flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer";
  
  let stateClasses = "";
  if (isChecked) {
    stateClasses = "bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-500";
  } else if (isDisabled) {
    stateClasses = "bg-slate-100 border-slate-200 dark:bg-slate-700/50 dark:border-slate-600 opacity-60 cursor-not-allowed";
  } else if (isHighlighted) {
    stateClasses = "bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-600 ring-2 ring-yellow-400 dark:ring-yellow-500";
  } else {
    stateClasses = "bg-white border-slate-300 hover:border-blue-400 dark:bg-slate-900 dark:border-slate-600 dark:hover:border-blue-500";
  }
  
  return (
    <label htmlFor={id} className={`${baseClasses} ${stateClasses}`}>
      <div className="flex-shrink-0 w-5 h-5 mr-4 rounded-sm border-2 flex items-center justify-center transition-colors duration-200
        ${isChecked ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-slate-400 dark:border-slate-500'}
        ${isDisabled && !isChecked ? 'bg-slate-300 dark:bg-slate-600 border-slate-400 dark:border-slate-500' : ''}">
        {isChecked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className={`flex-1 font-medium text-sm ${isChecked ? 'text-blue-800 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
        {label}
      </span>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

export default SubjectCheckbox;
