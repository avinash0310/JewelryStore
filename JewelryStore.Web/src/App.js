import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './features/Login/Login.jsx';
import Header from './features/Layout/Header.jsx';
import Home from './features/Home.jsx';
import JewelryStore from './features/JewelryStore/JewelryStore.jsx';
import './App.css';
import { DEFAULT_PAGE_PATH, LOGIN_PAGE_PATH, JEWELRY_STORE_PATH } from "./app/common/constant";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path={DEFAULT_PAGE_PATH} component={Home} />
                    <Route exact path={LOGIN_PAGE_PATH} component={Login} />
                    <Route exact path={JEWELRY_STORE_PATH} component={JewelryStore} />
                    <Route component={Home} />
                </Switch>
            </div>
        );
    };
};