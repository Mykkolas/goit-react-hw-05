import './App.css'
import Navigation from './components/Navigation/Navigation'
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import Favourites from './pages/Favourites/Favourites';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

const API_KEY = "54ea7ce5f3d7843885fa77f83e0b1231";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])
  const [cast, setCast] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchTrendingMovies(timeWindow = "day") {
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/${timeWindow}`, {
        params: { api_key: API_KEY, include_adult: false }
      })
      setError(null)
      setTrendingMovies(response.data.results)
    }
    catch (err) {
      console.log("Error: ", err);
      setError("Failed to fetch movies")
    }
    finally {
      setLoading(false)
    }
  }

  async function fetchMoviesBySearch(query) {
    if (!query.trim()) {
      /* FFIIX LATERRRR */
      alert("Error!")
      return
    }
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query, include_adult: false }
      })

      setError(null)
      setSearchedMovies(response.data.results)
    }
    catch (err) {
      setError("Failed to fetch by search!")
      alert(err) /* FIIIIXXXX */
    }
    finally {
      setLoading(false)
    }
  }

  async function fetchCast(filmId) {
    setLoading(true)
    if (!filmId) return
    try {
      const response = await axios.get(`${BASE_URL}/movie/${filmId}/credits`, {
        params: { api_key: API_KEY, include_adult: false }
      })
      setError(null)
      const filteredCast = response.data.cast.filter(actor => actor.profile_path); // Remove actors without images
      setCast(filteredCast);
    }
    catch (err) {
      setError("Failed to fetch cast!")
      alert(err)
    }
    finally {
      setLoading(false)
    }
  }

  async function fetchReviews(filmId) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${filmId}/reviews`, {
        params: { api_key: API_KEY, include_adult: false }
      })
      setError(null)
      setReviews(response.data.results);
    }
    catch (err) {
      setError("Failed to fetch reviews!")
      alert(err)
    }
    finally {
      setLoading(false)
    }
  }


  function getMovieById(movieId) {
    return [...trendingMovies, ...searchedMovies].find(movie => movie.id === +movieId);
  }

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  return (
    <div className="container">
      <Navigation />

      <Routes>

        <Route path='/' element={<HomePage movies={trendingMovies} fetchTrending={fetchTrendingMovies} loading={loading} error={error} />} />
        <Route path='/movies' element={<MoviesPage movies={searchedMovies} fetchMovies={fetchMoviesBySearch} loading={loading} error={error} />} />
        <Route path='/movies/:movieId' element={<MovieDetailsPage getMovieById={getMovieById} fetchCast={fetchCast} fetchReviews={fetchReviews} />}>
          <Route path='cast' element={<MovieCast cast={cast} />} />
          <Route path='reviews' element={<MovieReviews reviews={reviews} />} />
        </Route>
        <Route path='/favourites' element={<Favourites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  )
}

export default App
