import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  // TopAppBarTitle,
} from '@material/react-top-app-bar';
// import Headline2 from "@material/react-typography";
import MaterialIcon from '@material/react-material-icon';
import Drawer, {
  DrawerHeader,
  // DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
  DrawerAppContent
} from '@material/react-drawer';
import Main from "./Pages/Main";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import { Provider } from "react-redux";
import store from "./store";
import NewPost from "./Pages/NewPost";
import NoMatch from "./Pages/NoMatch";
import Detail from "./Pages/Detail";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import API from './utils/API'
import PrivateRoute from "./Pages/private-route/PrivateRoute";
import LogoutBtn from "./Components/LogoutBtn";
import './App.scss';
import TextField, { Input } from "@material/react-text-field";
import Button from '@material/react-button';
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
  state = {
    cards: [],
    category: "",
    open: false,
    search: "",
    city: "",
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

  loadCity=(userID)=>{
    console.log(userID)
    API.getUserCity(userID)
    .then(res=>{
      this.setState({city:res.data[0].city})
      console.log(`Current location: ${this.state.city}`)
      this.loadPopPosts()
    })
    .catch(err=>console.log(err))
  }

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
      .then((res,req) => {
        console.log("i'm getting to the city load")
        this.loadCity(store.getState().auth.user.id)
      }
      )
      .catch(err => console.log(err));
  }

  loadCityTriggered = ()=>{
    if(this.state.city === ""){  
      this.loadCity(store.getState().auth.user.id)
    }
  }
  delete=(id)=>{
    API.deletePost(id)
    .then(()=> {
      this.loadPopPosts();
  }
    )
  }

  // componentDidMount() {
  //   this.loadCity(store.getState().auth.user.id);

  // }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });

  };


  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
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
                {/* <DrawerSubtitle> 
                  Isn't this cool?
                  </DrawerSubtitle> */}
              </DrawerHeader>

              <DrawerContent tag='main'>  {/*defaults to div*/}
                {/* <Button>What up?!</Button> */}
                <List singleSelection selectedIndex={this.state.selectedIndex}>
                  {this.state.categories.map((category, index) => (
                    // <CategoryWrapper
                    // key = {category}
                    // category={category}
                    // handleCategoryChange= {this.props.handleCategoryChange(category)}
                    // />
                    <ListItem key ={index}onClick={
                      (e) => {
                        e.preventDefault()
                        this.handleCategoryChange(category.name)
                      }}>
                      <ListItemGraphic graphic={<MaterialIcon icon={category.icon} />} />
                      <ListItemText primaryText={category.name} />
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
                    {/* <TopAppBarTitle>
                    </TopAppBarTitle> */}
                  </TopAppBarSection>
                  <TopAppBarSection align='middle' role="toolbar">
                    <div>
                      <TextField label="City">
                        <Input value={this.state.city} id="city" onChange={this.onChange} />
                      </TextField>
                      <Button raised onClick={(e)=>{
                        e.preventDefault();
                        this.handleCityChange(this.state.city)}}>Change City</Button>
                    </div>
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


                    {/* important!!!! This is for handling the search button and change city button: handleSearch={this.handleSearch} handleCityChange={this.handleCityChange}  */}
                    <TopAppBarIcon navIcon tabIndex={0}>
                      <Link to='/'>
                        <MaterialIcon hasRipple icon='home' />
                      </Link>
                    </TopAppBarIcon>
                    <TopAppBarIcon actionItem tabIndex={1}>

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
                    <PrivateRoute exact path="/" render={(props) => <Main {...props} cards={this.state.cards} city={this.state.city} loadCityTriggered={this.loadCityTriggered}/>} />
                    <PrivateRoute exact path="/newpost" component={NewPost} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/:id" render={(props) => <Detail {...props} delete={this.delete}/>} />
                    <PrivateRoute component={NoMatch} />
                  </Switch>
                </div>
              </div>
            </TopAppBarFixedAdjust>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;