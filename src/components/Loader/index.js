import React from 'react'
import loader from '../../assets/loader.png'
import classes from './style.module.css'

const Loader = () => (
    <>
        <div className={classes.Loader}>
            <img src={loader} alt="Loading..." />
        </div>
    </>
)

export default Loader