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

    const { styleImgs,  contentImgs } = this.state
    const url = 'http://localhost:5000/';

    const stylePromises = Promise.all(styleImgs.map(img => {
      return this.processImg(img)
    }));

    const contentPromises = Promise.all(contentImgs.map(img => {
      return this.processImg(img)
    }));

    return Promise.all([stylePromises, contentPromises])
    .then(result => {
      const [style, content] = result
      const payload = new FormData();
      
      for (var i = 0; i < style.length; i++) {
        console.log('works')
        payload.append('styleBin', style[i]);
      }

      for (var i = 0; i < content.length; i++) {
        payload.append('contentBin', content[i]);
      }


      console.log(payload.getAll('styleBin'))

      // const payload = {
      //   styleBin: style,
      //   contentBin: content,
      // }

      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors",
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8",
        //   // "Content-Type": "application/x-www-form-urlencoded",
        // },
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: payload, // body data type must match "Content-Type" header
      })
        .then(response => response.json()); // parses response to JSON
    })


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