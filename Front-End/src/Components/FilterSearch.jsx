import { useState } from "react";

const FilterSearchComponent = ({ professions, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("All");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedProfession(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 my-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring focus:border-[#FFA8B9]"
      />
      <select
        value={selectedProfession}
        onChange={handleFilterChange}
        className="px-4 py-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring focus:border-[#FFA8B9]"
      >
        {professions.map((profession) => (
          <option key={profession} value={profession}>
            {profession}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSearchComponent;
