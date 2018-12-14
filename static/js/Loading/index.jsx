import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = props => {
    const { isLoading } = props;
    return (
        <Fragment>
            {
                isLoading ?
                    <div className="h-100">
                        Loading... This will take up to a minute.
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon
                                icon={faSpinner}
                                size="8x"
                                spin
                                pulse
                            />
                        </div>
                    </div>
                    :
                    props.children
            }
        </Fragment>
    )

}

export default Loading;