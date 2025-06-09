import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 ${styles.slickyNavbar}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <strong>ShopIt</strong></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
            <NavBarLink />
            <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
              <FaCartShopping />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
              style={{ fontSize: '0.85rem', padding: '0.5em,0.65em', backgroundColor: '#6050DC' }}>
                12
              </span>

            </Link>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar