import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
import "./LandingPage.css";
import usflag from "../../images/usflag.png";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      startDate: "",
      endDate: "",
      properties: [],
      searchFlag: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlestartDate = this.handlestartDate.bind(this);
    this.handleendDate = this.handleendDate.bind(this);
    this.handleCity = this.handleCity.bind(this);
  }

  handleCity = e => {
    console.log("E", e);
    this.setState({
      city: e.target.value
    });
  };

  handlestartDate = e => {
    console.log("E", e);
    this.setState({
      startDate: e
    });
  };

  handleendDate = e => {
    this.setState({
      endDate: e
    });
  };

  handleSearch(e) {
    e.preventDefault();
    console.log(this.state);

    window.alert("Please Login to search");
  }

  render() {
    var sdate = new Date(this.state.startDate);

    console.log("sdate:", sdate);

    var year = sdate.getFullYear();

    console.log("year:", year);

    var month = ("0" + (sdate.getMonth() + 1)).slice(-2);

    console.log("month:", month);
    var day = ("0" + sdate.getDate()).slice(-2);

    console.log("day:", day);

    var sd = `${year}-${month}-${day}`;

    console.log("sd:", sd);

    var edate = new Date(this.state.endDate);
    var year = edate.getFullYear();
    var month = ("0" + (edate.getMonth() + 1)).slice(-2);
    var day = ("0" + edate.getDate()).slice(-2);
    var ed = `${year}-${month}-${day}`;

    console.log("START DATE", this.state.startDate);

    console.log("END DATE", this.state.endDate);

    console.log("END DATE", this.state.city);

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#">
              <span class="websitename"> OpenHome &reg; </span>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active mr-2">
                  <Link class="nav-link" to="/home">
                    Home
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item mr-2">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item mr-2">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li class="nav-item">
                  {" "}
                  <img src={usflag} class="flagcrop" alt="no pic" />{" "}
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    English (US)<span className="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item ml-4">
                  <Link
                    class="nav-link btn btn-outline-primary"
                    to="/postproperty"
                  >
                    Host Your Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header class="masthead">
          <div class="container h-100">
            <div class="row h-100 align-items-center">
              <div class="col-12 text-center" style={{ "margin-top": "31%" }}>
                <h1 class="font-weight-light" style={{ color: "black" }}>
                  Where do you want to go?
                </h1>
                <p class="lead">
                  {" "}
                  Book unique places to stay and things to do.{" "}
                </p>
                {/* SEARCH BAR STARTS */}
                <section class="search-sec">
                  <div class="container">
                    <form action="#" method="post" novalidate="novalidate">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-4 col-md-3 col-sm-12 p-0">
                              <input
                                id="city"
                                type="text"
                                class="form-control search-slt"
                                placeholder="Where do you want to go?"
                                onChange={this.handleCity}
                                value={this.state.city}
                              />
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                              <DatePicker
                                className="form-control search-slt datepickercss"
                                placeholderText=" Start Date"
                                selected={this.state.startDate}
                                onChange={this.handlestartDate}
                                id="startDate"
                                value={this.state.startDate}
                                minDate={moment()}
                              />
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                              <DatePicker
                                className="form-control search-slt datepickercss"
                                placeholderText="End Date"
                                selected={this.state.endDate}
                                onChange={this.handleendDate}
                                minDate={this.state.startDate}
                                value={this.state.endDate}
                                id="endDate"
                              />
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                              <button
                                type="button"
                                class="btn btn-danger wrn-btn"
                                onClick={this.handleSearch}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
                {/* SEARCH BAR ENDS */}
              </div>
            </div>
          </div>
        </header>

        <section class="py-5">
          <div className="container-fluid foot mt-2"></div>
        </section>
      </div>
    );
  }
}

export default HomePage;
