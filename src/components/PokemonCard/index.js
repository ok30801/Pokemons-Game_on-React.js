import React from 'react'
import cardBackSide from '../../assets/card-back-side.jpg'
import cn from 'classnames'
import style from './style.module.css'

const PokemonCard = ({possession, name, img, id, type, values, isActive, className, minimize, handleClickCard, isSelected}) => {

    const handelClick = () => {
        handleClickCard && handleClickCard(id)
    };

    return (
        <>
            <div onClick={() => handelClick(id)} className={cn(className, style.pokemonCard, {
                [style.active]: isActive,
                [style.selected]: isSelected
            })}>
                <div className={style.cardFront}>
                    <div className={cn(style.wrap, style.front)}>
                        <div className={cn(style.pokemon, style[type], style[possession])}>
                            <div className={style.values}>
                                <div className={cn(style.count, style.top)}>{values.top}</div>
                                <div className={cn(style.count, style.right)}>{values.right}</div>
                                <div className={cn(style.count, style.bottom)}>{values.bottom}</div>
                                <div className={cn(style.count, style.left)}>{values.left}</div>
                            </div>
                            <div className={style.imgContainer}>
                                <img src={img} alt={name}/>
                            </div>
                            {!minimize && (<div className={style.info}>
                                <span className={style.number}>#{id}</span>
                                <h3 className={style.name}>{name}</h3>
                                <small className={style.type}>Type: <span>{type}</span></small>
                            </div>)}
                        </div>
                    </div>
                </div>

                <div className={style.cardBack}>
                    <div className={style.wrap}>
                        <img src={cardBackSide} alt="Сard Backed"/>
                    </div>
                </div>

            </div>
        </>
    )
};

export default PokemonCard;