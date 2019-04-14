import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import TextField, { Input } from "@material/react-text-field";
import Button from '@material/react-button';
import LogoutBtn from "../../Components/LogoutBtn";
import API from '../../utils/API';
import store from "../../store";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../../actions/authActions";

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




class PrivateRoute extends React.Component {


  renderParts = () => {
    const { parent, component: Component, render: Render, auth, ...rest } = this.props;
    if (window.location.pathname === "/") {
      return (
        <div>
        
                  </div>
      )
    }
  };

  render() {
    const { parent, component: Component, render: Render, auth, ...rest } = this.props;
    return (<Route
      {...rest}
      render={props =>
        store.getState().auth.isAuthenticated === true ? (
          <div className='drawer-container'>
            <Drawer
              modal
              open={parent.state.open}
              onClose={() => parent.setState({ open: false })}
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
                <List singleSelection selectedIndex={parent.state.selectedIndex}>
                  {parent.state.categories.map((category, index) => (
                    // <CategoryWrapper
                    // key = {category}
                    // category={category}
                    // handleCategoryChange= {parent.props.handleCategoryChange(category)}
                    // />
                    <ListItem key={index} onClick={
                      (e) => {
                        e.preventDefault()
                        parent.handleCategoryChange(category.name)
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

                      {(window.location.pathname === "/") ? 
                      (<TopAppBarSection align='start'>
                      <TopAppBarIcon navIcon tabIndex={0}>
                        <MaterialIcon hasRipple icon='menu' onClick={() => parent.setState({ open: !parent.state.open })} />
                      </TopAppBarIcon>
                      
                    </TopAppBarSection>
                      ) : ""}
                      {(window.location.pathname === "/") ? 
                    (<TopAppBarSection align='middle' role="toolbar">
                      <div>
                        <TextField label={parent.state.city}>
                          <Input value={parent.state.zipcode} id="zipcode" onChange={parent.onChange} />
                        </TextField>
                        <Button raised onClick={() => {
                          // e.preventDefault();
                          parent.handleZipCode(parent.state.zipcode)
                        }}>Change Location</Button>
                        <TextField label="Search">
                          <Input value={parent.state.search} id="search" onChange={parent.onChange} />
                        </TextField>
                        <Button raised onClick={()=>{
                          // e.preventDefault();
                          parent.handleSearch(parent.state.search)}}>Search</Button>
                      </div>
                    </TopAppBarSection>
                      ) : 
                      // <TopAppBarIcon navIcon tabIndex={0}>
                      <MaterialIcon className="mdc-top-app-bar__section" hasRipple icon='arrow_back_ios'
                      onClick={props.history.goBack} />
                      // </TopAppBarIcon>
                    }
                  <TopAppBarSection align='end' role='toolbar'>
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
                  <Render {...props} />
                  {/* {Component}? <Component {...props} /> : <Render {...props} /> */}
                </div>
              </div>
            </TopAppBarFixedAdjust>
          </div>
        ) : (
            <Redirect to="/login" />
          )
      }
    />
    );

  }
}
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
// export default PrivateRoute;
