// import React, { Component } from "react";

import "./App.css";
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
import Jumbotron from "react-bootstrap/Jumbotron"


class App extends React.Component {
  state = {
    cards: [],
    category: "",
    search: "",
    categories: [
      "All",
      "Electronics",
      "Appliances",
      "Clothing",
      "Household",
      "Sports",
      "Movies and Games",
      "Machinary",
      "Tools",
      "Space"]
  };

  loadPopPosts = () => {
    API.getPopPosts()
      .then(res => {
        this.setState({ cards: res.data });
        console.log(res.data)
      }
      )
      .catch(err => console.log(err));
  };
  handleCategoryChange = (category) => {
    if (category === "All") {
      this.loadPopPosts();
    } else {
      API.getCategoryPosts(category)
        .then(res => {
          this.setState({ cards: res.data, category });
          console.log(res.data)
        }
        )
        .catch(err => console.log(err));
    }
  }
  handleSearch = (search) => {
    API.search(search)
      .then(res => {
        this.setState({ cards: res.data, search });
        console.log(res.data)
      }
      )
      .catch(err => console.log(err));
  }


  componentDidMount() {
    this.loadPopPosts();
  }

  render() {
    return (
      <Router>
        <div>
          <Jumbotron className="jumbotron">
          <h1>The Minimalist</h1>
          </Jumbotron>
          <Navbar handleCategoryChange={this.handleCategoryChange} handleSearch={this.handleSearch} />
          <div className="main-container">
            <div className="sidebar">
            {this.state.categories.map(category => (
                            // <CategoryWrapper
                            // key = {category}
                            // category={category}
                            // handleCategoryChange= {this.props.handleCategoryChange(category)}
                            // />
                            <div className = "each-nav-item" onClick={
                                    (e)=>{
                                        e.preventDefault()
                                        this.handleCategoryChange(category)
                                    }}> 
                                    {category}
                            </div>
                        ))}
              </div>

            <div className="main-content">
              <Switch>
                <Route exact path="/" render={(props) => <Main {...props} cards={this.state.cards} />} />
                <Route exact path="/newpost" component={NewPost} />
                {/* <Route exact path="/category/:category" component={Category} />
                  <Route exact path="/search/:search" component={Search} /> */}
                <Route exact path="/:id" component={Detail} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;