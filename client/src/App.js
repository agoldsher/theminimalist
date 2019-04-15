import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Main from "./Pages/Main";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import NewPost from "./Pages/NewPost";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Message from "./Pages/Message";
// import Landing from "./Pages/Landing";
import PrivateRoute from "./Pages/private-route/PrivateRoute";
import API from './utils/API';
import './App.scss';
// import { Input } from "./Components/AddForm";

let history = createBrowserHistory();
console.log(history);
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
    open: false,
    search: "",
    city: "",
    zipcode:"",
    categories: [
      {
        name: "All",
        icon: "apps"
      },
      {
        name: "Electronics",
        icon: "keyboard"
      },
      {
        name: "Appliances",
        icon: "kitchen"
      },
      {
        name: "Clothing",
        icon: "layers"
      },
      {
        name: "Household",
        icon: "weekend"
      },
      {
        name: "Sports",
        icon: "directions_run"
      },
      {
        name: "Movies and Games",
        icon: "local_movies"
      },
      {
        name: "Machinery",
        icon: "power"
      },
      {
        name: "Tools",
        icon: "build"
      },
      {
        name: "Space",
        icon: "store_mall_directory"
      }
    ]
  };


  loadCity = (userID) => {
    console.log(userID)
    API.getUserCity(userID)
      .then(res => {
        this.setState({ city: res.data[0].city })
        console.log(`Current location: ${this.state.city}`)
        this.loadPopPosts()
      })
      .catch(err => console.log(err))
  }

  loadPopPosts = () => {
    API.getPopPosts(this.state.city)
      .then(res => {
        console.log(res.data)
        this.setState({ cards: res.data });
      }
      )
      .catch(err => console.log(err));
  };
  handleCategoryChange = (category) => {
    if (category === "All") {
      this.loadPopPosts();
    } else {
      // console.log(`category: ${category} and city: ${city}`)
      API.getCategoryPosts(category, this.state.city)
        .then(res => {
          this.setState({ cards: res.data, category });
        }
        )
        .catch(err => console.log(err));
    }
  }
  handleSearch = (search) => {
    API.search(search, this.state.city)
      .then(res => {
        this.setState({ cards: res.data, search });
      }
      )
      .catch(err => console.log(err));
  }

  handleCityChange = (city) => {
    API.saveNewCity(store.getState().auth.user.id, city)
      .then((res, req) => {
        this.loadCity(store.getState().auth.user.id)
      }
      )
      .catch(err => console.log(err));
  }
  handleZipCode = (zipcode) => {
    if (zipcode.split("").length === 5 && /^[0-9]+$/.test(zipcode)) {
        API.getZipCode(zipcode)
            .then((res) => {
                this.setState({
                    city: `${res.data.city}, ${res.data.state}`
                })
                this.setState({
                  zipcode:""
              })
                console.log(this.state.city)
                this.handleCityChange(this.state.city)
            })
            .catch(err => console.log(err));
    };
  };

  loadCityTriggered = () => {
    if (this.state.city === "") {
      this.loadCity(store.getState().auth.user.id)
    }
  }
  delete = (id) => {
    API.deletePost(id)
      .then(() => {
        this.loadPopPosts();
      }
      )
  }

  // componentDidMount() {
  //   this.loadCity(store.getState().auth.user.id);

  // }
  onChange = e => {
    // console.log(e.target.value )
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state.zipcode);
  };
  clearSearch = e => {
    this.setState({"search":""})
    console.log("Clear Search")
    this.loadPopPosts()

  }


  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" parent={this} render={(props) => <Main {...props} cards={this.state.cards} city={this.state.city} loadCityTriggered={this.loadCityTriggered} />} />
            <PrivateRoute exact path="/newpost" parent={this} render={(props) => <NewPost {...props} loadCity={this.loadCity} />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/:id"  parent={this} render={(props) => <Detail {...props} delete={this.delete} />} />
            <PrivateRoute exact path="/message/:id" parent={this} render={(props) => <Message {...props} delete={this.delete}/>} />
            <PrivateRoute component={NoMatch} parent={this} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;