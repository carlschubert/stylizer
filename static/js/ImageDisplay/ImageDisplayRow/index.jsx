import React, { Component } from "react";
import { Card, CardImg } from 'reactstrap';
import PasticheCarousel from '../PasticheCarousel';

class ImageDisplayRow extends Component {

    state = {
        style: 1,
        content: 1,
        pastiche: 0,
    }

    render() {

        const { content, style, pastiche } = this.state
        const { outputData } = this.props;
        const pastiches = outputData.interp_weights[content][style]

        return (
            <Fragment>
                <PasticheCarousel items={outputData.contents} activeItem={content} />
                <PasticheCarousel items={pastiches} activeItem={pastiche} />
                <PasticheCarousel items={outputData.styles} activeItem={style} />
            </Fragment>

        )
    }
}

export default ImageDisplayRow

const data = {
    "contents": {
      "1": {
        "src": "output/content_image_1.jpg"
      }, 
      "2": {
        "src": "output/content_image_2.jpg"
      }
    }, 
    "interp_weights": {
      "1": {
        "1": [
          {
            "interpolation_weight": "0", 
            "src": "output/content_image_1_stylized_style_image_1_0.jpg"
          }, 
          {
            "interpolation_weight": "1", 
            "src": "output/content_image_1_stylized_style_image_1_1.jpg"
          }, 
          {
            "interpolation_weight": "2", 
            "src": "output/content_image_1_stylized_style_image_1_2.jpg"
          }, 
          {
            "interpolation_weight": "3", 
            "src": "output/content_image_1_stylized_style_image_1_3.jpg"
          }, 
          {
            "interpolation_weight": "4", 
            "src": "output/content_image_1_stylized_style_image_1_4.jpg"
          }, 
          {
            "interpolation_weight": "5", 
            "src": "output/content_image_1_stylized_style_image_1_5.jpg"
          }
        ], 
        "2": [
          {
            "interpolation_weight": "0", 
            "src": "output/content_image_2_stylized_style_image_1_0.jpg"
          }, 
          {
            "interpolation_weight": "1", 
            "src": "output/content_image_2_stylized_style_image_1_1.jpg"
          }, 
          {
            "interpolation_weight": "2", 
            "src": "output/content_image_2_stylized_style_image_1_2.jpg"
          }, 
          {
            "interpolation_weight": "3", 
            "src": "output/content_image_2_stylized_style_image_1_3.jpg"
          }, 
          {
            "interpolation_weight": "4", 
            "src": "output/content_image_2_stylized_style_image_1_4.jpg"
          }, 
          {
            "interpolation_weight": "5", 
            "src": "output/content_image_2_stylized_style_image_1_5.jpg"
          }
        ]
      }
    }, 
    "styles": {
      "1": {
        "src": "output/style_image_1.jpg", 
        "style_source": "1"
      }
    }
  }