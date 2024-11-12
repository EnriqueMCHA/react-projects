import useFilters from "../hooks/useFilters";
import "./Filters.css";
import { useId } from "react";

function Filters() {

  const { filters, handleFilterCategoryChange, handleFilterRangeChange } = useFilters();
  const minPriceId = useId();
  const categoryId = useId();

  return (
    <div className="filters">

      <div>
        <label htmlFor={minPriceId}>Precio mínimo</label>
        <input type="range" id={minPriceId} value={filters.minPrice} onChange={handleFilterRangeChange} min={0} max={2000} name="minPrice" />
        <p>${filters.minPrice}</p>
      </div>
      <div>
        <label htmlFor={categoryId}>Categoría</label>
        <select id={categoryId} name="category" value={filters.category} onChange={handleFilterCategoryChange}>
          <option value="all">Todos</option>
          <option value="groceries">Comestibles</option>
          <option value="beauty">Belleza</option>
        </select>
      </div>
    </div>
  )
}

export default Filters;