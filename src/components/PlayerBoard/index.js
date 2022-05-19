import React, {useState} from 'react'
import PokemonCard from '../PokemonCard'
import styles from './style.module.css'
import cn from 'classnames'

const PlayerBoard = ({player, cards, onClickCard}) => {

    const [isSelected, setSelected] = useState(null)
    return (
        <div>
            {
                cards.map(item => (
                    <div className={cn(styles.cardBoard, {
                        [styles.selected]: isSelected === item.id
                    })}
                         onClick={() => {
                             setSelected(item.id)
                             onClickCard && onClickCard({
                                 player,
                                 ...item
                             })
                         }} key={item.id}
                    >
                        <PokemonCard
                            name={item.name}
                            id={item.id}
                            img={item.img}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                            className={styles.card}
                            minimize
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default PlayerBoard