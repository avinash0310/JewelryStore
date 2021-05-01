import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../features/Login/Login.jsx';
import { INVALID_PASSWORD_VALIDATION_MSG, INVALID_USER_NAME_VALIDATION_MSG } from "../common/constant";

describe('Login', () => {
    const props = {
        dispatch: jest.fn(),
        loginInfo: {
            payload: null,
            isFailed: false,
            isLoading: false,
            error: null
        }
    };

    it('username check', () => {
        // when
        let wrapper = shallow(<Login {...props} />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'userName', value: 'test0001' } });

        // then
        expect(wrapper.state('userName')).toEqual('test0001');
    });

    it('password check', () => {
        // when
        let wrapper = shallow(<Login {...props} />);
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'test0001' } });

        // then
        expect(wrapper.state('password')).toEqual('test0001');
    });

    it('login check with wrong username', () => {
        // when
        window.alert = jest.fn();
        let wrapper = shallow(<Login {...props} />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'userName', value: 'test0014234234234' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'test001' } });
        wrapper.find('button').first().simulate('click', {
            preventDefault: () => {
            }
        });

        // then
        expect(window.alert).toHaveBeenCalledWith(INVALID_USER_NAME_VALIDATION_MSG);
        expect(wrapper.state('isDisabled')).toBe(false);
    });

    it('login check with wrong password', () => {
        // when
        let wrapper = shallow(<Login {...props} />);
        window.alert = jest.fn();
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'userName', value: 'test001' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'test0014234234234' } });
        wrapper.find('button').first().simulate('click', {
            preventDefault: () => {
            }
        });

        // then
        expect(window.alert).toHaveBeenCalledWith(INVALID_PASSWORD_VALIDATION_MSG);
        expect(wrapper.state('isDisabled')).toBe(false);
    });
});