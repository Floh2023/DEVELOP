import './App.css'
import { useEffect, useRef, useState, useCallback } from 'react'
import {Movies} from './components/Movies'
import { useMovies } from './hooks/useMovies'

import debounce from 'just-debounce-it'


//useREF crea una ref que no se reinicia pero que es mutable en el ciclo del componente, EL VALOR PERCISTE ENTRE RENDERIZADOS, AYUDA A GUARDAR REFERENCIAS
function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{

    if(isFirstInput.current) {
      isFirstInput.current = search == ''
      return
    }

    if (search == ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d=$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3 ) {
      setError('la busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)

  
  },[search])

  return { search, updateSearch, error }

}

function App() {
  const [sort, setSort] = useState(false)

  const {search, updateSearch, error} = useSearch()

  const {movies, loading, getMovies} = useMovies({search, sort})

  const debouncedGetMovies = useCallback( debounce(search =>{
    console.log('search', search)
    getMovies({search})
  }, 500)

  ,[])

  const handleSubmit = (event) => {
    event.preventDefault()

    getMovies(search)

    //const { query } = Object.fromEntries(
    //  new window.FormData(event.target)
    //  )  
    //const fields = new window.FormData(event.target)
    //const query = fields.get('query')
    //propiedad current 
  }

  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) =>{
    const newSearch = event.target.value
   
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)

  }

  useEffect(()=>{

    console.log('newGetMoviesReceived')

  },[getMovies])
  
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' placeholder="Avengers, Matrix, Armagedon..." type="text" />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'> Buscar </button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>

      <main>

        {
          loading ? <p>Cargando ... </p>:<  Movies movies ={movies}/>
        }
        
      </main>
    </div>
   
  )
}
//1:49
//https://www.omdbapi.com/?apikey=bbe3bed9&s=dd
//1;23

export default App