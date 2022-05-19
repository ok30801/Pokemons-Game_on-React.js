import React from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../Button';
import styles from './style.module.css'

const Header = ({title, descr}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/game');
    };

    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.silhouette}></div>
            <div className={styles.moon}></div>
            <div className={styles.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <Button onClick={handleClick} text="Start Game"/>

            </div>
        </header>
    );
};

export default Header;