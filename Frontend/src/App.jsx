import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import MotherRouting from "./Components/Routing/MotherRouting";

function App() {
  return (
    <>
      <MotherRouting />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastStyle={{
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      />
    </>
  );
}

export default App;
