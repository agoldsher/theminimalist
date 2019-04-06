import React, { Component } from "react";
import API from "../utils/API";

class Detail extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    card: {}
  };
  componentDidMount() {
    API.getPost(this.props.match.params.id)
      .then(res => {
        this.setState({ card: res.data });
        console.log(this.state.card);
      })
      .catch(err => console.log(err));
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
        <h1> {this.state.card.userName}</h1>
        <div className="img-container">
          <img alt={this.state.card.title} src={this.state.card.image} />
        </div>
        <div className="details">
          <h2>{this.state.card.title}</h2>
          <h3>${this.state.card.price}/day</h3>
          <h4>Description: <br></br> {this.state.card.description}</h4>
          <h4>Email me: <br></br> {this.state.card.email}</h4>
        </div>
      </div>
    );
  }
}

export default Detail;