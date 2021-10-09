import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom'


class Footer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            page1: "",
            page2: "",
            page3: "",
            page4: "",
        };
        this.pageNames = ["Home", "Hardware", "Software", "Mechanical", "About"];
        this.links = {
            "Home" : "/",
            "Software" : "/software",
            "Hardware" : "/hardware",
            "Mechanical" : "/mechanical",
            "About" : "/about"
        }
    }

    setLinkNames() {
        this.pageNames.splice(this.pageNames.indexOf(this.props.pageName), 1);
        this.setState(state => {
            return {
                page1: this.pageNames[0],
                page2: this.pageNames[1],
                page3: this.pageNames[2],
                page4: this.pageNames[3]
            };
        });
    }

    componentDidMount() {
        this.setLinkNames();
    }


    render() {
        return(
            <footer>
                <Container className={"mt-3 mb-1 text-center " + (!this.props.pageName ? "resize-footer" : "")}>
                    <Row>
                        <Col>
                            <Link className="footer-text" to={this.links[this.state.page1]}><p>{this.state.page1}</p></Link>
                        </Col>
                        <Col>
                            <Link className="footer-text" to={this.links[this.state.page2]}><p>{this.state.page2}</p></Link>
                        </Col>
                        <Col>
                            <Link className="footer-text" to={this.links[this.state.page3]}><p>{this.state.page3}</p></Link>
                        </Col>
                        <Col>
                            <Link className="footer-text" to={this.links[this.state.page4]}><p>{this.state.page4}</p></Link>
                        </Col>
                        {!this.props.pageName &&
                        <Col>
                            <Link className="footer-text" to="/about"><p>About</p></Link>
                        </Col>}
                    </Row>
                </Container>
            </footer>
        );
    }

}

export default Footer;