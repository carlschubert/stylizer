import React from "react";
import { Card, CardImg } from 'reactstrap';

const ImageDisplay = (props) => {
    const { urls, name } = props
    return (
        <div
            className="w-100"
            style={{ 'minHeight': '30%' }}
        >

            <h3 className="text-center">{name}</h3>

            <div className="h-50">
                {urls.map(url => {

                    return (
                        <Card
                            style={{ 'maxWidth': '320px' }}
                            key={url}
                        >
                            <CardImg
                                src={url}
                                alt={url}

                            />
                        </Card>
                    )
                })}
            </div>

        </div>)
}
export default ImageDisplay;
