import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Gym Hub</h5>
            <p>Your ultimate fitness companion</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/muscle-selection" className="text-white">
                  Exercises
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope me-2"></i> contact@gymhub.com
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i> (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Gym Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
