import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
const Header = () => {
    const { show, setShow } = useState(false)
    return (<div>
        <MDBNavbar expand='lg' light style={{ backgroundColor: '#541b1b' }}>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'><img src="/Images/logo.jpg" alt="logo" style={{ height: "30px" }} /></MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShow(!show)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem className='active'>
                            <MDBNavbarLink aria-current='page'  style={{ color: "#fff" }} >
                               <Link  className="navlink" to='/'> Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink  style={{ color: "#fff" }} >
                                <Link className="navlink"  to='/addedit'>AddBlog</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink  style={{ color: "#fff" }} >
                           <Link  className="navlink" to="/about">About</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    </div>
    )
}
export default Header;