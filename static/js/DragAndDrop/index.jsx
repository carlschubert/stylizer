import React from "react";
import { Card, CardImg } from 'reactstrap';
import Dropzone from 'react-dropzone';

const DragAndDrop = (props) => {
    const { imgs, name, handleDrop, target } = props
    return (
        <Dropzone
            className="w-100"
            style={{ 'minHeight': '30%' }}
            activeClassName="border bg-secondary"
            onDrop={(files) => handleDrop(target, files)}>

            <h3 className="text-center">{name}</h3>

            <div className="h-50">
                {imgs.map(img => {

                    return (
                        <Card
                            style={{ 'maxWidth': '320px' }}
                            key={img.name}
                        >
                            <CardImg
                                src={URL.createObjectURL(img)}
                                alt={img.name}

                            />
                        </Card>
                    )
                })}
            </div>

        </Dropzone>)
}
export default DragAndDrop;
