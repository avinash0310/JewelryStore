import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Jewelrystore, { JewelryStore } from '../../features/JewelryStore/JewelryStore.jsx';
import rootReducer from '../redux/rootReducer';
import {
    GOLD_PRICE_VALIDATION_MSG, GOLD_WEIGHT_VALIDATION_MSG, DEFAULT_DISCOUNT, DISCOUNT_VALIDATION_MSG,
    PRIVILEGED
} from '../common/constant';

describe('JewelryStore', () => {
    const tempObj = {
        payload: {
            customer: { customerType: PRIVILEGED}
        },
        isFailed: false,
        isLoading: false,
        error: null
    };
    const props = {
        dispatch: jest.fn(),
        loginInfo: tempObj,
        jewelryStore: tempObj,
        history: []
    };

    it("should render initial layout", () => {
        // when
        let store = createStore(rootReducer, applyMiddleware())
        let component = shallow(<Provider store={store}><Jewelrystore /></Provider>);

        // then
        expect(component.getElements()).toMatchSnapshot();
    });

    it('gold price input check', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        wrapper.find('input[type="number"]').first().simulate('change', { target: { name: 'goldPrice', value: '123' } });

        // then
        expect(wrapper.state('goldPrice')).toEqual('123');
    });

    it('gold weight input check', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        wrapper.find('input[type="number"]').at(1).simulate('change', { target: { name: 'goldWeight', value: '123' } });

        // then
        expect(wrapper.state('goldWeight')).toEqual('123');
    });

    it('total prize should be empty', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);

        // then
        expect(wrapper.state('totalPrice')).toEqual("");
    });

    it('total prize should not be set', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'totalPrice', value: '123' } });

        // then
        expect(wrapper.state('totalPrice')).toEqual("");
    });

    it('discount input check', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        wrapper.find('input[type="number"]').at(2).simulate('change', { target: { name: 'discount', value: '12' } });

        // then
        expect(wrapper.state('discount')).toEqual('12');
    });

    it('discount input check', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);

        // then
        expect(wrapper.state('discount')).toEqual(DEFAULT_DISCOUNT);
    });

    it('calculate check with wrong gold price', () => {
        // when
        window.alert = jest.fn();
        let wrapper = shallow(<JewelryStore {...props} />);
        wrapper.find('input[type="number"]').first().simulate('change', { target: { name: 'goldPrice', value: '0' } });
        wrapper.find('button').first().simulate('click', {
            preventDefault: () => {
            }
        });

        // then
        expect(window.alert).toHaveBeenCalledWith(GOLD_PRICE_VALIDATION_MSG);
        expect(wrapper.state('isDisabled')).toBe(false);
    });

    it('calculate check with wrong gold weight', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        window.alert = jest.fn();
        wrapper.find('input[type="number"]').at(1).simulate('change', { target: { name: 'goldWeight', value: '0' } });
        wrapper.find('input[type="number"]').first().simulate('change', { target: { name: 'goldPrice', value: '123' } });
        wrapper.find('button').first().simulate('click', {
            preventDefault: () => {
            }
        });

        // then
        expect(window.alert).toHaveBeenCalledWith(GOLD_WEIGHT_VALIDATION_MSG);
        expect(wrapper.state('isDisabled')).toBe(false);
    });

    it('calculate check with wrong discount', () => {
        // when
        let wrapper = shallow(<JewelryStore {...props} />);
        window.alert = jest.fn();
        wrapper.find('input[type="number"]').at(1).simulate('change', { target: { name: 'goldWeight', value: '123' } });
        wrapper.find('input[type="number"]').at(2).simulate('change', { target: { name: 'discount', value: '123' } });
        wrapper.find('input[type="number"]').first().simulate('change', { target: { name: 'goldPrice', value: '123' } });
        wrapper.find('button').first().simulate('click', {
            preventDefault: () => {
            }
        });

        // then
        expect(window.alert).toHaveBeenCalledWith(DISCOUNT_VALIDATION_MSG);
        expect(wrapper.state('isDisabled')).toBe(false);
    });
});