import React, {Component} from 'react';
import logo from '../images/logo.svg';
import Warhawks from '../images/WarhawksLogo.png';
import Image from 'react';
import '../styles/App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import RequestPage from "./RequestPage";
import StatusPage from "./StatusPage";
import InitPage from "./InitPage";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <img src={Warhawks} className="Warhawks-logo"/>
                        <span>Warhawks Tool</span>
                        <span className={"headerLink"}><Link to="/">Home</Link></span>
                        <span className={"headerLink"}><Link to="/status">Status</Link></span>
                        <span className={"headerLink"}><Link to="/request">Request</Link></span>
                    </header>
                    <div className="App-main">
                        <div>
                            <Route exact path="/" component={InitPage}/>
                            <Route path="/status" component={StatusPage}/>
                            <Route path="/request" component={RequestPage}/>
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
