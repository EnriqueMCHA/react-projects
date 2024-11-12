function HasMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map(movie => {
        return (
          <li key={movie.imdbID}>
            <img src={movie.poster} alt={movie.title} loading='lazy' />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </li>
        )
      })}
    </ul>
  )
}

function HasNoMovies() {
  return (
    <p className="noResult">Error searching movies</p >
  )
}

function Movies({ movies }) {

  const hasMovies = movies?.length > 0 && Array.isArray(movies);
  
  return (
    hasMovies
      ? <HasMovies movies={movies} />
      : <HasNoMovies />
  )
}

export default Movies