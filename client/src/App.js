// import React, { Component } from "react";

// import "./App.css";
// import Axios from "axios";
// import CardRender from "./Components/CardRender"

// class App extends Component {
// state={
//   success:false
// }
// componentDidMount(){
//   Axios.get("/api").then(({data})=>{
//     this.setState({success:data.success})
//   })
// }
//   render() {
//     return (
//     <CardRender></CardRender>
//     );
//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:id" component={Detail} />
           <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;