import {useState, useEffect, useContext} from "react";
import PokemonCard from "../../../../components/PokemonCard";
import {FireBaseContext} from "../../../../context/FirebaseContext";
import {PokemonContext} from "../../../../context/PokemonContext";
import {useHistory} from "react-router-dom";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import style from "./style.module.css";

const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const pokemonContext = useContext(PokemonContext)
    const [pokemons, setPokemons] = useState(null);
    const [clear, setClear] = useState(false);
    let history = useHistory();

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons)
        })

        return () => firebase.offPokemonSoket()
    }, []);

    const handleChangeSelected = (key) => {
        const pokemon = {...pokemons[key]}
        pokemonContext.onSelectedPokemons(key, pokemon)

        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected
            }
        }))
    };

    const handlerStartGameClick = () => history.push('/game/board')

     useEffect(() => {
         setClear(true)
     },[])

    return (
        <>
            <div className={style.start}>
                <Button onClick={handlerStartGameClick}
                        text='Start Game'
                        disabled={Object.keys(pokemonContext.pokemons).length < 5}
                />
                {
                    pokemons === null
                        ? <Loader/>
                        : <div className={style.flex}>
                            {
                                Object.entries(pokemons).map(([key, {id, name, img, type, values, selected}]) =>
                                    <PokemonCard key={key}
                                                 name={name}
                                                 id={id}
                                                 img={img}
                                                 type={type}
                                                 values={values}
                                                 isActive={true}
                                                 isSelected={selected}
                                                 className={style.card}
                                                 handleClickCard={() => {
                                                     if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                                                         handleChangeSelected(key)
                                                     }
                                                 }}
                                    />)
                            }
                        </div>
                }
            </div>
        </>
    );
}

export default StartPage;