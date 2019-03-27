import React, { Component } from "react";
import { Input, DropDown, TextArea, ImgUpload, FormBtn } from "../Components/AddForm";


class NewPost extends Component {

    state = {
        title: "",
        category: "",
        price: "",
        description: "",
        image: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <form>
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="Title"
                    placeholder="Enter Title"
                />
                <DropDown
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="Category"
                    placeholder="Enter Price"
                />
                <Input
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="Price"
                    placeholder="Enter Price"
                />
                <TextArea
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="Description"
                    placeholder="Enter Price"
                />
                <ImgUpload
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="Image"
                    placeholder="Enter Price"
                />
                <FormBtn
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    placeholder="Enter Price"
                />
            </form>
        );
    };
};

export default NewPost;