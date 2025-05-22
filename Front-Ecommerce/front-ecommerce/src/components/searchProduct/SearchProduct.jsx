import React from "react";

function SearchProduct({ value, onChange }) {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
      />
    </div>
  );
}

export default SearchProduct;
