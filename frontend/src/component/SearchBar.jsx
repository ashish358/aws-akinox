import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Set showSearch to true if on the collection page
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setShowSearch(true);
      setVisible(true);
    } else {
      setShowSearch(false);
      setVisible(false);
    }
  }, [location, setShowSearch]);

  // Render the SearchBar only if showSearch is true
  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center py-4 flex justify-center items-center gap-3">
      <div className="relative w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/2 flex items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-400 rounded-full py-2 pl-4 pr-10 text-sm outline-none bg-white shadow-sm focus:border-gray-600 transition"
          type="text"
          placeholder="Search..."
        />
        {/* Search Icon inside the input */}
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 text-gray-500" />
      </div>
      {/* Close (X) Icon outside the input */}
      <X
        onClick={() => setShowSearch(false)}
        className="w-6 cursor-pointer text-gray-600 hover:text-gray-800 transition"
      />
    </div>
  ) : null; // Return null if showSearch is false
};

export default SearchBar;
