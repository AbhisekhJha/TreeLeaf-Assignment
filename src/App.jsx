import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
