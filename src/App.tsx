import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { APP_ROUTES } from "./routes";
import { MovieDetails } from "./pages/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Home />}></Route>
      <Route path={APP_ROUTES.MOVIE_DETAILS} element={<MovieDetails />}></Route>
    </Routes>
  );
}

export default App;
