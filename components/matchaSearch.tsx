// components/MatchaSearchWithActions.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { searchMatchaAction } from '@/app/login/actions';
import Link from 'next/link'; 
import Image from 'next/image'; 
import { ArrowRightIcon } from '@heroicons/react/24/solid'; 

// Define the type for your matcha data
interface MatchaProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url?: string;
  notes?: string[];
}

export default function MatchaSearchWithActions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MatchaProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [triggerFullSearch, setTriggerFullSearch] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect for debounced suggestions
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.trim() === '') {
      setSearchResults([]); 
      setLoading(false);
      setShowSuggestions(false); // Hide suggestions when input is empty
      setTriggerFullSearch(false); // Reset full search trigger
      return;
    }

    setLoading(true);
    setError(null);
    setShowSuggestions(true); // Show suggestions once typing starts

    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchMatchaAction(searchTerm);
        setSearchResults(data as MatchaProduct[]);
      } catch (err: any) {
        console.error('Failed to fetch search results:', err);
        setError(`Failed to load search results: ${err.message}`);
        setSearchResults([]); // Clear results on error
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay


    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]); // Re-run effect whenever searchTerm changes

  // Effect for actual "full" search (e.g., when button is clicked or Enter is pressed)
  // This will re-run the search with the current searchTerm, potentially showing
  // a dedicated results page or section, rather than just suggestions.
  useEffect(() => {
    if (triggerFullSearch && searchTerm.trim() !== '') {
      setLoading(true);
      setError(null);
      setShowSuggestions(false); // Hide suggestions when performing full search

      const performFinalSearch = async () => {
        try {
          const data = await searchMatchaAction(searchTerm);
          setSearchResults(data as MatchaProduct[]); // Update results for full display
        } catch (err: any) {
          console.error('Failed to perform full search:', err);
          setError(`Failed to load search results: ${err.message}`);
          setSearchResults([]);
        } finally {
          setLoading(false);
          setTriggerFullSearch(false); // Reset trigger after search
        }
      };
      performFinalSearch();
    }
  }, [triggerFullSearch, searchTerm]);


  const handleSuggestionClick = (productName: string) => {
    setSearchTerm(productName); // Set input value to clicked suggestion
    setSearchResults([]); // Clear suggestions
    setShowSuggestions(false); // Hide suggestions
    setTriggerFullSearch(true); // Trigger a full search for the selected item
    inputRef.current?.focus(); // Keep focus on input after selection
  };

  const handleInputBlur = () => {
    // Small delay to allow click event on suggestion to fire before hiding
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleInputFocus = () => {
    // Only show suggestions if there's a search term and results exist
    if (searchTerm.trim() !== '' && searchResults.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleArrowButtonClick = () => {
    // This will trigger the second useEffect to perform a full search
    setTriggerFullSearch(true);
    setShowSuggestions(false); // Hide suggestions immediately on button click
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      setTriggerFullSearch(true);
      setShowSuggestions(false);
      inputRef.current?.blur(); // Optionally blur the input after Enter
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto relative"> 
      <div className="flex items-center space-x-2 mb-4"> {/* Container for input and button */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress} // Add key press handler
          className="flex-grow p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sage" // flex-grow makes it take available space
        />
        <button
          onClick={handleArrowButtonClick}
          className="p-3 bg-sage text-white rounded-lg shadow-sm hover:bg-matcha focus:outline-none focus:ring-2 focus:ring-sage transition duration-200 cursor-pointer"
          title="Search"
        >
          <ArrowRightIcon className="h-6 w-6" /> 
        </button>
      </div>


      {loading && searchTerm.trim() !== '' && !triggerFullSearch && <p className="text-center text-gray-600">Loading suggestions...</p>}
      {loading && triggerFullSearch && <p className="text-center text-gray-600">Searching...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Conditional rendering for suggestions */}
      {showSuggestions && searchResults.length > 0 && !loading && !error && searchTerm.trim() !== '' && (
        <ul className="absolute z-10 w-[calc(100%-40px)] bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {searchResults.map((product) => (
            <li
              key={product.id}
              className="p-3 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50 last:border-b-0"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <Link
                href={`/matcha/${product.id}`}
                onClick={() => handleSuggestionClick(product.name)}
                className="flex items-center gap-3 w-full cursor-pointer"
              >
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md"
                    width={40}
                    height={40}
                  />
                )}
                <div>
                  <strong className="text-gray-800">{product.name}</strong>
                  <p className="text-sm text-gray-500">{product.brand} - ${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Full search results display (visible after button click or Enter) */}
      {!loading && !showSuggestions && searchResults.length === 0 && searchTerm.trim() !== '' && !error && (
        <p className="text-center text-gray-600 mt-4">No results found for &quot;{searchTerm}&quot;.</p>
      )}

      {/* This block will display the full results after a 'full' search is triggered */}
      {!loading && !showSuggestions && searchResults.length > 0 && !error && triggerFullSearch === false && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {searchResults.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <Link href={`/matcha/${product.id}`}> {/* Link for the full product card */}
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    width={200} // Provide specific width/height for Next/Image
                    height={200}
                  />
                )}
                <h3 className="text-xl font-semibold mb-1 text-green-800">{product.name}</h3>
                <p className="text-gray-700">{product.brand}</p>
                <p className="text-lg font-bold text-green-700 mt-1">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}