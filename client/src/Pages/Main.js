import React, { Component } from "react";
import SmallCard from "../Components/SmallCard"

  class CardRender extends Component {
    // Setting this.state.friends to the friends json array
    state = {
      cards:[
          {
              title:"bike",
              image:"https://dks.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green?wid=425",
              price:"3.99"
          },
          {
            title:"vacuum",
            image:"https://target.scene7.com/is/image/Target/GUEST_a8109913-a31a-4510-a730-2829d8e841c9?wid=488&hei=488&fmt=pjpeg",
            price:"10.55"
        }
      ]
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
  