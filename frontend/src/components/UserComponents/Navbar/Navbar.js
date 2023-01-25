import { useState } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "../../MenuItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/userSlice";
import logo from '../../../assets/logo7.png'
import { MDBIcon } from "mdb-react-ui-kit";
import { color } from "@mui/system";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout())
  }
  const user = localStorage.getItem('user');

  return (
    <nav className="NavbarItems">
      <div className="d-flex justify-content-center">
      <MDBIcon fas icon="dumbbell pe-3" style={{fontSize:'39px' , color:'black'}}/>
        {/* <img src={logo} style={{ height: '30px', width: "30px" }} className='align-items-center'></img> */}
        <Link to='/'><h1 className="navbar-logo">B-Fit Pro</h1></Link>
      </div>
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
        {user ? (
          <Link to='/login' onClick={() => handleLogout()}><button>Logout</button></Link>
        ) : (
          <li className="nav-item dropdown">
            <Link to='/signup'><button className="btn">Sign Up</button></Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;