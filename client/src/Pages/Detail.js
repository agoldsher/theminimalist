import React, { Component } from "react";
import API from "../utils/API";
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';

class Detail extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    card: {}
  };
  componentDidMount() {
    API.getPost(this.props.match.params.id)
      .then(res => {
        console.log(res)
        this.setState({ card: res.data });
        console.log(this.state.card);
      })
      .catch(err => console.log(err));
  }
  delete=()=>{
    API.deletePost(this.props.match.params.id)
    // .then(<Redirect to='/'/>)
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
        <button style={{ opacity: this.props.auth.user.email===this.state.card.email ? 1 : 0 }} onClick={this.delete}>delete post</button>
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

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Detail);