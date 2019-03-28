import React, { Component } from "react";
import "./style.css";
import { Input, FormBtn } from "../AddForm";
import { Link } from "react-router-dom";

class Navbar extends Component {

    change = (x) => {
        x.classList.toggle("change");
    }


    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container" onclick={this.change}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <Input 
                placeholder="Search..."
                />
                <FormBtn>Search</FormBtn>
                <Link to="/newpost">
                <FormBtn >+</FormBtn>
                </Link>
            </nav>
        )
    };
};

export default Navbar;