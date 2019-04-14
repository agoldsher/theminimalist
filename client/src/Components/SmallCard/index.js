import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card, {
  CardPrimaryContent,
  CardMedia,
  // CardActions,
  // CardActionButtons,
  // CardActionIcons
} from "@material/react-card";
// import ItemDetails from '../ItemDetails';
import {
  Body2,
  Headline6,
  //  Headline4, 
  Subtitle2
} from "@material/react-typography";
// import ItemDetails from '../ItemDetails';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
import List, {ListItem, ListItemText} from '@material/react-list';
import Radio, {NativeRadioControl} from '@material/react-radio';
// import Button from "@material/react-button";
// import IconButton from '@material/react-icon-button';
// import MaterialIcon from '@material/react-material-icon';

import "./style.css";
import { render } from "react-dom";

class SmallCard extends Component {
  state = {
    isOpen: false,
    action: '',
    selectedIndex: -1,
    choices: ['Never gonna give you up', 'Host cross buns', 'None']
  }

  openDialog = () => {
    this.setState({ isOpen: true });
    console.log(this.state.openDialog)
  }

  isChecked = (i) => i === this.state.selectedIndex;


  render() {
    const props = this.props;
    return (
      <div>
        {/* <Link to={'/' + props.id} style={{ textDecoration: 'none', color: "inherit" }}> */}
        <Card className='mdc-card demo-card demo-basic-with-header thumbnail' onClick={this.openDialog}>
          <CardPrimaryContent className='demo-card__primary-action'>
            <div className='demo-card__primary'>
              <Headline6 className='demo-card__title'>
                {props.title}
              </Headline6>
            </div>
            <CardMedia
              wide
              className='demo-card__media'
              imageUrl={props.image}
              alt={props.title}
              contentClassName='demo-card__media-content'
            >
            </CardMedia>
            <Body2 className='demo-card__secondary'>
              ${props.price}/day
            </Body2>
          </CardPrimaryContent>
          {/* <CardActions>
            <CardActionButtons>
              <Button>Read</Button>
              <Button>Bookmark</Button>
            </CardActionButtons>
            <CardActionIcons>
            <IconButton>
              <MaterialIcon icon='favorite_border' />
            </IconButton>
            <IconButton>
              <MaterialIcon icon='share' />
            </IconButton>
            <IconButton>
              <MaterialIcon icon='more_vert' />
            </IconButton>
          </CardActionIcons>
          </CardActions> */}
        </Card>
        <Dialog
          onClose={(action) => this.setState({ isOpen: false, action })}
          open={this.state.isOpen}>
          <DialogTitle>Chose a Phone Ringtone</DialogTitle>
          <DialogContent>
            <List
              singleSelection
              handleSelect={(selectedIndex) => this.setState({ selectedIndex })}
            >{this.state.choices.map((choice, i) => {
              let cleanChoice = choice.replace(/\s/g, '-');
              return (
                <ListItem key={i}>
                  <span className='mdc-list-item__graphic'>
                    <Radio>
                      <NativeRadioControl
                        name='ringtone'
                        value={choice}
                        id={cleanChoice}
                        checked={this.isChecked(i)}
                        onChange={() => { }}
                      />
                    </Radio>
                  </span>
                  <label htmlFor={cleanChoice}>
                    <ListItemText primaryText={choice} />
                  </label>
                </ListItem>
              );
            })}
            </List>
          </DialogContent>
          <DialogFooter>
            <DialogButton action='dismiss'>Cancel</DialogButton>
            <DialogButton action='confirm' isDefault>Ok</DialogButton>
          </DialogFooter>
        </Dialog>
        {/* </Link> */}
        {/* <ItemDetails /> */}

        {/* <div className="thumbnail">
            <Link to ={'/' + props.id}>
              <img src={props.image} alt={props.title} style={{width:"100%"}}/>
              <div className="caption text-center">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">${props.price}/day</p>
              </div> 
              </Link>
   
          </div> */}
      </div>
    );
  }
}

export default SmallCard;
