import React, { Component, Fragment } from "react";
import { Container, Button } from "reactstrap";
import Header from "../Header"
import DragAndDrop from "../DragAndDrop"
import GoButton from "../GoButton"
import ImageDisplay from "../ImageDisplay";
import Loading from '../Loading'

const initialState = {
  styleImgs: [],
  contentImgs: [],
  outputData: [],
  isLoading: false,
}

const testData = [
  {
    "src": "output/style_image_1.jpg", 
    "style_source": "1", 
    "type": "style"
  }, 
  {
    "content_source": "1", 
    "src": "output/content_image_1.jpg", 
    "type": "content"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "0", 
    "src": "output/content_image_1_stylized_style_image_1_0.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "1", 
    "src": "output/content_image_1_stylized_style_image_1_1.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "3", 
    "src": "output/content_image_1_stylized_style_image_1_3.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "2", 
    "src": "output/content_image_1_stylized_style_image_1_2.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "5", 
    "src": "output/content_image_1_stylized_style_image_1_5.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }, 
  {
    "content_source": "1", 
    "interpolation_weight": "4", 
    "src": "output/content_image_1_stylized_style_image_1_4.jpg", 
    "style_source": "1", 
    "type": "pastiche"
  }
]


export default class App extends Component {

  state = initialState;

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
        console.log(files)
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
          {outputData.length ?
            <Fragment>

              <ImageDisplay outputData={outputData} name="Output" />
              <Button onClick={this.reset}>Reset</Button>
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