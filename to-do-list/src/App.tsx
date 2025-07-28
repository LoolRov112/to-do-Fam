import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AboutUs from "./components/About/About";
import { ToastContainer } from "react-toastify";
import SignUpToFamily from "./components/SignUpToFam";
import NewPasswordForMember from "./components/NewPassMem";
import Home from "./components/Tasks/Home";
import FamilyTasks from "./components/Tasks/FamilyTasks";
import { useParams } from "react-router-dom";
import OtherMemberTasks from "./components/Tasks/OtherMemberTasks";
import FamilyMembers from "./components/FamilyMembers";

function App() {
  return (
    <div className="App bg-[#F4F7F5] min-h-screen">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/joinToExist" element={<SignUpToFamily />}></Route>
        <Route
          path="/joinToExist/newMember"
          element={<NewPasswordForMember />}
        ></Route>
        <Route>
          <Route
            path="/profile/:memberUsername"
            element={<OtherMemberTasks />}
          />
        </Route>
        <Route path="/members" element={<FamilyMembers />} />
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/famTasks" element={<FamilyTasks />}></Route>
      </Routes>
    </div>
  );
}

export default App;
