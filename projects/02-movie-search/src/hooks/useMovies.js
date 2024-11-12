import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export const useMovies = ({ search, sort }) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {

    if (previousSearch.current === search) return;

    // Implementar try-catch si se quiere manejar el error
    setIsLoading(true);

    previousSearch.current = search;
    const newMovies = await searchMovies({ search });
    setMovies(newMovies);

    setIsLoading(false);

  }, []);

  const sortedMovies = useMemo(() => {

    if (!movies) return;

    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies

  }, [movies, sort])

  return {
    movies: sortedMovies,
    isLoading,
    getMovies,
  }
}