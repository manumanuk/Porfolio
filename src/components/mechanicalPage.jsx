import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from "react-bootstrap/Jumbotron";
import Footer from './footer';
import Post from './post';
import mechbkg from '../assets/phonestand_3dprinted_bkg.jpg';
import firebase from 'firebase/app';
import 'firebase/database';

class MechanicalPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref('/posts/mechanical/');
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
                <div className="d-flex align-items-center justify-content-center home-bg text-center m-0" style={{backgroundImage: `url(${mechbkg})`, height: '25vh', backgroundPositionY: '35%'}}>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <br/>
                            <h1 className="display-2" style={{color: 'white'}}>Mechanical</h1>
                        </Col>
                    </Row>
                </Container>
                </div>
                <div className="py-5" style={{backgroundColor: 'rgb(248, 248, 248)'}}>
                    <Container >
                        {this.state.posts && Object.keys(this.state.posts).map((key, index) => (
                            <div>
                            <Post content={this.state.posts[key]} index={index} scrollTo={this.props.match.params.elementId} />
                            {index+1 != this.state.posts.length-1 && <div className="horizontal-divider" ></div>}
                            </div>
                        ))}
                        <div id="test-bed"></div>
                    </Container>
                </div>
                <Footer pageName="Mechanical"/>
            </body>
        );
    }
}

export default MechanicalPage;