import React, { Component } from "react";
import SmallCard from "../Components/SmallCard";
import API from "../utils/API";

  class CardRender extends Component {
    // Setting this.state.friends to the friends json array
    state = {
      cards:[]
    };
    componentDidMount() {
      this.loadPosts();
    }
  
    loadPosts = () => {
     API.getPopPosts()
        .then(res =>{
          this.setState({ cards: res.data });
          console.log(res.data)
        }
        )
        .catch(err => console.log(err));
    };
    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
      return (
          <div>
        {this.state.cards.map(card => (
            <SmallCard
              title={card.title}
              image={card.image}
              price={card.price}
            />
          ))}
          </div>
      );
    }
  }
  
  export default CardRender;
  