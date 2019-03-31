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
// import Category from "./Pages/Category";
// import Search from "./Pages/Search";
import NewPost from "./Pages/NewPost";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
import Navbar from "./Components/Navbar";
import API from './utils/API'


class App extends React.Component {
  state = {
    cards:[],
    category: "",
    search: ""
  }
  loadPopPosts = () => {
    API.getPopPosts()
       .then(res =>{
         this.setState({ cards: res.data });
         console.log(res.data)
       }
       )
       .catch(err => console.log(err));
   };
  handleCategoryChange = (category)=>{
    if (category==="All"){
      this.loadPopPosts();
    }else{
    API.getCategoryPosts(category)
        .then(res =>{
          this.setState({ cards: res.data, category });
          console.log(res.data)
        }
        )
        .catch(err => console.log(err));
  }}
  handleSearch = (search)=>{
    API.search(search)
        .then(res =>{
          this.setState({ cards: res.data, search});
          console.log(res.data)
        }
        )
        .catch(err => console.log(err));
  }


  componentDidMount() {
    this.loadPopPosts();
  }

  render(){
    return (
      <Router>
        <div>
          <Navbar handleCategoryChange={this.handleCategoryChange} handleSearch={this.handleSearch} />
          <Switch>
            <Route exact path="/" render={(props) => <Main {...props} cards={this.state.cards} />} />
            <Route exact path="/newpost" component={NewPost} />
            {/* <Route exact path="/category/:category" component={Category} />
            <Route exact path="/search/:search" component={Search} /> */}
            <Route exact path="/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;