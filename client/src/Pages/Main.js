import React, { Component } from "react";
import SmallCard from "../Components/SmallCard";
// import API from "../utils/API";
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/index.scss';

class Main extends Component {
  constructor(props) {
    super(props)
    // this.fileInput = React.createRef();
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }
  state = {
    sizeIndex:""
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Grid>
        <Row>
          {this.props.cards.map(card => (
            <Cell columns={4}>
              <SmallCard
                key={card._id}
                id={card._id}
                title={card.title}
                image={card.image}
                price={card.price}
              />
            </Cell>
          ))}
        </Row>
      </Grid>
    );
  }
}

export default Main;
