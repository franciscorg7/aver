import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { APP_ROUTES } from './routes'
import { MovieDetails } from './pages/MovieDetails'
import { Navbar } from './components/Navbar'
import { MovieList } from './pages/MovieList'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Home />}></Route>
        <Route path={APP_ROUTES.MOVIE_LIST} element={<MovieList />}></Route>
        <Route
          path={APP_ROUTES.MOVIE_DETAILS}
          element={<MovieDetails />}
        ></Route>
        <Route path={APP_ROUTES.TV_SHOWS_LIST} element={<Home />}></Route>
        <Route
          path={APP_ROUTES.TV_SHOW_DETAILS}
          element={<MovieDetails />}
        ></Route>
      </Routes>
    </>
  )
}

export default App
