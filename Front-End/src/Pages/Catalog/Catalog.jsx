import Card from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders } from "../../Redux/providers/providerThunk";
import StickyNavbar from "../../Components/Layout/Navbar";
import { useEffect, useState } from "react";
import FilterSearchComponent from "../../Components/FilterSearch";

const heroSectionClasses =
  "bg-[#A95275] py-20 px-4 md:px-8 flex flex-col items-center justify-center text-center";
const cardGridClasses =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8";

const Catalog = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector((state) => state.providers);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const professions = [
    "All",
    "Hair Specialist",
    "Makeup Artist",
    "Skincare Specialist",
    "Beauty Therapist",
  ];

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  const handleSearch = (searchTerm) => {
    setFilteredProviders(
      providers.filter((provider) =>
        `${provider.firstName} ${provider.lastName}${provider.requests[0].profession}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleFilter = (profession) => {
    setFilteredProviders(
      profession === "All"
        ? providers
        : providers.filter(
            (provider) => provider.requests[0].profession === profession
          )
    );
  };

  return (
    <>
      <StickyNavbar />
      <div className="bg-prime-white rounded-lg">
        {/* Hero Section */}
        <div className={heroSectionClasses}>
          <h1 className="text-4xl font-bold text-white mb-4 ">
            Discover Our Experts
          </h1>
          <p className="text-lg text-white mb-8">
            Find the best beauty professionals in town and book your appointment today.
          </p>
          <button className="px-6 py-3 rounded-md bg-prim-button hover:bg-hover-button text-white transition-colors duration-300">
            Book Now
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-center my-4">
          <FilterSearchComponent
            professions={professions}
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        </div>

        {/* Provider Cards */}
        <div className={cardGridClasses}>
          {filteredProviders.map((provider) => (
            <Card key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalog;
