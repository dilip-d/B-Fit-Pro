import { MDBBtn, MDBCollapse, MDBContainer, MDBIcon, MDBInputGroup, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setLogout } from '../../../redux/trainerSlice';
import logo from '../../../../src/assets/logo7.png'

function TrainerNavbar() {

    const trainer = JSON.parse(localStorage.getItem('trainer'));

    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout())
    }

    const StyledButton = styled.button`
  background-color: white;
  color: black;
  padding: 2px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

    return (
        <>
            <MDBNavbar expand='lg' light style={{ background: "#336699" }}>
                <MDBContainer fluid>
                    {/* <img src={logo} style={{height:'30px', width:"30px"}}></img> */}
                    <MDBNavbarBrand href='#' className='text-lg px-3' style={{ fontSize: "2rem" }}>B-Fit Pro</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarTogglerDemo02'
                        aria-controls='navbarTogglerDemo02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavNoTogglerSecond}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <Link to='/trainerHome'><MDBNavbarLink ><StyledButton>Profile</StyledButton></MDBNavbarLink></Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink>
                                    <Link to={`/viewTrainerPlan/${trainer.trainer._id}`}><StyledButton>Bookings</StyledButton></Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink>
                                    <Link to='/trainerMessages'><StyledButton>Messages</StyledButton></Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <MDBInputGroup tag="form" className='d-flex justify-content-end mb-3'>
                            {trainer ? (
                                <MDBNavbarLink className="text-white">Welcome {trainer.trainer.fname}</MDBNavbarLink>
                            ) : (
                                ' '
                            )}
                            {/* <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' /> */}
                            <Link to='/trainerLogin' onClick={() => handleLogout()}><MDBBtn className='mt-1'>Logout</MDBBtn></Link>
                        </MDBInputGroup>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default TrainerNavbar