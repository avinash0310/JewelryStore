import React from 'react';
import { connect } from 'react-redux';
import { TOKEN } from '../../app/common/constant';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.loginInfo.payload && prevProps.loginInfo.payload !== this.props.loginInfo.payload && this.props.loginInfo.payload.hasOwnProperty(TOKEN)) {
            this.setState({
                userName: this.props.loginInfo.payload.customer.userName
            });
        };
    };

    render() {
        return (
            <div>
                <h1>Welcome to Jewelry Store</h1>
                <label>{this.state.userName !== "" ? "Welcome : " + this.state.userName : ""}</label>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loginInfo: state.loginDetails,
    };
};

export default connect(mapStateToProps, null)(Header);