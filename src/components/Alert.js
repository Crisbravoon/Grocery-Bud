
import React, { useEffect } from 'react'

const Alert = ({ type, message, removeAlert, List }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000)
        return () => clearTimeout(timeout)
    }, [List]);

    return (
        <div>
            <p className={`alert alert-${type}`}>{message}</p>
        </div>
    )
}

export default Alert;
