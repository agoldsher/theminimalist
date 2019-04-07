
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';

import MaterialIcon from '@material/react-material-icon';

import Drawer, {
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
  DrawerAppContent
} from '@material/react-drawer';
// import Drawer, { DrawerAppContent } from '@material/react-drawer';

import Main from "./Pages/Main";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";



import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';

import Button from '@material/react-button';

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
import Jumbotron from "react-bootstrap/Jumbotron";
import authReducers from './reducers/authReducers';

import './App.scss';


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
    categories: [
      "All",
      "Electronics",
      "Appliances",
      "Clothing",
      "Household",
      "Sports",
      "Movies and Games",
      "Machinery",
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
      <Provider store={store}>
        <Router>
          <div className='drawer-container'>
            <Drawer
              modal
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
            >
              <DrawerHeader> {/*defaults to div*/}
                <DrawerTitle tag='h2'> {/*defaults to h3*/}
                  Categories
                  </DrawerTitle>
                <DrawerSubtitle> {/*defaults to h6*/}
                  Isn't this cool?
                  </DrawerSubtitle>
              </DrawerHeader>

              <DrawerContent tag='main'>  {/*defaults to div*/}
                {/* <Button>What up?!</Button> */}
                <List singleSelection selectedIndex={this.state.selectedIndex}>
                  {this.state.categories.map(category => (
                    // <CategoryWrapper
                    // key = {category}
                    // category={category}
                    // handleCategoryChange= {this.props.handleCategoryChange(category)}
                    // />
                    <ListItem onClick={
                      (e) => {
                        e.preventDefault()
                        this.handleCategoryChange(category)
                      }}>
                      <ListItemGraphic graphic={<MaterialIcon icon='folder' />} />
                      <ListItemText primaryText={category} />
                    </ListItem>

                  ))}
                </List>
              </DrawerContent>

            </Drawer>
            <DrawerAppContent>
              <TopAppBar>
                <TopAppBarRow>
                  <TopAppBarSection align='start'>
                    <TopAppBarIcon navIcon tabIndex={0}>
                      <MaterialIcon hasRipple icon='menu' onClick={() => this.setState({ open: !this.state.open })} />
                    </TopAppBarIcon>
                    <TopAppBarTitle>TheMinimalist</TopAppBarTitle>
                  </TopAppBarSection>
                  <TopAppBarSection align='end' role='toolbar'>
                    {/* <TopAppBarIcon actionItem tabIndex={0}>
                      <MaterialIcon
                        aria-label="print page"
                        hasRipple
                        icon='print'
                        onClick={() => console.log('print')}
                      />
                    </TopAppBarIcon> */}
                    <TopAppBarIcon actionItem tabIndex={0}>

                      <Link to='/newpost'>
                        <MaterialIcon
                          aria-label="Add Item"
                          hasRipple
                          icon='add'
                          onClick={() => console.log('print')}
                        />
                      </Link>
                    </TopAppBarIcon>
                    <TopAppBarIcon actionItem tabIndex={0}>
                      <LogoutBtn />
                    </TopAppBarIcon>
                    {/* <TopAppBarIcon actionItem tabIndex={0}>
                    <MaterialIcon
                      aria-label="Logout"
                      hasRipple
                      icon='logout'
                      onClick={() => console.log('print')}
                    />
                  </TopAppBarIcon> */}
                  </TopAppBarSection>
                </TopAppBarRow>
              </TopAppBar>
            </DrawerAppContent>
            <TopAppBarFixedAdjust>
              <div className="main-container">

                <div className="main-content">
                  <Switch>
                    <PrivateRoute exact path="/" render={(props) => <Main {...props} cards={this.state.cards} />} />
                    {/* <Route exact path="/" render={(props) => <Main {...props} cards={this.state.cards} />} /> */}
                    {/* <Route exact path="/land" component={Landing} /> */}
                    {/* <PrivateRoute exact path="/dash" component={Dashboard} /> */}
                    <PrivateRoute exact path="/newpost" component={NewPost} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    {/* <Route exact path="/category/:category" component={Category} />
            <Route exact path="/search/:search" component={Search} /> */}
                    <PrivateRoute exact path="/:id" component={Detail} />
                    <PrivateRoute component={NoMatch} />
                  </Switch>
                </div>
              </div>
            </TopAppBarFixedAdjust>
          </div>
          {/* <LogoutBtn /> */}
        </Router>
      </Provider>
    );
  }
}

export default App;