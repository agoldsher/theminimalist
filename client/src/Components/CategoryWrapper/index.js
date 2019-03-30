import React from "react";



function CategoryWrapper(props) {
    return (
         <a className="nav-link" href={'/category/'+props.category}>{props.category} </a>
    );
  }
  
  export default CategoryWrapper;
