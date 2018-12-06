import React from "react";
import { Card, CardImg } from 'reactstrap';
import ImageDisplayRow from "./ImageDisplayRow";

const ImageDisplay = (props) => {
    const { outputData, name } = props



    return (
        <div
            className="w-100"
            style={{ 'minHeight': '30%' }}
        >

            <h3 className="text-center">{name}</h3>

            <div className="h-50">
                {outputData.map(metadata => {

                    return (
                        <ImageDisplayRow
                        contentImage={metadata.contentImage}
                        styleImage={metadata.styleImage}
                        pastiches={metadata.pastiches}
                         />
                    )
                })}
            </div>

        </div>)
}
export default ImageDisplay;
