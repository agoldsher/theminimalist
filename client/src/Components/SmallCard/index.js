import React from "react";

function SmallCard(props) {
    return (
      <div className="card" >
        <div className="img-container">
          <img alt={props.title} src={props.image} />
        </div>
        <div className="content">
              <h3>{props.title}</h3>
              <h5>${props.price}</h5>
        </div>
      </div>
    );
  }
  
  export default SmallCard;
  