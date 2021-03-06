import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./Components/movies";
import NavBar from "./Components/common/NavBar";
import Customers from "./Components/customers";
import Rentals from "./Components/rentals";
import NotFound from "./Components/not-found";
import MovieForm from "./Components/MovieForm";
import LoginForm from "./Components/loginForm";
import RegisterForm from "./Components/registerForm";
import ProtectedRoute from "./Components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";
import Logout from "./Components/logout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import CustomerForm from "./Components/CustomerForm";
import Profile from "./Components/profile";
import RentalForm from "./Components/rentalForm";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <ProtectedRoute path="/customers/new" component={CustomerForm} />
            <Route path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals/new" component={RentalForm} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/register" component={RegisterForm} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
