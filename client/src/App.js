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
import NewPost from "./Pages/NewPost";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
import Login from "./Pages/Login";
// import Nav from "./components/Nav";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/newpost" component={NewPost} />
          <Route exact path="/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;