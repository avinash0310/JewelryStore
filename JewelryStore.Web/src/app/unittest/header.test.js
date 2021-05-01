import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Header from '../../features/Layout/Header.jsx';
const store = createStore(() => [], {}, applyMiddleware());
let container = null;

beforeEach(() => {
    // setup to render component in dom
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    container = null;
});

it('Header component unit test cases', () => {
    act(() => {
        ReactDOM.render(<Provider store={store}><Header /></Provider>, container);
    });
    const label = container.querySelector('h1');
    expect(label.textContent).toBe('Welcome to Jewelry Store');
});