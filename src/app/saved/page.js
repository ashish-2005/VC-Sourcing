"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const [savedSearches, setSavedSearches] = useState([]);
  const router = useRouter();

  // Load saved searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedSearches");
    if (stored) {
      setSavedSearches(JSON.parse(stored));
    }
  }, []);

  // Save a new search manually (optional UI)
  const saveSearch = (searchTerm) => {
    const updated = [...savedSearches, searchTerm];
    setSavedSearches(updated);
    localStorage.setItem("savedSearches", JSON.stringify(updated));
  };

  // Re-run search → redirect to companies page
  const rerunSearch = (searchTerm) => {
    router.push(`/companies?search=${searchTerm}`);
  };

  // Delete saved search
  const deleteSearch = (index) => {
    const updated = savedSearches.filter((_, i) => i !== index);
    setSavedSearches(updated);
    localStorage.setItem("savedSearches", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Searches</h1>

      {savedSearches.length === 0 ? (
        <p className="text-gray-500">No saved searches yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedSearches.map((search, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>{search}</span>

              <div className="space-x-2">
                <button
                  onClick={() => rerunSearch(search)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Re-run
                </button>

                <button
                  onClick={() => deleteSearch(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}