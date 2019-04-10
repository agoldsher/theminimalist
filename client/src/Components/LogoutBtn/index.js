// import '../../App.scss';
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import MaterialIcon from "@material/react-material-icon";
import '@material/react-material-icon/index.scss';

class Logout extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        // const { user } = this.props.auth;
        // console.log(user)
        return (
            <MaterialIcon
                aria-label="Logout"
                hasRipple
                icon='logout'
                onClick={this.onLogoutClick}
            />
        );
    }
}
Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Logout);