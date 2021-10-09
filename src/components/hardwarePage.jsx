import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from "react-bootstrap/Jumbotron";
import Footer from './footer';
import Post from './post';
import redboard from '../assets/redboard_dark.jpg';
import firebase from 'firebase/app';
import 'firebase/database';

class HardwarePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref('/posts/hardware/');
        rootRef.once('value').then(
            snapshot => {
                var postList = snapshot.val();
                this.setState({
                    posts: postList
                });
            }, error => {
                console.error(error);
            });
    }

    render() {
        return(
            <body>
                <div className="d-flex align-items-center justify-content-center home-bg text-center m-0" style={{backgroundImage: `url(${redboard})`, height: '25vh', backgroundPositionY: '40%'}}>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <br/>
                            <h1 className="display-2" style={{color: 'white'}}>Hardware</h1>
                        </Col>
                    </Row>
                </Container>
                </div>
                <div className="py-5" style={{backgroundColor: 'rgb(248, 248, 248)'}}>
                    <Container >
                        {/* <Row>
                            <Col><h1 className="display-3 mb-3 post-stream-heading">Engineering Club</h1></Col>                        
                        </Row>
                        <Row>
                            <Col lg={3} sm={3} md={3} xs={3}><div className="horizontal-line"></div></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <p className="post-text">At John Fraser Secondary School, I was president and Project Manager at the Engineering Club, often involved in creating and leading projects to teach to peers, or in collaborative ones working towards robotics competitions.</p>
                            </Col>
                        </Row> */}
                        {this.state.posts && Object.keys(this.state.posts).map((key, index) => (
                            <div>
                            <Post content={this.state.posts[key]} index={index} scrollTo={this.props.match.params.elementId} />
                            {index+1 != this.state.posts.length-1 && <div className="horizontal-divider" ></div>}
                            </div>
                        ))}
                        <div id="test-bed"></div>
                    </Container>
                </div>
                <Footer pageName="Hardware"/>
            </body>
        );
    }
}

export default HardwarePage;