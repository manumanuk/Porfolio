import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from "react-bootstrap/Jumbotron";
import {Image as BootstrapImage} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import firebase from "firebase/app";
import "firebase/storage"

class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            buttons: null,
            date: "",
            id: "",
            images: null,
            video: null,
            imgTypes: null,
            windowWidth: 0,
            windowHeight: 0,
            begin : false,
            imgSrcs: null
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        var data = this.props.content;

        let orientations = {};
        let srcDef = {};
        if (data.images) {
            for (const img of Object.keys(data.images)) {
                let loadImg = new Image();
                firebase.storage().ref("assets/" + data.images[img]).getDownloadURL().then(url => {
                    loadImg.src = url;
                    document.getElementById("test-bed").appendChild(loadImg);
                    loadImg.onload = () => {
                        if(loadImg.height/loadImg.width < 1.1 && loadImg.height/loadImg.width > 0.9) {
                            orientations[img] = "square";
                        } else if (loadImg.height/loadImg.width > 1.1) {
                            orientations[img] = "height";
                        } else {
                            orientations[img] = "width"
                        }
                        srcDef[img] = loadImg.src;
                        loadImg.remove();
                        this.setState({ imgTypes: orientations, begin: true, imgSrcs: srcDef });
                        if(this.props.scrollTo && document.getElementById(this.props.scrollTo) != null) {
                            window.scrollTo({top: document.getElementById(this.props.scrollTo).offsetTop + document.getElementById(this.props.scrollTo).offsetHeight/2 - this.state.windowHeight/2 + 0.5*document.getElementById('nav').offsetHeight, behavior: 'smooth'});
                        }
                    }
                }).catch(err => (console.error(err)));
            }
        }
        this.setState({
            title: data.title,
            body: data.body,
            buttons: data.buttons,
            date: data.date,
            images: data.images,
            video: data.video,
            id: data.id
        });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }
    
    getImageURL(imgId) {
        let url = "";
        if (this.state.begin)
            url = this.state.imgSrcs[imgId];
        return url;
    }

    getPostText() {
        return (
            <Col lg={6} md={12} sm={12} xs={12} className="my-auto">
                <h3 className="display-4 post-title">{this.state.title}</h3>
                <h4 className="display-4 post-subtitle mb-3">{this.state.date}</h4>
                <p className="post-text">{this.state.body}</p>
            </Col>
        );
    }

    getPostMedia() {
        var rows = [];
        
        var imgRows = [];
        var imgCols = [];
        if(this.state.images && Object.keys(this.state.images).length > 0) {
            for(const imgId of Object.keys(this.state.images)) {
                if(this.state.begin && (this.state.imgTypes[imgId] == "height" || this.state.imgTypes[imgId] == "square")) {
                    imgCols.push(
                            <BootstrapImage fluid src = {this.getImageURL(imgId)} className="mx-auto w-auto d-block post-media" />
                    );
                } else if(this.state.begin && this.state.imgTypes[imgId] == "width") {
                    imgRows.push(
                            <Col className="my-auto">
                                <BootstrapImage fluid src={this.getImageURL(imgId)} className="mx-auto w-auto d-block post-media"/>
                            </Col>
                    );
                } else {
                    imgCols.push(
                        <BootstrapImage fluid src = {this.getImageURL(imgId)} className="mx-auto w-auto d-block post-media" />
                    );
                }
            }
            rows.push(
                    <Row className="d-flex justify-content-center">
                        {imgCols.map((key, index) => (
                            <Col className="my-auto">{key}</Col>
                        ))}
                        {imgRows.length > 0 && <Col>
                        {imgRows.map((key, index) => (
                            <Row className="my-1">{key}</Row>
                        ))}
                        </Col>}
                    </Row>

            );
        } else if (this.state.video && typeof this.state.video != 'string') {
            for (const video of Object.keys(this.state.video)) {
                rows.push(
                    <Row>
                        <Col>
                            {
                                <ResponsiveEmbed aspectRatio="16by9">
                                    <embed src={this.state.video[video]} />
                                </ResponsiveEmbed>
                            }
                            <br/>
                        </Col>
                    </Row>
                );
            }
        } else if (this.state.video) {
            rows.push(
                <Row>
                    <Col>
                        {this.state.video &&
                            <ResponsiveEmbed aspectRatio="16by9">
                                <embed src={this.state.video} />
                            </ResponsiveEmbed>
                        }
                        <br/>
                    </Col>
                </Row>
            );
        }
                
        if (this.state.buttons) {
            for (var i = 0; i<Object.keys(this.state.buttons).length; i++) {
                rows.push(
                    <Row>
                        <Col className="justify-content-center d-flex">
                            <a target="_blank" href={this.state.buttons[Object.keys(this.state.buttons)[i]]}><Button className="button-dark mx-1 my-2">{Object.keys(this.state.buttons)[i]}</Button></a>
                        </Col>
                    </Row>
                );
            }
        }

        return (
            <Col className="my-auto">
                {rows}
            </Col>
        );
    }

    renderPost() {
        if(this.state.windowWidth <= 992 || this.props.index % 2 == 0) {
            return(
                <Row className="my-5">
                    {this.getPostText()}
                    {this.getPostMedia()}
                </Row>
            );
        } else {
            return(
                <Row className="my-5 text-right">
                    {this.getPostMedia()}
                    {this.getPostText()}
                </Row>
            );
        }
    }

    render() {
        return(
            <div id={this.state.id}>
                {this.renderPost()}
            </div>
        );
    }
}

export default Post;