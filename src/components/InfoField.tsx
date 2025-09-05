
import React from 'react';

interface InfoFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      />
    </div>
  );
};

export default InfoField;
