import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

import styleExample from './style_image.jpg';
import pasticheExample from './pastiche_image.jpg';
import contentExample from './content_image.jpg';


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true
        };

        this.toggle = this.toggle.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setState({ backdrop: value });
    }

    render() {
        return (
            <div>
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <Button color="secondary" onClick={this.toggle}>About</Button>
                </Form>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggle}>Neural Style Transfer</ModalHeader>
                    <ModalBody>
                        <p>
                            This app allows you to experiment with arbitrary neural transfer as specified in link.  Arbitrary style transfer application of machine learning.  It allows you to redraw the content of any image in the style of any other.
                        </p>
                        <h2>
                            Instructions:
                        </h2>
                        <ol>
                            <li>
                            Drag some images that you want to use as style images into the “Image Dropzone” section on this page.  If you are using this app on your phone, you can also tap the “Image Dropzone” and take a picture or upload from your “Photo Library.”
                            </li>
                            <li>
                            Repeat step one, but with your content images and the “Content Dropzone.”
                            </li>
                            <li>
                            Press “Go” button.
                            </li>
                            <li>
                            Wait.
                            </li>
                            <li>
                            Be amazed.
                            </li>
                        </ol>
                        <h2>
                            Example:
                        </h2>
                        <div className="d-flex flex-nowrap justify-content-center align-items-center flex-column flex-md-row">
                            <img src={contentExample}  />
                            <img src={pasticheExample}  />
                            <img src={styleExample} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default About;
