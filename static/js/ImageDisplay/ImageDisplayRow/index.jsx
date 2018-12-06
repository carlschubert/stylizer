import React from "react";
import { Card, CardImg } from 'reactstrap';
import PasticheCarousel from '../PasticheCarousel';

const ImageDisplayRow = (props) => {
    const { contentImage, styleImage, pastiches } = props;

    return (
        <div>
            <Card
                style={{ 'maxWidth': '320px' }}
            >
                <CardImg
                    src={contentImage.src}

                />
            </Card>
            <PasticheCarousel pastiches={pastiches} />
            <Card
                style={{ 'maxWidth': '320px' }}
            >
                <CardImg
                    src={styleImage.src}

                />
            </Card>
        </div>
    )
}

export default ImageDisplayRow