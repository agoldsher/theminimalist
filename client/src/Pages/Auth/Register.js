import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import TextField, { Input } from "@material/react-text-field";
import Button from "@material/react-button";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            userName: "",
            email: "",
            password: "",
            password2: "",
            city: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            city: this.state.city
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="register-container">
                <div className="register-form">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        login
                    </Link>
                    <div className="header" style={{ paddingLeft: "11.250px" }}>
                        <h2>
                            <b>Register</b>
                        </h2>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field">
                            <TextField
                                label='User Name'
                            >
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.userName
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.userName}</span>
                        </div>
                        <div className="input-field">
                            <TextField
                                label='Name'
                            >

                                <Input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="input-field">
                            <TextField label='Email'>
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field">
                            <TextField label='Password'>
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field">
                            <TextField label="Confirm">
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.password2}</span>
                        </div>
                        <div className="input-field">
                            <TextField label="City">
                                <Input
                                    onChange={this.onChange}
                                    value={this.state.city}
                                    error={errors.city}
                                    id="city"
                                    type="city"
                                    className={classnames("", {
                                        invalid: errors.city
                                    })}
                                />
                            </TextField>
                            <span className="red-text">{errors.city}</span>
                        </div>
                        <div className="register-button" style={{ paddingLeft: "11.250px" }}>
                            <Button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));