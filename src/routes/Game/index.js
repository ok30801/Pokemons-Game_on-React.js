import {useState} from 'react';
import {useRouteMatch, Route, Switch} from 'react-router-dom'
import StartPage from './routes/StartPage'
import BoardPage from './routes/BoardPage'
import FinishPage from './routes/FinishPage'
import {PokemonContext} from '../../context/PokemonContext'

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({})

    const match = useRouteMatch();

    const [playerOne, setPlayerOne] = useState(null)
    const [playerTwo, setPlayerTwo] = useState(null)

    const handleSelectedPocemons = (key, pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState}
                delete copyState[key]

                return copyState
            }
            return {
                ...prevState,
                [key]: pokemon
            }
        })
    }

    const changeCardsPlayers = (pl1, pl2) => {
        setPlayerOne(pl1)
        setPlayerTwo(pl2)
    }

    return (
        <>
            <PokemonContext.Provider value={{
                pokemons: selectedPokemons,
                onSelectedPokemons: handleSelectedPocemons,
                onSelectCardsPlayers: changeCardsPlayers,
                pl1: playerOne,
                pl2: playerTwo,
            }}>

                <Switch>
                    <Route path={`${match.path}/`} exact component={StartPage}/>
                    <Route path={`${match.path}/board`} component={BoardPage}/>
                    <Route path={`${match.path}/finish`} component={FinishPage}/>
                </Switch>
            </PokemonContext.Provider>
        </>
    )
};

export default GamePage;