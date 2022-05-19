import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import GameOver from '../../../../components/FinishBoard'
import Button from '../../../../components/Button'
import {PokemonContext} from '../../../../context/PokemonContext'
import Firebase from '../../../../service/firebase'
import styles from './style.module.css'

const FinishPage = () =>{
    const pokemonContext = useContext(PokemonContext)
    const firebase = new Firebase()
    const [choiceCard, setChoiceCard] = useState(null)

    const history = useHistory()

    const player1 = pokemonContext.pl1
    const player2 = pokemonContext.pl2

    const clickEndGame = () => {
        history.replace('/game/')
        firebase.addPokemonPlayerTwo(choiceCard)
    }
    const handlerClickCard = (index) => {
        setChoiceCard(player2[index])
    }

    return (
        <div className={styles.flex}>
            <GameOver cards={player1} />
            <Button onClick={clickEndGame} text="End Game"/>
            <GameOver onClickCard={(index) => handlerClickCard(index)} cards={player2}/>
        </div>
    );
}

export default FinishPage;