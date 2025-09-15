import React, { useContext } from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus , FaBox} from 'react-icons/fa';
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink";
import { AuthContext } from "../../context/AuthContext";
import { Tooltip } from 'react-tooltip'
import CreateProduct from "../product/CreateProduct";

const NavBar = ({ numCartItems, wishListCount }) => {
  const { isAuthenticated, username, setIsAuthenticated } = useContext(AuthContext);
  const itemCount = Number(numCartItems) || 0;

  function onLogout() {
    localStorage.removeItem("access");
    // Optionally remove other auth tokens/localstorage items here
    setIsAuthenticated(false);
  }

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm py-3 ${styles.stickyNavbar}`} style={{ background: 'rgb(55 0 55 / 87%)' }}>
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold ms-3" to="/" style={{ letterSpacing: "1px", fontSize: "1.55rem", color: 'white' }}>
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


          <Link to="/wishlist"
            className={`btn position-relative me-3 ${styles.responsiveCart}`} data-tooltip-id="login-tooltip"
            data-tooltip-content="WishList"
            style={{}}
            aria-label={`wishlist with ${wishListCount} items`}>
            <FaHeart size={24} color="#c7aec7" />
            {wishListCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  fontSize: "0.82rem",
                  padding: "0.4em 0.7em",
                  backgroundColor: "rgb(100 61 109)",
                  color: "#fff",
                }}
              >
                {wishListCount ?? 0}
              </span>
            )}
          </Link>

          {/* Cart icon */}
          <Link
            to="/cart"
            className={`btn position-relative ${styles.responsiveCart}`} data-tooltip-id="login-tooltip"
            data-tooltip-content="Cart"
            aria-label={`Cart with ${itemCount} items`}
          >
            <FaCartShopping size={24} color="#c7aec7" />
            {itemCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  fontSize: "0.82rem",
                  padding: "0.4em 0.7em",
                  backgroundColor: "rgb(100 61 109)",
                  color: "#fff",
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth & Cart area */}
          <div className="d-flex align-items-center ms-3 gap-2 me-3">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="btn text-decoration-none px-2" data-tooltip-id="login-tooltip"
                  data-tooltip-content="Login">
                  <FaSignInAlt size={24} color="white" />
                </NavLink>
                <NavLink to="/register" className="btn text-decoration-none px-2" data-tooltip-id="login-tooltip"
                  data-tooltip-content="Register">
                  <FaUserPlus size={24} color="white" />
                </NavLink>
                <Tooltip id="login-tooltip" place="bottom" />
              </>
            ) : (
              <>
                <NavLink to="/profile" className={({ isActive }) =>
                  isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"} style={{ color: 'white' }}
                  end
                >
                  Hi, {username}
                </NavLink>

                <NavLink className="btn text-decoration-none px-2" data-tooltip-id="login-tooltip" style={{ border: 'none' }} to="/product"
                  data-tooltip-content="Create product">
                  <FaBox size={24} color="white" />
                </NavLink>

                <button
                  onClick={onLogout}
                  className="btn text-decoration-none px-2" data-tooltip-id="login-tooltip"
                  data-tooltip-content="LogOut"
                >
                   <FaSignOutAlt size={24} color="white" />
                </button>
              </>
            )}
          </div>

          <Tooltip  id="login-tooltip" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
