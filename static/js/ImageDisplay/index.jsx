import React from "react";

const ImageDisplay = (props) => {
    const { name } = props

    return (
        <div className="mh-30 w-100">

            <h3 className="text-center">{name}</h3>

            <div className="h-50 pb-3">
                {props.children}
            </div>

        </div>)
}
export default ImageDisplay;
