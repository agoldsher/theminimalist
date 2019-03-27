import React, { Component } from "react";

  class Detail extends Component {
    // Setting this.state.friends to the friends json array
    state = {
        card:
          {
              _id:"jd32490fdfkj29318734jsdf",
              title:"bike",
              image:"https://dks.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green?wid=425",
              price:"3.99",
              description: "The bike is in good shape and has new tires.",
              user:{
                     _id:"sdkjfh9sdf67sdf8sadf",
                    username: "Scotty",
                    password: "peanutbutter",
                    numOfRentals:"3",
                    rating:"4.7"
        }
          },
        
      
    };
    //componentDidMount() {
        // API.getBook(this.props.match.params.id)
        //   .then(res => this.setState({ book: res.data }))
        //   .catch(err => console.log(err));
     // }
 
    // Map over this.state.friends and render a FriendCard component for each friend object
    render() {
      return (
          <div>
              <h1>User Rating: {this.state.card.user.rating}/5</h1>
            <div className="img-container">
                <img alt={this.state.card.title} src={this.state.card.image} />
             </div>
            <h2>{this.state.card.title}</h2>
            <h3>{this.state.card.price}</h3>
            <h4>{this.state.card.description}</h4>
          </div>
      );
    }
  }
  
  export default Detail;