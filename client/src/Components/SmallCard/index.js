import React from "react";
import { Link } from "react-router-dom";
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import "@material/react-card/index.scss";
import Typography,{Body2,Headline6,Subtitle2} from "@material/react-typography";
import Button from "@material/react-button";
import "@material/react-button/index.scss"
import "@material/react-typography/index.scss";

import "./style.css";

function SmallCard(props) {
  return (
    <div>
      <Card className='mdc-card demo-card demo-basic-with-text-over-media thumbnail'>
        <CardPrimaryContent className='demo-card__primary-action'>
          <CardMedia
            wide
            className='demo-card__media'
            imageUrl={props.image}
            contentClassName='demo-card__media-content'
          >
            <div className='demo-card__primary'>
              <Headline6 className='demo-card__title'>
                {props.title}
    </Headline6>
              <Subtitle2 className='demo-card__subtitle'>
                by Kurt Wagner
    </Subtitle2>
            </div>
          </CardMedia>
          <Body2 className='demo-card__secondary'>
            Visit ten places on our planet that are undergoing the biggest changes today.
  </Body2>
        </CardPrimaryContent>
        <CardActions>
          <CardActionButtons>
            <Button>Read</Button>
            <Button>Bookmark</Button>
          </CardActionButtons>
          {/* <CardActionIcons>
            <IconButton>
              <MaterialIcon icon='favorite_border' />
            </IconButton>
            <IconButton>
              <MaterialIcon icon='share' />
            </IconButton>
            <IconButton>
              <MaterialIcon icon='more_vert' />
            </IconButton>
          </CardActionIcons> */}
        </CardActions>
      </Card>
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
