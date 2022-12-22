import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/pages/Header/Header";
import Main from "./components/pages/Main";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import { useEffect } from "react";
import Users from "./components/pages/Users";
import IsAuthorized from "./components/IsAuthorized";
import Profile from "./components/pages/Profile";

function App() {
  const id = useParams();

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/users" element={IsAuthorized(Users)} />
        <Route path="/users/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
