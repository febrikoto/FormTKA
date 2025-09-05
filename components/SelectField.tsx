import React from 'react';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, value, onChange, options, placeholder, disabled = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 disabled:bg-slate-200 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
