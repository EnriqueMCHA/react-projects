import { useState } from "react";
import { createContext } from "react";

// Primero creamos el contexto
export const FiltersContext = createContext();

// Luego creamos el componente que va a proveer el contexto
export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider >
  )

}