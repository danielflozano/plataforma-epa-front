import { useState } from "react";

export const GlobalFilter = ({ data, setFilteredData, keys, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);
    const lowerQuery = value.toLowerCase();

    if (lowerQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        keys.some((key) => item[key]?.toString().toLowerCase().includes(lowerQuery))
      );
      setFilteredData(filtered);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
      className="border border-gray-400 rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};
