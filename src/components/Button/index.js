import React from 'react'
import classes from './style.module.css'

const Button = ({ onClick, text, disabled }) => {
    return (
        <div className={classes.root}>
            <button disabled={disabled} onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button