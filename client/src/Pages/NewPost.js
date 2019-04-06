import React, { Component } from "react";
import { Input, DropDown, TextArea, ImgUpload, FormBtn, TextDisplay } from "../Components/AddForm";
import API from "../utils/API";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
// import PropTypes from "prop-types";


class NewPost extends Component {

    state = {
        title: "",
        category: "",
        price: "",
        description: "",
        image: "",
        city: "city",
        state: "state",
        zipcode: ""
    };
    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    };

    handleZipCode = () => {
        if (this.state.zipcode.split("").length === 5 && /^[0-9]+$/.test(this.state.zipcode)) {
            API.getZipCode(this.state.zipcode)
                .then((res) => {
                    this.setState({
                        city: res.data.city,
                        state: res.data.state
                    })
                })
                .catch(err => console.log(err));
        };

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSelectChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.title && this.state.category && this.state.price && this.state.description && this.state.zipcode) {
            let formData = new FormData();
            // console.log(this.state)
            formData.append("title", this.state.title);
            formData.append("category", this.state.category);
            formData.append("price", this.state.price);
            formData.append("description", this.state.description);
            formData.append("image", this.fileInput.current.files[0], this.fileInput.current.files[0].name);
            // formData.append("city", this.state.city);
            // formData.append("state", this.state.state);
            formData.append("zipcode", this.state.zipcode);
            // console.log(formData);
            // const { user } = this.props.auth;
            // formData.append("userName", user.userName);
            // console.log(user);
            console.log(formData)
            API.savePost(formData)
                .then((res) => {
                    this.props.history.push("/");
                })
                .catch(err => console.log(err));
        } else {
            alert("Please complete all elements before posting");
        };
    };

    render() {
        return (
            <div className="form-container">
                <form>
                    <Input
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Enter Title (required)"
                        label="Title: "
                    />
                    <DropDown
                        value={this.state.category}
                        onChange={this.handleSelectChange}
                        name="category"
                        categories={[
                            "Category",
                            "Electronics",
                            "Appliances",
                            "Clothing",
                            "Household",
                            "Sports",
                            "Movies and Games",
                            "Machinary",
                            "Tools",
                            "Space"]}
                        label="Category: "
                    />
                    <Input
                        value={this.state.price}
                        onChange={this.handleInputChange}
                        name="price"
                        placeholder="Enter Price per day (required)"
                        label="Price: $"
                    />
                    <TextArea
                        value={this.state.Description}
                        onChange={this.handleInputChange}
                        name="description"
                        placeholder="Enter Description (required)"
                        label="Description: "
                    />
                    <Input
                        value={this.state.zipcode}
                        onChange={this.handleInputChange}
                        name="zipcode"
                        placeholder="Enter Zip Code (required)"
                        label="Zip Code: "
                    />
                    <FormBtn onClick={this.handleZipCode}>Check</FormBtn>
                    <TextDisplay
                        label={this.state.city}
                    />
                    <TextDisplay
                        label={this.state.state}
                    />
                    <ImgUpload
                        value={this.state.Image}
                        name="image"
                        label="Image: "
                        fileRef={this.fileInput}
                    />
                    <Link to="/">
                        <FormBtn>Cancel</FormBtn>
                    </Link>
                    <FormBtn onClick={this.handleFormSubmit}>Post</FormBtn>
                </form>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {auth: state.auth}
};
// export default withRouter(NewPost);
export default withRouter(connect(mapStateToProps)(NewPost))