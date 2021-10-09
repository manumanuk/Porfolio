import React, { Component } from "react";
import Footer from './footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import homebkg from '../assets/homebkg.jpg';

class NotFoundPage extends Component {
    
    state = { };

    render() {
        return(
            <body style={{height: '90.9vh'}}>
                <Jumbotron fluid className="home-bg text-center m-0 d-flex align-items-center justify-content-center" style={{height: '90.6%', backgroundImage: `url(${homebkg})`}}>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className="display-1 strong-title">404: Page Not Found</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="display-4" style={{color: "white"}}></h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br/>
                                <Link to="/"><Button className="button-light">Return home</Button></Link>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Footer />
            </body>
        );
    }
}

export default NotFoundPage;