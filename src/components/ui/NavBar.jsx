import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink";

const NavBar = ({ numCartItems, username, onLogout }) => {
  const itemCount = Number(numCartItems) || 0;

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 ${styles.stickyNavbar}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ letterSpacing: '1px', fontSize: "1.55rem" }}>
          ShopIt
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <NavBarLink />
          </ul>

          {/* Auth and Cart */}
          <div className="d-flex align-items-center ms-auto gap-2">
            {!username ? (
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
                <span className="text-muted me-2 d-none d-lg-inline">Hi, {username}</span>
                <button
                  className="btn btn-light border px-3 me-2"
                  style={{ borderRadius: 20, fontWeight: 500 }}
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            )}

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
                    color: "#fff"
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

