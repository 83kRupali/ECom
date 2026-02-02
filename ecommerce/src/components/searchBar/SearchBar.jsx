
/**
 * SearchBar Component
 * -------------------
 * Provides real-time product search functionality.
 * Features:
 * - Filters products from global context
 * - Displays top 8 matching results
 * - Navigates to product detail page on click
 */

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";

const SearchBar = () => {
  // Access global product list from context
  const { getAllProduct } = useContext(myContext);

  // Local state for search input
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // ================= FILTERED SEARCH DATA =================
  // Filters products based on search text (case-insensitive)
  const filteredSearchData = search
    ? getAllProduct
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8) // limit results to 8
    : [];

  return (
    <div className="relative">
      {/* ================= SEARCH INPUT ================= */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-3 py-2 w-96 outline-none text-black"
        />
      </div>

      {/* ================= SEARCH DROPDOWN RESULTS ================= */}
      {search && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-gray-200 w-96 z-50 my-1 rounded-lg px-2 py-2">
          {filteredSearchData.length > 0 ? (
            filteredSearchData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/productinfo/${item.id}`)}
                className="py-2 px-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {/* Product Image */}
                  <img
                    src={item.productImageUrl}
                    alt={item.title}
                    className="w-10 h-10 object-cover rounded"
                  />

                  {/* Product Title */}
                  <span className="text-black">{item.title}</span>
                </div>
              </div>
            ))
          ) : (
            // No results message
            <p className="text-center text-gray-500 py-2">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


