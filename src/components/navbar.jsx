import React, { Component } from "react";
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class NavbarComponent extends Component {
    
    state = { };
    
    render() {
        return(
            <Navbar id="nav" collapseOnSelect expand="lg" className="custom-nav navbar-expand-sm" sticky="top">
                <Link to="/"><Navbar.Brand className="ml-2" id="nav-brand">ARYAN KALIA</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/software" className="nav-button mx-2 my-1 p-2 text-center">Software</Nav.Link>
                        <Nav.Link href="/hardware" className="nav-button mx-2 my-1 p-2 text-center">Hardware</Nav.Link>
                        <Nav.Link href="/mechanical" className="nav-button mx-2 my-1 p-2 text-center">Mechanical</Nav.Link>
                        <Nav.Link href="/about" className="nav-button mx-2 my-1 p-2 text-center">About Me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavbarComponent;