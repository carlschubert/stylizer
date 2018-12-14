import React, { Component, Fragment } from "react";
import { Container, Button } from "reactstrap";
import Header from "../Header"
import DragAndDrop from "../DragAndDrop"
import GoButton from "../GoButton"
import ImageDisplay from "../ImageDisplay";
import Loading from '../Loading'
import ImageDisplayRow from "../ImageDisplayRow";
import FlashAlert from "../FlashAlert";
import ErrorBoundary from '../ErrorBoundary';
import ValidationError from "../Helpers/validationError";

const initialState = {
  styleImgs: [],
  contentImgs: [],
  outputData: {},
  isLoading: false,
  validation: ''
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

  delayedValidation = () => {
    setTimeout(() => {
      this.setState({
        validation: ''
      })
    }, 5000);
  }

  handleSubmit = () => {

    const { styleImgs, contentImgs } = this.state
    const url = BASE_URL;

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
      })
      .then(result => {
        if (result.validation) {
          throw new ValidationError(result.validation)
        }
        return result;
      })
      .then(files => {
        console.log('files', files)
        this.setState({
          outputData: files,
          isLoading: false,
        })
      })
      .catch(err => {

        if (err instanceof ValidationError) {
          this.setState(Object.assign({}, initialState, {
            validation: err.message,
          }))
          this.delayedValidation();
        } else {
          this.setState({
            isLoading: false
          })
          throw err
        }

      })

  }



  render() {

    const { outputData, styleImgs, contentImgs, isLoading, validation } = this.state;

    return (
      <ErrorBoundary>
        <Container className="mh-30">
          {
            validation ? <FlashAlert color="danger" msg={validation} /> : null
          }
          <Header />
          <ErrorBoundary>
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
          </ErrorBoundary>
        </Container>
      </ErrorBoundary>
    );
  }
}
