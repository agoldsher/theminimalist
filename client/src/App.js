import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

// import Category from "./Pages/Category";
// import Search from "./Pages/Search";
import NewPost from "./Pages/NewPost";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
// import Landing from "./Pages/Landing";
import API from './utils/API'
import PrivateRoute from "./Pages/private-route/PrivateRoute";
// import Dashboard from "./Pages/dashboard/Dashboard";
import LogoutBtn from "./Components/LogoutBtn";
import Jumbotron from "react-bootstrap/Jumbotron"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends React.Component {
  state = {
    cards: [],
    category: "",
    search: "",
    city:store.getState().auth.user.city,
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
    API.getPopPosts(this.state.city)
      .then(res => {
        this.setState({ cards: res.data });
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
    console.log(store.getState().auth.user.city)
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Jumbotron className="jumbotron">
              <h1>The Minimalist</h1>
            </Jumbotron>
            <Navbar handleCategoryChange={this.handleCategoryChange} handleSearch={this.handleSearch} />
            <div className="main-container">
              <div className="sidebar">
                {this.state.categories.map(category => (
                  // key = {category}
                  <div className="each-nav-item" onClick={
                    (e) => {
                      e.preventDefault()
                      this.handleCategoryChange(category)
                    }}>
                    {category}
                  </div>
                ))}
              </div>
              <div className="main-content">
                <Switch>
                  <PrivateRoute exact path="/" render={(props) => <Main {...props} cards={this.state.cards} />} />
                  <PrivateRoute exact path="/newpost" component={NewPost} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/:id" component={Detail} />
                  <PrivateRoute component={NoMatch} />
                </Switch>
              </div>
            </div>
            <LogoutBtn />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;