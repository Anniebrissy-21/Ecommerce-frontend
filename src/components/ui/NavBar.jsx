import React, { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink";
import { AuthContext } from "../../context/AuthContext";

const NavBar = ({ numCartItems }) => {
  const { isAuthenticated, username, setIsAuthenticated } = useContext(AuthContext);
  const itemCount = Number(numCartItems) || 0;

  function onLogout() {
    localStorage.removeItem("access");
    // Optionally remove other auth tokens/localstorage items here
    setIsAuthenticated(false);
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 ${styles.stickyNavbar}`}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ letterSpacing: "1px", fontSize: "1.55rem" }}>
          ShopIt
        </Link>

        {/* Burger toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main navigation links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavBarLink />
          </ul>

          {/* Auth & Cart area */}
          <div className="d-flex align-items-center ms-auto gap-2">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="btn btn-link text-decoration-none px-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-link text-decoration-none px-2">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile" className={({ isActive }) =>
                  isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"}
                  end
                >
                  Hi, {username}
                </NavLink>
                <button
                  onClick={onLogout}
                  className="btn btn-light border px-3 me-2"
                  style={{ borderRadius: 20, fontWeight: 500 }}
                >
                  Logout
                </button>
              </>
            )}

            {/* Cart icon */}
            <Link
              to="/cart"
              className={`btn position-relative ${styles.responsiveCart}`}
              style={{ background: "#fff", borderRadius: "50%", padding: 11, border: "1px solid #ececec" }}
              aria-label={`Cart with ${itemCount} items`}
            >
              <FaCartShopping size={20} />
              {itemCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    fontSize: "0.82rem",
                    padding: "0.4em 0.7em",
                    backgroundColor: "#cab49c",
                    color: "#fff",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
