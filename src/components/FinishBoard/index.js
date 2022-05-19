import React, {useState} from 'react'
import PokemonCard from '../PokemonCard'
import styles from './style.module.css'
import cn from 'classnames'

const GameOver = ({cards, onClickCard}) => {

    const [isSelected, setSelected] = useState(null)

    const handlerClick = (index) => {
        onClickCard && onClickCard(index)
    }

    return (
        <div className={styles.cardBlock}>
            {
                cards.map((item, index) => (
                    <div key={item.id} className={cn(styles.card, {[styles.active]: isSelected === item.id})}
                         onClick={() => {
                             setSelected(item.id)
                             handlerClick(index)
                         }}
                    >
                        <PokemonCard
                            name={item.name}
                            id={item.id}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default GameOver