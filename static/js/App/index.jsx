import React, { Component } from "react";
import { Container } from "reactstrap";
import Header from "../Header"
import DragAndDrop from "../DragAndDrop"
import GoButton from "../GoButton"

export default class App extends Component {

  state = {
    styleImgs: [],
    contentImgs: [],
    outputImgs: []
  }

  handleDrop = (target, files) => {

    this.setState({
      [target]: this.state[target].concat(files)
    })
  }

  processImg = (img) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onerror = (e) => {
        reject(e);
      }

      reader.onload = (e) => {
        resolve(reader.result);
      };

      reader.readAsDataURL(img);

    })
  }

  handleSubmit = () => {

    const { styleImgs, contentImgs } = this.state
    const url = 'http://localhost:5000/';

    const payload = new FormData();

    for (var i = 0; i < styleImgs.length; i++) {
      payload.append('styleBin', styleImgs[i], `style_image_${i + 1}.jpg`);
    }

    for (var i = 0; i < contentImgs.length; i++) {
      payload.append('contentBin', contentImgs[i], `content_image_${i + 1}.jpg`);
    }

    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: payload, // body data type must match "Content-Type" header
    })
      .then(response => response.json()); // parses response to JSON


  }

  render() {

    const { styleImgs, contentImgs } = this.state;
    return (
      <Container style={{ 'min-height': '100%' }}>
        <Header />
        <DragAndDrop
          name="Content Images"
          target="contentImgs"
          imgs={contentImgs}
          handleDrop={this.handleDrop}
        />
        <DragAndDrop
          name="Style Images"
          target="styleImgs"
          imgs={styleImgs}
          handleDrop={this.handleDrop}
        />
        <GoButton handleSubmit={this.handleSubmit} />
      </Container>
    );
  }
}