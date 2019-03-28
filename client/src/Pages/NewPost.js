import React, { Component } from "react";
import { Input, DropDown, TextArea, ImgUpload, FormBtn } from "../Components/AddForm";
import API from "../utils/API";

class NewPost extends Component {

    state = {
        title: "",
        category: "",
        price: "",
        description: "",
        image: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSelectChange = event => {
        const value = event.target.value;
        this.setState({
            category: value
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
                    categories={["", "Electronics", "Sports", "Space"]}
                    label="Category: "
                />
                <Input
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="price"
                    placeholder="Enter Price (required)"
                    label="Price: $"
                />
                <TextArea
                    value={this.state.Description}
                    onChange={this.handleInputChange}
                    name="description"
                    placeholder="Enter Description (required)"
                    label="Description: "
                />
                <ImgUpload
                    value={this.state.Image}
                    onChange={this.handleSelectChange}
                    name="image"
                    label="Image: "
                />
                <FormBtn onClick={this.handleFormSubmit}>Post</FormBtn>
            </form>
        );
    };
};

export default NewPost;