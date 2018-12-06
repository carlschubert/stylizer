import React from "react";
import { Card, CardImg } from 'reactstrap';

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
                        <Card
                            style={{ 'maxWidth': '320px' }}
                            key={metadata}
                        >
                            <CardImg
                                src={metadata}
                                alt={metadata}

                            />
                        </Card>
                    )
                })}
            </div>

        </div>)
}
export default ImageDisplay;
