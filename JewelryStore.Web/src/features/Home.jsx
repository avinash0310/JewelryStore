import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_PAGE_PATH } from '../app/common/constant';

export default class Home extends React.Component {
    render() {
        return (
            <ul className="list-items">
                <li className="item"><Link to={LOGIN_PAGE_PATH}>Login</Link></li>
            </ul>
        );
    };
};