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
    );
  }
}

export default Main;
