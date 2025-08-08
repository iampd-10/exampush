import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
const navLinks = [
    { path: "/", label: "Home" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
    { path: "/task", label: "Task" }
];


const location = useLocation();
const navigate = useNavigate();

return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Priyajit Debnath</a>
        </div>
        <div className="flex-none">
            <div className="flex gap-2 mr-4">
                {navLinks.map(link => (
                    <button
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className={`btn btn-sm ${location.pathname === link.path ? "btn-primary" : "btn-ghost"}`}
                    >
                        {link.label}
                    </button>
                ))}
            </div>
           
        </div>
    </div>
);
}

export default Navbar
