import React, { Component, Fragment } from "react";
import { Container, Button } from "reactstrap";
import Header from "../Header"
import DragAndDrop from "../DragAndDrop"
import GoButton from "../GoButton"
import ImageDisplay from "../ImageDisplay";
import Loading from '../Loading'
import ImageDisplayRow from "../ImageDisplay/ImageDisplayRow";

const initialState = {
  styleImgs: [],
  contentImgs: [],
  outputData: {},
  isLoading: false,
}

const sessionId = Date.now();

export default class App extends Component {

  state = initialState;

  handleDrop = (target, files) => {

    this.setState({
      [target]: this.state[target].concat(files),

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

  reset = () => {
    this.setState(initialState)
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

    payload.append('sessionId', sessionId)
    // this.setState({
    //   outputData: testData
    // })
    // return

    this.setState({
      isLoading: true,
    })
    return fetch(url, {
      method: "POST",
      body: payload,
    })
      .then(response => {

        return response.json();
      }).then(files => {
        console.log('files', files)
        this.setState({
          outputData: files,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        throw err;
      })

  }

  render() {

    const { outputData, styleImgs, contentImgs, isLoading } = this.state;

    return (
      <Container style={{ 'minHeight': '100%' }}>
        <Header />
        <Loading isLoading={isLoading}>
          {Object.keys(outputData).length > 0 ?
            <Fragment>
              <ImageDisplay name="Output">
                <ImageDisplayRow outputData={outputData} />
              </ImageDisplay>
              <Button className="btn-lg btn-block" onClick={this.reset}>Reset</Button>
            </Fragment>
            :
            <Fragment>
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
            </Fragment>
          }
        </Loading>
      </Container>
    );
  }
}

const testData = {
  "contents": [
    "output/content_image_1.jpg",
    "output/content_image_2.jpg"
  ],
  "interp_weights": {
    "0": {
      "0": [
        "output/content_image_1_stylized_style_image_1_0.jpg",
        "output/content_image_1_stylized_style_image_1_1.jpg",
        "output/content_image_1_stylized_style_image_1_2.jpg",
        "output/content_image_1_stylized_style_image_1_3.jpg",
        "output/content_image_1_stylized_style_image_1_4.jpg",
        "output/content_image_1_stylized_style_image_1_5.jpg"
      ]
    },
    "1": {
      "0": [
        "output/content_image_2_stylized_style_image_1_0.jpg",
        "output/content_image_2_stylized_style_image_1_1.jpg",
        "output/content_image_2_stylized_style_image_1_2.jpg",
        "output/content_image_2_stylized_style_image_1_3.jpg",
        "output/content_image_2_stylized_style_image_1_4.jpg",
        "output/content_image_2_stylized_style_image_1_5.jpg"
      ]
    }
  },
  "styles": [
    "output/style_image_1.jpg"
  ]
}

