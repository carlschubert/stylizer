import React from "react";

const ImageDisplay = (props) => {
    const { name } = props

    return (
        <div
            className="w-100"
            style={{ 'minHeight': '30%' }}
        >

            <h3 className="text-center">{name}</h3>

            <div className="h-50 pb-3">
                {props.children}
            </div>

        </div>)
}
export default ImageDisplay;
