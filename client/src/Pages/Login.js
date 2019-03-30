import React, { Component } from "react";
// import { Input, DropDown, TextArea, ImgUpload, FormBtn } from "../Components/AddForm";
// import API from "../utils/API";
import Axios from "axios";

class Login extends Component {

    state = {
        email:"",
        password:""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/users/login',{
            user: {
                email:this.state.email,
                password: this.state.password
            }
            
        }).then(response => {
            console.log("received response")
            console.log(response)
            //TODO finish once router is working correctly
        })
    };

    render() {
        return (
            <form>
                <input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    type="text"
                    name="email"
                    placeholder="Email"
                    label="Title: "
                />
                <input
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    label="Price: $"
                />
                <button type="submit" value="Submit" onClick={this.handleFormSubmit}>Login</button>
            </form>
        );
    };
};

export default Login;