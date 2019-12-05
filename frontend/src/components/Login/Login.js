import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
import "./Login.css";
import Navbar from "../Common/Navbar/Navbar";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin(e) {
    e.preventDefault();
    console.log(this.state);

    window.localStorage.setItem("user", this.state.email);

    // axios.defaults.withCredentials = true;

    axios.get(API_ENDPOINT + "/user/landing").then(response => {
      console.log("ssss ", response.status);
      console.log("data  ", response.data);
      if (response.status === 200) {
        console.log(response.status);

        if (response.data === "user") {
          this.props.history.push("/home");
        } else {
          this.props.history.push("/landingpage");
        }
      }
      console.log(response);
    });
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    const requestBody = {
      userID: this.state.email,
      password: this.state.password,
      role: "user"
    };

    window.localStorage.setItem("user", this.state.email);

    // axios.defaults.withCredentials = true;

    axios.post(API_ENDPOINT + "/user/login", requestBody).then(response => {
      console.log("ssss ", response.status);
      console.log("data  ", response.data);

      if (response.status === 200) {
        console.log(response.status);

        if (response.data === "user") {
          this.props.history.push("/home");
        } else {
          this.props.history.push("/landingpage");
        }
      }
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="back">
          <div class="container" style={{ "margin-top": "2%" }}>
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Sign In</h5>
                    <form class="form-signin">
                      <div class="form-label-group">
                        <input
                          type="email"
                          id="email"
                          class="form-control"
                          placeholder="Email address"
                          onChange={this.handleEmail}
                          value={this.state.email}
                          required
                          autofocus
                        />
                        <label for="email">Email address</label>
                      </div>

                      <div class="form-label-group">
                        <input
                          type="password"
                          id="password"
                          class="form-control"
                          placeholder="Password"
                          onChange={this.handlePassword}
                          required
                        />
                        <label for="password">Password</label>
                      </div>

                      <div class="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                        />
                        <label class="custom-control-label" for="customCheck1">
                          Remember password
                        </label>
                      </div>
                      <button
                        class="btn btn-lg btn-success btn-block text-uppercase"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Sign in
                      </button>
                      <hr class="my-4" />
                      <button
                        class="btn btn-lg btn-google btn-block text-uppercase"
                        onClick={this.handleGoogleLogin}
                        type="submit"
                      >
                        <i class="fab fa-google mr-2"></i> Sign in with Google
                      </button>
                      <button
                        class="btn btn-lg btn-facebook btn-block text-uppercase"
                        type="submit"
                      >
                        <i class="fab fa-facebook-f mr-2"></i> Sign in with
                        Facebook
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid foot mt-4"></div>
      </div>
    );
  }
}

export default Login;
