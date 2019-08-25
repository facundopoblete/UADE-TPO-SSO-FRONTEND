import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#24f191", fontWeight: "bolder" };

  return (
    <div className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="../" className="navbar-brand">
          UADE SSO
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to="/settings"
                activeStyle={activeStyle}
              >
                <span
                  className="d-block d-md-none"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  Settings
                </span>
                <span className="d-none d-md-block">Settings</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/users"
                activeStyle={activeStyle}
              >
                <span
                  className="d-block d-md-none"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  Usuarios
                </span>
                <span className="d-none d-md-block">Usuarios</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/logout"
                activeStyle={activeStyle}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
