const API_KEY = "305e28e7";
const API_URL = "https://www.omdbapi.com/";

export const searchMovies = async ({ search }) => {

  try {

    if (!search) return;

    // Service
    const response = await fetch(`${API_URL}?s=${search}&apikey=${API_KEY}`);
    const data = await response.json();

    const movies = data.Search;

    return movies?.map(movie => ({
      // search: movie.Search,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbID: movie.imdbID,
    }))

  } catch (error) { //eslint-disable-line
    throw new Error("Error searching movies")
  }
}