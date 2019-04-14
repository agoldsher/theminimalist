import React, { Component } from "react";
import API from "../utils/API";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { Redirect } from 'react-router-dom';

class Detail extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    card: {}
  };
  deleteMe(id) {
    this.props.delete(id);
    this.props.history.push('/')
  }
  componentDidMount() {
    API.getPost(this.props.match.params.id)
      .then(res => {
        console.log(res)
        this.setState({ card: res.data });
        console.log(this.state.card);
      })
      .catch(err => console.log(err));
  }
  // delete=()=>{
  //   API.deletePost(this.props.match.params.id)
  //   .then(()=> {
  //     this.props.history.push('/')
  // }
  //   )
  // }
  renderDeleteButton = () => {
    if (this.props.auth.user.email === this.state.card.email) {
      return (
        <button onClick={() => this.deleteMe(this.props.match.params.id)}>Delete Post</button>
      )
    } else {
      return ("")
    }
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div className="details-container">
        <div className="details-content">
          <div className="img-container">
            <h1> {this.state.card.userName}</h1>
            <img alt={this.state.card.title} src={this.state.card.image} />
          </div>
          <div className="details">
            <h2>{this.state.card.title}</h2>
            <h3>${this.state.card.price}/day</h3>
            <h4>Description: <br></br> {this.state.card.description}</h4>
            <h4>Email me: <br></br> {this.state.card.email}</h4>
            <div className="delete-button">
              {this.renderDeleteButton()}
            </div>
            <form action={"mailto:" + this.state.card.email}>
              <button type="submit">Email me</button>
            </form>
            <Link to={"/message/" + this.props.match.params.id}>
              <button type="button">Forum</button>
            </Link>

            {/* </div>
          <div>
            {this.renderDeleteButton()}
            <h1> {this.state.card.userName}</h1>
            <div className="img-container">
              <img alt={this.state.card.title} src={this.state.card.image} />
            </div>
            <div className="details">
              <h2>{this.state.card.title}</h2>
              <h3>${this.state.card.price}/day</h3>
              <h4>Description: <br></br> {this.state.card.description}</h4>
              <form action={"mailto:" + this.state.card.email}>
                <button type="submit">Email me</button>
              </form>
              <Link to={"/message/" + this.props.match.params.id}>
                <button type="button">Forum</button>
              </Link>
            </div> */}
          </div>
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