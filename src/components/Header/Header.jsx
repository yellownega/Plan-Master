import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link
            to="/gym-hub"
            className="navbar-brand d-flex align-items-center"
          >
            <img
              src="/images/logo/gym-removebg-preview.png"
              alt="Gym Hub Logo"
              className="header-logo me-2"
            />
            <span className="fw-bold">Gym Hub</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/gym-hub"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/gym-hub/muscle-selection"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Exercises
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about" // Placeholder; add route if needed
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>

            <div className="ms-lg-3">
              <Link
                to="/gym-hub/muscle-selection"
                className="btn btn-primary btn-sm"
              >
                Start Training <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
