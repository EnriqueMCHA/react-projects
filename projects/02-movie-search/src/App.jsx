import { useEffect, useRef, useState } from 'react';
import './App.css'
import defaultJson from "./mocks/defaultJson.json";
import noResponseJson from "./mocks/defaultNoResults.json";
import { searchMovies } from './services/movies';
import Movies from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useDebouncedCallback } from "use-debounce"

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {

  const { search, setSearch, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, isLoading, getMovies } = useMovies({ search, sort });

  const deobunceIt = useDebouncedCallback(() => {
    getMovies({ search });
  }, 300)

  const handleSubmit = async (event) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleSearch = (event) => {

    const search = event.target.value
    setSearch(search);
    deobunceIt();
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="page">
      <header>
        <h1>Tú mejor buscador de peliculas zi 🍓</h1>
        <form onSubmit={handleSubmit}>
          <span>
            <label htmlFor="filterResults">Filtrar</label>
            <input type="checkbox" name="filterResults" checked={sort} onChange={handleSort} />
          </span>
          <input type="text" name="search" className={error && "error"} value={search} onChange={handleSearch} placeholder="Star Wars, Hunger Games, etc..." required />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          isLoading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
