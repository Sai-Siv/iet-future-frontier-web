import React from 'react';
import { Question } from '@/data/awardsData';

interface FormFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ question, value, onChange }) => {
  const { id, title, type, required, options } = question;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = "w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500";

  const renderField = () => {
    switch (type) {
      case 'Short Answer':
        return <input id={`q-${id}`} type="text" value={value || ''} onChange={handleInputChange} required={required} className={inputClasses} placeholder="Your answer" />;
      
      case 'Paragraph':
        return <textarea id={`q-${id}`} value={value || ''} onChange={handleInputChange} required={required} className={`${inputClasses} min-h-[100px]`} placeholder="Your answer" />;
      
      case 'Multiple Choice':
        return (
          <div className="space-y-2">
            {options?.map((opt, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={`q-${id}`}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={handleInputChange}
                    required={required}
                    className="peer appearance-none w-5 h-5 border-2 border-purple-500/50 rounded-full checked:border-purple-500 checked:bg-purple-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-1 focus:ring-offset-black"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-purple-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{opt.value}</span>
              </label>
            ))}
          </div>
        );
      
      case 'Dropdown':
        return (
          <select value={value || ''} onChange={handleInputChange} required={required} className={`${inputClasses} appearance-none`}>
            <option value="" disabled className="bg-gray-900 text-gray-400">Select an option</option>
            {options?.map((opt, idx) => (
              <option key={idx} value={opt.value} className="bg-gray-900 text-white">{opt.value}</option>
            ))}
          </select>
        );
      
      case 'File Upload':
        return (
          <div className="space-y-2">
            <input id={`q-${id}`} type="file" onChange={(e) => onChange(e.target.files?.[0] || null)} required={required} className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30`} />
            <p className="text-xs text-gray-400">Please upload the required documentary proof.</p>
          </div>
        );
      
      case 'Checkboxes':
        return (
          <div className="space-y-2">
            {options?.map((opt, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  id={`q-${id}-opt-${idx}`} 
                  className="w-5 h-5 rounded border-purple-500/50 bg-white/10 checked:bg-purple-500 checked:border-purple-500 focus:ring-purple-500 focus:ring-offset-black transition-all cursor-pointer"
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  onChange={(e) => {
                    const current = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      onChange([...current, opt.value]);
                    } else {
                      onChange(current.filter((v: string) => v !== opt.value));
                    }
                  }} 
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">{opt.value}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <input id={`q-${id}`} type="text" value={value || ''} onChange={handleInputChange} required={required} className={inputClasses} />;
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor={`q-${id}`} className="block text-white font-medium mb-2">
        {title} {required && <span className="text-purple-500">*</span>}
      </label>
      {renderField()}
    </div>
  );
};
