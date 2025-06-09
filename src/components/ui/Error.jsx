import React from 'react'

const Error = ({error}) => {
    return (
        <div className="alert alert-danger my-2" role="alert">
            {error}
        </div>
    )
}

export default Error