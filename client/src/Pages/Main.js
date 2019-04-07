import React, { Component } from "react";
import SmallCard from "../Components/SmallCard";
// import API from "../utils/API";

class Main extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.fileInput = React.createRef();
  //   // this.handleFormSubmit = this.handleFormSubmit.bind(this);

  // }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
      <div><h6>Current City: {this.props.city}</h6></div>
      <div className="card-container">
        {this.props.cards.map(card => (
          <SmallCard
            key={card._id}
            id={card._id}
            title={card.title}
            image={card.image}
            price={card.price}
          />
        ))}
      </div>
      </div>
    );
  }
}

export default Main;
