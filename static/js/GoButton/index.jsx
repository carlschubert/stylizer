import React from "react";
import { Button } from "reactstrap"

const GoButton = (props) => {
    const { handleSubmit } = props;
    return (<Button onClick={handleSubmit}>Go!</Button>);
}

export default GoButton;