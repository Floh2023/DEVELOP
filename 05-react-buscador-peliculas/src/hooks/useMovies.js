import withResults from '../mocks/work-response.json'
import withoutResults from '../mocks/true-response.json'
import {useRef, useState, useMemo} from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search, sort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search) // no cambia por renderizados

  
   

    const getMovies = useMemo(()=>{
        return async (search) => {

            if (search == previousSearch.current) return

            try{
                setLoading(true)
                setError(null)

                previousSearch.current = search

                const   newMovies = await searchMovies({search})

                setMovies(newMovies)
            } catch(e){
                setError(e.message)
            } finally{
                setLoading(false)
            }
       
        }

    },[])


        const sortedMovies = useMemo(()=> {
            return sort
                ? [...movies].sort((a,b)=> a.title.localeCompare(b.title))
                : movies

                
        }, [sort, movies])

  
    return {movies:sortedMovies, getMovies}
  
  
  }