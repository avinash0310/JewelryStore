import React from 'react';
import { connect } from "react-redux";
import { jsPDF } from "jspdf";
import { requestJewelryStoreCalculation } from './actions';
import {
    DEFAULT_DISCOUNT, GOLD_PRICE_VALIDATION_MSG, GOLD_WEIGHT_VALIDATION_MSG,
    DISCOUNT_VALIDATION_MSG, LOGIN_PAGE_PATH, PRIVILEGED, FAILED_MESSAGE,
    PLEASE_CALCULATE_VALIDATION_MSG
} from '../../app/common/constant';

export class JewelryStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goldPrice: "",
            goldWeight: "",
            totalPrice: "",
            discount: DEFAULT_DISCOUNT,
            isPrivileged: false,
            isDisabled: false
        };

        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePrintFile = this.handlePrintFile.bind(this);
        this.handlePrintInScreen = this.handlePrintInScreen.bind(this);
        this.handlePrintInPaper = this.handlePrintInPaper.bind(this);
    };

    componentDidMount() {
        if (this.props.loginInfo.payload && this.props.loginInfo.payload.hasOwnProperty('customer')) {
            let isPrivileged = this.props.loginInfo.payload.customer.customerType === PRIVILEGED;
            if (isPrivileged) {
                this.setState({
                    isPrivileged: isPrivileged
                });
            };
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.jewelryStore.payload !== prevProps.jewelryStore.payload) {
            let totalPrice = "";
            if (this.props.jewelryStore.payload && this.props.jewelryStore.payload.hasOwnProperty('totalPrice')) {
                totalPrice = this.props.jewelryStore.payload.totalPrice;
            }

            this.setState({
                totalPrice: totalPrice,
                isDisabled: false
            });
        };

        if (this.props.jewelryStore !== prevProps.jewelryStore && this.props.jewelryStore.isFailed) {
            this.setState({
                isDisabled: false,
                totalPrice: ""
            }, () => alert(FAILED_MESSAGE));
        };
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({
            goldPrice: "",
            goldWeight: "",
            totalPrice: "",
            discount: DEFAULT_DISCOUNT,
            isDisabled: false
        }, () => this.props.history.push(LOGIN_PAGE_PATH));
    };

    handleValidation = () => {
        if (!(this.state.goldPrice > 0)) {
            alert(GOLD_PRICE_VALIDATION_MSG);
            return false;
        }
        else if (!(this.state.goldWeight > 0)) {
            alert(GOLD_WEIGHT_VALIDATION_MSG);
            return false;
        }
        else if (!(this.state.discount >= 0 && this.state.discount <= 100)) {
            alert(DISCOUNT_VALIDATION_MSG);
            return false;
        };

        return true;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            const calculationModel = {
                customerId: Number(this.props.loginInfo.payload.customer.customerId),
                goldPrice: Number(this.state.goldPrice),
                goldWeight: Number(this.state.goldWeight),
                discount: Number(this.state.discount)
            };

            this.setState({ isDisabled: true });
            const token = this.props.loginInfo.payload.token;
            this.props.requestCalculation(calculationModel, token);
        };
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handlePrintFile = (event) => {
        event.preventDefault();
        if (this.state.totalPrice !== "") {
            // Landscape export, 2×4 inches
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
                format: [10, 10]
            });

            let message = "";
            if (this.state.isPrivileged) {
                message = `(Gold price : ${this.state.goldPrice} ) * (Gold weight : ${this.state.goldWeight} ) 
                           (with ${this.state.discount}% discount ) = (Total price : ${this.state.totalPrice} )`;
            }
            else {
                message = `(Gold price : ${this.state.goldPrice} ) * (Gold weight : ${this.state.goldWeight} ) = 
                            (Total price : ${this.state.totalPrice}) `;
            }

            doc.text(message, 1, 1);
            doc.save("jelewry-store.pdf");
        } else {
            alert(PLEASE_CALCULATE_VALIDATION_MSG);
        };
    };

    handlePrintInScreen = (event) => {
        event.preventDefault();
        if (this.state.totalPrice !== "") {
            window.confirm("Total price : " + this.state.totalPrice)
        } else {
            alert(PLEASE_CALCULATE_VALIDATION_MSG);
        };
    };

    handlePrintInPaper = (event) => {
        event.preventDefault();
        if (this.state.totalPrice !== "") {
            alert("Print to paper coming soon.. Stay tuned!");
        } else {
            alert(PLEASE_CALCULATE_VALIDATION_MSG);
        };
    };

    render() {
        return (
            <div className="JewelryStore">
                { this.props.loginInfo.payload && this.props.loginInfo.payload.customer ?
                    <div>
                        <div>
                            <label>Gold Price (per gram) </label>
                            <input type="number" name="goldPrice" placeholder="Gold Price" value={this.state.goldPrice} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Weight (gram) </label>
                            <input type="number" name="goldWeight" placeholder="Weight" value={this.state.goldWeight} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Total Price </label>
                            <input type="text" name="totalPrice" placeholder="Total Price" value={this.state.totalPrice} readOnly={true} />
                        </div>
                        <div>
                            {this.state.isPrivileged && <div>
                                <label>Discount % </label>
                                <input type="number" name="discount" placeholder="Discount" value={this.state.discount} onChange={this.handleChange} />
                            </div>}
                        </div>
                        <div>
                            <button disabled={this.state.isDisabled} onClick={this.handleSubmit}>{this.state.isDisabled ? 'Calculating...' : 'Calculate'}</button>
                            <button onClick={this.handlePrintInScreen}>Print to Screen</button>
                            <button onClick={this.handlePrintFile}>Print to File</button>
                            <button onClick={this.handlePrintInPaper}>Print to Paper</button>
                        </div>
                        <div>
                            <button variant="secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                    : this.props.history.push(LOGIN_PAGE_PATH)}
            </div>
        );
    };
};


const mapStateToProps = state => {
    return {
        jewelryStore: state.jewelryStore,
        loginInfo: state.loginDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestCalculation: (calculationModel, token) => dispatch(requestJewelryStoreCalculation(calculationModel, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JewelryStore);