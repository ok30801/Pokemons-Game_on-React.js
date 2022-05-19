import {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {PokemonContext} from '../../../../context/PokemonContext'
import PokemonCard from '../../../../components/PokemonCard'
import PlayerBoard from '../../../../components/PlayerBoard'
import Loader from '../../../../components/Loader'
import Swal from 'sweetalert2'
import styles from './style.module.css'

const counterWin = (board, playerOneGame, playerTwoGame) => {
    let playerOneGameCount = playerOneGame.length
    let playerTwoGameCount = playerTwoGame.length

    board.forEach(item => {
        if (item.card.possession === 'red') {
            playerTwoGameCount++
        }
        if (item.card.possession === 'blue') {
            playerOneGameCount++
        }
    })
    return [playerOneGameCount, playerTwoGameCount]
}

const BoardPage = () => {
    const {pokemons} = useContext(PokemonContext)
    const cardsPlayers = useContext(PokemonContext)
    const history = useHistory()
    const [board, setBoard] = useState([])

    const [playerOneGame, setPlayerOneGame] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    })
    const [playerOneFinish, setPlayerOneFinish] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    })

    const [playerTwoGame, setPlayerTwoGame] = useState(null)
    const [playerTwoFinish, setPlayerTwoFinish] = useState([])

    const [choiceCard, setChoiceCard] = useState(null)
    console.log('choiceCard', choiceCard)
    const [steps, setSteps] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board')
            const boardRequest = await boardResponce.json()
            setBoard(boardRequest.data)

            const playerTwoGameResponce = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
            const playerTwoGameRequest = await playerTwoGameResponce.json()
            setPlayerTwoGame(() => {
                return playerTwoGameRequest.data.map(item => ({
                    ...item,
                    possession: 'red'
                }))
            })
            setPlayerTwoFinish(() => {
                return playerTwoGameRequest.data.map(item => ({
                    ...item,
                    possession: 'red'
                }))
            })
        }

        fetchData()
    }, [])

    const handlerClickBoardPlate = async (position) => {

        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            }
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayerOneGame(prevState => prevState.filter(item => item.id !== choiceCard.id))
                setPlayerOneFinish(prevState => prevState.filter(item => item.id))

            }
            if (choiceCard.player === 2) {
                setPlayerTwoGame(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(request.data)
            setSteps(prevState => {
                const count = prevState + 1
                return count
            })
        }
    }

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game')
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, playerOneGame, playerTwoGame)

            if (count1 > count2) {
                Swal.fire({
                    icon: 'success',
                    title: 'Победа!!!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/game/finish')
                    }
                })
            } else if (count1 < count2) {
                Swal.fire({
                    icon: 'warning',
                    title: 'LOSER',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/game/finish')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ничья',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/game/finish')
                    }
                })
            }
        }
        cardsPlayers.onSelectCardsPlayers(playerOneFinish, playerTwoFinish)
    }, [steps])

    return (
        <div className={styles.root}>
            <div className={styles.playerOne}>

                <PlayerBoard
                    player={1}
                    cards={playerOneGame}
                    onClickCard={(card) => setChoiceCard(card)}
                />

            </div>

            <div className={styles.board}>
                {
                    board.map(item => (
                        <div key={item.position}
                             className={styles.boardPlate}
                             onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize/>
                            }
                        </div>
                    ))
                }
            </div>

            <div className={styles.playerTwo}>

                {
                    playerTwoGame === null
                        ? <div className={styles.loadingBlock}>
                            <div className={styles.bg}></div>
                            <div className={styles.loader}>
                                <Loader/>
                            </div>
                        </div>
                        : <PlayerBoard
                            player={2}
                            cards={playerTwoGame}
                            onClickCard={(card) => setChoiceCard(card)}
                        />
                }
            </div>
        </div>
    );
};

export default BoardPage;