import { useId } from 'react'
import './Filters.css'
import { useState } from 'react'
import { useFilters } from '../hooks/useFilters'
export function Filters () {
    const {setFilters} = useFilters()

    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilteredId = useId()
    const categoryFilterId = useId()

    console.log({
        minPriceFilteredId,
        categoryFilterId
    })

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState =>({
            ...prevState,
            category: event.target.value
        }))
    }
    return (
    <section className="filters">
        <div>
            <label htmlFor={minPriceFilteredId}> Price</label>
            <input 
            type='range'
            id={minPriceFilteredId}
            min='0'
            max = '1000'
            onChange={handleChangeMinPrice}
            value={Filters.minPrice}
             />
            <span>${Filters.minPrice}</span> 
            
        </div>
        <div>
            <label htmlFor={categoryFilterId}>Categoria</label>
            <select  id={categoryFilterId} onChange={handleChangeCategory}>

                <option value="all">Todas</option>
                <option value="laptops">Portatiles</option>
                <option value="Smartphones">Celulares</option>

            </select>
        </div>

    </section> 
   )
}