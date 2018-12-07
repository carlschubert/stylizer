import React from "react";
import { Card, CardImg } from 'reactstrap';
import Dropzone from 'react-dropzone';

const DragAndDrop = (props) => {
    const { imgs, name, handleDrop, target } = props
    return (
        <div
            className="w-100"
            style={{ 'minHeight': '30%' }}

        >

            <h3 className="text-center">{name}</h3>

            <Dropzone
                className="h-100 d-flex flex-wrap bg-light"
                activeClassName="border bg-secondary"
                onDrop={(files) => handleDrop(target, files)}
                style={{ 'minHeight': '100px' }}
            >
                {imgs.map(img => {

                    return (
                        <Card
                            style={{ 'maxWidth': '320px' }}
                            key={img.name}
                        >
                            <img
                                style={{
                                    'position': 'relative',
                                    'float': 'left',
                                    'width': '100px',
                                    'height': '100px',
                                    'background-position': '50% 50%',
                                    'background-repeat': 'no-repeat',
                                    'background-size': 'cover',
                                }}
                                className="img-fluid"
                                src={URL.createObjectURL(img)}
                                alt={img.name}

                            />
                        </Card>
                    )
                })}
            </Dropzone>

        </div>)
}
export default DragAndDrop;
