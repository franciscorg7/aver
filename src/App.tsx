import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { APP_ROUTES } from './routes'
import { MovieDetails } from './pages/MovieDetails'
import { Navbar } from './components/navbar/Navbar'
import { MovieList } from './pages/MovieList'
import { SeriesDetails } from './pages/SeriesDetails'
import { SeriesList } from './pages/SeriesList'
import { MyList } from './pages/MyList'
import { Login } from './pages/Login'
import { AuthCallback } from './pages/AuthCallback'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Home />}></Route>
        <Route path={APP_ROUTES.LOGIN} element={<Login />}></Route>
        <Route
          path={APP_ROUTES.AUTH_CALLBACK}
          element={<AuthCallback />}
        ></Route>
        <Route path={APP_ROUTES.MOVIE_LIST} element={<MovieList />}></Route>
        <Route
          path={APP_ROUTES.MOVIE_DETAILS}
          element={<MovieDetails />}
        ></Route>
        <Route path={APP_ROUTES.SERIES_LIST} element={<SeriesList />}></Route>
        <Route
          path={APP_ROUTES.SERIES_DETAILS}
          element={<SeriesDetails />}
        ></Route>
        <Route path={APP_ROUTES.MY_LIST} element={<MyList />}></Route>
      </Routes>
    </>
  )
}

export default App
