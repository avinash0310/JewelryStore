import React, { Component } from 'react';
import { connect } from "react-redux";
import { requestLogin, clearLoginData } from './actions';
import {
    INVALID_CREDENTIAL_VALIDATION_MSG, INVALID_USER_NAME_VALIDATION_MSG, DEFAULT_PAGE_PATH,
    INVALID_PASSWORD_VALIDATION_MSG, TOKEN, JEWELRY_STORE_PATH, MIN_LENGTH, MAX_LENGTH, FAILED_MESSAGE
} from '../../app/common/constant';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isDisabled: false
        };
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };


    componentDidUpdate(prevProps) {
        if (this.props.loginInfo.payload && prevProps.loginInfo.payload !== this.props.loginInfo.payload) {
            if (this.props.loginInfo.payload.hasOwnProperty(TOKEN)) {
                this.props.history.push(JEWELRY_STORE_PATH);
            }
            else {
                this.setState({
                    userName: "",
                    password: "",
                    isDisabled: false
                }, () => alert(INVALID_CREDENTIAL_VALIDATION_MSG));
            };
        };

        if (this.props.loginInfo !== prevProps.loginInfo && this.props.loginInfo.isFailed) {
            this.setState({
                isDisabled: false
            }, () => alert(FAILED_MESSAGE));
        };
    };

    handleValidation = () => {
        let userNameLength = this.state.userName.trim().length;
        let passwordLength = this.state.password.trim().length;
        if (userNameLength === 0 || userNameLength < MIN_LENGTH || userNameLength > MAX_LENGTH) {
            alert(INVALID_USER_NAME_VALIDATION_MSG);
            return false;
        }
        else if (passwordLength === 0 || passwordLength < MIN_LENGTH || passwordLength > MAX_LENGTH) {
            alert(INVALID_PASSWORD_VALIDATION_MSG);
            return false;
        };

        return true;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            var loginModel = {
                userName: this.state.userName,
                password: this.state.password
            };
            this.setState({ isDisabled: true })
            this.props.requestLogin(loginModel);
        };
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({
            userName: "",
            password: "",
            isDisabled: false
        }, () => {
            this.props.clearLoginData();
            this.props.history.push(DEFAULT_PAGE_PATH);
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div className="login-page">
                <div className="login-control">
                    <label>Username : </label>
                    <input type="text" name="userName" placeholder="Username" value={this.state.userName} onChange={this.handleChange} />
                </div>
                <div className="login-control">
                    <label>Password : </label>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="login-control-btn">
                    <button disabled={this.state.isDisabled} onClick={this.handleSubmit}>{this.state.isDisabled ? 'Validating Credential...' : 'Login'}</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        )
    };
};


const mapStateToProps = state => {
    return {
        loginInfo: state.loginDetails,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestLogin: (loginModel) => dispatch(requestLogin(loginModel)),
        clearLoginData: () => dispatch(clearLoginData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);