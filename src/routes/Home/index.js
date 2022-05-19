import React from 'react'
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import Header from '../../components/Header'
import Layout from '../../components/Layout'


function HomePage({onChangePage}) {

    const handleClickButton = (page) => {
        onChangePage && onChangePage(page)
    }
    return (
        <>
            <Header title='Pokemons'
                    descr='The game'
                    onClickButton={handleClickButton}
            />

            <Layout title="Condition one" urlBg={bg1} position="100%">
                <div>
                    In the game two players face off against one another, one side playing as "blue", the other as "red"
                    on a 3x3 grid. Each player has five cards in a hand and the aim is to capture the opponent's cards
                    by turning them into the player's own color of red or blue.
                </div>
            </Layout>

            <Layout colorBg='#ffaaaa' title='Condition tow'>
                <div>To win, a majority of the total ten cards played (including the one card that is not placed on the
                    board) must be of the player's card color. To do this, the player must capture cards by placing a
                    card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch
                    will be compared. If the rank of the opponent's card is higher than the player's card, the player's
                    card will be captured and turned into the opponent's color.
                </div>

            </Layout>

            <Layout urlBg={bg2} title='Condition tree'>
                <div>
                    To win, a majority of the total ten cards played (including the one card that is not placed on the
                    board) must be of the player's card color. To do this, the player must capture cards by placing a
                    card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch
                    will be compared. If the rank of the opponent's card is higher than the player's card, the player's
                    card will be captured and turned into the opponent's color. If the player's rank is higher, the
                    opponent's card will be captured and changed into the player's color instead.
                </div>
            </Layout>
        </>
    );
}

export default HomePage;
