import React, { Fragment } from 'react';

const Loading = props => {
    const { isLoading } = props;
    return (
        <Fragment>
            {
                isLoading ?
                'Loading...'
                :
                props.children
            }
        </Fragment>
    )

}

export default Loading;