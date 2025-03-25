import './App.css'
import Navigation from './components/Navigation/Navigation'
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage/MoviesPage';

const API_KEY = "54ea7ce5f3d7843885fa77f83e0b1231";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchTrendingMovies(timeWindow = "day") {
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/${timeWindow}`, {
        params: { api_key: API_KEY }
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
        params: { api_key: API_KEY, query }
      })
      setError(null)
      setSearchedMovies(response.data.results)
    }
    catch (err) {
      alert(err) /* FIIIIXXXX */
    }
    finally {
      setLoading(false)
    }
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
        {/* ADD STARS AS RATINGGGGG */}
      </Routes>

    </div>
  )
}

export default App
