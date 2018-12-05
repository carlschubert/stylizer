import React from "react";
import { Container } from "reactstrap";
import Header from "../Header"
import DragAndDrop from "../DragAndDrop"
import GoButton from "../GoButton"

export default class App extends React.Component {
  render () {
    return (
      <Container>
        <Header />
        <DragAndDrop name="Content Images"/>
        <DragAndDrop name="Style Images"/>
        <GoButton />
      </Container>
    );
  }
}