import React, { Component } from "react";
import "./style.css";
import { Input, FormBtn } from "../AddForm";
// import CategoryWrapper from "../CategoryWrapper";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

class Navbar extends Component {
 state = {
    search:"",
    city:"",
    categories:[
    "All",
    "Electronics",
    "Appliances",
    "Clothing",
    "Household",
    "Sports",
    "Movies and Games",
    "Machinary",
    "Tools",
    "Space"]
    };
    searchBtn=(input)=>{
        API.search(input)
        .then(res =>{
          this.setState({ cards: res.data });
        }
        )
        .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
 
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
            <div className= "nav-container">
            <div className="pos-f-t">
                <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span></Button>
                <div className="collapse dropdown" id="navbarToggleExternalContent">
                    <div className="bg-light p-4">
                        <ul className="text-dark h5">
                        {this.state.categories.map(category => (
                            <li key={category} onClick={
                                    (e)=>{
                                        e.preventDefault()
                                        this.props.handleCategoryChange(category)
                                    }}> 
                                    {category}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
                <Input
                    name="search"
                    placeholder="Search..."
                    onChange={this.handleInputChange}
                />
                <FormBtn 
                onClick={
                    (e)=>{
                        e.preventDefault()
                        this.props.handleSearch(this.state.search)
                    }
                }>Search</FormBtn>
                <Input
                    name="city"
                    placeholder="City..."
                    onChange={this.handleInputChange}
                />
                <FormBtn 
                onClick={
                    (e)=>{
                        e.preventDefault()
                        this.props.handleCityChange(this.props.auth.user.id,this.state.city)
                    }
                }>Update City</FormBtn>
                <Link to="/newpost">
                    <FormBtn >+</FormBtn>
                </Link>
                </div>
            </nav>
        )
    };
};
const mapStateToProps = (state) => {
    return {auth: state.auth}
};

export default connect(
    mapStateToProps,
)(Navbar)