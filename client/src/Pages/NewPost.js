import React, { Component } from "react";
import { Input, DropDown, TextArea, ImgUpload, FormBtn } from "../Components/AddForm";
import API from "../utils/API";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


class NewPost extends Component {

    state = {
        title: "",
        category: "",
        price: "",
        description: "",
        image: "",
        state: ""
    };
    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

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
        if (this.state.title && this.state.category && this.state.price && this.state.description && this.state.state) {
            let formData = new FormData();
            formData.append("title", this.state.title);
            formData.append("category", this.state.category);
            formData.append("price", this.state.price);
            formData.append("description", this.state.description);
            formData.append("image", this.fileInput.current.files[0], this.fileInput.current.files[0].name);
            formData.append("state", this.state.state);
            API.savePost(formData)
                .then((res) => {
                    let path = `/`;
                    this.props.history.push(path);
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
                        "",   
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
                    <DropDown
                        value={this.state.state}
                        onChange={this.handleSelectChange}
                        name="state"
                        categories={['', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']}
                        label="Select State: "
                    />
                    <ImgUpload
                        value={this.state.Image}
                        name="image"
                        label="Image: "
                        fileRef={this.fileInput}
                    />
                    <Link to="/">
                        <FormBtn >Cancel</FormBtn>
                    </Link>
                    <FormBtn onClick={this.handleFormSubmit}>Post</FormBtn>
                </form>
            </div>
        );
    };
};

export default withRouter(NewPost);