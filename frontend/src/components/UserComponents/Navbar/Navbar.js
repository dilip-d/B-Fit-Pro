import { useState } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "../../MenuItems";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../redux/authSlice";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout())
  }
  // const { user } = useSelector((state) => ({ ...state.auth }));
  const user = localStorage.getItem('token');

  return (
    <nav className="NavbarItems">
      <Link to='/'><h1 className="navbar-logo">B-Fit Pro</h1></Link>
      <div className="menu-icons" onClick={toggleMenu}>
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className=
                {item.cName} to={item.url}>
                <i className={item.icon}></i>{item.title}
              </Link>
            </li>
          )
        })}
        {user? (
          <Link to='/login' onClick={() => handleLogout()}><button>Logout</button></Link>
        ) : (
          <li className="nav-item dropdown">
            <Link to='/signup'><button>Sign Up</button></Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;