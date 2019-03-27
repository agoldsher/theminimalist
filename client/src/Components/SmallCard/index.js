import React from "react";

function SmallCard(props) {
    return (
        <div className="col-md-2">
          <div className="thumbnail">
           {/* eslint-disable-next-line */}
            <a href="#">
              <img src={props.image} alt={props.title} style={{width:"100%"}}/>
              <div className="caption text-center">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">${props.price}</p>
              </div>
             </a>
          </div>
        </div>
    );
  }
  
  export default SmallCard;
  