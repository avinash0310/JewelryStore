import React from 'react';
import { shallow } from "enzyme";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Home from '../../features/Home.jsx';
import rootReducer from '../redux/rootReducer';

describe('Home', () => {

    // when
    const store = createStore(rootReducer, applyMiddleware());
    const component = shallow(<Provider store={store}><Home /></Provider>);

    it("should render initial layout", () => {
        // then
        expect(component.getElements()).toMatchSnapshot();
    });

    it("renders list-items", () => {
        // then
        expect(component.find('.list-items')).toBeDefined();
    });

    it("renders items", () => {
        // then
        expect(component.find('.item')).toBeDefined();
    });

    it("renders link", () => {
        // then
        expect(component.find('Link')).toBeDefined();
    });
});