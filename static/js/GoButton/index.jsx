import React from "react";
import { Button } from "reactstrap"

const GoButton = (props) => {
    const { handleSubmit } = props;
    return (<Button 
        className="btn-lg btn-block"
        onClick={handleSubmit}
        >
        Go!
        </Button>
        );
}

export default GoButton;