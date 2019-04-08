import React from "react";
import { Link } from "react-router-dom";
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import ItemDetails from '../ItemDetails';
import { Body2, Headline6, Headline4, Subtitle2 } from "@material/react-typography";
import Button from "@material/react-button";
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

import "./style.css";

function SmallCard(props) {
  return (
    <div>
      <Link to={'/' + props.id} style={{ textDecoration: 'none',color:"inherit" }}>
        <Card className='mdc-card demo-card demo-basic-with-header thumbnail'>
          <CardPrimaryContent className='demo-card__primary-action'>
            <div className='demo-card__primary'>
              <Headline6 className='demo-card__title'>
                {props.title}
              </Headline6>
              <Subtitle2 className='demo-card__subtitle'>
                by Kurt Wagner
                </Subtitle2>
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

              Visit ten places on our planet that are undergoing the biggest changes today.
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
      </Link>
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

export default SmallCard;
