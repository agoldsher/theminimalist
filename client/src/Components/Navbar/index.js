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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span></button>
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