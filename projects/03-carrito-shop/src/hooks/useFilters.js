import { useContext } from "react";
import { FiltersContext } from "../contexts/filter";

const useFilters = () => {

  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return product.price >= filters.minPrice
        && (
          filters.category === "all" ||
          product.category === filters.category
        )
    });
  }

  const handleFilterRangeChange = (event) => {
    setFilters(prev => ({ ...prev, minPrice: event.target.value }));
  }
  
  const handleFilterCategoryChange = (event) => {
    setFilters(prev => ({ ...prev, category: event.target.value }));
  }

  return {
    filters,
    setFilters,
    filterProducts,
    handleFilterRangeChange,
    handleFilterCategoryChange
  }
}

export default useFilters;