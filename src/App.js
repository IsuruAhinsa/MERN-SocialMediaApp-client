import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./features/Home";
import Login from "./features/auth/Login";
import Profile from "./features/Profile";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
      <Route
        path="/profile/:userId"
        element={isAuth ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
