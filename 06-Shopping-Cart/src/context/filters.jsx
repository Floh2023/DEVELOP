import { createContext, useState } from "react";
//crear contexto
export const FiltersContext = createContext ()

// crear provider no es un estado es info a la que quiero acceder

export function FiltersProvider({ children }){
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })
    return(
        <FiltersContext.Provider value ={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}
