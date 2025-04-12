import React, { useState, useEffect } from 'react';
import { Button } from './Button';

const Search = ({
  onSearch,
  placeholder = "Search...",
  className = "",
  value: controlledValue,
  onChange: onControlledChange
}) => {
  const [query, setQuery] = useState(controlledValue || '');

  useEffect(() => {
    if (controlledValue !== undefined) {
      setQuery(controlledValue);
    }
  }, [controlledValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;

    if (onControlledChange) {
      onControlledChange(e);
    }

    setQuery(newQuery);
  };

  const handleClear = () => {
    setQuery('');

    if (onControlledChange) {
      onControlledChange({ target: { value: '' } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${className}`}>
        <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full p-4 pl-10 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                />
                {query && (
                    <Button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={handleClear}
                    >
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </Button>
                )}
            </div>
    </form>
  );
};

export default Search;
