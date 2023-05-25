import React from 'react'
import { SearchModule } from '@modules'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const dummyAppData = [
  { id: 1, name: 'App 1', description: 'Description of App 1', price: '$9.99' },
  { id: 2, name: 'App 2', description: 'Description of App 2', price: '$4.99' },
  { id: 3, name: 'App 3', description: 'Description of App 3', price: '$14.99' },
  // Add more dummy app data as needed
];

const Search = () => {
    const router = useRouter();
    const [keyword, setKeyword] = useState('');
  
    const handleSearch = () => {
      if (keyword.trim() !== '') {
        router.push(`/search/${encodeURIComponent(keyword)}`);
      }
    };
  
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleSearch}
          >
            Go
          </button>
        </div>
      </div>
    );
  };

export default Search
