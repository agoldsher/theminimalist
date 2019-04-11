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
import PrivateRoute from "./Pages/private-route/PrivateRoute";
import './App.scss';
// import { Input } from "./Components/AddForm";

let history = createBrowserHistory();
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
  
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>

          <Switch>
            <PrivateRoute exact path="/" render={(props) => <Main {...props} cards={this.state.cards} city={this.state.city} loadCityTriggered={this.loadCityTriggered} />} />
            <PrivateRoute exact path="/newpost" render={(props) => <NewPost {...props} loadCity={this.loadCity} />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/:id" render={(props) => <Detail {...props} delete={this.delete} />} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;