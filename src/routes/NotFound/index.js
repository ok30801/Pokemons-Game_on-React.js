import React from 'react'
import img from '../../assets/404.png'
import style from './style.module.css'


const NotFound = () => {
    return (
        <div className={style.wrap}>
            <img src={img} alt='Pikahu'/>
            <div className={style.message}>This page was not found</div>
        </div>

    );
};


export default NotFound;