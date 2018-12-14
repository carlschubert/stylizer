import React from "react";
import { Button } from "reactstrap"

const GoButton = (props) => {
    const { handleSubmit } = props;
    return (<Button 
        className="primary mt-2 btn-lg btn-block"
        onClick={handleSubmit}
        >
        Go!
        </Button>
        );
}

export default GoButton;