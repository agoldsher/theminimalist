import React, { Component } from "react";
import "./style.css";
import { Input, FormBtn } from "../AddForm";
import { Link } from "react-router-dom";

class Navbar extends Component {
 state = {
    categories:["electronics",
    "appliances",
    "clothing",
    "household",
    "sports/outdoors",
    "movies and games",
    "space",
    "machinary",
    "tools"]
    };
    change = (x) => {
        x.classList.toggle("change");
    }
   
 
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
            <div className="pos-f-t">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span></button>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-light p-4">
                        <ul className="text-dark h5">
                        {/* {this.state.categories.forEach(category => {
                           return category;
                        })} */}
                        <li>electronics</li>
                        <li>appliances</li>
                        <li>clothing</li>
                        </ul>
                     
                    </div>
                </div>
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