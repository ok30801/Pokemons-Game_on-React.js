import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAzLn-g2SBB4j2RJZaG6nft-DVGWnIdy0c",
    authDomain: "pokemons-game-9f905.firebaseapp.com",
    databaseURL: "https://pokemons-game-9f905-default-rtdb.firebaseio.com",
    projectId: "pokemons-game-9f905",
    storageBucket: "pokemons-game-9f905.appspot.com",
    messagingSenderId: "1041869689801",
    appId: "1:1041869689801:web:585e3f4d715e91ca64ce18"
};
firebase.initializeApp(firebaseConfig)

class Firebase {
    constructor() {

        this.fire = firebase;
        this.database = this.fire.database();
    }

    // Подписка
    getPokemonSoket = (cb) => {
        console.log('cb', cb)
        this.database.ref('pokemons').on('value', (snapshot) => {
            console.log('snapshot', snapshot)
            cb(snapshot.val())
        })
    }

    // Отписка
    offPokemonSoket = () => {
        this.database.ref('pokemons').off()
    }

    addPokemonPlayerTwo = (newPokemon) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(newPokemon)
    }

    postPokemon = (key, arrPokemon, cb) => {
        this.database.ref(`pokemons/${key}`).update({active: arrPokemon})
    }
}

export default Firebase;

