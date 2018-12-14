import React from 'react';
import { Alert } from 'reactstrap';

const FlashAlert = props => {
    const { color, msg } = props;

    return (

        <Alert color={color}>
            {msg}
        </Alert>

    );

}

export default FlashAlert;