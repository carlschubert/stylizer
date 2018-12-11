import React from "react";
import { Card } from 'reactstrap';
import Dropzone from 'react-dropzone';

const DragAndDrop = (props) => {
    const { imgs, name, handleDrop, target } = props
    return (
        <div className="drag-n-drop mh-30 w-100">

            <h3 className="text-center">{name}</h3>

            <Dropzone
                className="mh-150px h-100 d-flex flex-wrap bg-light"
                activeClassName="border bg-secondary"
                onDrop={(files) => handleDrop(target, files)}
            >
                {imgs.map(img => {

                    return (
                        <Card key={img.name}>
                            <img
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
