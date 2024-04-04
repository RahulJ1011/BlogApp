import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Myposts from "./pages/Myposts";
import Addposts from "./pages/Addposts";
import { storage } from "./firebaseConfig";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/:userId/myposts" element={<Myposts />} />
        <Route path="/add" element={<Addposts />} />
      </Routes>
    </div>
  );
}

export default App;
