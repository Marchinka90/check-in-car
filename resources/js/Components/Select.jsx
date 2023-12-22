import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ label, options, value, className = '', isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <select
      {...props}
      value={value}
      className={
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
        className
      } 
    >
      {options.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
    </select>
  );
});