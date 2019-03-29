import React, { Component } from "react";
import "./style.css";
import { Input, FormBtn } from "../AddForm";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Navbar extends Component {

    change = (x) => {
        x.classList.toggle("change");
    }


    render() {
        return (
            <nav className="navbar navbar-light bg-light">

                <div className="nav-container">

                    <div>
                        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </Button>
                    </div>
                    <Input
                        placeholder="Search..."
                    />
                    <div>
                        <FormBtn>Search</FormBtn>
                    </div>
                    <Link to="/newpost">
                        <FormBtn >+</FormBtn>
                    </Link>
                </div>

            </nav>
        )
    };
};

export default Navbar;