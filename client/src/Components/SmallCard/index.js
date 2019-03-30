import React from "react";
import "./style.css";

function SmallCard(props) {
    return (
        <div>  
          <div className="thumbnail">
           {/* eslint-disable-next-line */}
            <a href={'/' + props.id}>
              <img src={props.image} alt={props.title} style={{width:"100%"}}/>
              <div className="caption text-center">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">${props.price}/day</p>
              </div>
             </a>
          </div>
        </div>
    );
  }
  
  export default SmallCard;
  