import {useLocation, Route, Switch, Redirect} from 'react-router-dom'
import GamePage from './routes/Game'
import HomePage from './routes/Home'
import AboutPage from './routes/About'
import ContactPage from './routes/Contact'
import MenuHeader from './components/MenuHeader'
import NotFound from './routes/NotFound'
import Footer from './components/Footer'
import cn from 'classnames'
import style from './routes/style.module.css'
import Firebase from './service/firebase'
import {FireBaseContext} from './context/FirebaseContext'

const App = () => {
    const location = useLocation();
    const isPadding = location.pathname === '/' || location.pathname === '/game/board'

    return (
        <FireBaseContext.Provider value={new Firebase()}>
            <Switch>
                <Route path='/404' component={NotFound}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>

                        <div className={cn(style.wrap, {
                            [style.isHomePage]: isPadding
                        })}>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/game" component={GamePage}/>
                                <Route path="/about" component={AboutPage}/>
                                <Route path="/contact" component={ContactPage}/>
                                <Route>
                                    <Redirect to="/404"/>
                                </Route>
                            </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
        </FireBaseContext.Provider>
    );
};

export default App;