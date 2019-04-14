import React, { Component } from "react";
import API from "../utils/API";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@material/react-button'
import DeleteIcon from '@material-ui/icons/Delete'

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
        <Button className="delete-btn" onClick={() => this.deleteMe(this.props.match.params.id)}><DeleteIcon /></Button>
      )
    } else {
      return ("")
    }
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div className="details-container">
        {this.renderDeleteButton()}
        <div className="details-content">
          <div className="img-container">
            <h1> {this.state.card.userName}</h1>
            <img alt={this.state.card.title} src={this.state.card.image} />
          </div>
          <div className="details">
            <h2>{this.state.card.title}</h2>
            <h3>${this.state.card.price}/day</h3>
            <h4>Description: <br></br> {this.state.card.description}</h4>
            <div className="details-button">
              <form action={"mailto:" + this.state.card.email}>
              <Button className="ml-0" type="submit">Email</Button>
            </form>
            <Link className="link" to={"/message/" + this.props.match.params.id}>
              <Button type="button">Forum</Button>
            </Link>
            </div>
            {/* <form action={"mailto:" + this.state.card.email}>
              <button type="submit">Email me</button>
            </form>
            <Link to={"/message/" + this.props.match.params.id}>
              <button type="button">Forum</button>
            </Link> */}
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