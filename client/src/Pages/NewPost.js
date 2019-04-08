import React, { Component } from "react";
import { DropDown, TextArea, ImgUpload, FormBtn, TextDisplay } from "../Components/AddForm";
import API from "../utils/API";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
// import PropTypes from "prop-types";

import TextField, { HelperText, Input } from '@material/react-text-field';

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
        if (this.state.title && this.state.category && this.state.price && this.state.description && this.state.city && this.state.state && this.state.zipcode) {
            let formData = new FormData();
            console.log(this.state)
            formData.append("title", this.state.title);
            formData.append("category", this.state.category);
            formData.append("price", this.state.price);
            formData.append("description", this.state.description);
            console.log("fileInput");
            console.log(this.fileInput);
            formData.append("image", this.fileInput.current.files[0], this.fileInput.current.files[0].name);
            formData.append("city", this.state.city);
            formData.append("state", this.state.state);
            formData.append("zipcode", this.state.zipcode);
            const { user } = this.props.auth;
            formData.append("userName", user.userName);
            formData.append("email", user.email);
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
        console.log(this.props)
        return (
            <div className="mdc-form-field">
                <form>
                    <TextField
                        label='Title'
                        helperText={<HelperText></HelperText>}>
                        <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name="title"
                        />
                    </TextField>
                    <DropDown
                        value={this.state.category}
                        onChange={this.handleSelectChange}
                        name="category"
                        categories={[
                            "",
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
                        label="Category"
                    />
                    <TextField
                        label='Price'
                        helperText={<HelperText>Enter Price per day in $ USD (required)</HelperText>}>
                        <Input
                            value={this.state.price}
                            onChange={this.handleInputChange}
                            inputType='textarea'
                            name="price"
                        />
                    </TextField>
                    <TextField
                        label='Description'
                        helperText={<HelperText>Enter Description (required)</HelperText>}
                        textarea={true}
                    >
                        <Input
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            name="description"
                        />
                    </TextField>
                    <TextField
                        label='Zip Code'
                        helperText={<HelperText>Enter Zip Code (required)</HelperText>}
                    >
                        <Input
                            value={this.state.zipcode}
                            onChange={this.handleInputChange}
                            name="zipcode"
                        />
                    </TextField>
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
export default withRouter(connect(mapStateToProps, {})(NewPost))