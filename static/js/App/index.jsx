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

  handleSubmit = () => {
    const url = 'http://localhost:5000/'
    // Default options are marked with *
    console.log(this.state);
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state), // body data type must match "Content-Type" header
    })
      .then(res => {
        console.log(this.state);
        return res;
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