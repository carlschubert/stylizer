import React from "react";
import { Card, CardImg } from 'reactstrap';
import ImageDisplayRow from "./ImageDisplayRow";
import PasticheCarousel from "./PasticheCarousel";

const ImageDisplay = (props) => {
    const { outputData, name } = props



    return (
        <div
            className="w-100"
            style={{ 'minHeight': '30%' }}
        >

            <h3 className="text-center">{name}</h3>

            <div className="h-50">
                <ImageDisplayRow outputData={outputData} />
            </div>

        </div>)
}
export default ImageDisplay;
