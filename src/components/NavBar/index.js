import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png'
import cn from 'classnames'
import style from './style.module.css'

const NavBar = ({onButtonNavBar, isActive, bgActiveN}) => {

    const handleClickExit = () => onButtonNavBar()

    return (
        <>
            <nav className={cn(style.navbar, {[style.bgActive]: bgActiveN})}>
                <div className={style.navWrapper}>
                    <p className={style.brand}>
                        <Link to={'/'}>
                            <img src={logo} alt={'logo'}/>
                        </Link>
                    </p>
                    <p className={cn(style.menuButton, {[style.active]: isActive})}
                       onClick={handleClickExit}>
                        <span/>
                    </p>
                </div>
            </nav>
        </>
    )
};

export default NavBar;