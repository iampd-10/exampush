import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../SubComponent/Hero/Hero";
import Navbar from "../SubComponent/Navbar/Navbar";
import Register from "../SubComponent/Authentication/Register/Register";
import Login from "../SubComponent/Authentication/Login/Login";
import CreateTask from "../SubComponent/Task/CreateTask";

function MotherRouting() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task" element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MotherRouting;
