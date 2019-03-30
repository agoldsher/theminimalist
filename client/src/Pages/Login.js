import React, { Component } from "react";
// import { Input, DropDown, TextArea, ImgUpload, FormBtn } from "../Components/AddForm";
import API from "../utils/API";

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
        if (this.state.title && this.state.category && this.state.price && this.state.description) {
            API.savePost({
                title: this.state.title,
                category: this.state.category,
                price: this.state.price,
                description: this.state.description,
                image: "this.state.image"
            })
                .then(data => console.log(data))
                .catch(err => console.log(err));
        } else {
            alert("Please complete all elements before posting")
        };
    };

    render() {
        return (
            <form action="/api/users/login" method="post">
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
                <button type="submit" value="Submit">Login</button>
            </form>
        );
    };
};

export default Login;