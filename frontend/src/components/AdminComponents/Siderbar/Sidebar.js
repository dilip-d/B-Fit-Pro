import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/logo6.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { setAdminLogout } from "../../../redux/adminSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = ({ setPage }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true)

  const handleLogout = () => {
    dispatch(setAdminLogout())
  }

  const dispatch = useDispatch();

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="sidebarMain">
        <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
          <UilBars />
        </div>
        <motion.div className='sidebar'
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ''}
        >
          {/* logo */}
          <div className="logo">
            <img src={Logo} alt="logo" />
            <span>
              B<span>-</span>Fit Pro
            </span>
          </div>

          <div className="menu">
            {SidebarData.map((item, index) => {
              return (
                <div
                  className={selected === index ? "menuItem-active" : "menuItem"}
                  key={index}
                  onClick={() => {
                    setPage(item.page)
                    setSelected(index)
                  }}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </div>
              );
            })}
            {/* signoutIcon */}
            <div className="menuItem">
              {/* <UilSignOutAlt /> */}
            </div>
          </div>
          <Link to='/adminLogin' onClick={() => handleLogout()}><button style={{ margin: '3rem' }}>Logout</button></Link>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
